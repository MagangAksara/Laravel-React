import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useOverdueTime } from "@/lib/useOverdueTime";

const RentalItem = ({ order, onOpenDetail, onOpenUpload, onOpenCancelled, onOpenCancelAndRefund, onOpenPayExtra }) => {
    const { overdue } = useOverdueTime(order.end_date, order.status);

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
            <CardContent className="grid grid-cols-1 md:grid-cols-3 items-start md:items-center gap-4 border-t p-4">

                {/* Car Info */}
                <div className="flex items-center gap-4 mt-3 flex-1">
                    <img
                        src={
                            order.car?.image?.startsWith("http")
                                ? order.car.image
                                : `/storage/${order.car.image}`
                        }
                        alt={order.car?.model}
                        className="w-auto h-10 md:h-20 object-cover rounded-md self-center"
                    />
                    <div>
                        <p className="font-semibold">
                            {order.car?.brand} {order.car?.model}{" "}
                            {order.car?.type}
                        </p>
                        <p className="text-sm text-gray-500">
                            Duration: {order.duration}
                        </p>
                        <p className="text-sm text-gray-500">
                            Price/day: Rp {order.price.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Payment Info */}
                <div className="grid grid-cols-1 text-right justify-items-end">
                    <p className="text-sm text-gray-500">Total Payment</p>
                    <p className="font-semibold text-lg">
                        Rp {order.totalPayment.toLocaleString()}
                    </p>
                </div>

                {/* Actions */}
                <div
                    className={`grid grid-cols-1 gap-2 justify-end ${order.status === "on_rent"
                        ? "md:grid-cols-2"
                        : order.status === "waiting_for_payment"
                            ? "lg:grid-cols-3"
                            : "lg:flex lg:justify-end"
                        }`}
                >
                    <Button
                        variant="outline"
                        onClick={() => onOpenDetail(order)}
                    >
                        See Details
                    </Button>
                    {order.status === "pending_payment" && (
                        <>
                            <Button
                                variant="destructive"
                                onClick={() => onOpenCancelled(order)}
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
                    {/* {order.status === "confirmed_payment" && (
                        <Button
                            variant="destructive"
                            onClick={() => onOpenCancelAndRefund(order)}
                        >
                            Cancel and Refund
                        </Button>
                    )} */}
                    {order.status === "on_rent" && (
                        <Button
                            className="bg-green-500 hover:bg-green-600 text-white hover:text-black"
                            onClick={() => onOpenUpload(order)}
                        >
                            Upload Image
                        </Button>
                    )}
                    {order.status === "completed" && (
                        <Button
                            className="bg-blue-500 hover:bg-blue-600 text-white hover:text-black"
                        >
                            Give Review
                        </Button>
                    )}
                    {order.status === "waiting_for_fines_payment" && (
                        <Button
                            className="bg-blue-500 hover:bg-blue-600 text-white hover:text-black"
                            onClick={() => onOpenPayExtra(order)}
                        >
                            Pay a Pinalty
                        </Button>
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
};

export default RentalItem;