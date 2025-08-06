<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Car;

class CarController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand' => 'required|string|max:255',
            'plate_number' => 'required|string|unique:cars,plate_number',
            'color' => 'required|string|max:50',
            'type' => 'required|string|max:50', // Added type validation
            'price_per_day' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:500',
        ]);

        // Logic to create a new car record in the database
        // ...

        return response()->json(['message' => 'Car created successfully.'], 201);
    }

    public function show(Car $car)
    {
        // Logic to retrieve a specific car by its ID
        return response()->json($car);
    }

    public function update(Request $request, Car $car)
    {
        $validated = $request->validate([
            'brand' => 'sometimes|required|string|max:255',
            'plate_number' => 'sometimes|required|string|unique:cars,plate_number,' . $car->id,
            'color' => 'sometimes|required|string|max:50',
            'type' => 'sometimes|required|string|max:50', // Added type validation
            'price_per_day' => 'sometimes|required|numeric|min:0',
            'description' => 'nullable|string|max:500',
        ]);

        // Logic to update the car record in the database
        // ...

        return response()->json(['message' => 'Car updated successfully.']);
    }

    public function destroy(Car $car)
    {
        // Logic to delete the car record from the database
        $car->delete();

        return response()->json(['message' => 'Car deleted successfully.']);
    }
}
