<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Car;
use App\Models\Rental;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function indexCustomer()
    {
        $cars = Car::with(['brand', 'model', 'type', 'transmission', 'fuelType', 'color', 'rentals', 'user.firstAddress'])
            ->paginate(18);

        // Transform hanya pada data, pagination meta tetap ada
        $cars->getCollection()->transform(function ($car) {
            return [
                // komponen utama
                'id' => $car->id,
                'brand' => $car->brand->name ?? '-',
                'model' => $car->model->name ?? '-',
                'type' => $car->type->name ?? '-',
                'image_url' => $car->main_image,
                'type_transmisi' => $car->transmission->name ?? '-',
                'fuel_type' => $car->fuelType->name ?? '-',
                'color' => $car->color->name ?? '-',
                'capacity' => $car->capacity,
                'price' => $car->price_per_day,
                // komponen filter
                'is_available' => $car->is_available,
                // komponen filter terhubung dengan rental
                'rentals' => $car->rentals->map(function ($rental) {
                    return [
                        'start_date' => $rental->start_date?->toDateTimeString(),
                        'end_date'   => $rental->end_date?->toDateTimeString(),
                        'status'     => $rental->status,
                    ];
                }),
                // komponen filter terhubung dengan user
                'owner_city' => $car->user?->firstAddress?->city ?? '-',
            ];
        });

        // dd($cars);

        return Inertia::render('Customer/Konten/Dashboard', [
            'cars' => $cars,
        ]);
    }

    public function indexOwner()
    {
        $userId = Auth::id();
        $now = Carbon::now();

        $name = Auth::user()->name;

        // Total Cars milik user
        $totalCars = Car::where('user_id', $userId)->count();

        // Total Earning bulan ini (status confirmed_payment)
        $startOfMonth = $now->copy()->startOfMonth();
        $endOfMonth = $now->copy()->endOfMonth();
        $earning = Rental::whereHas('car', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        })
            ->where('status', Rental::STATUS_CONFIRMED_PAYMENT)
            ->whereBetween('start_date', [$startOfMonth, $endOfMonth])
            ->sum('total_price');

        // On Rent (status on_rent)
        $onRent = Rental::whereHas('car', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        })
            ->where('status', Rental::STATUS_ON_RENT)
            ->count();

        // Upcoming booking (ambil 5 teratas)
        $upcoming = Rental::with(['user', 'car'])
            ->whereHas('car', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })
            ->orderBy('start_date', 'asc')
            ->get()
            ->map(function ($rental) {
                return [
                    'customer_name' => $rental->user->name,
                    'profile_picture' => $rental->user->profile_picture ?? 'https://i.pravatar.cc/40',
                    'start_date' => $rental->start_date->format('d F Y H:i'),
                    'status' => $rental->status,
                ];
            });

        // log semua
        // dd($totalCars, $earning, $onRent, $upcoming);

        return Inertia::render('Owner/Konten/Dashboard', [
            'name' => $name,
            'totalCars' => $totalCars,
            'earning' => $earning,
            'onRent' => $onRent,
            'upcoming' => $upcoming,
        ]);
    }
}
