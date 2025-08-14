import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePage } from "@inertiajs/react";

import HandlePayNow from "./HandlePayNow";

const ReadyToPay = () => {
  const { car, pickup_location, return_location, payment_method } = usePage().props;
  const [loading, setLoading] = useState(false);

    return (
        <>
            <Card>
                <CardContent className="p-6 space-y-4">
                <div className="flex justify-between">
                    <span>Payment Method</span>
                    <Button variant="link" className="p-0 text-blue-500">
                    Choose Payment Method
                    </Button>
                </div>
                <p className="font-semibold">{payment_method}</p>
                <div className="flex justify-between text-lg font-bold">
                    <span>Total Payment</span>
                    <span>Rp {car.total_payment.toLocaleString()}</span>
                </div>
                <Button
                    className="w-full bg-[#1e6fa1] hover:bg-[#195b82]"
                    onClick={() => HandlePayNow({ car, setLoading })}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Pay Now"}
                </Button>
                </CardContent>
            </Card>
        </>
    );
}

export default ReadyToPay;