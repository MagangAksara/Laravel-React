// resources/js/Pages/Customer/Booking.jsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Head, Link, router, usePage } from "@inertiajs/react";

import DateTime from "./BookingComponent/DateTime";
import ConfirmFilter from "./BookingComponent/ConfirmFilter";
import DetailPrice from "./BookingComponent/DetailPrice";
import ReadyToPay from "./BookingComponent/ReadyToPay";
import Navbar from "../ComponetGlobal/Navbar";
import PageHeader from "../ComponetGlobal/PageHeader";

export default function Booking() {
  // Ambil data dari Laravel controller lewat Inertia props
  const { car, pickup_location, return_location, payment_method } = usePage().props;

  const [driverOption, setDriverOption] = useState("with-driver");
  const [pickupOption, setPickupOption] = useState("owner");
  const [returnOption, setReturnOption] = useState("owner");
  const [loading, setLoading] = useState(false);

  // function getCookie(name) {
  //   const value = `; ${document.cookie}`;
  //   const parts = value.split(`; ${name}=`);
  //   if (parts.length === 2) return parts.pop().split(';').shift();
  // }

  // const handlePayNow = async () => {
  //   try {
  //     setLoading(true);

  //     // 1. Ambil CSRF cookie dari Laravel Sanctum
  //     await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
  //       method: "GET",
  //       credentials: "include", // penting: simpan cookie di browser
  //     });

  //     // 2. Ambil nilai XSRF-TOKEN dari cookie browser
  //     const xsrfToken = getCookie('XSRF-TOKEN');
      
  //     // 2. Kirim request ke API dengan cookie
  //     const response = await fetch("http://127.0.0.1:8000/api/payment/create", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Accept": "application/json",
  //         "X-XSRF-TOKEN": decodeURIComponent(xsrfToken)
  //       },
  //       credentials: "include", // penting: kirim cookie laravel_session & XSRF-TOKEN
  //       body: JSON.stringify({
  //         amount: car.total_payment,
  //         description: `Rental ${car.brand} ${car.model}`,
  //         payer_email: "customer@email.com",
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const result = await response.json();

  //     if (result.checkout_link) {
  //       window.location.href = result.checkout_link; // redirect ke Xendit
  //     } else {
  //       alert("Gagal membuat pembayaran: checkout_link tidak ditemukan.");
  //     }
  //   } catch (error) {
  //     console.error("Payment error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
