<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fine extends Model
{
    protected $fillable = [
        'late_time',
        'late_amount',
        'damage_type',
        'damage_amount',
        'description',
    ];

    public function rental()
    {
        return $this->hasOne(Rental::class);
    }
}
