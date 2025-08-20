<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\VerifyCsrfToken;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

use Spatie\Permission\Middleware\RoleMiddleware;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Spatie\Permission\Middleware\RoleOrPermissionMiddleware;

use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->api(append: [
            EnsureFrontendRequestsAreStateful::class,
            'throttle:api', // Ini sudah merujuk ke 'throttle:api' yang diatur di bawah
            SubstituteBindings::class,
        ]);

        // Ini adalah cara baru dan benar untuk mendefinisikan 'api' throttle
        $middleware->alias([
            'throttle' => ThrottleRequests::class,
            'role' => RoleMiddleware::class,
            'permission' => PermissionMiddleware::class,
            'role_or_permission' => RoleOrPermissionMiddleware::class,
        ]);
    })
    ->withSchedule(function (Illuminate\Console\Scheduling\Schedule $schedule) {
        $schedule->command('rentals:update-status')->everyMinute();
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })
    ->create();
