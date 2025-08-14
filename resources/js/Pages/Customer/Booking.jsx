// resources/js/Pages/Customer/Booking.jsx
import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";

import DateTime from "./BookingComponent/DateTime";
import ConfirmFilter from "./BookingComponent/ConfirmFilter";
import DetailPrice from "./BookingComponent/DetailPrice";
import ReadyToPay from "./BookingComponent/ReadyToPay";
import Navbar from "../ComponetGlobal/Navbar";
import PageHeader from "../ComponetGlobal/PageHeader";

export default function Booking() {
  // Ambil data dari Laravel controller lewat Inertia props
  const { car, pickup_location, return_location, payment_method } = usePage().props;

  return (
    <>
      <Head title="Booking" />
      <div className="min-h-screen bg-[#f8fcff]">
        <Navbar header={<PageHeader />} >
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Date & Time */}
              <DateTime />

              {/* Driver */}
              <ConfirmFilter />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Summary */}
              <DetailPrice />

              {/* Payment */}
              <ReadyToPay />
            </div>
          </div>
        </Navbar>
      </div>
    </>
  );
}
