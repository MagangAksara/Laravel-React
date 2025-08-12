<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Car;

class DashboardController extends Controller
{
    public function indexCustomer()
    {
        $cars = Car::all()->map(function ($car) {
            return [
                'id' => $car->id,
                'brand' => $car->brand,
                'model' => $car->model,
                'image_url' => $car->car_image,
                'price' => $car->price_per_day,
                'type_transmisi' => $car->type_transmisi,
                'capacity' => $car->capacity,
                'fuel_type' => $car->fuel_type,
            ];
        });

        return Inertia::render('Customer/Dashboard', [
            'cars' => $cars,
        ]);
    }
    public function indexOwner()
    {
        return Inertia::render('Owner/Dashboard');
    }
}
