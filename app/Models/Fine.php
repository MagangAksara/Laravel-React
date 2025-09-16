<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fine extends Model
{
    protected $fillable = [
        'payment_id',
        'late_time',
        'late_amount',
        'damage_type',
        'damage_amount',
        'description',
        'status',
    ];

    // status
    const STATUS_WAITING_CHECK              = 'waiting_check'; // status awal, menunggu pengecekan oleh owner
    const STATUS_PENDING_PAYMENT            = 'pending_payment'; // status awal, kondisi status payment pending
    const STATUS_CONFIRMED_PAYMENT          = 'confirmed_payment'; // kondisi status payment paid
    const STATUS_PAYMENT_RECEIVED           = 'payment_received'; // kondisi status payment settled, status untuk owner memberitahu bahwa pembayaran telah diterima

    public function rental()
    {
        return $this->hasOne(Rental::class);
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }

    public function images()
    {
        return $this->hasMany(FineCarImage::class);
    }
}
