<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use App\Models\Car;

class WelcomeController extends Controller
{
    public function index()
    {
        $cars = Car::with([
            'brand',
            'model',
            'type',
            'transmission',
            'fuelType',
            'color',
        ])->get()->map(function ($car) {
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

        $userName = Auth::check() ? Auth::user()->name : null;

        return Inertia::render('Welcome', [
            'cars' => $cars,
            'userName' => $userName,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'canLogout' => Route::has('logout'),
        ]);
    }
}
