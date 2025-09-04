import React, { useEffect, useState } from "react";
import { Head, router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import Layout from "../Layout";
import StatusTabs from "./OrderComponent/StatusTabs.jsx";
import OrderList from "./OrderComponent/OrderList";
import DateRangePicker from "./OrderComponent/DateRangePicker";

const OrdersManagement = ({ orders = [] }) => {
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState();

  // filter berdasarkan status
  const filteredorders =
    status === "all" ? orders : orders.filter((o) => o.status === status);

  // fungsi untuk trigger pencarian otomatis
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      router.get(
        route("owner.orders.management"),
        {
          search,
          start_date: date?.from ? date.from.toISOString().split("T")[0] : "",
          end_date: date?.to ? date.to.toISOString().split("T")[0] : "",
        },
        {
          preserveState: true,
          replace: true,
        }
      );
    }, 400); // debounce biar gak terlalu sering hit server

    return () => clearTimeout(delayDebounce);
  }, [search, date]);

  return (
    <>
      <Head title="Orders Management" />
      <Layout>
        <div className="p-6 max-w-7xl mx-auto ">
          <div className="space-y-6">
            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
              <div className="relative w-full md:w-[80%]">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari booking ID, mobil, harga... "
                  className="border rounded-lg px-3 py-2"
                />
              </div>

              {/* Date Range Picker */}
              <DateRangePicker date={date} setDate={setDate} />
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
