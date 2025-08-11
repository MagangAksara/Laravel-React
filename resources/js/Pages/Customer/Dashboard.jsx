import Navbar from '@/Pages/ComponetGlobal/Navbar';
import React from "react";
import FilterSidebar from "./DashboardComponent/FilterSidebar";
import CarCard from "./DashboardComponent/CarCard";
import { Head } from '@inertiajs/react';
import { Link, usePage } from '@inertiajs/react';
import PageHeader from '../ComponetGlobal/PageHeader';

const Dashboard = () => {
  const { cars } = usePage().props;

  return (
    <>
      <Head title="Dashboard" />
      <Navbar
        header={<PageHeader />}
      >
        <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
          <FilterSidebar />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
            {cars && cars.length > 0 ? (
              cars.map((car, idx) => (
                <CarCard key={idx} {...car} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No cars available</p>
            )}
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default Dashboard;
