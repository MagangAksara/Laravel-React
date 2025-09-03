<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\Payment;
use App\Models\Rental;
use Carbon\Carbon;
use Inertia\Response;
use Inertia\Inertia;

class OrderManagementController extends Controller
{
    // public function index()
    // {
    //     return Inertia::render('Owner/Konten/OrdersManagement');
    // }

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

    public function index(Request $request)
    {
        $userId = Auth::id();
        $orders = Rental::with([
            'payment',
            'car.brand',
            'car.model',
            'car.type',
            'car.imagePath',
            'user',
            'user.firstAddress',
        ])
            ->whereHas('car.user', function ($query) use ($userId) {
                $query->where('id', $userId);
            })
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
                ];
            });

        return Inertia::render('Owner/Konten/OrdersManagement', [
            'orders' => $orders,
        ]);
    }

    /* 
        fungsi untuk update status jika
        1. button finish di tekan maka status menjadi waiting_for_check dari yang sebelumnya on_rent
        2. button complete di tekan maka status menjadi completed dari yang sebelumnya waiting_for_check
    */
    public function updateStatus(Request $requet, $id)
    {
        $rental = Rental::findOrFail($id);

        switch ($rental->status) {
            case Rental::STATUS_ON_RENT:
                // Jika tekan Finish → status jadi waiting_for_check
                $rental->status = Rental::STATUS_WAITING_FOR_CHECK;
                break;

            case Rental::STATUS_WAITING_FOR_CHECK:
                // Jika tekan Complete → status jadi completed
                $rental->status = Rental::STATUS_COMPLETED;
                break;

            default:
                return response()->json(['message' => 'Status tidak valid untuk update'], 400);
        }

        $rental->save();

        return redirect()->back()->with('success', 'Status updated successfully');
    }
    

    
}
