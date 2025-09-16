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
use App\Http\Controllers\Customer\SearchController;
use App\Http\Controllers\Customer\BookingController;
use App\Http\Controllers\Customer\RentalController;

use Inertia\Inertia;

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

Route::get('/choose-role', function () {
    return Inertia::render('Auth/ChooseRole');
})->name('chooseRole');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        $user = Auth::user();

        if ($user->hasRole('owner')) {
            return redirect()->route('owner.dashboard');
        }

        if ($user->hasRole('customer')) {
            return redirect()->route('customer.dashboard');
        }

        abort(403);
    })->name('dashboard');

    Route::get('/owner/dashboard', [DashboardController::class, 'indexOwner'])->name('owner.dashboard');
    Route::get('/customer/dashboard', [DashboardController::class, 'indexCustomer'])->name('customer.dashboard');
});

Route::middleware(['auth', 'role:customer'])->group(function () {
    Route::get('/cars-json', [DashboardController::class, 'carsJson'])->name('cars.json');
    
    Route::get('/search', [SearchController::class, 'search'])->name('search');
    
    Route::get('/cars/{id}', [CarController::class, 'show'])->name('cars.show');

    Route::get('rental/booking/{id}', [BookingController::class, 'show'])->name('booking');

    Route::get('/rental', [RentalController::class, 'show'])->name('rental');
    Route::get('/rental/success', [RentalController::class, 'show'])->name('rental.success');
    Route::get('/rental/failed', [RentalController::class, 'show'])->name('rental.failed');
    Route::patch('/rental/cancelled/{id}', [RentalController::class, 'cancel'])->name('rental.cancelled');
});

Route::middleware(['auth', 'role:owner'])->group(function () {
    Route::get('/orders', [OrderManagementController::class, 'index'])->name('owner.orders.management');
    Route::patch('/orders/{id}/status', [OrderManagementController::class, 'updateStatus'])->name('rentals.updateStatus');
    Route::post('/orders/{id}/extra-payment', [OrderManagementController::class, 'updateExtraPayment'])->name('rentals.updateExtraPayment');

    Route::get('/cars', [CarManagementController::class, 'index'])->name('owner.cars.management');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/address', [ProfileController::class, 'storeAddress'])->name('address.store');
    Route::put('/profile/address/{id}', [ProfileController::class, 'updateAddress'])->name('address.update');
});

require __DIR__ . '/auth.php';
