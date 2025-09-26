<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\DistanceController;
use App\Http\Controllers\API\FineController;
use App\Http\Controllers\API\RentalController;
use App\Http\Controllers\API\PaymentController;

Route::middleware(['throttle:api'])->group(function () {

    // Akses tanpa login
    Route::post('/payment/webhook', [PaymentController::class, 'webhook'])->name('payment.webhook');
    Route::post('/payment/{id}/cancel', [PaymentController::class, 'cancel']);
    
    // Akses yang mengahruskan login namun tidak memiliki role tertentu
    Route::middleware('auth:sanctum')->group(function () {
        
        Route::post('/payment/create', [PaymentController::class, 'store'])->name('payment.create');

        Route::post('/calculatePickupFee/{id}', [DistanceController::class, 'calculate'])->name('calculate');

        Route::post('/rental/store', [RentalController::class, 'store'])->name('rental.store');
        // Route::post('/fine/store', [FineController::class, 'update'])->name('fine.store');

        // Akses yang mengahruskan login namun role jelas pada 'rple: ??'
        // Route::middleware(['auth:sanctum', 'role:owner'])->group(function () {
        // });
    });
});
