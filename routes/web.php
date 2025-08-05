<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// API
// use App\Http\Controllers\API\AuthController;

// Route::prefix('api')->group(function () {
//     Route::post('/register', [AuthController::class, 'register']);
//     Route::post('/login', [AuthController::class, 'login']);

//     Route::middleware('auth:sanctum')->group(function () {
//         Route::get('/profile', [AuthController::class, 'profile']);
//         Route::post('/logout', [AuthController::class, 'logout']);
//     });
// });