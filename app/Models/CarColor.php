<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarColor extends Model
{
    protected $fillable = [
        'name',
        'hex_code',
    ];

    public function cars()
    {
        return $this->hasMany(Car::class);
    }
}
