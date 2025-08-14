<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Models\Car;

class WelcomeController extends Controller
{
    public function index()
    {
        $cars = Car::all()->map(function ($car) {
            return [
                'id' => $car->id,
                'brand' => $car->brand->name ?? '-',
                'model' => $car->model->name ?? '-',
                'type' => $car->type->name ?? '-',
                'image_url' => $car->main_image,
                // path_image akan ditambah selanjutanya
                'type_transmisi' => $car->transmission->name ?? '-',
                'fuel_type' => $car->fuelType->name ?? '-',
                'color' => $car->color->name ?? '-',
                'price' => $car->price_per_day,
                'capacity' => $car->capacity,
            ];
        });

        return Inertia::render('Welcome', [
            'cars' => $cars,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }
}
