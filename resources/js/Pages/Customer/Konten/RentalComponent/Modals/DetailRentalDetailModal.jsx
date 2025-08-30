import React from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const RentalDetailModal = ({ open, onClose, order }) => {
    if (!order) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-6 rounded-lg shadow-lg">
                <div className="flex flex-col border-b pb-1">
                    <div className="flex justify-end">
                        <button onClick={onClose}>
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <h2 className="text-xl font-semibold">Order Details</h2>
                    </div>
                </div>

                <div className="mt-2 text-sm space-y-1">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Booking ID</span>
                        <span>{order.booking_id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Car</span>
                        <span>{order.car?.brand} {order.car?.model} {order.car?.type}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Renter's Name</span>
                        <span>{order.renter_name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Email</span>
                        <span>{order.email}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Phone</span>
                        <span>{order.phone}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Rental City</span>
                        <span>{order.city}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Start</span>
                        <span>{order.start_date}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">End</span>
                        <span>{order.end_date}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Duration</span>
                        <span>{order.duration}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Price/day</span>
                        <span>Rp {order.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2">
                        <span>Total Payment</span>
                        <span>Rp {order.totalPayment.toLocaleString()}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RentalDetailModal;
