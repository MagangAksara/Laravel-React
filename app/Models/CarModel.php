<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarModel extends Model
{
    protected $fillable = [
        'car_brand_id',
        'name',
    ];

    public function cars()
    {
        return $this->hasMany(CarBrand::class);
    }

    public function brand()
    {
        return $this->belongsTo(Car::class);
    }
}
