<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'user_id',
        'amount',
        'payment_method',
        'status',
        'transaction_id',
    ];

    public function rental()
    {
        return $this->belongsTo(Rental::class);
    }
}
