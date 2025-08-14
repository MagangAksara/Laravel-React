import { Link } from "@inertiajs/react";
import React, { useState } from "react";

export default function CarsDraft({ cars }) {
    const [visibleCount, setVisibleCount] = useState(9);
    const [step, setStep] = useState(0); // 0 = awal, 1 = sudah klik sekali

    const handleSeeMore = () => {
        if (step === 0) {
            setVisibleCount(12);
            setStep(1);
        }
    };

    const displayedCars = (Array.isArray(cars) ? cars : []).slice(0, visibleCount);

    return (
        <section id="rent-car" className="p-12 bg-white">
            <h2 className="text-3xl font-bold mt-10 mb-10 text-center">Choose your car</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedCars.map((car, idx) => (
                    <div
                        key={car.id || idx}
                        className="bg-gray-200 rounded-xl overflow-hidden shadow-md"
                    >
                        <img
                            src={car.image_url || "https://i.pinimg.com/1200x/56/8d/fd/568dfd7a80533c41873113576f5791fb.jpg"}
                            alt={`${car.brand} ${car.model} ${car.type}`}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 space-y-2">
                            <h3 className="font-semibold text-lg">
                                {car.brand} {car.model} {car.type}
                            </h3>
                            <p className="text-xl font-semibold text-gray-700 mt-1">
                                {new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0
                                }).format(car.price)}/day
                            </p>
                            <div className="flex gap-4 text-sm text-gray-700">
                                <span>⚙️ {car.type_transmisi || "Unknown"}</span>
                                <span>🚗 {car.capacity || "?"}</span>
                                <span>⛽ {car.fuel_type || "Petrol"}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                {step < 1 ? (
                    <button
                        onClick={handleSeeMore}
                        className="px-6 py-3 bg-blue-600 rounded-full text-white text-lg hover:bg-blue-700"
                    >
                        See More →
                    </button>
                ) : (
                    <Link href="/login">
                        <button className="px-6 py-3 bg-gray-500 rounded-full text-white text-lg hover:bg-gray-600">
                            Log in to see more cars
                        </button>
                    </Link>
                )}
            </div>
        </section>
    );
}
