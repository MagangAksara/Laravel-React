import React from "react";
import FilterSidebar from "@/Components/FilterSidebar";
import CarCard from "@/Components/CarCard";

export default function RentCar() {
  const cars = [
    {
      image: "/images/yaris.png",
      name: "Toyota Yaris G GR-Sport",
      price: 250000,
      location: "Malang",
      transmission: "Manual",
      seats: 5,
      fuel: "Petrol"
    },
    {
      image: "/images/brio.png",
      name: "Honda Brio Satya E",
      price: 200000,
      location: "Malang",
      transmission: "Matic",
      seats: 5,
      fuel: "Petrol"
    }
  ];

  return (
    <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
      <FilterSidebar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {cars.map((car, idx) => (
          <CarCard key={idx} {...car} />
        ))}
      </div>
    </div>
  );
}
