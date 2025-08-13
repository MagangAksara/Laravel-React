import React from "react";
import { usePage } from "@inertiajs/react";

const Pictures = () => {
    const { car } = usePage().props;
    return (
        <>
            <div>
                <img
                src={car.car_image }
                alt={`${car.brand} ${car.model}`}
                className="w-full h-[350px] object-cover rounded-lg shadow"
                />
                {/* Thumbnail */}
                <div className="flex gap-3 mt-4 overflow-x-auto">
                {[car.car_image , car.car_image , car.car_image ].map((src, i) => (
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