// resources/js/Pages/Customer/Booking.jsx
import React, { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import Layout from "../Layout";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ConfirmFilter from "./BookingComponent/ConfirmFilter";
import DetailPrice from "./BookingComponent/DetailPrice";
import ReadyToPay from "./BookingComponent/ReadyToPay";
import DateTime from "./BookingComponent/DateTime";
import { Card } from "@/Components/ui/card";

import HandlePayNow from "./BookingComponent/Handle/HandlePayNow";


const Booking = () => {
  // Ambil data dari Laravel controller lewat Inertia props
  const { car, ownerAddress, customerEmail, customerAddress, blockedRange } = usePage().props;

  // State untuk tanggal
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  // state untuk popup dialog
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handlePayNowClick = () => {
    if (!startDate || !endDate) {
      setDialogMessage("Silakan isi tanggal mulai dan tanggal selesai terlebih dahulu.");
      setShowDialog(true);
      return;
    }

    if (blockedRange) {
      const rangeStart = new Date(blockedRange.start);
      const rangeEnd = new Date(blockedRange.end);

      // cek overlap dengan rentang terblokir
      if (
        (startDate >= rangeStart && startDate <= rangeEnd) ||
        (endDate >= rangeStart && endDate <= rangeEnd)
      ) {
        setDialogMessage("Mobil sedang sibuk pada rentang tanggal ini. Ubah waktu atau pilih mobil lain.");
        setShowDialog(true);
        return;
      }
    }

    // Jika semua valid, panggil HandlePayNow
    HandlePayNow({ car, customerEmail, setLoading, totalPayment, startDate, endDate });
  };

  // State untuk driver dan pickup (dipindahkan dari ConfirmFilter)
  const [pickupOption, setPickupOption] = useState("owner");
  const [selectedAddress, setSelectedAddress] = useState(
    customerAddress?.[0]?.id?.toString() || ""
  );

  const [driverOption, setDriverOption] = useState("self-drive");

  useEffect(() => {
    if (car.is_driver) {
      // Kalau owner bisa jadi driver, default with-driver
      setDriverOption("self-drive");
    } else {
      // Kalau owner bukan driver, default self-drive
      setDriverOption("with-driver");
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
                blockedRange={blockedRange}
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
                  loading={loading}
                  onPayNow={handlePayNowClick}
                />
              </div>
            </Card>
          </div>
        </Layout>
      </div>
      {/* Dialog popup */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Perhatian</DialogTitle>
          </DialogHeader>
          <p>{dialogMessage}</p>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Booking;