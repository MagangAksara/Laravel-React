<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use Spatie\Permission\Models\Role;
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
            'user_id' => User::role('owner')->inRandomOrder()->first()?->id,
            'brand' => $this->faker->randomElement(['Toyota', 'Honda', 'Suzuki', 'Daihatsu', 'Mitsubishi']),
            'model' => $this->faker->word(),
            'car_image' => 'https://picsum.photos/640/480?random=' . fake()->unique()->numberBetween(1, 1000),
            'plate_number' => strtoupper($this->faker->bothify('?? #### ??')),
            'color' => $this->faker->safeColorName(),
            'type' => $this->faker->randomElement(['SUV', 'Sedan', 'MPV', 'Hatchback']),
            'fuel_type' => $this->faker->randomElement(['Petrol', 'Diesel', 'Electric', 'Hybrid']),
            'type_transmisi' => $this->faker->randomElement(['manual', 'automatic']),
            'capacity' => $this->faker->numberBetween(2, 7),
            'year' => $this->faker->year(),
            'description' => $this->faker->paragraph(),
            'price_per_day' => $this->faker->randomFloat(2, 100000, 1000000), // harga sewa per hari
            'is_available' => $this->faker->boolean(80), // 80% kemungkinan tersedia
        ];
    }
}
