import { Head, Link } from "@inertiajs/react";
import Layout from "../Layout";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";

import StatusTabs from "./RentalComponent/StatusTabs.jsx";
import RentalList from "./RentalComponent/RentalList";

const Rental = ({ rentals = [] }) => {
  const [status, setStatus] = useState("all");

  // filter berdasarkan status
  const filteredRentals =
    status === "all" ? rentals : rentals.filter((o) => o.status === status);

  return (
    <>
      <Head title="Rentals" />
      <Layout>
        <div className="p-6 max-w-7xl mx-auto">
          <div className="space-y-6">
            {/* Search & Filter */}
            <div className="flex flex-row justify-between gap-10">
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

            {/* Rentals List */}
            <RentalList rentals={filteredRentals} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Rental;
