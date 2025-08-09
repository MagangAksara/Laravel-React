<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperReview
 */
class Review extends Model
{
    protected $fillable = [
        'rental_id',
        'user_id',
        'rating',
        'comment',
    ];

    public function rental()
    {
        return $this->belongsTo(Rental::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
