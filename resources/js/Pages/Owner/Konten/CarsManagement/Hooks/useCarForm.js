// hooks/useCarForm.js
import { useState, useEffect } from "react";

export default function useCarForm(car) {
    const [isAvailable, setIsAvailable] = useState(true);

    const formatRupiah = (value) => {
        if (!value) return "";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
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
        usage: "",
        return: "",
        overtime: "",
        address: "",
    });

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
                overtimeFee: car.overtime_fee ?? "",
                carImage: [
                    ...(car.photo ? [car.photo] : []), // main image
                    ...(car.image_paths || []), // 🔥 tambahan image_path
                ],
                beforeBooking: car.before_booking ?? "",
                afterBooking: car.after_booking ?? "",
                duringPickup: car.during_pickup ?? "",
                beforePickup: car.before_pickup ?? "",
                atPickUp: car.at_pickup ?? "",
                usage: car.usage ?? "",
                return: car.return ?? "",
                overtime: car.overtime ?? "",
                address: car.address ?? "",
            });
        }
    }, [car]);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => {
            if (type === "radio") {
                if (name === "hasDriver")
                    return { ...prev, hasDriver: value === "withDriver" };
                if (name === "availableStatus") {
                    setIsAvailable(value === "Available");
                    return { ...prev, availableStatus: value };
                }
            }
            return { ...prev, [name]: value };
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({
            ...prev,
            carImage: [...prev.carImage, ...files],
        }));
    };

    const handleRemoveImage = (indexToRemove) => {
        setFormData((prev) => ({
            ...prev,
            carImage: prev.carImage.filter(
                (_, index) => index !== indexToRemove
            ),
        }));
    };

    return {
        isAvailable,
        formatRupiah,
        formData,
        setFormData,
        handleInputChange,
        handleImageChange,
        handleRemoveImage,
    };
}
