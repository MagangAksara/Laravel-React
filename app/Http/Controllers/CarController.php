<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;
use Inertia\Inertia;

class CarController extends Controller
{
    public function show($id)
    {
        // Ambil data mobil berdasarkan ID
        $car = Car::findOrFail($id);

        // Kirim data ke halaman detail mobil
        return Inertia::render('Customer/CarDetail', [
            'car' => $car
        ]);
    }
}
