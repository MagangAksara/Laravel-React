<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run()
    {
        // Buat Role
        $admin    = Role::create(['name' => 'admin']);
        $customer = Role::create(['name' => 'customer']);
        $owner    = Role::create(['name' => 'owner']);

        // Buat Permissions
        $permissions = [
            'manage users',
            'create cars',
            'edit cars',
            'delete cars',
            'rent cars',
            'pay rental',
            'review cars',
            'view all rentals'
        ];

        foreach ($permissions as $perm) {
            Permission::create(['name' => $perm]);
        }

        // Assign permission ke role
        $admin->givePermissionTo(Permission::all());
        $owner->givePermissionTo(['create cars', 'edit cars', 'delete cars', 'view all rentals']);
        $customer->givePermissionTo(['rent cars', 'pay rental', 'review cars']);
    }
}
