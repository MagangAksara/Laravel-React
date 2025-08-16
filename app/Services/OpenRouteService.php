<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class OpenRouteService
{
    public static function getDistanceKm($startLat, $startLon, $endLat, $endLon)
    {
        $apiKey = config('services.ors.secret_key');
        $url = "https://api.openrouteservice.org/v2/directions/driving-car";

        try {
            $client = new \GuzzleHttp\Client();

            $res = $client->post($url, [
                'headers' => [
                    'Authorization' => $apiKey,
                    'Content-Type'  => 'application/json',
                ],
                'json' => [
                    'coordinates' => [
                        [floatval($startLon), floatval($startLat)], // start (lon, lat)
                        [floatval($endLon), floatval($endLat)],     // end (lon, lat)
                    ],
                    'radiuses' => [1000, 1000]
                ]
            ]);

            $body = $res->getBody()->getContents();
            $data = json_decode($body, true);
            
            // Kalau tidak ada data routes, return info gagal
            if (!isset($data['routes'][0]['summary']['distance'])) {
                return [
                    'error_code' => $data['error']['code'] ?? null,
                    'error_msg'  => $data['error']['message'] ?? 'Tidak dapat menghitung jarak'
                ];
            }


            if (!isset($data['routes'][0]['summary']['distance'])) {
                \Log::error('OpenRouteService invalid response', ['response' => $data]);
                return [
                    'distance_km' => 0,
                    'duration_min' => 0
                ];
            }

            $distanceMeters  = $data['routes'][0]['summary']['distance'];
            $durationSeconds = $data['routes'][0]['summary']['duration'];

            return [
                'distance_km' => $distanceMeters / 1000,
                'duration_min' => $durationSeconds / 60
            ];

        } catch (\GuzzleHttp\Exception\ClientException $e) {
            // Tangkap error dari ORS
            $body = json_decode($e->getResponse()->getBody()->getContents(), true);
            return [
                'error_code' => $body['error']['code'] ?? null,
                'error_msg'  => $body['error']['message'] ?? 'Tidak dapat menghitung jarak'
            ];
        } catch (\Exception $e) {
            return [
                'error_msg' => 'Terjadi kesalahan server'
            ];
        }
    }
}