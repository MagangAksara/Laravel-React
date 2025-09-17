import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StatusTabs = ({ status, setStatus }) => {

    return (
        <div className="space-y-2">
            <p className="ml-2 font-semibold">Order Status</p>
            <Tabs value={status} onValueChange={setStatus}>
                <div className="overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                    <TabsList className="flex justify-start gap-2 min-w-max bg-transparent pl-10">
                        {[
                            { value: "all", label: "All Orders" },
                            { value: "pending_payment", label: "Pending Payment" },
                            { value: "confirmed_payment", label: "Confirmed" },
                            { value: "on_rent", label: "On Rent" },
                            { value: "waiting_for_check", label: "Waiting for Check" },
                            { value: "waiting_for_fines_payment", label: "Waiting for Fines Payment" },
                            { value: "completed", label: "Completed" },
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
                </div>
            </Tabs>
        </div>
    );
}

export default StatusTabs;