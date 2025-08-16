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
        'car_brand_id',
        'car_model_id',
        'car_type_id',
        'car_color_id',
        'car_fuel_type_id',
        'car_transmission_id',
        'main_image',
        'plate_number',
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

    // cars variable
    public function brand()
    {
        return $this->belongsTo(CarBrand::class, 'car_brand_id');
    }

    public function model()
    {
        return $this->belongsTo(CarModel::class, 'car_model_id');
    }

    public function type()
    {
        return $this->belongsTo(CarType::class, 'car_type_id');
    }

    public function imagePath()
    {
        return $this->hasMany(CarImage::class);
    }

    public function color()
    {
        return $this->belongsTo(CarColor::class, 'car_color_id');
    }

    public function fuelType()
    {
        return $this->belongsTo(CarFuelType::class, 'car_fuel_type_id');
    }

    public function transmission()
    {
        return $this->belongsTo(CarTransmission::class, 'car_transmission_id');
    }
}
