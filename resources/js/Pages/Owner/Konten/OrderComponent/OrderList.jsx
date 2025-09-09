import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useOverdueTime } from "@/lib/useOverdueTime";

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
        <div className="space-y-2">
            {orders.length > 0 ? (
                orders.map((order) => {
                    const overdue = useOverdueTime(order.end_date, order.status);
                    return (
                        <Card key={order.id} className="shadow-md">
                            {/* Header */}
                            <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center ">
                                <div className="text-xs md:text-sm text-gray-500">
                                    Booking ID {order.booking_id}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs md:text-sm">{order.date}</span>
                                    <Badge
                                        className="text-xs md:text-sm"
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
                                        className="w-10 h-10 md:w-20 md:h-20 object-cover rounded-full self-center"
                                    />
                                    <div className="">
                                        <p className="text-sm md:text-md lg:text-lg font-semibold">
                                            {order.car?.brand} {order.car?.model}{" "}
                                            {order.car?.type}
                                        </p>
                                        <p className="text-xs md:text-sm text-gray-500">
                                            Duration order: {order.duration}
                                        </p>
                                        <p className="text-xs md:text-sm text-gray-500">
                                            Price per day: Rp {order.price.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Payment Info */}
                                <div className="flex flex-col gap-2 justify-center items-center">
                                    <p className="text-xs md:text-sm text-gray-500">Total Payment</p>
                                    <p className="font-semibold text-md md:text-lg">
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
                                        // button untuk mengkonfirmasi bahwa customer telah mengembalikan mobil yang desewanya
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
                                    {/* Warnings */}
                                    {overdue && (
                                        <div className="mt-2 p-2 bg-yellow-100 text-yellow-700 rounded text-sm font-medium col-span-3 text-center">
                                            ⏰ This rental is overdue: {overdue}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )
                })
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