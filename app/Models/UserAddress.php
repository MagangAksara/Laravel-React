<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    protected $table = 'user_addresses';

    protected $fillable = [
        'user_id',
        'city',
        'district',
        'regency',
        'province',
        'postal_code',
        'detail',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
