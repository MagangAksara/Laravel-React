<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use App\Models\Rental;
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

        if (!$payment) {
            return response()->json([
                'message' => 'Payment not found'
            ], 400);
        }

        $rental = Rental::create([
            'user_id'     => $userId,
            'car_id'      => $request->car_id,
            'payment_id'  => $payment->id,
            'start_date'  => $request->start_date,
            'end_date'    => $request->end_date,
            'total_price' => $request->total_price,
            // 'status'      => 'pending', // default
        ]);

        return response()->json([
            'message' => 'Rental berhasil dibuat',
            'data'    => $rental
        ], 201);
        
    }

    // public function update(Request $request, Rental $rental)
    // {
    //     // Validate the request data
    //     $validated = $request->validate([
    //         'start_date' => 'sometimes|required|date',
    //         'end_date' => 'sometimes|required|date|after_or_equal:start_date',
    //         'status' => 'sometimes|required|string',
    //     ]);

    //     // Update the rental record
    //     $rental->update($validated);

    //     return response()->json($rental);
    // }

    // public function destroy(Rental $rental)
    // {
    //     // Delete the rental record
    //     $rental->delete();

    //     return response()->json(['message' => 'Rental deleted successfully.']);
    // }   
}
