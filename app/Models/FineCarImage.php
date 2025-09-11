<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FineCarImage extends Model
{
    protected $fillable = [
        'fine_id',
        'image_path',
    ];

    public function fines()
    {
        return $this->belongsTo(Fine::class);
    }
}
