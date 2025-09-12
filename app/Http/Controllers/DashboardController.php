<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Car;
use App\Models\Rental;
use Carbon\Carbon;
use DB;

class DashboardController extends Controller
{
    private function mapCarsCustomer($query, $perPage = 12)
    {
        $cars = $query->paginate($perPage);

        $cars->getCollection()->transform(function ($car) {
            return [
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
                'is_available' => $car->is_available,
                'rentals' => $car->rentals->map(fn($rental) => [
                    'start_date' => $rental->start_date?->toDateTimeString(),
                    'end_date'   => $rental->end_date?->toDateTimeString(),
                    'status'     => $rental->status,
                ]),
                'owner_city' => $car->user?->firstAddress?->city ?? '-',
            ];
        });

        return $cars;
    }

    public function indexCustomer()
    {
        $query = Car::with(['brand','model','type','transmission','fuelType','color','rentals','user.firstAddress']);
        $cars = $this->mapCarsCustomer($query);

        return Inertia::render('Customer/Konten/Dashboard', [
            'cars' => $cars,
        ]);
    }

    public function carsJson(Request $request)
    {
        $page = $request->input('page', 1);
        $query = Car::with(['brand','model','type','transmission','fuelType','color','rentals','user.firstAddress']);

        $cars = $this->mapCarsCustomer($query, 12, $page);

        return response()->json($cars);
    }

    public function indexOwner(Request $request)
    {
        $userId = Auth::id();
        $now = Carbon::now();
        $period = $request->query('period', 'month');

        $name = Auth::user()->name;

        // Total Cars milik user
        $totalCars = Car::where('user_id', $userId)->count();

        // Query dasar
        $baseQuery = Rental::whereHas('car', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        })
            ->whereNotIn('status', [
                Rental::STATUS_EXPIRED,
                Rental::STATUS_CANCELLED,
                Rental::STATUS_REFUNDED,
                Rental::STATUS_FAILED,
            ]);

        if ($period === 'year') {
            $earningData = (clone $baseQuery)->select(
                DB::raw('YEAR(start_date) as year'),
                DB::raw('SUM(total_price) as total')
            )
                ->groupBy('year')
                ->orderByRaw('year ASC')
                ->get();

            $chartData = $earningData->map(function ($data) {
                return [
                    'month' => $data->year,
                    'total' => $data->total,
                    'total_formatted' => 'Rp ' . number_format($data->total, 0, ',', '.'),
                ];
            });
        } else {
            $earningData = (clone $baseQuery)->select(
                DB::raw('MONTH(start_date) as month'),
                DB::raw('YEAR(start_date) as year'),
                DB::raw('SUM(total_price) as total')
            )
                ->groupBy('year', 'month')
                ->orderByRaw('year ASC, month ASC')
                ->get();

            $chartData = $earningData->map(function ($data) {
                return [
                    'month' => Carbon::create($data->year, $data->month, 1)->format('F'),
                    'total' => $data->total,
                    'total_formatted' => 'Rp ' . number_format($data->total, 0, ',', '.'),
                ];
            });
        }

        // Earning bulan ini (pakai clone lagi biar bersih)
        $startOfMonth = $now->copy()->startOfMonth();
        $endOfMonth = $now->copy()->endOfMonth();
        $earning = (clone $baseQuery)
            ->whereBetween('start_date', [$startOfMonth, $endOfMonth])
            ->sum('total_price');

        // On Rent
        $onRent = Rental::whereHas('car', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        })
            ->where('status', Rental::STATUS_ON_RENT)
            ->count();

        // Upcoming
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
        // dd($totalCars, $earning, $onRent, $upcoming, $chartData);

        return Inertia::render('Owner/Konten/Dashboard', [
            'name' => $name,
            'totalCars' => $totalCars,
            'earning' => $earning,
            'onRent' => $onRent,
            'upcoming' => $upcoming,
            'chartData' => $chartData,
            'period' => $period,
        ]);
    }
}
