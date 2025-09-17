import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/Components/ui/button";

import HandlePayFine from "../Hooks/HandlePayFine";

const PayExtra = ({ open, onClose, order }) => {
    const [loading, setLoading] = useState(false);

    if (!order) return null;

    const handlePayPenalty = async () => {
        await HandlePayFine({
            car: order.car,
            customerEmail: order.email,
            setLoading,
            totalPayment: order.total_fine, // ⬅️ total denda
            rentalId: order.id,            // ⬅️ kirim rental id
            fineId: order.fine_id ?? 0,    // ⬅️ kirim fine id
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-[700px] p-6 rounded-lg shadow-lg">

                <DialogDescription className="flex flex-row justify-between font-medium px-5">
                    <span className=" text-gray-500 mr-2">Booking ID {order.booking_id}</span>
                    <span className="text-gray-500">{order.date}</span>
                </DialogDescription>
                <DialogTitle className="flex flex-row font-bold text-2xl py-4">
                    {/* ️<img
                        src={order.carUserImage}
                        alt="UserOwnerProfile"
                        className="w-[50px] h-[50px] object-cover rounded-full inline-block mr-2"
                    />
                    <span className="flex flex-col">
                        <span className="text-lg">{order.carUserName}</span>
                        <span className="text-sm">{order.carUserCity}</span>
                    </span> */}
                </DialogTitle>

                <div className="space-y-1">
                    <div className="grid grid-cols-2 items-center pb-5">
                        <div className="flex justify-items-start items-center text-start gap-3">
                            <img
                                src={order.car.image}
                                alt="CarImage"
                                className="w-[60px] h-[60px] rounded-full" />
                            <span className="font-medium text-lg">
                                {order.car.brand} {order.car.model} {order.car.type}
                            </span>
                        </div>
                        <div className="flex justify-end items-center gap-3">
                            <span className="flex flex-col">
                                <span className="text-lg">{order.carUserName}</span>
                                <span className="text-sm">{order.carUserCity}</span>
                            </span>
                            ️<img
                                src={order.carUserImage}
                                alt="UserOwnerProfile"
                                className="w-[50px] h-[50px] object-cover rounded-full inline-block mr-2"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-center text-center border-b-2 border-gray-400 pb-3">
                        <div className="flex flex-col justify-items-center">
                            <span className="font-medium">Overtime</span>
                        </div>
                        <div className="flex flex-col justify-items-center">
                            <span className="pt-2">{order.overtime} hours</span>
                        </div>
                        <div className="flex flex-col justify-items-end items-end text-end">
                            <span className="pl-2">Rp {order.overtime_amount.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-center text-center border-b-2 border-gray-400 pb-3">
                        <div className="flex flex-col justify-items-center">
                            <span className="font-medium">Damage</span>
                        </div>
                        <div className="flex flex-col justify-items-center">
                            <span className="pt-1">{order.damage_type}</span>
                        </div>
                        <div className="flex flex-col justify-items-end items-end text-end">
                            <span className="pl-2">Rp {order.damage_amount.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-center text-center py-3">
                        <div></div>
                        <div className="grid grid-cols-1 justify-items-center items-center text-center gap-3">
                            <span className="font-bold text-xl">Total Fine Penalty</span>
                        </div>
                        <div className="grid grid-cols-1 justify-items-end items-center text-center gap-3">
                            <span className="font-bold text-blue-600 text-xl">
                                Rp {order.total_fine.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="flex justify-end pt-3">
                        <Button 
                            className="w-full px-8 bg-blue-500 hover:bg-blue-900 text-white"
                            disabled={loading}
                            onClick={handlePayPenalty}
                        >
                            {loading ? "Processing..." : "Pay Penalty Now"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    );
};

export default PayExtra;
