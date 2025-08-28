import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePage } from "@inertiajs/react";

// import HandlePayNow from "./Handle/HandlePayNow";

const ReadyToPay = ({ loading, onPayNow }) => {
    // const [loading, setLoading] = useState(false);

    return (
        <>
            <CardContent>
                <Button
                    className="w-full bg-[#1e6fa1] hover:bg-[#195b82]"
                    onClick={onPayNow}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Pay Now"}
                </Button>
            </CardContent>
        </>
    );
}

export default ReadyToPay;