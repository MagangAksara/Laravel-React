import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Navbar from "@/Pages/ComponetGlobal/Navbar";
import PageHeader from "@/Pages/ComponetGlobal/PageHeader";

import Pictures from "./CarDetailComponent/Pictures.jsx";
import Information from "./CarDetailComponent/Information.jsx";
import NavigationTabsInformation from "./CarDetailComponent/NavigationTabsInformation.jsx";
import Reviews from "./CarDetailComponent/Reviews.jsx";

export default function CarDetail() {
  const { car } = usePage().props;

  return (
    <>
      <Head title={`${car.brand} ${car.model}`} />
      <Navbar header={<PageHeader />}>
        <div className="p-6 bg-gray-50 min-h-screen">
          {/* Bagian Atas - Gambar & Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gambar utama */}
            <Pictures />

            {/* Informasi */}
            <div>
              <Information car={car} />

              {/* Tab Navigasi */}
              <NavigationTabsInformation car={car} />

              {/* Tombol Sewa */}
              <div className="flex justify-end">
                <Link href={route('booking', car.id)}>
                  <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                    Rent Now
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Review */}
          <Reviews />
          
        </div>
      </Navbar>
    </>
  );
}
