import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { calculateDuration } from "./Handle/DurationHendle";
import axios from "axios";
import OwnerInformation from "./Handle/OwnerInformation";

const DetailPrice = ({ car, startDate, endDate, ownerAddress, customerAddress, driverOption, pickupOption, selectedAddress, setTotalPayment }) => {
    const duration = calculateDuration(startDate, endDate);

    const [pickupFee, setPickupFee] = useState(0);

    const [loadingPickup, setLoadingPickup] = useState(false);

    // Hitung pickup fee hanya jika with-driver dan pickupOption === "other"
    useEffect(() => {
        const fetchDistance = async () => {
            if (car.is_driver && driverOption === "with-driver" && pickupOption === "other" && selectedAddress) {
                try {
                    setLoadingPickup(true);

                    const customerAddr = customerAddress.find(addr => addr.id.toString() === selectedAddress);
                    if (!customerAddr || !ownerAddress) return;

                    const res = await axios.post(`/api/calculatePickupFee/${car.id}`, {
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
                } finally {
                    setLoadingPickup(false);
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
                    {/* <div className="grid grid-cols-1 justify-items-center justify-center items-center pb-3">
                        <OwnerInformation car={car} />
                    </div> */}
                    <div className="text-gray-500 text-ms font-light">{car.plate}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 text-lg">
                        <p className="grid grid-cols-1 items-center">{car.brand} {car.model} {car.type}</p>
                        <p className="grid grid-cols-1 justify-items-end items-center ml-1">Rp {car.price_per_day.toLocaleString()}</p>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 mt-0">
                <div className="grid grid-cols-2">
                    <p>Duration Rental</p>
                    <p className="text-end">{duration ? duration.text : "-"}</p>
                </div>
                <Separator />
                <div className="flex justify-between">
                    <span>Biaya Sewa (Rp)</span>
                    <span>{rentalFee.toLocaleString()}</span>
                    {/* <span>{Math.round(rentalFee).toLocaleString()}</span> */}
                </div>
                <div className="flex justify-between">
                    <span>Driver Fee (Rp)</span>
                    <span>{driverFee.toLocaleString()}</span>
                    {/* <span>{Math.round(driverFee) .toLocaleString()}</span> */}
                </div>
                <div className="flex justify-between">
                    <span>Pick Up Location (Rp)</span>
                    {/* <span>{pickupFee.toLocaleString()}</span> */}
                    <span>
                        {loadingPickup ? (
                            <span className="text-gray-400 italic">Loading...</span>
                        ) : (
                            pickupFee.toLocaleString()
                        )}
                    </span>
                    {/* <span>{Math.round(pickupFee / 100) * 100000 .toLocaleString()}</span> */}
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                    <span>Total Payment (Rp)</span>
                    <span>{totalPayment.toLocaleString()}</span>
                    {/* <span>{Math.round(totalPayment / 100) * 100000 .toLocaleString()}</span> */}
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