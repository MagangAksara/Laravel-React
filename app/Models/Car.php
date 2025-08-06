<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = [
        'user_id',
        'brand',
        'model',
        'plate_number',
        'color',
        'type',
        'fuel_type',
        'type_transmisi',
        'capacity',
        'year',
        'description',
        'price_per_day',
        'is_available',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function rentals()
    {
        return $this->hasMany(Rental::class);
    }
}
