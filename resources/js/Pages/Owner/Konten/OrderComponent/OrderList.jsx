import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import RentalDetailModal from "./Modals/RentalDetailModal";
import FinishNowModal from "./Modals/FinishNowModal";
import ExtraPaymentModal from "./Modals/ExtraPaymentModal";

const OrderList = ({ orders }) => {

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openDetail, setOpenDetail] = useState(false);
    const [openFinishNow, setOpenFinishNow] = useState(false);
    const [openExtraPayment, setOpenExtraPayment] = useState(false);

    const handleOpenDetail = (order) => {
        setSelectedOrder(order);
        setOpenDetail(true);
    };

    const handleOpenFinishNow = (order) => {
        setSelectedOrder(order);
        setOpenFinishNow(true);
    };

    const handleOpenExtraPayment = (order) => {
        setSelectedOrder(order);
        setOpenExtraPayment(true);
    };

    return (
        <div className="space-y-4">
            {orders.length > 0 ? (
                orders.map((order) => (
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
                        <CardContent className="grid grid-cols-1 lg:grid-cols-3 items-start md:items-center gap-4 border-t p-4">

                            {/* Car Info */}
                            <div className="flex flex-row justify-center lg:justify-start items-center gap-4">
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
                                        Duration order: {order.duration} day
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Price per day: Rp {order.price.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="flex flex-col gap-2 justify-center items-center">
                                <p className="text-sm text-gray-500">Total Payment</p>
                                <p className="font-semibold text-lg">
                                    Rp {order.totalPayment.toLocaleString()}
                                </p>
                            </div>

                            {/* Actions */}
                            <div
                                className={`${
                                    // cek kondisi tombol
                                    (order.status !== "waiting_for_check" && order.status !== "on_rent")
                                        ? "grid grid-cols-1 lg:flex lg:justify-end" // hanya ada 1 tombol → geser kanan
                                        : order.status === "on_rent"
                                            ? "grid grid-cols-1 lg:grid-cols-2 gap-2 justify-end" // ada 2 tombol (Details + Finish)
                                            : "grid grid-cols-1 lg:grid-cols-2 gap-2 justify-end" // waiting_for_check (Complete + Extra Payment)
                                    }`}
                            >
                                {order.status !== "waiting_for_check" && (
                                    <Button
                                        variant="outline"
                                        onClick={() => handleOpenDetail(order)}
                                    >
                                        See Details
                                    </Button>
                                )}
                                {order.status === "on_rent" && (
                                    <Button
                                        className="bg-blue-400 hover:bg-blue-700 text-white"
                                        onClick={() => handleOpenFinishNow(order)}
                                    >
                                        Finish
                                    </Button>
                                )}
                                {order.status === "waiting_for_check" && (
                                    <>
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                router.patch(route("rentals.updateStatus", order.id), {}, {
                                                    preserveState: true,
                                                    onSuccess: () => toast.success("Status updated successfully"),
                                                    onError: () => toast.error("Gagal update status"),
                                                })
                                            }
                                        >
                                            Complete
                                        </Button>
                                        <Button
                                            className="bg-blue-400 hover:bg-blue-700 text-white"
                                            onClick={() => handleOpenExtraPayment(order)}
                                        >
                                            Extra Payment
                                        </Button>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <p className="text-center text-gray-500">Tidak ada data order</p>
            )}

            {/* Modal dipanggil di bawah */}
            <RentalDetailModal open={openDetail} onClose={() => setOpenDetail(false)} order={selectedOrder} />
            <FinishNowModal
                open={openFinishNow}
                onClose={() => setOpenFinishNow(false)}
                order={selectedOrder}
                onConfirm={() => {
                    if (!selectedOrder) return;
                    router.patch(route("rentals.updateStatus", selectedOrder.id), {}, {
                        preserveState: true,
                        onSuccess: () => toast.success("Status updated successfully"),
                        onError: () => toast.error("Gagal update status"),
                        onFinish: () => setOpenFinishNow(false),
                    });
                }}
            />
            <ExtraPaymentModal open={openExtraPayment} onClose={() => setOpenExtraPayment(false)} order={selectedOrder} />
        </div >
    );
}

export default OrderList;