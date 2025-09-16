<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Fine;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\Payment;
use App\Models\Rental;
use Carbon\Carbon;
use Inertia\Response;
use Inertia\Inertia;

class OrderManagementController extends Controller
{
    private function mapStatusLabel($status)
    {
        return match ($status) {
            'pending_payment' => 'Pending Payment',
            'confirmed_payment' => 'Confirmed Payment',
            'payment_received' => 'Payment Received',
            'on_rent' => 'On Rent',
            'waiting_for_check' => 'Waiting for Check',
            'waiting_for_fines_payment' => 'Waiting for Fines Payment',
            'completed' => 'Completed',
            'cancelled' => 'Cancelled',
            'expired' => 'Expired',
            'failed' => 'Failed',
            // 'return' => 'Return',
            default => ucfirst($status),
        };
    }

    /* 
        fungsi awal untuk penampilan data order di page ordermanagement

        Fungsi untuk mencari order berdasarkan
        - booking id
        - nama car (brand, model, type)
        - start date dan end date
        - minimal total price (dalam hal ini jika ada yang lebih atau kurang 50.000 berdasarkan yang dicari dibanding dengan total price yang tercatat dalam tb)
    */
    public function index(Request $request)
    {
        $userId = Auth::id();

        $query = Rental::with([
            'payment',
            'fine',
            'car.brand',
            'car.model',
            'car.type',
            'car.imagePath',
            'user',
            'user.firstAddress',
        ])
            ->whereHas('car.user', function ($q) use ($userId) {
                $q->where('id', $userId);
            });

        // 🔎 Logika Search (gabungan dari searchOrders)
        if ($request->search) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                // booking id
                $q->where('id', 'like', "%{$search}%")

                    // nama mobil
                    ->orWhereHas('car.brand', function ($carQuery) use ($search) {
                        $carQuery->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('car.model', function ($carQuery) use ($search) {
                        $carQuery->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('car.type', function ($carQuery) use ($search) {
                        $carQuery->where('name', 'like', "%{$search}%");
                    });

                // total price dengan tolerance 100000
                if (is_numeric($search)) {
                    $tolerance = request('tolerance') ?? 100000;
                    $min = max(0, $search - $tolerance);
                    $max = $search + $tolerance;
                    $q->orWhereBetween('total_price', [$min, $max]);
                }
            });
        }

        // filter tanggal
        if ($request->start_date && $request->end_date) {
            $query->whereBetween('start_date', [$request->start_date, $request->end_date]);
        }

        // ambil data
        $orders = $query->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($rental) {
                $start = Carbon::parse($rental->start_date);
                $end   = Carbon::parse($rental->end_date);

                $diffInMinutes = $start->diffInMinutes($end);
                $days  = floor($diffInMinutes / (24 * 60));
                $hours = floor(($diffInMinutes % (24 * 60)) / 60);
                $mins  = $diffInMinutes % 60;

                $parts = [];

                if ($days > 0) {
                    $parts[] = $days . ' d' . ($days > 1 ? 's' : '');
                }
                if ($hours > 0) {
                    $parts[] = $hours . ' h' . ($hours > 1 ? 'rs' : '');
                }
                if ($mins > 0) {
                    $parts[] = $mins . ' m' . ($mins > 1 ? 'inutes' : '');
                }

                $durationLabel = implode(' ', $parts);

                // jika semua 0, misalnya tampilkan "0 minute"
                if (empty($durationLabel)) {
                    $durationLabel = '0 minute';
                }

                // pickup location
                // akan diatur ulang selanjutnya

                $pricePerDay = $days > 0
                    ? $rental->total_price / $days
                    : $rental->total_price; // fallback kalau kurang dari 1 hari

                return [
                    'id' => $rental->id,
                    'booking_id' => 'BK' . $rental->created_at->format('Ymd') . '-' . $rental->id,
                    'date' => $rental->created_at->format('d F Y'),
                    'status' => $rental->status ?? 'loading',
                    'statusLabel' => $this->mapStatusLabel($rental->status ?? 'loading'),

                    // ambil status dari payment
                    'url_payment' => $rental->payment->checkout_link ?? null,
                    'status0' => $rental->payment->status ?? 'unpaid',
                    'statusLabel0' => $this->mapStatusLabel($rental->payment->status ?? 'unpaid'),

                    'payment_method' => $rental->payment->payment_method ?? '-',

                    // data mobil dari relasi
                    'car' => [
                        'brand' => $rental->car->brand->name ?? 'Unknown',
                        'model' => $rental->car->model->name ?? '',
                        'type'  => $rental->car->type->name ?? '',
                        'image' => $rental->car->main_image ?? '',
                    ],

                    // durasi & harga
                    'start_date' => Carbon::parse($rental->start_date)->format('d M Y, H:i'),
                    'end_date' => Carbon::parse($rental->end_date)->format('d M Y, H:i'),
                    'duration' => $durationLabel,
                    'price' => $pricePerDay,
                    'totalPayment' => $rental->total_price,
                    'pickup_location' => $rental->pickup_location ?? '-',

                    // data user
                    'name' => $rental->user->name ?? '-',
                    'email' => $rental->user->email ?? '-',
                    'phone' => $rental->user->phone_number ?? '-',
                    'city' => $rental->user->firstAddress->city ?? '-',

                    // data denda
                    // 'fine_at_times' => $rental->fine->created_at ?? 0,
                    'fine_at_times' => Carbon::parse($rental->fine->created_at ?? null)->format('d M Y, H:i') ?? '-',
                    'fine_time' => $rental->fine->late_time ?? 0,
                    'fine_amount' => $rental->fine->late_amount ?? 0,
                ];
            });

        // dd($orders);

        return Inertia::render('Owner/Konten/OrdersManagement', [
            'orders' => $orders,
            'filters' => $request->only(['search', 'start_date', 'end_date']),
        ]);
    }

