<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

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
            'pickupLocation'
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
                ];
            });

        // dd($rentals);

        return Inertia::render('Customer/Konten/Rental', [
            'rentals' => $rentals,
        ]);
    }

    // public function cancel(Request $request, $id)
    // {
    //     $rental = Rental::where('id', $id)->first();

    //     if (!$rental) {
    //         return response()->json(['error' => 'rental not found'], 404);
    //     }

    //     // ambil request reason
    //     $reason = $request->input('reason', 'No reason provided');

    //     // cek apakah sudah paid/settled
    //     if (!in_array($rental->status, [Rental::STATUS_CONFIRMED_PAYMENT, Rental::STATUS_PAYMENT_RECEIVED])) {
    //         // Belum bayar → cukup cancel rental aja
    //         if ($rental) {
    //             $rental->status = Rental::STATUS_CANCELLED;
    //             $rental->cancelled_reason = $reason;
    //             $rental->save();
    //         }
    //         $rental->status = Rental::STATUS_CANCELLED;
    //         $rental->save();

    //         return back()->with('success', 'Rental cancelled successfully');
    //     }

    //     return back()->withErrors(['error' => 'rental already processed, cannot cancel']);
    // }

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

    public function success()
    {
        return Inertia::render('Customer/Konten/RentalComponent/Modals/Success');
    }

    public function failed()
    {
        return Inertia::render('Customer/Konten/RentalComponent/Modals/Failed');
    }
}
