import React from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ReadyToPay = ({ loading, onPayNow }) => {

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