    /* 
        fungsi untuk update status jika
        1. button finish di tekan maka status menjadi waiting_for_check dari yang sebelumnya on_rent
        1_1. jika ada overdue (terlambat kembalinya mobil) maka akan dibuatkan record baru di tabel fines, dan id dari fines tersebut akan dimasukkan ke dalam kolom fine_id di tabel rentals
        2. button complete di tekan maka status menjadi completed dari yang sebelumnya waiting_for_check
    */
    public function updateStatus(Request $request, $id)
    {
        $rental = Rental::with('fine')->findOrFail($id);

        // terima overdue dari frontend
        $overdueHours = (int) $request->input('overdue', 0);
        $finePerHour = 50000;
        $fineAmount = $overdueHours > 0 ? $overdueHours * $finePerHour : 0;

        switch ($rental->status) {
            case Rental::STATUS_ON_RENT:
                $rental->status = Rental::STATUS_WAITING_FOR_CHECK;

                if ($overdueHours > 0) {
                    // Buat record Fine baru
                    $fine = Fine::create([
                        'late_time'   => $overdueHours,
                        'late_amount' => $fineAmount,
                        'damage_type' => null,
                        'damage_amount' => null,
                        'description' => 'Late return fine',
                    ]);

                    // Update rental untuk link ke fine
                    $rental->fine_id = $fine->id;
                }
                break;

            case Rental::STATUS_WAITING_FOR_CHECK:
                // Jika tekan Complete → status jadi completed, jika tidak ada id fine yang terpaut pada id rental tsb
                $rental->status = Rental::STATUS_COMPLETED;
                break;

            default:
                return response()->json(['message' => 'Status tidak valid untuk update'], 400);
        }

        $rental->save();

        return redirect()->back()->with('success', 'Status updated successfully');
    }

    public function updateExtraPayment(Request $request, $id)
    {

        $request->validate([
            'rental_id'    => 'required|exists:rentals,id',
            'damage_type'  => 'required|string',
            'extra_amount' => 'required|numeric|min:0',
            'description'  => 'nullable|string',
        ]);

        $rental = Rental::with('fine')->findOrFail($id);

        if (!$rental->fine) {
            return response()->json([
                'message' => 'No fine record associated with this rental'
            ], 400);
        }

        // Update denda
        $rental->fine->damage_type   = $request->damage_type;
        $rental->fine->damage_amount = $request->extra_amount;
        $rental->fine->description   = $request->description ?? 'Additional charges added by owner';
        $rental->fine->status        = Fine::STATUS_PENDING_PAYMENT;
        $rental->fine->save();

        // Update status rental
        $rental->status = Rental::STATUS_WAITING_FOR_FINES_PAYMENT;
        $rental->save();

        return response()->json([
            'message' => 'Extra payment added successfully',
            'rental'  => $rental->load('fine'),
        ]);
    }
}
