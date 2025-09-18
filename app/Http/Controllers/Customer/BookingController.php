<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Services\OpenRouteService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\Car;
use App\Models\Rental;

use Carbon\Carbon;
use Inertia\Inertia;
use Xendit\Customer\Customer;

class BookingController extends Controller
{
    public function show(Request $request, $id)
    {
        // Validasi input tanggal
        $request->validate([
            'start_date' => 'nullable|date|after_or_equal:today',
            'end_date'   => 'nullable|date|after:start_date',
        ]);

        $rental = null;
        $blockedRange = null;

        $car = Car::with([
            'brand',
            'model',
            'type',
            'user',
            'user.addresses',
        ])->findOrFail($id);

        // untuk me
        if (!$car->is_available) {
            // ambil rental aktif terkait mobil ini
            $rental = Rental::where('car_id', $car->id)
                // ->whereNull('returned_at') // kalau ada kolom returned
                // ->orWhere('status', 'ongoing') // sesuaikan kalau ada status
                ->latest('start_date')
                ->first();

            if ($rental) {
                $start = Carbon::parse($rental->start_date)->subWeek()->subDay();
                $end   = Carbon::parse($rental->end_date)->addWeek()->addDay();

                $blockedRange = [
                    'start' => $start->toIso8601String(),
                    'end'   => $end->toIso8601String(),
                ];
            }
        }

        $priceDay = $car->price_per_day;

        // Owner info
        $ownerId       = $car->user;
        $owner         = ($ownerId && $ownerId->hasRole('owner')) ? $ownerId : null;
        $ownerPict     = $owner?->profile_picture ?? 'default.png'; // Ganti dengan gambar default jika tidak ada
        $ownerName     = $owner?->name;
        $ownerPhone     = $owner?->phone_number;
        $isDriver      = (bool) ($owner?->is_driver);
        $ownerAddress  = $owner?->addresses()->where('is_active', true)->get();

        // Customer info
        $customer       = Auth::user()->hasRole('customer') ? Auth::user() : null;
        $customerName     = $customer?->name;
        $customerPhone     = $customer?->phone_number;
        $customerAddress  = $customer?->addresses()->get();
        $customerEmail    = $customer?->email;
        

        // durasi dihitung langsung dalam view

        // Biaya dasar akan ditampilkan langsung lalu dihitung di dalam view

        // Biaya driver
        $driverFee = 200000;

        // Biaya pickup akan dihitung langsung di view

        // Total pembayaran akan dihitung dalam view

        return Inertia::render('Customer/Konten/Booking', [
            'car' => [
                'id'            => $car->id,
                'owner_id'      => $car->user_id,
                'owner_pict'    => $ownerPict,
                'owner_name'    => $ownerName,
                'owner_phone'   => $ownerPhone,
                'customer_name' => $customerName,
                'customer_phone' => $customerPhone,
                'brand'         => $car->brand->name ?? '-',
                'model'         => $car->model->name ?? '-',
                'type'          => $car->type->name ?? '-',
                'price_per_day' => $priceDay,
                'driver_fee'    => $driverFee,
                'is_driver'     => $isDriver,
            ],
            'blockedRange'      => $blockedRange,
            'ownerAddress'       => $ownerAddress,
            'customerEmail'      => $customerEmail,
            'customerAddress'    => $customerAddress,
            'csrf_token'         => csrf_token(),
        ]);
    }
}
