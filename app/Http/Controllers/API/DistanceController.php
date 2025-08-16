<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\UserAddress;
use App\Services\OpenRouteService;
use Illuminate\Http\Request;

class DistanceController extends Controller
{
    public function calculate(Request $request)
    {
        try {
            $data = $request->validate([
                'start_lat' => 'required|numeric',
                'start_lon' => 'required|numeric',
                'end_lat'   => 'required|numeric',
                'end_lon'   => 'required|numeric',
            ]);

            // Kalau titik awal dan akhir sama
            if (
                $data['start_lat'] == $data['end_lat'] &&
                $data['start_lon'] == $data['end_lon']
            ) {
                return response()->json([
                    'distance_km'  => 0,
                    'duration_min' => 0,
                    'pickup_fee'   => 0
                ]);
            }

            // Panggil service untuk hitung jarak dan durasi
            $result = OpenRouteService::getDistanceKm(
                $data['start_lat'],
                $data['start_lon'],
                $data['end_lat'],
                $data['end_lon']
            );

            if (isset($result['error_code']) && $result['error_code'] == 2010) {
                return response()->json([
                    'message' => 'Lokasi terlalu jauh dari jalan. Mohon pilih titik di dekat jalan.'
                ], 422);
            }

            if (!isset($result['distance_km'])) {
                return response()->json([
                    'message' => $result['error_msg'] ?? 'Gagal menghitung jarak'
                ], 500);
            }

            // if (!$result || !isset($result['distance_km'])) {
            //     return response()->json([
            //         'message' => 'Gagal menghitung jarak'
            //     ], 500);
            // }

            $distanceKm  = (float) $result['distance_km'];
            $durationMin = (float) $result['duration_min'];

            // Tarif pickup (dibulatkan ke atas per km)
            $pickupFee = (int) ceil($distanceKm) * 3500;

            return response()->json([
                'distance_km'  => round($distanceKm, 3),
                'duration_min' => round($durationMin, 2),
                'pickup_fee'   => $pickupFee,
            ]);

        } catch (\Throwable $e) {
            \Log::error('Pickup Fee Error: '.$e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }
}