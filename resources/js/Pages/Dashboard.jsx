import Navbar from '@/Pages/DashboardComponent_Customer/Navbar';
import React from "react";
import FilterSidebar from "./DashboardComponent_Customer/FilterSidebar";
import CarCard from "./DashboardComponent_Customer/CarCard";
import { Head } from '@inertiajs/react';
import { Link, usePage } from '@inertiajs/react';
import PageHeader from './ComponetGlobal/PageHeader';

export  function Dashboard() {
  const baseData = {
    image: "https://i.pinimg.com/1200x/56/8d/fd/568dfd7a80533c41873113576f5791fb.jpg",
    name: "Toyota Yaris G GR-Sport",
    price: 250000,
    location: "Malang",
    transmission: "Manual",
    seats: 5,
    fuel: "Petrol"
  };
  const cars = Array.from({ length: 20 }, (_, index) => {
    return {
      ...baseData,
      name: `${baseData.name} ${index + 1}` // Menambahkan angka pada nama
    };
  });

  return (
    <>
      <Head title="Dashboard" />
      <Navbar
        header={<PageHeader />}
      >
        <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
          <FilterSidebar />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {cars.map((car, idx) => (
              <CarCard key={idx} {...car} />
            ))}
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default Dashboard;
