<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Log;

use App\Models\Car;
use Illuminate\Validation\ValidationException;

class CarController extends Controller
{
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

    private function validateData(Request $request, $carId = null)
    {
        $plateRule = 'required|string|unique:cars,plate_number';

        if ($carId) {
            $plateRule = 'required|string|unique:cars,plate_number,' . $carId . ',id';
        }

        return $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'car_image' => 'nullable',
            'plate_number' => $plateRule,
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
    }

    private function handleCarImage(Request $request)
    {
        $isFile = $request->hasFile('car_image');
        $isUrl  = filter_var($request->input('car_image'), FILTER_VALIDATE_URL);

        if (!$isFile && !$isUrl && $request->has('car_image')) {
            throw ValidationException::withMessages([
                'car_image' => ['Must be an image file or a valid image URL.']
            ]);
        }

        if ($isFile) {
            return $request->file('car_image')->store('cars', 'public');
        } elseif ($isUrl) {
            return $request->input('car_image');
        }

        return null;
    }

    public function store(Request $request)
    {
        $validated = $this->validateData($request);

        $carImage = $this->handleCarImage($request);

        $car = Car::create([
            'user_id' => Auth::id(), // Assuming the car is associated with the authenticated user
            'model' => $validated['model'],
            'brand' => $validated['brand'],
            'car_image' => $carImage,
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

        if ($car) {
            Log::info("Mobil dengan ID {$car->id} telah dibuat.");
            return response()->json(['message' => 'Car created successfully.'], 201);
        } else {
            Log::error("Gagal membuat mobil.");
            return response()->json(['message' => 'Failed to create car.'], 500);
        }
    }

    public function update(Request $request, Car $car)
    {
        $validated = $this->validateData($request, $car->id);

        $carImage = $this->handleCarImage($request);

        if ($carImage !== null) {
            $validated['car_image'] = $carImage;
        }

        $car->update([
            'model' => $validated['model'],
            'brand' => $validated['brand'],
            'car_image' => $carImage,
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

        return response()->json(['message' => 'Car updated successfully.'], 200);
    }

    public function destroy(Car $car)
    {
        // Logic to delete the car record from the database
        $car->delete();

        return response()->json(['message' => 'Car deleted successfully.']);
    }
}
