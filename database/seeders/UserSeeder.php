<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'iizulhaqzaindimad@gmail.com',
            'password' => bcrypt('password'),
            'profile_picture' => 'https://picsum.photos/640/480?random=' . fake()->unique()->numberBetween(1, 1000),
        ]);
        $admin->assignRole('admin');

        $customer = User::create([
            'name' => 'Customer User',
            'email' => 'dimasok025@gmail.com',
            'password' => bcrypt('password'),
            'profile_picture' => 'https://picsum.photos/640/480?random=' . fake()->unique()->numberBetween(1, 1000),
        ]);
        $customer->assignRole('customer');

        $owner = User::create([
            'name' => 'Owner User',
            'email' => 'nukleou@gmail.com',
            'password' => bcrypt('password'),
            'profile_picture' => 'https://picsum.photos/640/480?random=' . fake()->unique()->numberBetween(1, 1000),
        ]);
        $owner->assignRole('owner');
    }
}
