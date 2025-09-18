<?php

namespace Database\Factories;

use App\Models\CarBrand;
use App\Models\CarColor;
use App\Models\CarFuelType;
use App\Models\CarImage;
use App\Models\CarModel;
use App\Models\CarTransmission;
use App\Models\CarType;
use Illuminate\Database\Eloquent\Factories\Factory;

use Spatie\Permission\Models\Role;
use Illuminate\Support\Str;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // 'user_id' => User::role('owner')->inRandomOrder()->first()?->Str::uuid(),
            'user_id' => User::role('owner')->inRandomOrder()->first()?->id,

            // Ambil brand dan model dari tabel master
            'car_brand_id'      => CarBrand::inRandomOrder()->first()?->id,
            'car_model_id'      => CarModel::inRandomOrder()->first()?->id,
            'car_type_id'       => CarType::inRandomOrder()->first()?->id,
            // 'car_image_id'       => CarImage::inRandomOrder()->first()?->id,
            'car_fuel_type_id'  => CarFuelType::inRandomOrder()->first()?->id,
            'car_transmission_id' => CarTransmission::inRandomOrder()->first()?->id,
            'car_color_id'      => CarColor::inRandomOrder()->first()?->id,

            // 'brand' => $this->faker->randomElement(['Toyota', 'Honda', 'Suzuki', 'Daihatsu', 'Mitsubishi']),
            // 'model' => $this->faker->word(),
            // 'type' => $this->faker->randomElement(['SUV', 'Sedan', 'MPV', 'Hatchback']),
            // 'car_image' => 'https://picsum.photos/640/480?random=' . fake()->unique()->numberBetween(1, 1000),
            // 'fuel_type' => $this->faker->randomElement(['Petrol', 'Diesel', 'Electric', 'Hybrid']),
            // 'type_transmisi' => $this->faker->randomElement(['manual', 'automatic']),
            // 'color' => $this->faker->safeColorName(),

            'main_image' => 'https://picsum.photos/640/480?random=' . fake()->unique()->numberBetween(1, 1000),
            
            'plate_number' => strtoupper($this->faker->bothify('?? #### ??')),
            'capacity' => $this->faker->numberBetween(2, 7),
            'year' => $this->faker->year(),
            'description' => $this->faker->paragraph(),
            'price_per_day' => $this->faker->numberBetween(100000, 1000000), // harga sewa per hari
            'is_available' => $this->faker->boolean(80), // 80% kemungkinan tersedia
            'rule_before_booking' => $this->faker->paragraph(),
            'rule_after_booking' => $this->faker->paragraph(),
            'rule_during_pickup' => $this->faker->paragraph(),
            'rule_before_pickup' => $this->faker->paragraph(),
            'rule_at_pickup' => $this->faker->paragraph(),
            'rule_usage' => $this->faker->paragraph(),
            'rule_return' => $this->faker->paragraph(),
            'rule_overtime' => $this->faker->paragraph(),
        ];
    }
}
