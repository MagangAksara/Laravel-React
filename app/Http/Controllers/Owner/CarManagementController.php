<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarManagementController extends Controller
{
     public function index()
    {
        // data dummy dulu, nanti bisa dari DB (Car model)
        $cars = Car::with([
            // 'id',
            'brand', 
            'model', 
            'type', 
            'color', 
            'transmission', 
            'fuelType',
            'user.firstAddress',
        ])->get()->map(function ($car) {
            return [
                'id' => $car->id,
                'brand' => $car->brand->name ?? '-',
                'model' => $car->model->name ?? '-',
                'type' => $car->type->name ?? '-',
                'availability' => $car->is_available ? 'Available' : 'Not Available',
                'photo' => $car->main_image,
                'price_day' => $car->price_per_day,
                'year' => $car->year ?? '-',
                'color' => $car->color->name ?? '-',
                'transmission' => $car->transmission->name ?? '-',
                'fuel' => $car->fuelType->name ?? '-',
                'seat' => $car->capacity ?? '-',
                // user info
                'driver' => $car->user->is_driver ? 'With Driver' : 'Without Driver',
                'driver_fee' => $car->user->is_driver ? $car->user->driver_fee : 0,
                'city' => $car->user->firstAddress->city ?? '-',
            ];
        });

        return Inertia::render('Owner/Konten/CarsManagement', [
            'cars' => $cars
        ]);
    }
}
