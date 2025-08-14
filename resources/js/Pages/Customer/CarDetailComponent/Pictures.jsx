import React from "react";
import { usePage } from "@inertiajs/react";

const Pictures = () => {
    const { car } = usePage().props;
    return (
        <>
            <div>
                {/* gambar utama dari tb car main_image */}
                <img
                src={car.car_image }
                alt={`${car.brand} ${car.model}`}
                className="w-full h-[350px] object-cover rounded-lg shadow"
                />
                {/* gambar tumbnail dari tb car_image => satu mobil bisa memiliki banyak gambar */}
                <div className="flex gap-3 mt-4 overflow-x-auto">
                    {/* {car.thumbnails.map((src, i) => ( */}
                    {[car.car_image, ...(car.thumbnails || [])].map((src, i) => (
                        <img
                        key={i}
                        src={src}
                        alt="thumbnail"
                        className="w-28 h-20 object-cover rounded-md border hover:border-blue-500 cursor-pointer"
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default  Pictures;