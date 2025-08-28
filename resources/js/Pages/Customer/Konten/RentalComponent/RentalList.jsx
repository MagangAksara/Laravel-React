import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const RentalList = ({ rentals }) => {

    return (
        <div className="space-y-4">
            {rentals.length > 0 ? (
                rentals.map((order) => (
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
                    <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center border-t">
                        
                        {/* Car Info */}
                        <div className="flex items-center gap-4 mt-3">
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
                        <div className="text-right space-y-1">
                        <p className="text-sm text-gray-500">Total Payment</p>
                        <p className="font-semibold text-lg">
                            Rp {order.totalPayment.toLocaleString()}
                        </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-row gap-2 w-full md:w-auto">
                        <Button variant="outline">See Details</Button>
                        {order.status === "pending_payment" && (
                            <Button 
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={() => window.location.href = order.url_payment}
                            >
                            Pay Now
                            </Button>
                        )}
                        {order.status === "confirmed_payment" && (
                            <Button variant="destructive">Cancelled</Button>
                        )}
                        {order.status === "completed" && (
                            <Button variant="outline">Give Review</Button>
                        )}
                        </div>
                    </CardContent>
                    </Card>
                ))
            ) : (
            <p className="text-center text-gray-500">Tidak ada data rental</p>
            )}
        </div>
    );
}

export default RentalList;