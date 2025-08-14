<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Rental;
use Inertia\Inertia;

class BookingController extends Controller
{
    private function transform(Rental $rental)
    {
        return [
            'id' => $rental->id,
            // dari relasi
            'brand' => $rental->brand->name ?? '-',
            'model' => $rental->model->name ?? '-',
            'tyoe' => $rental->type->name ?? '-',
            'fuel_type' => $rental->fuelType->name ?? '-',
            'type_transmisi' => $rental->transmission->name ?? '-',
            'thumbnails' => $rental->imagePath->pluck('image_path'),
            // dari rental
            'rental_image' => $rental->main_image,
            'color' => $rental->color->name ?? '-',
            'capacity' => $rental->capacity,
            'year' => $rental->year,
            'description' => $rental->description,
            'price_per_day' => $rental->price_per_day,
            // dari user
            'owner_name' => $rental->user->name ?? '-',
            'owner_picture' => $rental->user->profile_picture ?? '/default-avatar.png',
            'city' => $rental->user->firstAddress->city ?? '-',
            'rating' => $rental->rating ?? 4.5, // Bisa diganti query rating asli
            'reviews' => $rental->reviews_count ?? 1094 // Bisa diganti hitungan review asli
            // dari rental
            // 'start' => 
        ];
    }
    
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
