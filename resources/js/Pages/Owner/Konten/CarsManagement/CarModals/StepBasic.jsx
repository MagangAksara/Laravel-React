import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

const StepBasic = ({
    formData,
    handleInputChange,
    handleImageChange,
    setFormData,
}) => {
    const {
        brands = [],
        models = [],
        fuels = [],
        transmissions = [],
        colors = [],
    } = usePage().props;

    // buat list tahun otomatis
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 60 }, (_, i) => currentYear - i); // contoh 35 tahun ke belakang

    const selectedBrand = brands.find((b) => b.name === formData.brand);
    const filteredModels = models.filter(
        (m) => m.car_brand_id === selectedBrand?.id
    );

    const handleRemoveImage = (indexToRemove) => {
        setFormData((prev) => ({
            ...prev,
            carImage: prev.carImage.filter(
                (_, index) => index !== indexToRemove
            ),
        }));
    };

    // ubah price ke rupiah
    const formatRupiah = (value) => {
        if (!value) return "";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg text-center font-semibold mb-4">
                1. Basic Information
            </h2>

            {/* Plate Number */}
            <div>
                <Label htmlFor="plateNumber">Plate Number</Label>
                <Input
                    id="plateNumber"
                    name="plateNumber"
                    value={formData.plateNumber}
                    onChange={handleInputChange}
                    placeholder="Enter plate number"
                />
            </div>

            {/* Brand */}
            <div>
                <Label htmlFor="brand">Brand</Label>
                <select
                    id="brandSelect"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 "
                >
                    <option value="">Select a brand</option>
                    {brands &&
                        brands.map((brand, index) => (
                            <option key={index} value={brand.name}>
                                {brand.name}
                            </option>
                        ))}
                </select>
            </div>

            {/* Model + Type */}
            <div className="flex gap-4 mt-1">
                <div className="flex-1">
                    <Label htmlFor="model">Model</Label>
                    <select
                        id="modelSelect"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="">Select a Model</option>
                        {filteredModels.map((model) => (
                            <option key={model.id} value={model.name}>
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
                    />
                </div>
            </div>

            {/* Fuel + Transmission */}
            <div className="flex gap-4 mt-1">
                <div className="flex-1">
                    <Label htmlFor="fuel">Fuel</Label>
                    <select
                        id="fuel"
                        name="fuel"
                        value={formData.fuel}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 "
                    >
                        <option value="">Select a Fuel</option>
                        {fuels &&
                            fuels.map((fuel, index) => (
                                <option key={index} value={fuel.name}>
                                    {fuel.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="flex-1">
                    <Label htmlFor="transmission">Transmission</Label>
                    <select
                        id="transmission"
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 "
                    >
                        <option value="">Select a Transmission</option>
                        {transmissions &&
                            transmissions.map((transmission, index) => (
                                <option key={index} value={transmission.name}>
                                    {transmission.name}
                                </option>
                            ))}
                    </select>
                    {/* <Input
                        id="transmission"
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleInputChange}
                        placeholder="Enter transmission"
                    /> */}
                </div>
            </div>

            {/* Seat + Year */}
            <div className="flex gap-4 mt-1">
                <div className="flex-1">
                    <Label htmlFor="seat">Seat</Label>
                    <Input
                        type="number"
                        id="seat"
                        name="seat"
                        value={formData.seat}
                        onChange={handleInputChange}
                        onWheel={(e) => e.target.blur()} // cegah scroll ubah angka
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

            {/* Color + City */}
            <div className="flex gap-4 mt-1">
                <div className="flex-1">
                    <Label htmlFor="color">Color</Label>
                    <select
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 "
                    >
                        <option value="">Select a color</option>
                        {colors &&
                            colors.map((color, index) => (
                                <option key={index} value={color.name}>
                                    {color.name}
                                </option>
                            ))}
                    </select>
                </div>
                  <div className="flex-1">
                <Label htmlFor="price">Price / Day</Label>
                <Input
                    type="text"
                    id="price"
                    name="price"
                    value={formatRupiah(formData.price)}
                    onChange={(e) => {
                        // Ambil hanya angka dari input
                        const raw = e.target.value.replace(/\D/g, "");
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
                {/* <div className="flex-1">
                    <Label htmlFor="city">City</Label>
                    <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Enter city"
                    />
                </div> */}
            </div>

            {/* Price */}


            {/* Driver */}
            {/* <div>
        <Label>Driver</Label>
        <div className="flex gap-4 mt-1">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="hasDriver"
              value="withDriver"
              checked={formData.hasDriver === true}
              onChange={handleInputChange}
            />
            With Driver
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="hasDriver"
              value="withoutDriver"
              checked={formData.hasDriver === false}
              onChange={handleInputChange}
            />
            Without Driver
          </label>
        </div>
      </div> */}

            {/* Driver Fees */}
        <div className="flex gap-4 mt-1">
            <div className="flex-1">
                <Label htmlFor="driverFee">Driver Fee / Day</Label>
                <Input
                    type="text  "
                    id="driverFee"
                    name="driverFee"
                    value={formatRupiah(formData.driverFee)}
                   onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, ""); // hapus semua non-digit
                        handleInputChange({
                            target: {
                                name: "driverFee",
                                value: raw,
                            },
                        });
                    }}

                    placeholder="Enter Rp.0 if no driver"
                />
            </div>
            <div className="flex-1">
                <Label htmlFor="overtimeFee">Overtime Fee / Hour</Label>
                <Input
                    type="text"
                    id="overtimeFee"
                    name="overtimeFee"
                    value={formatRupiah(formData.overtimeFee)}
                    onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, "");
                        handleInputChange({
                            target: {
                                name: "overtimeFee",
                                value: raw,
                            },
                        });
                    }}
                    placeholder="Enter Rp.0 if with driver"
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
                        {formData.carImage.map((img, i) => (
                            <div
                                key={i}
                                className="relative w-20 h-20 border border-gray-300 rounded-md overflow-hidden"
                            >
                                <img
                                    src={URL.createObjectURL(img)}
                                    alt={`Car preview ${i}`}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(i)}
                                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-black/70"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
        // <div className="flex justify-end items-end pt-4">
        //     <Button
        //         type="submit"
        //         className="w-30 bg-blue-400 hover:bg-blue-600"
        //     >
        //         Next
        //     </Button>
        // </div>
    );
};

export default StepBasic;
