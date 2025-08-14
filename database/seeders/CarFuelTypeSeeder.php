<?php

namespace Database\Seeders;

use App\Models\CarFuelType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarFuelTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fuelTypes = [
            'Solar',
            'Pertamax',
            'Pertalite',
            'Baterai',
        ];

        foreach ($fuelTypes as $a) {
            CarFuelType::create(['name'=>$a]);
        }
    }
}
