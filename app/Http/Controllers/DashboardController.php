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
                // komponen utama
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
                // komponen filter
                'is_available' => $car->is_available,
                // komponen filter terhubung dengan rental
                'rentals' => $car->rentals->map(function ($rental) {
                    return [
                        'start_date' => $rental->start_date?->toDateTimeString(),
                        'end_date'   => $rental->end_date?->toDateTimeString(),
                        'status'     => $rental->status,
                    ];
                }),
                // komponen filter terhubung dengan user
                'owner_city' => $car->user?->firstAddress?->city ?? '-',
            ];
        });

        // dd($cars);

        return Inertia::render('Customer/Konten/Dashboard', [
            'cars' => $cars,
        ]);
    }

    public function indexOwner(Request $request)
    {
        return Inertia::render('Owner/Konten/Dashboard');
    }
}
