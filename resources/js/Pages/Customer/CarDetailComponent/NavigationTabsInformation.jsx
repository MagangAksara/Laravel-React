import React, { useState } from "react";
import { MapPin, Star } from "lucide-react";
import { Head, Link, usePage } from "@inertiajs/react";

const NavigationTabsInformation = () => {
    const { car } = usePage().props;
    const [activeTab, setActiveTab] = useState(0);
    
    const tabs = [
        "Important Information",
        "Description",
        "Specification",
        "Policies",
        "Rent Details"
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 0:
            return <p className="text-gray-600">Informasi penting sebelum menyewa mobil ini...</p>;
            case 1:
            return <p className="text-gray-600">{car.description ?? "Tidak ada deskripsi."}</p>;
            case 2:
            return (
                <ul className="list-disc list-inside text-gray-600">
                <li>Brand: {car.brand}</li>
                <li>Model: {car.model}</li>
                <li>Transmisi: {car.type_transmisi}</li>
                <li>Bahan Bakar: {car.fuel_type}</li>
                <li>Kapasitas: {car.capacity} orang</li>
                <li>Tahun: {car.year}</li>
                </ul>
            );
            case 3:
            return <p className="text-gray-600">Kebijakan penyewaan mobil...</p>;
            case 4:
            return <p className="text-gray-600">Detail harga dan cara penyewaan...</p>;
            default:
            return null;
        }
    };

    return (
        <>
            <div className="flex gap-4 border-b mt-6">
                {tabs.map((tab, i) => (
                    <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`pb-2 text-sm transition-colors ${
                        activeTab === i
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500 hover:text-blue-500"
                    }`}
                    >
                    {tab}
                    </button>
                ))}
            </div>
                
            {/* Deskripsi */}
            <div className="mt-4">{renderTabContent()}</div>
        </>
    )
}

export default NavigationTabsInformation;