<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Services\OpenRouteService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;
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

        $car = Car::with([
            'brand',
            'model',
            'type',
            'user.addresses', // gunakan addresses untuk banyak alamat
        ])->findOrFail($id);

        
        // Owner info
        $ownerId       = $car->user;
        $owner         = ($ownerId && $ownerId->hasRole('owner')) ? $ownerId : null;
        $ownerName     = $owner?->name;
        $ownerPhone     = $owner?->phone_number;
        $isDriver      = (bool) ($owner?->is_driver);
        $ownerAddress  = $owner?->addresses()->where('is_active', true)->first();
        
        // Customer info
        $customer       = Auth::user()->hasRole('customer') ? Auth::user() : null;
        $customerName     = $customer?->name;
        $customerPhone     = $customer?->phone_number;
        $customerAddress  = $customer?->addresses()->get();

        // durasi dihitung langsung dalam view
        // $startDate = $request->filled('start_date')
        //     ? Carbon::parse($request->input('start_date'))
        //     : now();

        // $endDate = $request->filled('end_date')
        //     ? Carbon::parse($request->input('end_date'))
        //     : now()->addDay();

        // // Hitung durasi
        // $diff = $startDate->diff($endDate);
        // $durationFormatted = sprintf(
        //     "%d hari %02d jam %02d menit",
        //     $diff->days,
        //     $diff->h,
        //     $diff->i
        // );

        // Biaya dasar akan ditampilkan langsung lalu dihitung di dalam view
        // $rentalFee = ($diff->days > 0 ? $diff->days : 1) * (int) $car->price_per_day;

        // Biaya driver
        $driverFee = 200000;

        // Biaya pickup akan dihitung langsung di fiew
        // $pickupFee = 0;
        // if ($isDriver && $customerAddress && $ownerAddress) {
        //     $distanceKm = OpenRouteService::getDistanceKm(
        //         $ownerAddress->latitude, $ownerAddress->longitude,
        //         $customerAddress->latitude, $customerAddress->longitude
        //     );
        //     if ($distanceKm !== null) {
        //         $pickupFee = $distanceKm * 3500;
        //     }
        // }

        // Total pembayaran akan dihitung dalam view
        // $totalPayment = $rentalFee + $driverFee + $pickupFee;

        return Inertia::render('Customer/Booking', [
            'car' => [
                'id'            => $car->id,
                'owner_id'      => $car->user_id,
                'owner_name'    => $ownerName,
                'owner_phone'   => $ownerPhone,
                'customer_name' => $customerName,
                'customer_phone'=> $customerPhone,
                'brand'         => $car->brand->name ?? '-',
                'model'         => $car->model->name ?? '-',
                'type'          => $car->type->name ?? '-',
                'price_per_day' => (int) $car->price_per_day,
                'driver_fee'    => (int) $driverFee,
                'is_driver'     => $isDriver,
            ],
            'ownerAddress'       => $ownerAddress,
            'customerAddress'    => $customerAddress,
            'customer_addresses' => Auth::user()->addresses()->get(),
            'csrf_token'         => csrf_token(),
        ]);
    }
}
