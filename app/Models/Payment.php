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

    // Daftar status Payment
    const STATUS_PENDING   = 'pending';
    const STATUS_UNPAID    = 'unpaid';
    const STATUS_PAID      = 'paid';
    const STATUS_SETTLED   = 'settled';
    const STATUS_EXPIRED   = 'expired';
    const STATUS_FAILED    = 'failed';
    const STATUS_CANCELLED = 'cancelled';
    const STATUS_REFUNDED  = 'refunded';
   
    public function rental()
    {
        return $this->hasOne(Rental::class, 'payment_id', 'id');
    }
}
