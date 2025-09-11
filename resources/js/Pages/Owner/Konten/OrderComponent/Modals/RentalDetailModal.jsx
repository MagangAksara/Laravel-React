import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useOverdueTime } from "@/lib/useOverdueTime";

const RentalDetailModal = ({ open, onClose, order }) => {

    if (!order) return null;

    const { overdue } = useOverdueTime(order.end_date, order.status);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-[32%] p-6 rounded-lg shadow-lg">
                <DialogTitle className="flex justify-center  font-bold text-2xl">Order Details</DialogTitle>
                <DialogDescription className="flex flex-row justify-between font-medium">
                    <span className=" text-gray-500 mr-2">Booking ID {order.booking_id}</span>
                    <span className="text-gray-500">{order.date}</span>
                </DialogDescription>

                <div className="mt-2 text-sm space-y-1">

                    {order.status === "cancelled" && (
                        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                            Your order has been cancelled
                        </div>
                    )}

                    {overdue && (
                        <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded mb-4 text-sm font-medium">
                            ⏰ This rental is overdue: {overdue}
                        </div>
                    )}

                    <div className="flex justify-start pb-2 font-medium">
                        <span>{order.car?.brand} {order.car?.model} {order.car?.type}</span>
                    </div>

                    <div className="grid grid-cols-[180px_auto] gap-y-2 text-sm">
                        <div>Renter's Name</div>
                        <div className="text-gray-500">: {order.name}</div>

                        <div>Email</div>
                        <div className="text-gray-500">: {order.email}</div>

                        <div>Phone Number</div>
                        <div className="text-gray-500">: {order.phone}</div>

                        <div>Rental City</div>
                        <div className="text-gray-500">: {order.city}</div>

                        <div>Pick Up Location</div>
                        <div className="text-gray-500">: {order.pickup_location}</div>
                        {/* <div className="text-gray-500">: -</div> */}

                        <div>Date & Time Start</div>
                        <div className="text-gray-500">: {order.start_date}</div>

                        <div>Date & Time End</div>
                        <div className="text-gray-500">: {order.end_date}</div>

                        <div>Duration</div>
                        <div className="text-gray-500">: {order.duration}</div>

                    </div>

                    <div className="pt-3 font-medium">Payment Detail</div>

                    <div className="grid grid-cols-[180px_auto] gap-y-2 text-sm">

                        <div>Payment Method</div>
                        <div className="text-gray-500">: {order.payment_method}</div>

                        <div className="mt-1">Price</div>
                        <div className="flex justify-between text-gray-500 mt-1">
                            <span>: </span>
                            <span>Rp {order.price.toLocaleString()}</span>
                            <span></span>
                        </div>

                        <div className="mt-4">Total Payment</div>
                        <div className="flex justify-between mt-4">
                            <span>: </span>
                            <span>Rp {order.totalPayment.toLocaleString()}</span>
                            <span></span>
                        </div>

                    </div>

                    {order.status === "completed" && (
                        <>
                            <div className="my-4 border-t border-gray-300 mt-2 mb-2"></div>
                            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                                Your order has been completed
                            </div>
                        </>
                    )}

                </div>
            </DialogContent>
        </Dialog >
    );
};

export default RentalDetailModal;
