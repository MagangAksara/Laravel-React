<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\CarBrand;
use App\Models\CarColor;
use App\Models\CarFuelType;
use App\Models\CarModel;
use App\Models\CarTransmission;
use App\Models\CarType;
use Illuminate\Http\Request;
use Inertia\Inertia;


class CarManagementController extends Controller
{
    // untuk cars manajement page
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

    // untuk showDetals
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
            'driver_fee' => $car->driver_fee_on_day,
            'overtime_fee' => $car->overtime_fee_on_hour,
            'year' => $car->year ?? '-',
            'color' => $car->color->name ?? '-',
            'transmission' => $car->transmission->name ?? '-',
            'fuel' => $car->fuelType->name ?? '-',
            'seat' => $car->capacity ?? '-',
            // 'driver' => $car->user->is_driver ? 'With Driver' : 'Without Driver',
            // 'driver_fee' => $car->user->is_driver ? $car->user->driver_fee : 0,
            'city' => $car->user->firstAddress->city ?? '-',
            // important information
            'before_booking' => $car->rule_before_booking,
            'after_booking' => $car->rule_after_booking,
            'during_pickup' => $car->rule_during_pickup,
            // policies
            'before_pickup' => $car->rule_before_pickup,
            'at_pickup' => $car->rule_at_pickup,
            'usage' => $car->rule_usage,
            'return' => $car->rule_return,
            'overtime' => $car->rule_overtime,

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

    // add brand
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:car_brands,name',
        ]);

        CarBrand::create([
            'name' => $request->name,
        ]);

        return back()->with('success', 'Brand added successfully');
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

    public function update(Request $request, $id)
    {
        \Log::info('Data diterima update Car:', $request->all());
        
        $car = Car::findOrFail($id);

        $validated = $request->validate([
            'plateNumber'   => 'required|string|max:50',
            'brand'         => 'required|string|max:100',
            'model'         => 'required|string|max:100',
            'type'          => 'required|string|max:100',
            'fuel'          => 'required|string|max:50',
            'transmission'  => 'required|string|max:50',
            'seat'          => 'required|integer|min:1',
            'year'          => 'required|integer|min:1900|max:' . date('Y'),
            'color'         => 'required|string|max:50',
            'price'         => 'required|numeric|min:0',
            'driverFee'     => 'nullable|numeric|min:0',
            'overtimeFee'      => 'nullable|numeric|min:0',
            // important information
            'beforeBooking' => 'nullable|string',
            'afterBooking'  => 'nullable|string',
            'duringPickup'  => 'nullable|string',
            // policies
            'beforePickup'  => 'nullable|string',
            'atPickUp'      => 'nullable|string',
            'usage'         => 'nullable|string',
            'return'        => 'nullable|string',
            'overtime' => 'nullable|string',
            'carImage.*'    => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            // 'carImage.*'    => 'nullable|string',
        ]);

        \Log::info('Data setelah validasi update Car:', $validated);

        // dd($validated);

        // relasi brand, model, type, dll
        $brand = CarBrand::firstOrCreate(['name' => $validated['brand']]);
        $model = CarModel::firstOrCreate([
            'name' => $validated['model'],
            'car_brand_id' => $brand->id,
        ]);
        $type = CarType::firstOrCreate(['name' => $validated['type']]);
        $color = CarColor::firstOrCreate(['name' => $validated['color']]);
        $fuel = CarFuelType::firstOrCreate(['name' => $validated['fuel']]);
        $transmission = CarTransmission::firstOrCreate(['name' => $validated['transmission']]);

        $car->update([
            'plate_number'       => $validated['plateNumber'],
            'car_brand_id'       => $brand->id,
            'car_model_id'       => $model->id,
            'car_type_id'        => $type->id,
            'car_color_id'       => $color->id,
            'car_fuel_type_id'   => $fuel->id,
            'car_transmission_id' => $transmission->id,
            'capacity'           => $validated['seat'],
            'year'               => $validated['year'],
            'price_per_day'      => $validated['price'],
            'driver_fee_on_day'  => $validated['driverFee'] ?? 0,
            'overtime_fee_on_hour' => $validated['overtimeFee'] ?? 0,
            // rules / info
            'rule_before_booking' => $validated['beforeBooking'] ?? null,
            'rule_after_booking' => $validated['afterBooking'] ?? null,
            'rule_during_pickup' => $validated['duringPickup'] ?? null,
            'rule_before_pickup' => $validated['beforePickup'] ?? null,
            'rule_at_pickup'     => $validated['atPickUp'] ?? null,
            'rule_usage'         => $validated['usage'] ?? null,
            'rule_return'        => $validated['return'] ?? null,
            'rule_overtime'      => $validated['overtime'] ?? null,
        ]);

        // simpan gambar baru
        if ($request->hasFile('carImage')) {
            foreach ($request->file('carImage') as $file) {
                $path = $file->store('cars', 'public');
                $car->imagePath()->create([
                    'image_path' => $path,
                ]);
            }

            if (!$car->main_image && $car->imagePath()->exists()) {
                $car->update(['main_image' => $car->imagePath()->first()->image_path]);
            }
        }

        return redirect()
            ->route('owner.cars.management')
            ->with('success', 'Car updated successfully.');
    }


    // delete a car
    public function destroy($id)
    {
        $car = Car::findOrFail($id);
        $car->delete();

        return redirect()->route('owner.cars.management')
            ->with('success', 'Car deleted successfully');
    }
}
