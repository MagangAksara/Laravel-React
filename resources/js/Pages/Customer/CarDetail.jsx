import React, { useState } from "react";
import { MapPin, Star } from "lucide-react";
import { Head, usePage } from "@inertiajs/react";
import Navbar from "@/Pages/ComponetGlobal/Navbar";
import PageHeader from "@/Pages/ComponetGlobal/PageHeader";

export default function CarDetail() {
  const { car } = usePage().props;
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "Important Information",
    "Description",
    "Specification",
    "Policies",
    "Rent Details"
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <p className="text-gray-600">Informasi penting sebelum menyewa mobil ini...</p>;
      case 1:
        return <p className="text-gray-600">{car.description ?? "Tidak ada deskripsi."}</p>;
      case 2:
        return (
          <ul className="list-disc list-inside text-gray-600">
            <li>Brand: {car.brand}</li>
            <li>Model: {car.model}</li>
            <li>Transmisi: {car.type_transmisi}</li>
            <li>Bahan Bakar: {car.fuel_type}</li>
            <li>Kapasitas: {car.capacity} orang</li>
            <li>Tahun: {car.year}</li>
          </ul>
        );
      case 3:
        return <p className="text-gray-600">Kebijakan penyewaan mobil...</p>;
      case 4:
        return <p className="text-gray-600">Detail harga dan cara penyewaan...</p>;
      default:
        return null;
    }
  };

  return (
    <>
      <Head title={`${car.brand} ${car.model}`} />
      <Navbar header={<PageHeader />}>
        <div className="p-6 bg-gray-50 min-h-screen">
          {/* Bagian Atas - Gambar & Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gambar utama */}
            <div>
              <img
                src={car.car_image }
                alt={`${car.brand} ${car.model}`}
                className="w-full h-[350px] object-cover rounded-lg shadow"
              />
              {/* Thumbnail */}
              <div className="flex gap-3 mt-4 overflow-x-auto">
                {[car.car_image , car.car_image , car.car_image ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="thumbnail"
                    className="w-28 h-20 object-cover rounded-md border hover:border-blue-500 cursor-pointer"
                  />
                ))}
              </div>
            </div>

            {/* Informasi */}
            <div>
              <h1 className="text-2xl font-bold">{car.brand} {car.model}</h1>
              <p className="text-xl font-semibold text-gray-700 mt-1">
                Rp.{car.price_per_day .toLocaleString()}/day
              </p>
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Available</span>
                {/* <div className="flex items-center gap-1 text-sm">
                  <MapPin size={16} /> {car.location ?? "Malang"}
                </div> */}
                <div className="flex items-center gap-1 text-sm">
                  <MapPin size={16} /> Malang
                </div>
              </div>

              {/* Tab Navigasi */}
              <div className="flex gap-4 border-b mt-6">
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`pb-2 text-sm transition-colors ${
                      activeTab === i
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500 hover:text-blue-500"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              {/* Deskripsi */}
              <div className="mt-4">{renderTabContent()}</div>

              {/* Tombol Sewa */}
              <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                Rent Now
              </button>
            </div>
          </div>

          {/* Review */}
          <div className="mt-12">
            <div className="flex items-center gap-2">
              <Star size={20} className="text-yellow-400" />
              <Star size={20} className="text-yellow-400" />
              <Star size={20} className="text-yellow-400" />
              <Star size={20} className="text-yellow-400" />
              <Star size={20} className="text-gray-300" />
              <span className="ml-2 text-gray-700">4/5</span>
            </div>

            {/* List Review */}
            {[1, 2].map((i) => (
              <div key={i} className="mt-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="user"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Amelia</p>
                    <p className="text-xs text-gray-500">12 Agustus 2024 12:32</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-2">
                  {[...Array(4)].map((_, idx) => (
                    <Star key={idx} size={16} className="text-yellow-400" />
                  ))}
                  <Star size={16} className="text-gray-300" />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Pengalaman menyewa mobil ini sangat memuaskan. Mobil datang dalam kondisi bersih, wangi, dan nyaman.
                </p>
              </div>
            ))}
          </div>
        </div>
      </Navbar>
    </>
  );
}
