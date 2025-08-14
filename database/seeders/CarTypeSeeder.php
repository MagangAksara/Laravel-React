<?php

namespace Database\Seeders;

use App\Models\CarType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            'Sedan',
            'Hatchback',
            'MPV',
            'SUV',
            'Crossover',
        ];

        foreach ($types as $a) {
            CarType::create(['name'=>$a]);
        }
    }
}
