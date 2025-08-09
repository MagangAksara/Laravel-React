<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CarController;
use App\Http\Controllers\API\RentalController;
use App\Http\Controllers\API\PaymentController;

Route::middleware(['throttle:api'])->group(function () {
    // akses tanpa login
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // butuh otp
    Route::post('/changePass', [AuthController::class, 'changePassword']);

    // role all
    Route::middleware('auth:sanctum')->group(function () {
        // user profile and logout Routes
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::post('/update', [AuthController::class, 'update']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });

    // role admin
    Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
        // Cars
        Route::get('/car', [CarController::class, 'showAll']);
        Route::get('/car/show/{id}', [CarController::class, 'showByID']);
        Route::post('/car/add', [CarController::class, 'store']);
        Route::post('/car/update/{car}', [CarController::class, 'update']);
        Route::post('/car/delete/{car}', [CarController::class, 'destroy']);

        // Rentals
        Route::get('/rental', [RentalController::class, 'show']);

        // Payments
        Route::get('/payment', [PaymentController::class, 'showPayments']);
        Route::post('/payment/create', [PaymentController::class, 'store']);
        Route::post('/payment/notification', [PaymentController::class, 'notification']);
    });
    
    // role owner
    Route::middleware(['auth:sanctum', 'role:owner'])->group(function () {

    });
    
    // role customer
    Route::middleware(['auth:sanctum', 'role:customer'])->group(function () {
        
    });

});