<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;
use Inertia\Inertia;

class CarController extends Controller
{
    // public function showAll()
    // {
    //     $cars = Car::all()->map(function ($car) {
    //         return [
    //             'id' => $car->id,
    //             'name' => "{$car->brand} {$car->model}",
    //             'image_url' => $car->car_image,
    //             'price' => $car->price_per_day,
    //             'transmission' => $car->type_transmisi,
    //             'seats' => $car->capacity,
    //             'fuel' => $car->fuel_type,
    //         ];
    //     });

    //     return Inertia::render('welcome', [
    //         'cars' => $cars,
    //     ]);
    // }


    public function show($id)
    {
        // Logic to retrieve and return a specific car by ID
        return response()->json([
            'message' => "Details of car with ID: $id",
            // 'car' => $car, // Assuming $car is retrieved from a model or service
        ]);
    }
}
