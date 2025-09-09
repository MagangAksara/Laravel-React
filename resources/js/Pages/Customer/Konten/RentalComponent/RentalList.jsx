import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";

import { useOverdueTime } from "@/lib/useOverdueTime";

import RentalDetailModal from "./Modals/RentalDetailModal";
import UploadImageModal from "./Modals/UploadImageModal";
import CancelledModal from "./Modals/CancelledModal";
import CancelAndRefundModal from "./Modals/CancelAndRefundModal";

const RentalList = ({ rentals }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openDetail, setOpenDetail] = useState(false);
    const [openUpload, setOpenUpload] = useState(false);
    const [openCancelled, setOpenCancelled] = useState(false);
    const [openCancelAndRefund, setOpenCancelAndRefund] = useState(false);

    const handleOpenDetail = (order) => {
        setSelectedOrder(order);
        setOpenDetail(true);
    };

    const handleOpenUpload = (order) => {
        setSelectedOrder(order);
        setOpenUpload(true);
    };

    const handleOpenCancelled = (order) => {
        setSelectedOrder(order);
        setOpenCancelled(true);
    };

    const handleOpenCancelAndRefund = (order) => {
        setSelectedOrder(order);
        setOpenCancelAndRefund(true);
    }

    return (
        <div className="space-y-4">
            {rentals.length > 0 ? (
                rentals.map((order) => {
                    const overdue = useOverdueTime(order.end_date, order.status);

                    return (
                    <Card key={order.id} className="shadow-md">
                        {/* Header */}
                        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <div className="text-sm text-gray-500">
                                Booking ID {order.booking_id}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm">{order.date}</span>
                                <Badge
                                    variant={
                                        order.status === "pending_payment"
                                            ? "outline"
                                            : order.status === "confirmed_payment"
                                                ? "default"
                                                : order.status === "on_rent"
                                                    ? "secondary"
                                                    : "outline"
                                    }
                                >
                                    {order.statusLabel}
                                </Badge>
                            </div>
                        </CardHeader>

                        {/* Content */}
                        <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t p-4">

                            {/* Car Info */}
                            <div className="flex items-center gap-4 mt-3 flex-1">
                                <img
                                    src={
                                        order.car?.image?.startsWith("http")
                                            ? order.car.image
                                            : `/storage/${order.car.image}`
                                    }
                                    alt={order.car?.model}
                                    className="w-20 h-20 object-cover rounded-full self-center"
                                />
                                <div>
                                    <p className="font-semibold">
                                        {order.car?.brand} {order.car?.model}{" "}
                                        {order.car?.type}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Duration Rental: {order.duration}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Price per day: Rp {order.price.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="flex flex-col text-right w-full md:justify-center md:text-center md:min-w-[350px] md:w-auto">
                                <p className="text-sm text-gray-500">Total Payment</p>
                                <p className="font-semibold text-lg">
                                    Rp {order.totalPayment.toLocaleString()}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2 justify-end w-full md:flex-row md:flex-wrap md:w-auto md:min-w-[350px]">
                                <Button
                                    variant="outline"
                                    onClick={() => handleOpenDetail(order)}
                                >
                                    See Details
                                </Button>
                                {order.status === "pending_payment" && (
                                    <>
                                        <Button
                                            variant="destructive"
                                            onClick={() => handleOpenCancelled(order)}
                                        >
                                            Cancelled
                                        </Button>
                                        <Button
                                            className="bg-blue-500 hover:bg-blue-600 text-white"
                                            // onClick={() => window.open(order.url_payment, "_blank")}
                                            onClick={() => order.url_payment && (window.location.href = order.url_payment)}
                                        >
                                            Pay Now
                                        </Button>
                                    </>
                                )}
                                {/* masih belum fungsi di bagian refund */}
                                {order.status === "confirmed_payment" && (
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleOpenCancelAndRefund(order)}
                                    >
                                        Cancel and Refund
                                    </Button>
                                )}
                                {order.status === "on_rent" && (
                                    <Button
                                        className="bg-green-500 hover:bg-green-300 text-white hover:text-black"
                                        onClick={() => handleOpenUpload(order)}
                                    >
                                        Upload Image
                                    </Button>
                                )}
                                {order.status === "completed" && (
                                    <Button variant="outline">Give Review</Button>
                                )}
                            </div>

                            {/* Warnings */}
                            {overdue && (
                                <div className="mt-2 p-2 bg-red-100 text-red-600 rounded text-sm font-medium w-full text-center">
                                    ⚠ Rental time has passed end date: {overdue}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    );
                })
            ) : (
                <p className="text-center text-gray-500">Tidak ada data rental</p>
            )}

            {/* Modal dipanggil di bawah */}
            <RentalDetailModal open={openDetail} onClose={() => setOpenDetail(false)} order={selectedOrder} />
            <UploadImageModal
                open={openUpload}
                onClose={() => setOpenUpload(false)}
                order={selectedOrder}
            />
            <CancelledModal
                open={openCancelled}
                onClose={() => setOpenCancelled(false)}
                order={selectedOrder}
                onConfirm={(reason) => {
                    if (!selectedOrder) return;
                    router.patch(route("rental.cancelled", selectedOrder.id),
                        { reason },
                        {
                            preserveState: true,
                            onSuccess: () => toast.success("Order cancelled successfully"),
                            onError: () => toast.error("Failed to cancel order"),
                            onFinish: () => setOpenCancelled(false),
                        }
                    );
                }}
            />
            <CancelAndRefundModal
                open={openCancelAndRefund}
                onClose={() => setOpenCancelAndRefund(false)}
                order={selectedOrder}
            />
        </div>
    );
}

export default RentalList;