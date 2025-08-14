<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarImage extends Model
{
    protected $fillable = [
        'car_id',
        'image_path',
    ];

    public function cars()
    {
        return $this->belongsTo(Car::class);
    }
}
