<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserAddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Hapus data lama untuk menghindari duplikasi saat seeding ulang
        DB::table('user_addresses')->delete();

        DB::table('user_addresses')->insert([
            // Alamat untuk user_id 1 di Jawa Barat
            [
                'user_id' => 1,
                'city' => 'Kota Bandung',
                'district' => 'Sukajadi',
                'regency' => 'Bandung',
                'province' => 'Jawa Barat',
                'postal_code' => '40162',
                'latitude' => -6.8846387,
                'longitude' => 107.5865181,
                'detail' => 'Jl. Dr. Setiabudi No. 123, dekat Universitas Pendidikan Indonesia',
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Alamat untuk user_id 2 di Jawa Tengah
            [
                'user_id' => 2,
                'city' => 'Kota Semarang',
                'district' => 'Tembalang',
                'regency' => 'Semarang',
                'province' => 'Jawa Tengah',
                'postal_code' => '50275',
                'latitude' => -7.0553754,
                'longitude' => 110.4349392,
                'detail' => 'Perumahan Graha Estetika, Blok G No. 5, Banyumanik',
                'is_active' => false,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Alamat untuk user_id 3 di Jawa Timur
            [
                'user_id' => 3,
                'city' => 'Kota Surabaya',
                'district' => 'Gubeng',
                'regency' => 'Surabaya',
                'province' => 'Jawa Timur',
                'postal_code' => '60281',
                'latitude' => -7.2759365,
                'longitude' => 112.7521369,
                'detail' => 'Apartemen Puncak Kertajaya, Tower A, Lantai 15',
                'is_active' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}