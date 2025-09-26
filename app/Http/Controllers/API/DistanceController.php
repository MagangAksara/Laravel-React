<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\UserAddress;
use App\Services\OpenRouteService;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class DistanceController extends Controller
{
    public function calculate(Request $request, $id)
    {
        try {
            // dapatkan owner_id dari car_id
            $ownerID = Car::where('id', $id)->value('user_id');

            if (!$ownerID) {
                return response()->json([
                    'message' => 'Mobil tidak ditemukan atau tidak memiliki owner.'
                ], 404);
            }

            // --- Ambil alamat aktif owner ---
            $ownerAddress = UserAddress::where('user_id', $ownerID)
                ->where('is_active', true)
                ->first();

            if (!$ownerAddress) {
                return response()->json([
                    'message' => 'Alamat owner tidak ditemukan. Pastikan owner memiliki alamat aktif.'
                ], 422);
            }

            if (empty($ownerAddress->latitude) || empty($ownerAddress->longitude)) {
                return response()->json([
                    'message' => 'Alamat owner tidak memiliki koordinat yang valid.'
                ], 422);
            }

            // --- Validasi input customer location ---
            $data = $request->validate([
                'customer_lat' => 'nullable|numeric',
                'customer_lon' => 'nullable|numeric',
                'end_lat'      => 'nullable|numeric',
                'end_lon'      => 'nullable|numeric',
            ]);

            // Gunakan customer_lat/lon jika ada, kalau tidak fallback ke end_lat/lon
            $startLat = (float) ($data['customer_lat'] ?? $data['end_lat']);
            $startLon = (float) ($data['customer_lon'] ?? $data['end_lon']);

            if (!$startLat || !$startLon) {
                return response()->json([
                    'message' => 'Koordinat customer tidak valid atau tidak dikirim.'
                ], 422);
            }

            $endLat = (float) $ownerAddress->latitude;
            $endLon = (float) $ownerAddress->longitude;

            // --- Cek kalau titik awal = titik akhir ---
            if ($startLat == $endLat && $startLon == $endLon) {
                return response()->json([
                    'distance_km'  => 0,
                    'duration_min' => 0,
                    'pickup_fee'   => 0
                ]);
            }

            // --- Hitung jarak pakai OpenRouteService ---
            $result = OpenRouteService::getDistanceKm(
                $startLat,
                $startLon,
                $endLat,
                $endLon
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

            $distanceKm  = (float) $result['distance_km'];
            $durationMin = (float) $result['duration_min'];

            // --- Hitung pickup fee ---
            $pickupFee = (int) ceil($distanceKm) * 3500;

            return response()->json([
                'distance_km'  => round($distanceKm, 3),
                'duration_min' => round($durationMin, 2),
                'pickup_fee'   => $pickupFee,
            ]);
        } catch (ValidationException $ve) {
            Log::warning('Pickup Fee Validation Failed', [
                'errors'  => $ve->errors(),
                'payload' => $request->all()
            ]);

            return response()->json([
                'message' => 'Validasi gagal',
                'errors'  => $ve->errors()
            ], 422);
        } catch (\Throwable $e) {
            Log::error('Pickup Fee Error: ' . $e->getMessage(), [
                'trace'   => $e->getTraceAsString(),
                'payload' => $request->all()
            ]);

            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }
}