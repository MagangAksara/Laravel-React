<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rental;

class RentalController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'user_id' => 'required|exists:users,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        // Create a new rental record
        $rental = Rental::create($validated);

        return response()->json($rental, 201);
    }

    public function show(Rental $rental)
    {
        // Retrieve a specific rental by its ID
        return response()->json($rental);
    }

    public function update(Request $request, Rental $rental)
    {
        // Validate the request data
        $validated = $request->validate([
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|required|date|after_or_equal:start_date',
            'status' => 'sometimes|required|string',
        ]);

        // Update the rental record
        $rental->update($validated);

        return response()->json($rental);
    }

    public function destroy(Rental $rental)
    {
        // Delete the rental record
        $rental->delete();

        return response()->json(['message' => 'Rental deleted successfully.']);
    }   
}
