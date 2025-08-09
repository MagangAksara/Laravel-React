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
                'brand' => $car->brand,
                'model' => $car->model,
                'image_url' => $car->car_image,
                'price' => $car->price_per_day,
                'type_transmisi' => $car->type_transmisi,
                'capacity' => $car->capacity,
                'fuel_type' => $car->fuel_type,
            ];
        });

        return Inertia::render('Welcome', [
            'cars' => $cars,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }
}
