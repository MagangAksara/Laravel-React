<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarManagementController extends Controller
{
     public function index()
    {
        // data dummy dulu, nanti bisa dari DB (Car model)
        $cars = [
            [
                'id' => 1,
                'availability' => true,
                'photo' => '/images/cars/toyota-yaris.png',
                'brand' => 'Toyota',
                'model' => 'Yaris',
                'type' => 'G GR-Sport',
                'price_day' => 250000,
                'driver' => 'With Driver',
                'driver_fee' => 250000,
                'year' => 2019,
                'color' => 'Yellow',
                'transmission' => 'Manual',
                'fuel' => 'Gasoline',
                'seat' => 5,
                'city' => 'Malang',
            ],
            [
                'id' => 2,
                'availability' => false,
                'photo' => '/images/cars/honda-civic.png',
                'brand' => 'Honda',
                'model' => 'Civic',
                'type' => 'RS Turbo',
                'price_day' => 300000,
                'driver' => 'Without Driver',
                'driver_fee' => 300000,
                'year' => 2020,
                'color' => 'White',
                'transmission' => 'Automatic',
                'fuel' => 'Gasoline',
                'seat' => 5,
                'city' => 'Malang',
            ],
        ];

        return Inertia::render('Owner/Konten/CarsManagement', [
            'cars' => $cars
        ]);
    }
}
