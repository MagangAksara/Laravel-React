import React from "react";
import { MapPin } from "lucide-react";

export default function CarCard({ image_url, brand, model, type, price, type_transmisi, capacity, fuel_type }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden h-full max-w-sm">
      <img 
        src={image_url} 
        alt={`${brand} ${model} ${type}`} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg">{brand} {model} {type}</h3>
        <p className="text-xl font-semibold text-gray-700 mt-1">
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
          }).format(price)}/day
        </p>
        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
          <MapPin size={16} /> Malang
        </div>
        <div className="flex-grow" />
          <div className="flex justify-between items-center mt-3 text-sm font-medium">
            <span>⚙️ {type_transmisi}</span>
            <span>🚗 {capacity}</span>
            <span>⛽ {fuel_type}</span>
          </div>
      </div>
    </div>
  );
}
