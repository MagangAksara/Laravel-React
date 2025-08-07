<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CarController;

Route::middleware(['throttle:api'])->group(function () {
    // akses tanpa login
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // butuh otp
    Route::post('/changePass', [AuthController::class, 'changePassword']);

    // role all
    Route::middleware('auth:sanctum')->group(function () {
        // user profile and logout routes
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::post('/update', [AuthController::class, 'update']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });

    // role admin
    Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
        route::get('/showCars', [CarController::class, 'showAll']);
        route::get('/showCars/{id}', [CarController::class, 'showByID']);
        route::post('/addCar', [CarController::class, 'store']);
        route::post('/updateCar/{car}', [CarController::class, 'update']);
        route::post('/deleteCar/{car}', [CarController::class, 'destroy']);
    });
    
    // role owner
    Route::middleware(['auth:sanctum', 'role:owner'])->group(function () {

    });
    
    // role customer
    Route::middleware(['auth:sanctum', 'role:customer'])->group(function () {
        
    });

});