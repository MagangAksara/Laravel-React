import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

import RentalDetailModal from "./Modals/RentalDetailModal";
import FinishNowModal from "./Modals/FinishNowModal";
import ExtraPaymentModal from "./Modals/ExtraPaymentModal";
import OrderItem from "./OrderItem"; // ✅ pakai komponen child
import { useOverdueTime } from "@/lib/useOverdueTime";

const OrderList = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openFinishNow, setOpenFinishNow] = useState(false);
  const [openExtraPayment, setOpenExtraPayment] = useState(false);

  // Overdue khusus untuk modal FinishNow
  const selectedOverdue = useOverdueTime(
    selectedOrder?.end_date,
    selectedOrder?.status
  );

  const handleExtraPaymentSubmit = (e, { images, selected, value }) => {
    e.preventDefault();
    if (!selectedOrder) return;

    const formData = new FormData();
    formData.append("rental_id", selectedOrder.id);
    formData.append("damage_type", selected[0] || "Extra Charges");
    formData.append("extra_amount", value.replace(/\./g, ""));
    formData.append("description", e.target.description.value);

    images.forEach((img, i) => formData.append(`images[${i}]`, img.file));

    router.post(route("rentals.updateExtraPayment", selectedOrder.id), formData, {
      forceFormData: true,
      onSuccess: () => {
        toast.success("Extra payment added successfully");
        setOpenExtraPayment(false);
      },
      onError: (errors) => {
        toast.error("Failed to add extra payment");
        console.log(errors);
      },
    });
  };

  return (
    <div className="space-y-2">
      {orders.length > 0 ? (
        orders.map((order) => (
          <OrderItem
            key={order.id}
            order={order}
            onOpenDetail={(order) => {
              setSelectedOrder(order);
              setOpenDetail(true);
            }}
            onOpenFinishNow={(order) => {
              setSelectedOrder(order);
              setOpenFinishNow(true);
            }}
            onOpenExtraPayment={(order) => {
              setSelectedOrder(order);
              setOpenExtraPayment(true);
            }}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">Tidak ada data order</p>
      )}

      {/* Modal */}
      <RentalDetailModal
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        order={selectedOrder}
      />
      <FinishNowModal
        open={openFinishNow}
        onClose={() => setOpenFinishNow(false)}
        order={selectedOrder}
        onConfirm={() => {
          if (!selectedOrder) return;

          router.patch(
            route("rentals.updateStatus", selectedOrder.id),
            { overdue: selectedOverdue.overdueHours }, // ✅ pakai overdue dari hook
            {
              preserveState: true,
              onSuccess: () => toast.success("Status updated successfully"),
              onError: () => toast.error("Gagal update status"),
              onFinish: () => setOpenFinishNow(false),
            }
          );
        }}
      />
      <ExtraPaymentModal
        open={openExtraPayment}
        onClose={() => setOpenExtraPayment(false)}
        order={selectedOrder}
        onSubmit={handleExtraPaymentSubmit}
      />
    </div>
  );
};

export default OrderList;
