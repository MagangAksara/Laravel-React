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
        'pickup_location_id',
        'payment_id',
        'fine_id',
        'start_date',
        'end_date',
        'total_price',
        'status',
        'cancelled_reason',
    ];

    // daftar status
    const STATUS_PENDING_PAYMENT            = 'pending_payment'; // status awal, kondisi status payment pending
    const STATUS_CONFIRMED_PAYMENT          = 'confirmed_payment'; // kondisi status payment paid
    const STATUS_PAYMENT_RECEIVED           = 'payment_received'; // kondisi status payment settled, status untuk owner memberitahu bahwa pembayaran telah diterima
    const STATUS_EXPIRED                    = 'expired'; // kondisi status payment expired
    const STATUS_CANCELLED                  = 'cancelled'; // kondisi status payment unpaid
    const STATUS_REFUNDED                   = 'refunded'; // kondisi status payment refunded 
    const STATUS_ON_RENT                    = 'on_rent'; // status yang diatur manual, bukan berasal dari status xendit
    const STATUS_WAITING_FOR_CHECK          = 'waiting_for_check'; // status yang diatur manual, bukan berasal dari status xendit
    const STATUS_WAITING_FOR_FINES_PAYMENT  = 'waiting_for_fines_payment'; // status yang diatur manual, bukan berasal dari status xendit
    const STATUS_COMPLETED                  = 'completed'; // status yang diatur manual, bukan berasal dari status xendit
    const STATUS_FAILED                     = 'failed'; // status yang diatur manual, bukan berasal dari status xendit
    // const STATUS_RETURNED                  = 'returned'; // status untuk owner -> diatur manual, tampil saat customer melakukan cencelled

    protected $casts = [
        'start_date'  => 'datetime:Y-m-d H:i:s',
        'end_date'    => 'datetime:Y-m-d H:i:s',
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

    public function pickupLocation()
    {
        return $this->belongsTo(UserAddress::class);
    }

    public function fine()
    {
        return $this->belongsTo(Fine::class);
    }

    public function rentalImages()
    {
        return $this->hasMany(RentalImage::class);
    }
}
