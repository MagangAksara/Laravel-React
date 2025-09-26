<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Fine;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\Payment;
use App\Models\Rental;

use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class RentalController extends Controller
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

    public function show(Request $request)
    {
        $rentals = Rental::with([
            'payment',
            'car.brand',
            'car.model',
            'car.type',
            'car.imagePath',
            'user',
            'user.firstAddress',
            'pickupLocation',
            'fine',
            'fine.images',
        ])
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
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
                    $parts[] = $days . ' day' . ($days > 1 ? 's' : '');
                }
                if ($hours > 0) {
                    $parts[] = $hours . ' hour' . ($hours > 1 ? 's' : '');
                }
                if ($mins > 0) {
                    $parts[] = $mins . ' minute' . ($mins > 1 ? 's' : '');
                }

                $durationLabel = implode(' ', $parts);

                // jika semua 0, misalnya tampilkan "0 minute"
                if (empty($durationLabel)) {
                    $durationLabel = '0 minute';
                }
                // pickup location
                $pickupLocation = $rental->pickupLocation
                    ? [
                        'city'   => $rental->pickupLocation->city ?? '-',
                        'detail' => $rental->pickupLocation->detail ?? '-',
                    ]
                    : [
                        'city'   => $rental->user->firstAddress->city ?? '-',
                        'detail' => $rental->user->firstAddress->detail ?? '-',
                    ];

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
                    'pickup_location' => $pickupLocation,

                    // data user
                    'name' => $rental->user->name ?? '-',
                    'email' => $rental->user->email ?? '-',
                    'phone' => $rental->user->phone_number ?? '-',
                    'city' => $rental->user->firstAddress->city ?? '-',

                    // data owner cars
                    'carUserImage' => $rental->car->user->profile_picture ?? null,
                    'carUserName' => $rental->car->user->name ?? '-',
                    'carUserCity' => $rental->car->user->firstAddress->city ?? '-',

                    // fine penalty
                    "fine_id" => $rental->fine->id ?? null,
                    "overtime" => $rental->fine->late_time ?? 0,
                    "overtime_amount" => $rental->fine->late_amount ?? 0,
                    'damage_type' => $rental->fine->damage_type ?? null,
                    'damage_amount' => $rental->fine->damage_amount ?? 0,
                    'total_fine' => ($rental->fine->late_amount ?? 0) + ($rental->fine->damage_amount ?? 0),
                    'methodFinePayment' => $rental->fine->payment->payment_method ?? 'HAVE NOT MADE PAYMENT',
                    'imgFine_path' => $rental->fine?->images?->pluck('image_path')->toArray() ?? [],
                ];
            });

        // dd($rentals);

        return Inertia::render('Customer/Konten/Rental', [
            'rentals' => $rentals,
        ]);
    }

    public function cancel(Request $request, $rentalId)
    {
        $rental = Rental::with('payment')->find($rentalId);

        if (!$rental) {
            return back()->withErrors(['error' => 'Rental not found']);
        }

        $payment = $rental->payment;
        $reason  = $request->input('reason', 'No reason provided');

        // Jika payment belum paid/settled → boleh cancel
        if ($payment && !in_array($payment->status, [Payment::STATUS_PAID, Payment::STATUS_SETTLED])) {
            $payment->status = Payment::STATUS_CANCELLED;
            $payment->save();
        }

        // Update rental
        if (!in_array($rental->status, [Rental::STATUS_CONFIRMED_PAYMENT, Rental::STATUS_PAYMENT_RECEIVED])) {
            $rental->status = Rental::STATUS_CANCELLED;
            $rental->cancelled_reason = $reason;
            $rental->save();

            return back()->with('success', 'Rental cancelled successfully');
        }

        return back()->withErrors(['error' => 'Payment already processed, cannot cancel']);
    }

    public function updateForFine(Request $request, $id)
    {
        $rental = Rental::with('fine')->findOrFail($id);

        switch ($rental->status) {
            case Rental::STATUS_WAITING_FOR_FINES_PAYMENT:
                if ($rental->fine && $rental->fine->status === Fine::STATUS_PENDING_PAYMENT) {
                    // ✅ update status rental
                    $rental->status = Rental::STATUS_COMPLETED;
                    $rental->save();

                    // ✅ update status fine
                    $rental->fine->status = Fine::STATUS_CONFIRMED_PAYMENT;

                    // ✅ set payment_id baru
                    $payment = Payment::latest()->first();
                    if ($payment) {
                        $rental->fine->payment_id = $payment->id;
                    }

                    $rental->fine->save();
                } else {
                    return response()->json(['message' => 'Cannot complete rental with unpaid fines'], 400);
                }
                break;

            default:
                return response()->json(['message' => 'Status tidak valid untuk update'], 400);
        }

        // debug
        Log::info("Rental ID: {$rental->id}, Payment ID: {$rental->fine->payment_id}, New Status: {$rental->status}, Fine Status: {$rental->fine->status}");

        return response()->json(['message' => 'Status updated successfully']);
    }

    public function uploadImgWhileStatusOnRent(Request $request, $id)
    {
        Log::info('Upload images request received', $request->all());

        $rental = Rental::with('rentalImages')->findOrFail($id);

        if ($rental->status !== Rental::STATUS_ON_RENT) {
            return response()->json(['message' => 'Can only upload images when status is on_rent'], 400);
        }

        if ($request->hasFile('images')) {
            $uploadedPaths = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('rental_images', 'public');
                $uploadedPaths[] = $path;

                // Simpan ke rentalImages
                $rental->rentalImages()->create([
                    'image_path' => $path,
                ]);
            }

            return response()->json(['message' => 'Images uploaded successfully', 'paths' => $uploadedPaths]);
        }

        return response()->json(['message' => 'No images uploaded'], 400);
    }

    public function success()
    {
        return Inertia::render('Customer/Konten/RentalComponent/Modals/Success');
    }

    public function failed()
    {
        return Inertia::render('Customer/Konten/RentalComponent/Modals/Failed');
    }
}
