import React from "react";
import { MapPin } from "lucide-react";

export default function CarCard({ image, name, price, location, transmission, seats, fuel }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-gray-600 font-medium">Rp.{price.toLocaleString()}/day</p>
        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
          <MapPin size={16} /> {location}
        </div>
        <div className="flex justify-between items-center mt-3 text-sm font-medium">
          <span>{transmission}</span>
          <span>{seats} Seats</span>
          <span>{fuel}</span>
        </div>
      </div>
    </div>
  );
}
