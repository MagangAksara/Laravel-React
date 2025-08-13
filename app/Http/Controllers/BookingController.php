<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class BookingController extends Controller
{
    public function show($id)
    {
        // Data dummy - nanti bisa ambil dari DB
        $car = [
            'brand' => 'Toyota',
            'model' => 'Yaris G GR-Sport',
            'duration' => '2 day',
            'price_per_day' => 250000,
            'total_price' => 500000,
            'driver_fee' => 200000,
            'pickup_fee' => 30000,
            'return_fee' => 30000,
            'total_payment' => 760000,
        ];

        $pickup_location = [
            'name' => 'Amelia Putri Safani',
            'phone' => '08962642xxxxx',
            'address' => 'Jl. Panglima Sudirman No.12, Karangploso, Malang'
        ];

        $return_location = [
            'name' => 'Amelia Putri Safani',
            'phone' => '08962642xxxxx',
            'address' => 'Jl. Panglima Sudirman No.12, Karangploso, Malang'
        ];

        $payment_method = 'Mandiri';

        return Inertia::render('Customer/Booking', [
            'car' => $car,
            'pickup_location' => $pickup_location,
            'return_location' => $return_location,
            'payment_method' => $payment_method
        ]);
    }
}
