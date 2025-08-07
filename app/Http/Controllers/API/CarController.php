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
            'model' => 'required|string|max:255',
            'car_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'plate_number' => 'required|string|unique:cars,plate_number',
            'color' => 'required|string|max:50',
            'type' => 'required|string|max:50', // Added type validation
            'fuel_type' => 'required|string|max:50',
            'type_transmisi' => 'required|string|in:manual,automatic',
            'capacity' => 'required|integer|min:1|max:10',
            'year' => 'required|integer|min:1900|max:' . date('Y'),
            'description' => 'nullable|string|max:500',
            'price_per_day' => 'required|numeric|min:0',
            'is_available' => 'boolean',
        ]);

        $car = Car::create([
            'user_id' => Auth::id(), // Assuming the car is associated with the authenticated user
            'model' => $validated['model'],
            'brand' => $validated['brand'],
            'car_image' => $request->file('car_image') ? $request->file('car_image')->store('cars', 'public') : null,
            'plate_number' => $validated['plate_number'],
            'color' => $validated['color'],
            'type' => $validated['type'], // Added type field
            'fuel_type' => $validated['fuel_type'],
            'type_transmisi' => $validated['type_transmisi'],
            'capacity' => $validated['capacity'],
            'year' => $validated['year'],
            'description' => $validated['description'] ?? null,
            'price_per_day' => $validated['price_per_day'],
            'is_available' => $validated['is_available'] ?? true,
        ]);

        return response()->json(['message' => 'Car created successfully.'], 201);
    }

    public function showAll()
    {
        $cars = Car::all();

        return response()->json($cars, 200);
    }

    public function showByID($id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response()->json(['message' => 'Car not found.'], 404);
        }

        return response()->json($car, 200);
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
