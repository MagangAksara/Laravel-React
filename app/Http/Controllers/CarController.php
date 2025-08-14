<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;
use Inertia\Inertia;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::with(['user.address'])
            ->get()
            ->map(fn($car) => $this->transformCar($car));

        return Inertia::render('CarList', [
            'cars' => $cars
        ]);
    }

    public function show($id)
    {
        $car = Car::with(['user.address'])->findOrFail($id);

        return Inertia::render('Customer/CarDetail', [
            'car' => $this->transformCar($car)
        ]);
    }

    private function transformCar(Car $car)
    {
        return [
            'id' => $car->id,
            // dari relasi
            'brand' => $car->brand->name ?? '-',
            'model' => $car->model->name ?? '-',
            'tyoe' => $car->type->name ?? '-',
            'fuel_type' => $car->fuelType->name ?? '-',
            'type_transmisi' => $car->transmission->name ?? '-',
            'thumbnails' => $car->imagePath->pluck('image_path'),
            // dari car
            'car_image' => $car->main_image,
            'color' => $car->color->name ?? '-',
            'capacity' => $car->capacity,
            'year' => $car->year,
            'description' => $car->description,
            'price_per_day' => $car->price_per_day,
            // dari user
            'owner_name' => $car->user->name ?? '-',
            'owner_picture' => $car->user->profile_picture ?? '/default-avatar.png',
            'city' => $car->user->firstAddress->city ?? '-',
            'rating' => $car->rating ?? 4.5, // Bisa diganti query rating asli
            'reviews' => $car->reviews_count ?? 1094 // Bisa diganti hitungan review asli
        ];
    }
}
