<?php

namespace Database\Seeders;

use App\Models\CarBrand;
use App\Models\CarModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $models = [
            'Toyota' => ['Corolla', 'Camry', 'Avanza', 'Fortuner'],
            'Honda' => ['Civic', 'Jazz', 'CR-V', 'HR-V'],
            'Suzuki' => ['Ertiga', 'Swift', 'XL7'],
            'Daihatsu' => ['Xenia', 'Terios', 'Ayla'],
            'Mitsubishi' => ['Pajero', 'Xpander', 'Outlander'],
        ];

        foreach ($models as $brandName => $modelList) {
            $brand = CarBrand::where('name', $brandName)->first();

            if ($brand) {
                foreach ($modelList as $modelName) {
                    CarModel::create([
                        'car_brand_id' => $brand->id,
                        'name'     => $modelName
                    ]);
                }
            }
        }
    }
}
