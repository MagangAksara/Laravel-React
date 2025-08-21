<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Car;

class DashboardController extends Controller
{
    public function indexCustomer()
    {
        $cars = Car::paginate(18);

        // Transform hanya pada data, pagination meta tetap ada
        $cars->getCollection()->transform(function ($car) {
            return [
                'id' => $car->id,
                'brand' => $car->brand->name ?? '-',
                'model' => $car->model->name ?? '-',
                'type' => $car->type->name ?? '-',
                'image_url' => $car->main_image,
                'type_transmisi' => $car->transmission->name ?? '-',
                'fuel_type' => $car->fuelType->name ?? '-',
                'color' => $car->color->name ?? '-',
                'capacity' => $car->capacity,
                'price' => $car->price_per_day,
            ];
        });

        // dd($cars);

        return Inertia::render('Customer/Konten/Dashboard', [
            'cars' => $cars,
        ]);
    }

    public function indexOwner()
    {
        return Inertia::render('Owner/Konten/Dashboard');
    }
}
