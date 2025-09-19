import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useOverdueTime } from "@/lib/useOverdueTime";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

const OrderItem = ({ order, onOpenDetail, onOpenFinishNow, onOpenExtraPayment }) => {
  const { overdue } = useOverdueTime(order.end_date, order.status);

  return (
    <Card key={order.id} className="shadow-md">
      {/* Header */}
      <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center">
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
            className="w-[100px] h-auto md:w-[150px] object-cover rounded-md self-center"
          />
          <div>
            <p className="text-sm md:text-md lg:text-lg font-semibold">
              {order.car?.brand} {order.car?.model} {order.car?.type}
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
          className={`grid grid-cols-1 gap-2 justify-end ${order.status === "on_rent"
              ? "lg:grid-cols-2"
              : order.status === "waiting_for_payment"
                ? "lg:grid-cols-3"
                : "lg:flex lg:justify-end"
            }`}
        >
          <Button variant="outline" onClick={() => onOpenDetail(order)}>
            See Details
          </Button>

          {order.status === "on_rent" && (
            <Button
              className="bg-blue-400 hover:bg-blue-700 text-white"
              onClick={() => onOpenFinishNow(order)}
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
                onClick={() => onOpenExtraPayment(order)}
              >
                Extra Payment
              </Button>
            </>
          )}
        </div>

        {/* Warnings */}
        {overdue && (
          <div className="mt-2 p-2 bg-yellow-100 text-yellow-700 rounded text-sm font-medium col-span-3 text-center">
            ⏰ This rental is overdue: {overdue}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderItem;
