import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { calculateDuration } from "./Handle/DurationHendle";
import axios from "axios";
import OwnerInformation from "./Handle/OwnerInformation";

const DetailPrice = ({ car, startDate, endDate, ownerAddress, customerAddress, driverOption, pickupOption, selectedAddress, setTotalPayment }) => {
    const duration = calculateDuration(startDate, endDate);

    const [pickupFee, setPickupFee] = useState(0);

    // Hitung pickup fee hanya jika with-driver dan pickupOption === "other"
    useEffect(() => {
        const fetchDistance = async () => {
            if (car.is_driver && driverOption === "with-driver" && pickupOption === "other" && selectedAddress) {
                try {
                    const customerAddr = customerAddress.find(addr => addr.id.toString() === selectedAddress);
                    if (!customerAddr || !ownerAddress) return;

                    const res = await axios.post("/api/calculatePickupFee", {
                        start_lat: ownerAddress.latitude,
                        start_lon: ownerAddress.longitude,
                        end_lat: customerAddr.latitude,
                        end_lon: customerAddr.longitude,
                    });

                    if (res.data && res.data.distance_km) {
                        // 5000 per meter => distance_km * 1000 meter
                        // karena sudah dari distance
                        setPickupFee(res.data.distance_km * 1000);
                    }
                } catch (err) {
                    console.error("Error fetching pickup fee:", err);
                }
            } else {
                setPickupFee(0);
            }
        };

        fetchDistance();
    }, [driverOption, pickupOption, selectedAddress, ownerAddress, customerAddress]);

    // Biaya sewa per hari × durasi
    const rentalFee = car.price_per_day * (duration?.totalDays) || car.price_per_day;

    // Driver fee default × durasi
    const driverFee = (car.is_driver && driverOption === "with-driver")
        ? car.driver_fee * (duration?.totalDays || 1)
        : 0;

    // Total pembayaran
    const totalPayment = rentalFee + driverFee + pickupFee;

    useEffect(() => {
        if (setTotalPayment) {
            setTotalPayment(totalPayment);
        }
    }, [totalPayment, setTotalPayment]);

    return (
        <>
            {/* <Card> */}
                <CardHeader>
                    <CardTitle className="mb-0 pb-0">
                        <OwnerInformation car={car}/>
                        <div className="flex text-lg">
                            <p>{car.brand} {car.model} {car.type}</p>
                            <p className="ml-1"> -- Rp {car.price_per_day.toLocaleString()}</p>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 mt-0">
                    <p>Duration Rental: {duration ? duration.text : "-"}</p>
                    <Separator />
                        <div className="flex justify-between">
                            <span>Biaya Sewa</span>
                            <span>Rp {rentalFee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Driver Fee</span>
                            <span>Rp {driverFee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Pick Up Location</span>
                            <span>Rp {pickupFee.toLocaleString()}</span>
                        </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                        <span>Total Payment</span>
                        <span>Rp {totalPayment.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                        With driver bookings, meals, fuel, tolls, etc. are counted as additional costs not included in the system.
                    </p>
                </CardContent>
            {/* </Card> */}
        </>
    );
}

export default DetailPrice;