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
                return ( 
                    <div>
                        <div className="text-black space-y-4">
                            <div>
                                <p className="font-semibold">Before You Book</p>
                                <ul className="list-disc list-outside">
                                    <li className="ml-7"> Make sure to read the rental terms and conditions.</li>
                                </ul>
                            </div>

                            <div>
                                <p className="font-semibold">After You Book</p>
                                <ul className="list-disc list-outside">
                                    <li className="ml-7">The provider will contact the driver via WhatsApp to request photos of several required documents.</li>
                                </ul>
                            </div>

                            <div>
                                <p className="font-semibold">At Pick-up</p>
                                <ul className="list-disc list-outside">
                                    <li className="ml-7">Bring your ID card, driver’s license, and any other documents required by the rental provider.</li>
                                    <li className="ml-7">When you meet the rental staff, inspect the car’s condition together with them. After that, read and sign the rental agreement.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <p className="text-black">{car.description ?? "Tidak ada deskripsi."}</p>
                );
            case 2:
                return (
                    <div>
                        <h4 className="font-semibold mb-2">Info Product</h4>
                        <div 
                            className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 ml-3"
                        >
                            <span className="font-medium">Brand</span>         <span className="text-gray-600">: {car.brand}</span>
                            <span className="font-medium">Model</span>         <span className="text-gray-600">: {car.model}</span>
                            <span className="font-medium">Fuel</span>          <span className="text-gray-600">: {car.fuel_type}</span>
                            <span className="font-medium">Seat</span>          <span className="text-gray-600">: {car.capacity}</span>
                            <span className="font-medium">Transmission</span>  <span className="text-gray-600">: {car.type_transmisi}</span>
                            <span className="font-medium">Year</span>          <span className="text-gray-600">: {car.year}</span>
                            <span className="font-medium">Color</span>         <span className="text-gray-600">: {car.color}</span>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <p className="text-gray-600">Kebijakan penyewaan mobil...</p>
                );
            case 4:
                return ( 
                    <p className="text-gray-600">Detail harga dan cara penyewaan...</p>
                );
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