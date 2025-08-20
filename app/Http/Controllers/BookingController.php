<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Rental;
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
            'user.addresses',
        ])->findOrFail($id);

        $priceDay = $car->price_per_day;
        
        // Owner info
        $ownerId       = $car->user;
        $owner         = ($ownerId && $ownerId->hasRole('owner')) ? $ownerId : null;
        $ownerPict     = $owner?->profile_picture ?? 'default.png'; // Ganti dengan gambar default jika tidak ada
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

        // Biaya dasar akan ditampilkan langsung lalu dihitung di dalam view

        // Biaya driver
        $driverFee = 200000;

        // Biaya pickup akan dihitung langsung di view

        // Total pembayaran akan dihitung dalam view

        return Inertia::render('Customer/Booking', [
            'car' => [
                'id'            => $car->id,
                'owner_id'      => $car->user_id,
                'owner_pict'    => $ownerPict,
                'owner_name'    => $ownerName,
                'owner_phone'   => $ownerPhone,
                'customer_name' => $customerName,
                'customer_phone'=> $customerPhone,
                'brand'         => $car->brand->name ?? '-',
                'model'         => $car->model->name ?? '-',
                'type'          => $car->type->name ?? '-',
                'price_per_day' => $priceDay,
                'driver_fee'    => $driverFee,
                'is_driver'     => $isDriver,
            ],
            'ownerAddress'       => $ownerAddress,
            'customerAddress'    => $customerAddress,
            'customer_addresses' => Auth::user()->addresses()->get(),
            'csrf_token'         => csrf_token(),
        ]);
    }

    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'car_id' => 'required|exists:cars,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
        ]);

        $rental = Rental::create([
            'user_id' => Auth::id(),
            'car_id' => $request->car_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'total_price' => 0, // Akan dihitung kemudian
            'status' => 'pending',
        ]);

        return redirect()->route('bookings.show', $rental->id);
    }
}
