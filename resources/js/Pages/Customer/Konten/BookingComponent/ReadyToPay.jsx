import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePage } from "@inertiajs/react";

import HandlePayNow from "./Handle/HandlePayNow";

const ReadyToPay = ({ car, totalPayment, startDate, endDate }) => {
    const { payment_method } = usePage().props;
    const [loading, setLoading] = useState(false);

    return (
        <>
            <CardContent>
                <Button
                    className="w-full bg-[#1e6fa1] hover:bg-[#195b82]"
                    // onClick={() => HandlePayNow({ car, setLoading, totalPayment })}
                    onClick={() => HandlePayNow({ car, setLoading, totalPayment, startDate, endDate })}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Pay Now"}
                </Button>
            </CardContent>
        </>
    );
}

export default ReadyToPay;