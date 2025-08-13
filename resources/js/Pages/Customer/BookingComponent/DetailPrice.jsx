import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link, router, usePage } from "@inertiajs/react";

const DetailPrice = () => {
    const { car, pickup_location, return_location, payment_method } = usePage().props;
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Yoger Car Malang</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p className="font-semibold">
                        {car.brand} {car.model}
                    </p>
                    <p>Duration Rental: {car.duration}</p>
                    <Separator />
                        <div className="flex justify-between">
                            <span>Total Price</span>
                            <span>Rp {car.total_price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Driver Fee</span>
                            <span>Rp {car.driver_fee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Pick Up Location</span>
                            <span>Rp {car.pickup_fee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Return Location</span>
                            <span>Rp {car.return_fee.toLocaleString()}</span>
                        </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                        <span>Total Payment</span>
                        <span>Rp {car.total_payment.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                        With driver bookings, meals, fuel, tolls, etc. are counted as additional costs not included in the system.
                    </p>
                </CardContent>
            </Card>
        </>
    );
}

export default DetailPrice;