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

        // 1. Update confirmed_payment → on_rent
        $onRent = Rental::where('status', Rental::STATUS_CONFIRMED_PAYMENT)
            ->whereDate('start_date', '<=', $today)
            ->update(['status' => Rental::STATUS_ON_RENT]);

        // 2. Update pending_payment → expired
        $expired = Rental::where('status', Rental::STATUS_PENDING_PAYMENT)
            ->whereDate('created_at', '<', $today)
            ->update(['status' => Rental::STATUS_EXPIRED]);

        $this->info("Rental updated: on_rent={$onRent}, expired={$expired}");
    }
}

/*
    Cara menggunakannya adalah dengan menuliskan pada terminal perintah
    php artisan schedule:work
*/
