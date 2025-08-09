import React from "react";

export default function CarsDraft({ cars }) {
    return (
        <section className="p-12 bg-white">
            <h2 className="text-3xl font-bold mb-8 text-center">Choose your car</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(Array.isArray(cars) ? cars : []).map((car, idx) => (
                    <div
                        key={car.id || idx}
                        className="bg-gray-200 rounded-xl overflow-hidden shadow-md"
                    >
                        <img
                            src={car.image_url || "https://via.placeholder.com/400x300?text=No+Image"}
                            alt={`${car.brand} ${car.model}`}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 space-y-2">
                            <h3 className="font-semibold text-lg">
                                {car.brand} {car.model}
                            </h3>
                            <p className="text-gray-600">
                                Rp.{parseInt(car.price).toLocaleString("id-ID")}/day
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
        </section>
    );
}
