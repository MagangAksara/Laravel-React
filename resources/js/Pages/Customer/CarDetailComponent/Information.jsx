import React from "react";
import { MapPin } from "lucide-react";
import { usePage } from "@inertiajs/react";

const Information = () => {
    const { car } = usePage().props;

    return(
        <>
            <h1 className="text-2xl font-bold">{car.brand} {car.model}</h1>
            <p className="text-xl font-semibold text-gray-700 mt-1">
                {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                }).format(car.price_per_day)}/day
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
        </>
    );
}

export default Information;