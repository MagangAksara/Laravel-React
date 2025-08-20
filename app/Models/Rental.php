<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperRental
 */
class Rental extends Model
{
    protected $fillable = [
        'user_id',
        'car_id',
        'payment_id',
        'start_date',
        'end_date',
        'total_price',
        'status',
    ];

    protected $casts = [
        'start_date'  => 'date',
        'end_date'    => 'date',
        'total_price' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
