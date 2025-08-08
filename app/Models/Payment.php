<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'rental_id',
        'external_id',
        'xendit_payment_id',
        'payer_email',
        'payment_method',
        'status',
        'checkout_link',
        'paid_at',
        'description',
    ];

    public function rental()
    {
        return $this->belongsTo(Rental::class);
    }
}
