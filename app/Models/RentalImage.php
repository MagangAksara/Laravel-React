<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RentalImage extends Model
{
    protected $fillable = [
        'rental_id',
        'image_path',
    ];

    public function rentals()
    {
        return $this->belongsTo(Rental::class);
    }
}
