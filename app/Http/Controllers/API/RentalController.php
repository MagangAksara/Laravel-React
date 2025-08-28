<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use App\Models\Rental;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class RentalController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'car_id'       => 'required|exists:cars,id',
            'start_date'   => 'required|date',
            'end_date'     => 'required|date|after:start_date',
            'total_price'  => 'required|numeric|min:1000',
        ]);

        $userId = Auth::id();

        $payment = Payment::latest()->first();

        $startDate = Carbon::parse($request->start_date)->format('Y-m-d H:i:s');
        $endDate   = Carbon::parse($request->end_date)->format('Y-m-d H:i:s');

        if (!$payment) {
            return response()->json([
                'message' => 'Payment not found'
            ], 400);
        }

        $rental = Rental::create([
            'user_id'     => $userId,
            'car_id'      => $request->car_id,
            'payment_id'  => $payment->id,
            'start_date'  => $startDate,
            'end_date'    => $endDate,
            'total_price' => $request->total_price,
        ]);

        return response()->json([
            'message' => 'Rental berhasil dibuat',
            'data'    => $rental
        ], 201);
    }
}
