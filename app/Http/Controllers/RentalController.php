<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Rental;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;

class RentalController extends Controller
{
    public function show(Request $request)
    {
        $rentals = Rental::with([
                'payment',
                'car.brand',
                'car.model',
                'car.type',
            ])
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($rental) {
                $duration = $rental->start_date->diffInDays($rental->end_date) ?: 1;

                return [
                    'id' => $rental->id,
                    'booking_id' => 'BK' . $rental->created_at->format('Ymd') . '-' . $rental->id,
                    'date' => $rental->created_at->format('d F Y'),

                    // ambil status dari payment
                    'url_payment' => $rental->payment->checkout_link ?? null,
                    'status' => $rental->payment->status ?? 'unpaid',
                    'statusLabel' => $this->mapStatusLabel($rental->payment->status ?? 'unpaid'),

                    // data mobil dari relasi
                    'car' => [
                        'brand' => $rental->car->brand->name ?? 'Unknown',
                        'model' => $rental->car->model->name ?? '',
                        'type'  => $rental->car->type->name ?? '',
                        'image' => $rental->car->main_image 
                            ? asset('storage/' . $rental->car->main_image) 
                            : '/images/default-car.png',
                    ],

                    // durasi & harga
                    'duration' => $duration,
                    'price' => $rental->total_price / $duration,
                    'totalPayment' => $rental->total_price,
                ];
            });

        // dd($rentals);

        // $payment = Payment::with()'payment')->get();

        // dd($payment);

        return Inertia::render('Customer/Rental', [
            'rentals' => $rentals,
        ]);
    }


    private function mapStatusLabel($status)
    {
        return match ($status) {
            'pending_payment' => 'Pending Payment',
            'confirmed_payment' => 'Confirmed Payment',
            'on_rent' => 'On Rent',
            'waiting_for_check' => 'Waiting for Check',
            'waiting_for_fines_payment' => 'Waiting for Fines Payment',
            'completed' => 'Completed',
            'cancelled' => 'Cancelled',
            'expired' => 'Expired',
            default => ucfirst($status),
        };
    }
    
    public function success()
    {
        return Inertia::render('Customer/RentalComponent/Success');
    }

    public function failed()
    {
        return Inertia::render('Customer/RentalComponent/Failed');
    }

    
}
