import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const RentalDetailModal = ({ open, onClose, order, selectedImage, setSelectedImage }) => {

    if (!order) return null;

    // Set default image ketika order berubah
    useEffect(() => {
        if (order?.imgFine_path && order.imgFine_path.length > 0) {
            setSelectedImage(order.imgFine_path[0]);
        } else {
            setSelectedImage(null);
        }
    }, [order]);

    if (!order) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-[32%] p-6 rounded-lg shadow-lg overflow-y-auto max-h-[95vh]" style={{ scrollbarWidth: 'none' }}>

                <DialogTitle className="flex justify-center  font-bold text-2xl">Order Details</DialogTitle>
                <DialogDescription className="flex flex-row justify-between font-medium">
                    <span className=" text-gray-500 mr-2">Booking ID {order.booking_id}</span>
                    <span className="text-gray-500">{order.date}</span>
                </DialogDescription>

                <div className="mt-2 text-sm space-y-1">

                    {[order.status === "cancelled" || order.status === "expired"] && (
                        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                            Your order has been cancelled or expired
                        </div>
                    )}

                    {order.status === "completed" && (
                        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                            Your order has been completed
                        </div>
                    )}

                    <div className="flex justify-start pb-2 font-medium text-xl">
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
                    </div>

                    <div className="pt-3 font-medium text-base">Pick Up Location</div>

                    <div className="grid grid-cols-[180px_auto] gap-y-2 text-sm">

                        {/* city */}
                        <div>City</div>
                        <div className="text-gray-500">: {order.pickup_location.city}</div>

                        <div>Detail</div>
                        <div className="text-gray-500">: {order.pickup_location.detail}</div>

                    </div>

                    <div className="pt-3 font-medium text-base">Detail Rentals Duration</div>

                    <div className="grid grid-cols-[180px_auto] gap-y-2 text-sm">

                        <div>Date & Time Start</div>
                        <div className="text-gray-500">: {order.start_date}</div>

                        <div>Date & Time End</div>
                        <div className="text-gray-500">: {order.end_date}</div>

                        <div>Duration</div>
                        <div className="text-gray-500">: {order.duration}</div>

                    </div>

                    <div className="pt-3 font-medium text-base">Payment Detail</div>

                    <div className="grid grid-cols-[180px_auto] gap-y-2 text-sm">

                        <div>Payment Method</div>
                        <div className="text-gray-500">: {order.payment_method}</div>

                        <div className="mt-1">Price</div>
                        <div className="text-gray-500">: Rp {order.price.toLocaleString()}</div>

                        <div className="py-4 text-base">Total Payment</div>
                        <div className="mt-4 text-base">: Rp {order.totalPayment.toLocaleString()}</div>
                    </div>

                    {order.fine_id && (order.status === "waiting_for_fines_payment" || order.status === "completed") && (
                        <>
                            <div className="py-4 border-t border-gray-500">
                                {order.status === "waiting_for_check" && (
                                    <>
                                        <div className="pt-3 font-medium text-base">Penalty Detail</div>

                                        <div className="grid grid-cols-[180px_auto] gap-y-2 text-sm">
                                            <div>Overtime</div>
                                            <div className="text-gray-500">: {order.overtime} Hours</div>

                                            <div>Overtime Fee</div>
                                            <div className="text-gray-500">: Rp {order.overtime_amount.toLocaleString()}</div>
                                        </div>
                                    </>
                                )}

                                <div className="pt-3 font-medium text-base">Penalty Detail</div>

                                <div className="grid grid-cols-[180px_auto] gap-y-2 text-sm">
                                    <div>Overtime</div>
                                    <div className="text-gray-500">: {order.overtime} Hours</div>

                                    <div>Overtime Fee</div>
                                    <div className="text-gray-500">: Rp {order.overtime_amount.toLocaleString()}</div>

                                    <div className="pt-4">Damage Type</div>
                                    <div className="text-gray-500 pt-4">: {order.damage_type} Hours</div>

                                    <div>Damage Fee</div>
                                    <div className="text-gray-500">: Rp {order.damage_amount.toLocaleString()}</div>

                                    <div className="py-4 text-base">Total Penalty Payment</div>
                                    <div className="py-4 text-base">: Rp {order.total_fine.toLocaleString()}</div>

                                    <div>Payment Method</div>
                                    <div className="text-gray-500 pb-6">: {order.methodFinePayment}</div>
                                </div>

                                {order.imgFine_path && order.imgFine_path.length > 0 && (
                                    <>
                                        <div className="py-4 border-t border-gray-500">

                                            {/* Full Image */}
                                            {selectedImage && (
                                                <div className="mb-4">
                                                    <img
                                                        src={`/storage/${selectedImage}`}
                                                        alt="Full Proof of Payment"
                                                        className="w-full max-h-[500px] object-contain rounded-lg shadow"
                                                    />
                                                </div>
                                            )}

                                            {/* Mini Images */}
                                            <div className="flex gap-3 flex-wrap">
                                                {order.imgFine_path.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={`/storage/${image}`}
                                                        alt={`Proof of Payment ${index + 1}`}
                                                        onClick={() => setSelectedImage(image)}
                                                        className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition ${selectedImage === image ? "border-blue-500" : "border-transparent"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog >
    );
};

export default RentalDetailModal;
