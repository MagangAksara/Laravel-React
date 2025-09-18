import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BasicInformation = ({
    formData,
    handleInputChange,
    handleImageChange,
    handleRemoveImage,
    isAvailable,
    formatRupiah
}) => {

    const { brands, models } = usePage().props;

    const selectedBrand = brands.find((b) => b.name === formData.brand);
    const filteredModels = models.filter(
        (m) => m.car_brand_id === selectedBrand?.id
    );

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 60 }, (_, i) => currentYear - i);

    return (
        <div className="space-y-4">
            {/* Plate Number + Brand */}
            <div className="flex gap-4 mt-1">
                <div className="flex-1">
                    <Label htmlFor="plateNumber">
                        Plate Number
                    </Label>
                    <Input
                        id="plateNumber"
                        name="plateNumber"
                        value={formData.plateNumber}
                        onChange={handleInputChange}
                        placeholder="Enter plate number"
                        disabled={!isAvailable}

                    />
                </div>

                {/* Brand */}
                <div className="flex-1">
                    <Label htmlFor="brand">Brand</Label>
                    <select
                        id="brandSelect"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 "
                        disabled={!isAvailable}
                    >
                        <option value="">Select a brand</option>
                        {brands &&
                            brands.map((brand, index) => (
                                <option
                                    key={index}
                                    value={brand.name}
                                >
                                    {brand.name}
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            {/* Model + Type + fuel */}
            <div className="flex gap-4 mt-1">
                <div className="flex-1">
                    <Label htmlFor="model">Model</Label>
                    <select
                        id="modelSelect"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        disabled={!isAvailable}
                        className="w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="">Select a Model</option>
                        {filteredModels.map((model) => (
                            <option
                                key={model.id}
                                value={model.name}
                            >
                                {model.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex-1">
                    <Label htmlFor="type">Type</Label>
                    <Input
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        placeholder="Enter type"
                        disabled={!isAvailable}
                    />
                </div>

                <div className="flex-1">
                    <div className="flex-1">
                        <Label htmlFor="fuel">Fuel</Label>
                        <Input
                            id="fuel"
                            name="fuel"
                            value={formData.fuel}
                            onChange={handleInputChange}
                            placeholder="Enter fuel type"
                            disabled={!isAvailable}
                        />
                    </div>
                </div>
            </div>

            {/* Transmission + seat + Year */}
            <div className="flex gap-4 mt-1">
                <div className="flex-1">
                    <Label htmlFor="transmission">
                        Transmission
                    </Label>
                    <Input
                        id="transmission"
                        name="transmission"
                        value={formData.transmission}
                        disabled={!isAvailable}
                        onChange={handleInputChange}
                        placeholder="Enter transmission"
                    />
                </div>
                <div className="flex-1">
                    <Label htmlFor="seat">Seat</Label>
                    <Input
                        type="number"
                        id="seat"
                        name="seat"
                        value={formData.seat}
                        disabled={!isAvailable}
                        onChange={handleInputChange}
                        placeholder="Enter seat number"
                    />
                </div>
                <div className="flex-1">
                    <Label htmlFor="year">Year</Label>
                    <select
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        disabled={!isAvailable}
                        className="w-full border border-gray-300 rounded-sm p-2"
                    >
                        <option value="" disabled hidden>
                            Select year
                        </option>
                        {years.map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* color & city */}
            <div className="flex gap-4 mt-1">
                <div className="flex-1">
                    <Label htmlFor="color">Color</Label>
                    <Input
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        placeholder="Enter color"
                    // className="w-[32%]"
                    />
                </div>
                <div className="flex-1">
                    <Label htmlFor="price">Price / Day</Label>
                    <Input
                        type="text"
                        id="price"
                        name="price"
                        disabled={!isAvailable}
                        value={formatRupiah(formData.price)}
                        onChange={(e) => {
                            // Ambil hanya angka dari input
                            const raw = e.target.value.replace(
                                /\D/g,
                                ""
                            );
                            handleInputChange({
                                target: {
                                    name: "price",
                                    value: raw, // simpan angka murni ke state
                                },
                            });
                        }}
                        placeholder="Enter price per day"
                    />
                </div>
            </div>

            {/* price & driver fee */}
            <div className="flex gap-4 mt-1">
                {/* Driver Fees */}

                <div className="flex-1">
                    <Label htmlFor="driverFee">
                        Driver Fee / Day
                    </Label>
                    <Input
                        type="text"
                        id="driverFee"
                        name="driverFee"
                        disabled={!isAvailable}
                        value={formatRupiah(formData.driverFee)}
                        onChange={(e) => {
                            const raw = e.target.value.replace(
                                /\D/g,
                                ""
                            );
                            handleInputChange({
                                target: {
                                    name: "driverFee",
                                    value: raw,
                                },
                            });
                        }}
                        placeholder="Enter driver fee"
                    />
                </div>
                {/* )} */}

                {/* karena ini pengaturan awal dan mengatahui hahwa saat ini has driver or not diatur dalam profile, sehingga bagian ini akan selalu tampil */}
                {/* Overtime Fee  */}
                <div className="flex-1">
                    <Label htmlFor="overtimeFee">
                        Overtime Fee / Hour
                    </Label>
                    <Input
                        type="text"
                        id="overtimeFee"
                        name="overtimeFee"
                        disabled={!isAvailable}
                        value={formatRupiah(formData.overtimeFee)} // Gunakan formatRupiah di sini
                        onChange={(e) => {
                            const raw = e.target.value.replace(
                                /\D/g,
                                ""
                            );
                            handleInputChange({
                                target: {
                                    name: "overtimeFee",
                                    value: raw,
                                },
                            });
                        }}
                        placeholder="Enter overtime fee"
                    />
                </div>
            </div>

            {/* Image Upload */}
            <div>
                <Label>Car Image</Label>
                <Input
                    type="file"
                    name="carImage"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                />
                {formData.carImage && formData.carImage.length > 0 && (
                    <div className="flex gap-3 mt-3 flex-wrap">
                        {formData.carImage.map((img, i) => {
                            let previewUrl;

                            // kalau img adalah File (baru diupload user)
                            if (img instanceof File) {
                                previewUrl = URL.createObjectURL(img);
                            }
                            // kalau img string (misalnya dari database / backend)
                            else if (typeof img === "string") {
                                previewUrl = img; // langsung pakai URL dari backend
                            }
                            else {
                                return null; // skip kalau bukan keduanya
                            }

                            return (
                                <div
                                    key={i}
                                    className="relative border border-gray-300 rounded-md overflow-hidden"
                                >
                                    <img
                                        src={previewUrl}
                                        alt={`Car preview ${i}`}
                                        className="w-auto h-[100px] md:h-[150px] object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(i)}
                                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-black/70"
                                    >
                                        &times;
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BasicInformation;