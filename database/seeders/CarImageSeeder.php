<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Car;
use App\Models\CarImage;

class CarImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Car::all()->each(function ($car) {
            $totalImages = rand(2, 4);

            for ($i = 0; $i < $totalImages; $i++) {
                CarImage::create([
                    'car_id'     => $car->id,
                    'image_path' => 'https://picsum.photos/640/480?random=' . rand(1000, 9999),
                ]);
            }
        });
    }
}
