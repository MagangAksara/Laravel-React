import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ConfirmFilter = ({
    car,
    customer_addresses,
    driverOption,
    setDriverOption,
    pickupOption,
    setPickupOption,
    selectedAddress,
    setSelectedAddress,
}) => {

    return (
        <Card>
            <CardContent className="p-6 space-y-6">
                {/* Driver */}
                <div>
                    <Label className="mb-2 block">Driver</Label>
                    <RadioGroup
                        value={driverOption}
                        onValueChange={setDriverOption}
                        defaultValue="self-drive"
                        className="flex gap-6"
                    >
                        {/* Self Drive selalu ada */}
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="self-drive" id="self-drive" />
                            <Label htmlFor="self-drive">Self Drive</Label>
                        </div>

                        {/* With Driver hanya kalau owner adalah driver */}
                        <div
                            className={`flex items-center space-x-2 ${
                                !car.is_driver ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            <RadioGroupItem
                                value="with-driver"
                                id="with-driver"
                                disabled={!car.is_driver}
                            />
                            <Label
                                htmlFor="with-driver"
                                className={!car.is_driver ? "pointer-events-none" : ""}
                            >
                                With Driver{" "}
                                <span className="text-gray-500">
                                    Rp {car.driver_fee.toLocaleString()}
                                </span>
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Pick-Up */}
                <div>
                    <Label className="mb-2 block">Pick-Up Location</Label>
                    <RadioGroup
                        value={pickupOption}
                        onValueChange={(val) => {
                            if (driverOption === "self-drive" && val === "other") return;
                            setPickupOption(val);
                        }}
                        className="flex gap-6"
                    >
                        {/* At owner Location */}
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="owner" id="pickup-owner" />
                            <Label htmlFor="pickup-owner">At Owner’s Location</Label>
                        </div>
                        {/* At Other Location */}
                        <div
                            className={`flex items-center space-x-2 ${
                                driverOption === "self-drive" ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            <RadioGroupItem
                                value="other"
                                id="pickup-other"
                                disabled={driverOption === "self-drive"}
                            />
                            <Label
                                htmlFor="pickup-other"
                                className={driverOption === "self-drive" ? "pointer-events-none" : ""}
                            >
                                At Other Location
                            </Label>
                        </div>
                    </RadioGroup>
                        {pickupOption === "other" && (
                            <div className="mt-4 border p-4 rounded-lg">
                                {customer_addresses?.length > 0 ? (
                                    <RadioGroup
                                        value={selectedAddress}
                                        onValueChange={setSelectedAddress}
                                        className="space-y-3"
                                    >
                                        {customer_addresses.map((addr) => (
                                            <div
                                                key={addr.id}
                                                className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition"
                                            >
                                                <RadioGroupItem 
                                                    value={addr.id.toString()} 
                                                    id={`address-${addr.id}`} 
                                                    className="mt-1"
                                                />
                                                <Label 
                                                    htmlFor={`address-${addr.id}`} 
                                                    className="cursor-pointer flex flex-col"
                                                >
                                                    <p className="text-sm text-gray-800">
                                                        Kota: {addr.city},  Kecamatan: {addr.district}, Kabupaten: {addr.regency}, Provinsi: {addr.province}, ({addr.postal_code})
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Latitude: {addr.latitude}, Longitude: {addr.longitude}
                                                    </p>
                                                    <p className="text-sm">{addr.detail}</p>
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                ) : (
                                    <p className="text-sm text-gray-500">Tidak ada alamat tersimpan.</p>
                                )}
                            </div>
                        )}
                    </div>
            </CardContent>
        </Card>
    );
};

export default ConfirmFilter;