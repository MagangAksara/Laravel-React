<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperPayment
 */
class Payment extends Model
{
    protected $fillable = [
        'external_id',
        'xendit_payment_id',
        'payer_email',
        'payment_method',
        'status',
        'checkout_link',
        'paid_at',
        'description',
    ];

    protected $casts = [
        'paid_at' => 'datetime',
    ];

    public function rental()
    {
        return $this->hasOne(Rental::class, 'payment_id', 'id');
    }
}
