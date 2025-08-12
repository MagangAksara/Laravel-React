<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;

use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\DashboardController;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

Route::get('/choose-role', function () {
    return Inertia::render('Auth/ChooseRole');
})->name('chooseRole');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'role:customer'])->group(function () {
    // Route::middleware('role:customer')->group(function () {
    // Route::get('/dashboard-customer', [DashboardController::class, 'index'])->name('dashboard.customer');
    Route::get('/cars/{id}', [CarController::class, 'show'])->name('cars.show');
});

// Route::middleware(['auth','role:owner'])->group(function () {
    // Route::get('/dashboard-owner', [DashboardController::class, 'indexOwner'])->name('dashboard.owner');
    // Route::get('dashboard', function () {
    //     return Inertia::render('Owner/Dashboard');
    // })->name('dashboard.owner');
// });

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


require __DIR__.'/auth.php';
