<?php

namespace Database\Seeders;

use App\Models\CarTransmission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarTransmissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $transmissions = [
            'Manual',
            'Automatic',
            'CVT',
            'DCT',
            'AMT',
        ];

        foreach ($transmissions as $a) {
            CarTransmission::create(['name'=>$a]);
        }
    }
}
