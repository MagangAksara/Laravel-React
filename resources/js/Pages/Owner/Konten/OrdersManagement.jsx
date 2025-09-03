import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";

import Layout from "../Layout";
import StatusTabs from "./OrderComponent/StatusTabs.jsx";
import OrderList from "./OrderComponent/OrderList";

const OrdersManagement = ({ orders = [] }) => {
  const [status, setStatus] = useState("all");

  // filter berdasarkan status
  const filteredorders =
    status === "all" ? orders : orders.filter((o) => o.status === status);

  return (
    <>
      <Head title="Orders Management" />
      <Layout>
        <div className="p-6 max-w-7xl mx-auto ">
          <div className="space-y-6">
            {/* Search & Filter */}
            <div className="flex flex-col lg:flex-row justify-between gap-3 lg:gap-10">
              <Input
                placeholder="Search order history"
                className="md:w-full"
              />
              <div className="flex items-center border rounded-lg px-3 py-2 md:w-1/4">
                <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                <input type="date" className="w-full outline-none" />
              </div>
            </div>

            {/* Tabs */}
            <StatusTabs status={status} setStatus={setStatus} />

            {/* orders List */}
            <OrderList orders={filteredorders} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default OrdersManagement;
