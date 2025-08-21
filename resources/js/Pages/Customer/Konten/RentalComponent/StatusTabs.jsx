import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StatusTabs = ({ status, setStatus }) => {
    
    return(
        <div className="flex flex-row gap-6">
            <p className="self-center ml-2 font-semibold">Order Status</p>
            <Tabs value={status} onValueChange={setStatus}>
            <TabsList className="grid grid-cols-5 gap-2">
                {[
                { value: "all", label: "All Orders" },
                { value: "pending_payment", label: "Pending Payment" },
                { value: "confirmed_payment", label: "Confirmed" },
                { value: "on_rent", label: "On Rent" },
                { value: "waiting_for_check", label: "Waiting for Check" },
                ].map((tab) => (
                <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="border border-blue-500 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                    {tab.label}
                </TabsTrigger>
                ))}
            </TabsList>
            </Tabs>
        </div>
    );
}

export default StatusTabs;