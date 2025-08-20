import React from "react";
import { Star } from "lucide-react";

const OwnerInformation = ({ car, imageUrl, owner_name, city, rating, reviews }) => {
    // const { car } = usePage().props;
    return (
        <div className="flex items-center bg-white rounded-xl w-full max-w-xs">
            {/* Foto profil bulat */}
            <img
                src={car.owner_picture}
                alt={car.owner_name}
                className="w-10 h-10 rounded-full object-cover"
            />

            {/* Info teks */}
            <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold">{car.owner_name}</h2>
                <p className="text-sm text-gray-500">{car.city}</p>
            </div>
        </div>
    );
}

export default  OwnerInformation;
