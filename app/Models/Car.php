<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @mixin IdeHelperCar
 */
class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'brand',
        'model',
        'car_image',
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
