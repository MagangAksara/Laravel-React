import React, { useState, useEffect } from "react";
import { usePage, Link, Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import {
    ArrowLeft,
    Settings,
    AlertTriangle,
    FileText,
    CheckCircle,
} from "lucide-react";
import Layout from "../../Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // kalau kamu ada komponen ini di shadcn/ui

const CarDetail = ({ car }) => {
    // const { props } = usePage();
    // const { car } = props || {}; // aman kalau props belum siap

    // ubah price ke rupiah

    const formatRupiah = (value) => {
        if (!value) return "";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };

    const handleRemoveImage = (indexToRemove) => {
        setFormData((prev) => ({
            ...prev,
            carImage: prev.carImage.filter(
                (_, index) => index !== indexToRemove
            ),
        }));
    };

    const [isAvailable, setIsAvailable] = useState(true);

    // Pindahkan fungsi handleAvailabilityChange ke dalam scope CarDetail
    const handleAvailabilityChange = (e) => {
        setIsAvailable(e.target.value === "Available");
        // Atur juga formData.availableStatus di sini
        setFormData((prev) => ({
            ...prev,
            availableStatus: e.target.value,
        }));
    };

    const [formData, setFormData] = useState({
        plateNumber: "",
        brand: "",
        model: "",
        type: "",
        fuel: "",
        transmission: "",
        seat: "",
        year: "",
        color: "",
        city: "",
        price: "",
        hasDriver: false,
        availableStatus: "Available",
        driverFee: "",
        carImage: [],
        beforeBooking: "",
        afterBooking: "",
        atPickUp: "",
        beforePickup: "",
        atPickup: "",
        usage: "",
        return: "",
        overtime: "",
        address: "",
    });

    // inisialisasi data ketika car tersedia
    useEffect(() => {
        if (car) {
            setFormData({
                plateNumber: car.plate_number ?? "",
                brand: car.brand ?? "",
                model: car.model ?? "",
                type: car.type ?? "",
                fuel: car.fuel ?? "",
                transmission: car.transmission ?? "",
                seat: car.seat ?? "",
                year: car.year ?? "",
                color: car.color ?? "",
                city: car.city ?? "",
                price: car.price_day ?? "",
                hasDriver: car.driver === "With Driver",
                availableStatus: car.availability ?? "Available",
                driverFee: car.driver_fee ?? "",
                carImage: car.photo ? [car.photo] : [],
                beforeBooking: car.before_booking ?? "",
                afterBooking: car.after_booking ?? "",
                atPickUp: car.at_pickup ?? "",
                beforePickup: car.before_pickup ?? "",
                atPickup: car.at_pickup ?? "",
                usage: car.usage ?? "",
                return: car.return ?? "",
                overtime: car.overtime ?? "",
                address: car.address ?? "",
            });
        }
    }, [car]);

    const { brands, models } = usePage().props;
    // Provide an empty array as a default

    const selectedBrand = brands.find((b) => b.name === formData.brand);
    const filteredModels = models.filter(
        (m) => m.car_brand_id === selectedBrand?.id
    );

    // radio button driver// radio button driver
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;

        setFormData((prev) => {
            if (type === "radio") {
                if (name === "hasDriver") {
                    // Logika untuk radio button "Driver"
                    return {
                        ...prev,
                        hasDriver: value === "withDriver",
                    };
                }
                if (name === "availableStatus") {
                    // Logika untuk radio button "Availability"
                    setIsAvailable(value === "Available");
                    return {
                        ...prev,
                        availableStatus: value,
                    };
                }
            }
            // Logika untuk input lain
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({
            ...prev,
            carImage: [...prev.carImage, ...files],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Final Form Data:", formData);
        alert("Form submitted successfully!");
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 60 }, (_, i) => currentYear - i); // contoh 35 tahun ke belakang

    //   disable button avalaible
    //   const isDisabled = formData.availableStatus === "Not Available";

    return (
        <>
            <Head title="Cars Management" />
            <Layout>
                <div className="p-6 max-w-3xl mx-auto border border-gray-300 rounded-xl">
                    <Head title={`Car Detail - ${car.brand}`} />

                    {/*  button back*/}
                    {/* Back Button */}
                    <div className="mb-6 flex items-center">
                        <Link
                            href={route("owner.cars.management")}
                            className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Cars Management
                        </Link>
                    </div>

                    <h2 className="text-lg text-center font-semibold mb-4">
                        1. Basic Information
                    </h2>
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

                        {/* Model + Type + fuek */}
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
                                />
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="Enter city"
                                />
                            </div>
                        </div>

                        {/* driver & available */}
                        <div className="flex gap-4 mt-1">
                            {/* Driver */}
                            <div className="flex-1">
                                <Label>Driver</Label>
                                <div className="flex gap-4 mt-1">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="hasDriver"
                                            value="withDriver"
                                            disabled={!isAvailable}
                                            checked={
                                                formData.hasDriver === true
                                            }
                                            onChange={handleInputChange}
                                        />
                                        With Driver
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="hasDriver"
                                            value="withoutDriver"
                                            checked={
                                                formData.hasDriver === false
                                            }
                                            onChange={handleInputChange}
                                        />
                                        Without Driver
                                    </label>
                                </div>
                            </div>

                            {/* available */}
                            <div className="flex-1">
                                <Label>availability</Label>
                                <div className="flex gap-4 mt-1">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="availableStatus"
                                            value="Available"
                                            checked={
                                                formData.availableStatus ===
                                                "Available"
                                            }
                                            onChange={handleInputChange}
                                        />{" "}
                                        Available
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="availableStatus"
                                            value="Not Available"
                                            checked={
                                                formData.availableStatus ===
                                                "Not Available"
                                            }
                                            onChange={handleInputChange}
                                        />{" "}
                                        Not Available
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* price & driver fee */}
                        <div className="flex gap-4 mt-1">
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

                            {/* Driver Fees */}

                            {formData.hasDriver && (
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
                            )}

                            {/* Overtime Fee  */}
                            {!formData.hasDriver && (
                                <div className="flex-1">
                                    <Label htmlFor="overtime">
                                        Overtime Fee / Hour
                                    </Label>
                                    <Input
                                        type="text"
                                        id="overtime"
                                        name="overtime"
                                        disabled={!isAvailable}
                                        value={formatRupiah(formData.overtime)} // Gunakan formatRupiah di sini
                                        onChange={(e) => {
                                            const raw = e.target.value.replace(
                                                /\D/g,
                                                ""
                                            );
                                            handleInputChange({
                                                target: {
                                                    name: "overtime",
                                                    value: raw,
                                                },
                                            });
                                        }}
                                        placeholder="Enter overtime fee"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Image Upload */}
                        {/* <div>
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


                        <div className="col-span-2">
                        <label>Image</label>
                        {car.image_url ? (
                            <img src={car.image_url} alt={car.brand} className="w-32 h-24 rounded-lg object-cover mt-2" />
                        ) : (
                            <div className="w-32 h-24 bg-gray-200 rounded-lg flex items-center justify-center mt-2">No Image</div>
                        )}
                        </div> */}

                        {/* Image Upload */}
                        {/* <div>
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
                              </div> */}
                    </div>

                    <h2 className="text-lg text-center font-semibold mb-4">
                        2. Important Information
                    </h2>
                    <div className="space-y-4 ">
                        <div>
                            <Label htmlFor="beforeBooking">
                                Before Booking
                            </Label>
                            <Textarea
                                id="beforeBooking"
                                name="beforeBooking"
                                disabled={!isAvailable}
                                rows={5}
                                placeholder="Enter information for the customer before they book..."
                                value={formData.beforeBooking || ""}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <Label htmlFor="afterBooking">After Booking</Label>
                            <Textarea
                                id="afterBooking"
                                name="afterBooking"
                                rows={5}
                                disabled={!isAvailable}
                                placeholder="Enter information for the customer after they have booked..."
                                value={formData.afterBooking || ""}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <Label htmlFor="atPickUp">At Pick Up</Label>
                            <Textarea
                                id="atPickUp"
                                name="atPickUp"
                                rows={5}
                                disabled={!isAvailable}
                                placeholder="Enter information for the customer when they pick up the car..."
                                value={formData.atPickUp || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <h2 className="text-lg text-center font-semibold mb-4">
                        3. Policies
                    </h2>
                    <div className="space-y-4 ">
                        <div>
                            <Label htmlFor="beforePickup">Before Pickup</Label>
                            <Textarea
                                id="beforePickup"
                                name="beforePickup"
                                rows={5}
                                disabled={!isAvailable}
                                placeholder="Enter policies for the customer before they pick up the car..."
                                value={formData.beforePickup || ""}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <Label htmlFor="atPickup">At Pickup</Label>
                            <Textarea
                                id="atPickup"
                                name="atPickup"
                                rows={5}
                                disabled={!isAvailable}
                                placeholder="Enter policies for the customer at the time of pickup..."
                                value={formData.atPickup || ""}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <Label htmlFor="usage">Usage</Label>
                            <Textarea
                                id="usage"
                                name="usage"
                                rows={5}
                                disabled={!isAvailable}
                                placeholder="Enter policies regarding car usage, such as mileage limits or restrictions..."
                                value={formData.usage || ""}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <Label htmlFor="return">Return</Label>
                            <Textarea
                                id="return"
                                name="return"
                                rows={5}
                                disabled={!isAvailable}
                                placeholder="Enter policies for returning the car, such as fuel level or cleanliness..."
                                value={formData.return || ""}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <Label htmlFor="overtime">Overtime</Label>
                            <Textarea
                                id="overtime"
                                name="overtime"
                                rows={5}
                                disabled={!isAvailable}
                                placeholder="Enter policies for overtime charges or extensions..."
                                value={formData.overtime || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <h2 className="text-lg text-center font-semibold mb-4">
                        4. Rent Detail
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                                id="address"
                                name="address"
                                rows={5}
                                disabled={!isAvailable}
                                placeholder="Enter the pickup address for the car..."
                                value={formData.address || ""}
                                onChange={handleInputChange}
                            />
                            <a
                                href="#"
                                className="text-blue-500 text-sm mt-2 inline-block"
                            >
                                Change your address
                            </a>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default CarDetail;
