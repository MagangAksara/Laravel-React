<?php

namespace Database\Seeders;

use App\Models\CarBrand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarBrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            'Toyota',
            'Honda',
            'Suzuki',
            'Daihatsu',
            'Mitsubishi',
        ];

        foreach ($brands as $brand) {
            CarBrand::create(['name'=>$brand]);
        }
    }
}
