<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\CarBrand;
use App\Models\CarModel;
use App\Models\CarType;
use Illuminate\Http\Request;
use Inertia\Inertia;


class CarManagementController extends Controller
{
    public function index()
    {
        // data dummy dulu, nanti bisa dari DB (Car model)
        $cars = Car::with([
            // 'id',
            'brand',
            'model',
            'type',
            'color',
            'transmission',
            'fuelType',
            'user.firstAddress',
        ])->get()->map(function ($car) {
            return [
                'id' => $car->id,
                'plate_number' => $car->plate_number,
                'brand' => $car->brand->name ?? '-',
                'model' => $car->model->name ?? '-',
                'type' => $car->type->name ?? '-',
                'availability' => $car->is_available ? 'Available' : 'Not Available',
                'photo' => $car->main_image,
                'price_day' => $car->price_per_day,
                'year' => $car->year ?? '-',
                'color' => $car->color->name ?? '-',
                'transmission' => $car->transmission->name ?? '-',
                'fuel' => $car->fuelType->name ?? '-',
                'seat' => $car->capacity ?? '-',
                // user info
                'driver' => $car->user->is_driver ? 'With Driver' : 'Without Driver',
                'driver_fee' => $car->user->is_driver ? $car->user->driver_fee : 0,
                'city' => $car->user->firstAddress->city ?? '-',
            ];
        });

        //  ambil semua brand untuk dropdown
        $brands = CarBrand::all();

        return Inertia::render('Owner/Konten/CarsManagement', [
            'cars' => $cars,
            'brands' => $brands,
        ]);
    }


    public function show($id)
    {
        $car = Car::with([
            'brand',
            'model',
            'type',
            'color',
            'transmission',
            'fuelType',
            'user.firstAddress',
        ])->findOrFail($id);

        // format data untuk dikirim ke frontend
        $carData = [
            'id' => $car->id,
            'plate_number' => $car->plate_number,
            'brand' => $car->brand->name ?? '-',
            'model' => $car->model->name ?? '-',
            'type' => $car->type->name ?? '-',
            'availability' => $car->is_available ? 'Available' : 'Not Available',
            'photo' => $car->main_image,
            'price_day' => $car->price_per_day,
            'year' => $car->year ?? '-',
            'color' => $car->color->name ?? '-',
            'transmission' => $car->transmission->name ?? '-',
            'fuel' => $car->fuelType->name ?? '-',
            'seat' => $car->capacity ?? '-',
            'driver' => $car->user->is_driver ? 'With Driver' : 'Without Driver',
            'driver_fee' => $car->user->is_driver ? $car->user->driver_fee : 0,
            'city' => $car->user->firstAddress->city ?? '-',
        ];

        $brands = CarBrand::query()
            ->select('id', 'name')->get();
        $models = CarModel::query()
            ->select('id', 'car_brand_id', 'name')
            ->get();

        // dd($carData, $brands,$models);

        return Inertia::render('Owner/Konten/CarsManagement/ViewDetail', [
            'car' => $carData,
            'brands' => $brands,
            'models' => $models,
        ]);
    }


    public function destroy($id)
    {
        $car = Car::findOrFail($id);
        $car->delete();

        // debug
        // dd($car);

        return redirect()->route('owner.cars.management')
            ->with('success', 'Car deleted successfully');
    }

    // add brand
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // cek apakah brand sudah ada
        if (CarBrand::where('name', $request->name)->exists()) {
            return redirect()->back()->with('error', 'Brand already exists');
        } else {
            CarBrand::create([
                'name' => $request->name,
            ]);

            return redirect()
                ->back()
                ->with(
                    'success',
                    'Brand added successfully'
                );
        }
    }

    public function modelsStore(Request $request)
    {
        $request->validate([
            'brand_id' => 'required|exists:car_brands,id', // pastikan nama tabel sesuai migration
            'name' => 'required|string|max:255',
        ]);

        CarModel::create([
            'car_brand_id' => $request->brand_id,
            'name' => $request->name,
        ]);

        return back()->with('success', 'Model added successfully');
    }
}
