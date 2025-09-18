<?php

namespace Database\Seeders;

use App\Models\CarColor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data warna mobil dan kode hex-nya
        $colors = [
            ['name' => 'White', 'hex_code' => '#FFFFFF'],
            ['name' => 'Black', 'hex_code' => '#000000'],
            ['name' => 'Silver', 'hex_code' => '#C0C0C0'],
            ['name' => 'Gray', 'hex_code' => '#808080'],
            ['name' => 'Red', 'hex_code' => '#FF0000'],
            ['name' => 'Blue', 'hex_code' => '#0000FF'],
            ['name' => 'Green', 'hex_code' => '#008000'],
            ['name' => 'Yellow', 'hex_code' => '#FFFF00'],
            ['name' => 'Orange', 'hex_code' => '#FFA500'],
            ['name' => 'Brown', 'hex_code' => '#A52A2A'],
            ['name' => 'Maroon', 'hex_code' => '#800000'],
            ['name' => 'Navy', 'hex_code' => '#000080'],
        ];

        // Masukkan data ke dalam tabel 'car_colors' menggunakan model
        foreach ($colors as $color) {
            CarColor::create([
                'name' => $color['name'],
                'hex_code' => $color['hex_code'],
            ]);
        }
    }
}
