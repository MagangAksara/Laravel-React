// resources/js/Pages/Customer/Booking.jsx
import React, { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import Layout from "../Layout";

import DateTime from "./BookingComponent/DateTime";
import ConfirmFilter from "./BookingComponent/ConfirmFilter";
import DetailPrice from "./BookingComponent/DetailPrice";
import ReadyToPay from "./BookingComponent/ReadyToPay";
import { Card } from "@/Components/ui/card";

export default function Booking() {
  // Ambil data dari Laravel controller lewat Inertia props
  const { car, ownerAddress, customerAddress } = usePage().props;

  // State untuk tanggal
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // State untuk driver dan pickup (dipindahkan dari ConfirmFilter)
  const [pickupOption, setPickupOption] = useState("owner");
  const [selectedAddress, setSelectedAddress] = useState(
    customerAddress?.[0]?.id?.toString() || ""
  );

  const [driverOption, setDriverOption] = useState("self-drive");

  useEffect(() => {
    if (car.is_driver) {
      // Kalau owner bisa jadi driver, default with-driver
      setDriverOption("with-driver");
    } else {
      // Kalau owner bukan driver, default self-drive
      setDriverOption("self-drive");
    }
  }, [car.is_driver]);
  
  const [totalPayment, setTotalPayment] = useState(0);

  return (
    <>
      <Head title="Booking" />
      <div className="min-h-screen bg-[#f8fcff]">
        <Layout>
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Date & Time */}
              <DateTime
                car={car}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />

              {/* Driver */}
              <ConfirmFilter
                car={car}
                customer_addresses={customerAddress}
                driverOption={driverOption}
                setDriverOption={setDriverOption}
                pickupOption={pickupOption}
                setPickupOption={setPickupOption}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />
            </div>

            {/* Right Column */}
            <Card>
              <div>
                {/* Summary */}
                <DetailPrice 
                  car={car}
                  startDate={startDate}
                  endDate={endDate}
                  ownerAddress={ownerAddress}
                  customerAddress={customerAddress}
                  driverOption={driverOption}
                  pickupOption={pickupOption}
                  selectedAddress={selectedAddress}
                  setTotalPayment={setTotalPayment}
                />

                {/* Payment */}
                <ReadyToPay 
                  car={car} 
                  totalPayment={totalPayment}
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
            </Card>
          </div>
        </Layout>
      </div>
    </>
  );
}
