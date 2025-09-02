<?php

use App\Http\Controllers\API\PaymentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;

use App\Http\Controllers\Owner\CarManagementController;
use App\Http\Controllers\Owner\OrderManagementController;

use App\Http\Controllers\Customer\CarController;
use App\Http\Controllers\Customer\BookingController;
use App\Http\Controllers\Customer\RentalController;

use Inertia\Inertia;

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

Route::get('/choose-role', function () {
    return Inertia::render('Auth/ChooseRole');
})->name('chooseRole');

Route::middleware('auth')->get('/dashboard', function () {
    $user = Auth::user();

    if ($user->hasRole('owner')) {
        return app(DashboardController::class)->indexOwner();
    }

    if ($user->hasRole('customer')) {
        return app(DashboardController::class)->indexCustomer();
    }

    abort(403);
})->name('dashboard');

Route::middleware(['auth', 'role:customer'])->group(function () {
    Route::get('/cars/{id}', [CarController::class, 'show'])->name('cars.show');

    Route::get('rental/booking/{id}', [BookingController::class, 'show'])->name('booking');

    Route::get('/rental', [RentalController::class, 'show'])->name('rental');
    Route::get('/rental/success', [RentalController::class, 'show'])->name('rental.success');
    Route::get('/rental/failed', [RentalController::class, 'show'])->name('rental.failed');
});

Route::middleware(['auth', 'role:owner'])->group(function () {
    Route::get('/cars', [CarManagementController::class, 'index'])->name('owner.cars.management');
    Route::get('/orders', [OrderManagementController::class, 'index'])->name('owner.orders.management');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/address', [ProfileController::class, 'storeAddress'])->name('address.store');
    Route::put('/profile/address/{id}', [ProfileController::class, 'updateAddress'])->name('address.update');
});

require __DIR__ . '/auth.php';
