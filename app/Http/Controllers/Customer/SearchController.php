<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Car;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('q'); // dari debounce React

        $cars = Car::with('brand', 'model', 'type')
            ->whereHas('brand', function ($q) use ($query) {
                $q->where('name', 'LIKE', "%{$query}%");
            })
            ->orWhereHas('model', function ($q) use ($query) {
                $q->where('name', 'LIKE', "%{$query}%");
            })
            ->orWhereHas('type', function ($q) use ($query) {
                $q->where('name', 'LIKE', "%{$query}%");
            })
            ->limit(10) // biar gak berat
            ->get();

        return response()->json(
            $cars->map(function ($car) {
                return [
                    'id' => $car->id,
                    'brand' => $car->brand?->name,
                    'model' => $car->model?->name,
                    'type' => $car->type?->name,
                    'main_image' => $car->main_image,
                    'price_per_day' => $car->price_per_day,
                    'is_available' => $car->is_available,
                ];
            })
        );
    }
}
