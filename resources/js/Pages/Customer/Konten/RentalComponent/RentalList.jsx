import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";

import { useOverdueTime } from "@/lib/useOverdueTime";

import RentalItem from "./RentalItem"; // ✅ pakai komponen child

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
                    return (
                        <RentalItem
                            key={order.id}
                            order={order}
                            onOpenDetail={handleOpenDetail}
                            onOpenUpload={handleOpenUpload}
                            onOpenCancelled={handleOpenCancelled}
                            onOpenCancelAndRefund={handleOpenCancelAndRefund}
                        />
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