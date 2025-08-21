import React from "react";
import { Star } from "lucide-react";

const OwnerInformation = ({ car, imageUrl, owner_name, city, rating, reviews }) => {
    // const { car } = usePage().props;
    return (
        <div className="flex items-center bg-white rounded-xl shadow-md p-4 mt-6 w-full max-w-md">
        {/* Foto profil bulat */}
        <img
            src={car.owner_picture}
            alt={car.owner_name}
            className="w-14 h-14 rounded-full object-cover"
        />

        {/* Info teks */}
        <div className="ml-4 flex-1">
            <h2 className="text-lg font-semibold">{car.owner_name}</h2>
            <p className="text-sm text-gray-500">{car.city}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center text-yellow-500">
            <Star size={18} fill="currentColor" stroke="none" />
            <span className="ml-1 text-sm font-medium text-gray-700">
            {/* {rating} */}
            1
            </span>
            <span className="ml-1 text-xs text-gray-500">
            {/* ({reviews.toLocaleString()}) */}
            qweq
            </span>
        </div>
        </div>
    );
}

export default  OwnerInformation;
