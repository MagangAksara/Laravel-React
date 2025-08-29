<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Rental;
use Carbon\Carbon;

class UpdateRentalStatus extends Command
{
    protected $signature = 'rentals:update-status';
    protected $description = 'Update rental status jadi on_rent kalau start_date sudah tercapai';

    public function handle()
    {
        $today = Carbon::today();

        $updated = Rental::where('status', 'confirmed_payment')
            ->whereDate('start_date', '<=', $today)
            ->update(['status' => 'on_rent']);

        $this->info("Rental updated: {$updated}");
    }
}

/*
    Cara menggunakannya adalah dengan menuliskan pada terminal perintah
    php artisan rentals:update-status
*/
