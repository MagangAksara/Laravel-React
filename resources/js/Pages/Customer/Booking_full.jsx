import React, { useState, useEffect } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";

import HandlePayNow from "./BookingComponent/Handle/HandlePayNow";
import Navbar from "../ComponetGlobal/Navbar";
import PageHeader from "../ComponetGlobal/PageHeader";
import { Input } from "@/Components/ui/input";

export default function Booking() {
  const { car, pickup_location, payment_method, csrf_token, errors } = usePage().props;

  // Default state
  const [driverOption, setDriverOption] = useState("with-driver");
  const [pickupOption, setPickupOption] = useState("owner");
  const [pickupFee, setPickupFee] = useState(car.pickup_fee ?? 0);
  const [loadingPickup, setLoadingPickup] = useState(false);
  const [loading, setLoading] = useState(false);

  // Ambil lokasi user dan hitung pickup fee
  const getCurrentLocationAndCalculatePickup = () => {
    if (!navigator.geolocation) {
      alert("Browser tidak mendukung geolokasi.");
      return;
    }
    setLoadingPickup(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(`/api/calculatePickupFee`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "X-CSRF-TOKEN": csrf_token,
            },
            body: JSON.stringify({
              customer_lat: pos.coords.latitude,
              customer_lon: pos.coords.longitude,
              owner_id: car.owner_id,
            }),
          });
          const data = await res.json();
          if (res.ok) {
            setPickupFee(data.pickup_fee ?? 0);
          } else {
            alert(data.message || "Gagal menghitung biaya pickup.");
          }
        } catch (error) {
          console.error(error);
          alert("Terjadi kesalahan saat menghitung biaya pickup.");
        } finally {
          setLoadingPickup(false);
        }
      },
      (err) => {
        alert("Gagal mengambil lokasi: " + err.message);
        setLoadingPickup(false);
      }
    );
  };

  // State tanggal
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [duration, setDuration] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Hitung durasi setiap kali tanggal berubah
  useEffect(() => {
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end >= start) {
            const diffTime = end - start;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDuration(diffDays);
            setTotalPrice(diffDays * car.price_per_day);
        } else {
            setDuration(0);
            setTotalPrice(0);
        }
    } else {
        setDuration(0);
        setTotalPrice(0);
    }
}, [startDate, endDate, car.price_per_day]);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  const formatDateTime = (date) =>
    date
      ? date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
      : "Date & Time";

  const timeValue = (date) => (date ? date.toTimeString().substring(0, 5) : "");

  const handleTimeChange = (currentDate, setDate) => (e) => {
    const [h, m] = e.target.value.split(":").map((v) => parseInt(v, 10));
    const newDate = currentDate ? new Date(currentDate) : new Date();
    newDate.setHours(h, m, 0, 0);
    setDate(newDate);
  };

  const handleBooking = () => {
    if (!startDate || !endDate) return alert("Pilih tanggal mulai & selesai");
    if (startDate >= endDate) return alert("End date harus lebih besar dari start date");

    router.get(`/car/${car.id}/booking`, {
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    });
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      router.post(`/car/${car.id}/booking`, {
          start_date: startDate,
          end_date: endDate,
          duration: duration,
          total_price: totalPrice,
      });
  };

  return (
    <>
      <Head title="Booking" />
      <div className="min-h-screen bg-[#f8fcff]">
        <Navbar header={<PageHeader />}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
            {/* Kiri */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pilih tanggal */}
              <Card>
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Start */}
                    <div>
                      <Label>Rental Start Date & Time</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full rounded-full">
                            <CalendarIcon /> {formatDateTime(startDate)}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2">
                          <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
                          <input
                              type="date"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              min={new Date().toISOString().split("T")[0]}
                          />
                          {errors.start_date && (
                              <p className="text-red-500 text-sm">{errors.start_date}</p>
                          )}
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Durasi */}
                    {/* <div>
                      <Label>Durasi (Preview)</Label>
                      <div className="mt-2 p-2 border rounded text-sm">
                        {startDate && endDate ? (() => {
                          const diffMs = endDate - startDate;
                          if (diffMs <= 0) return "End must be after Start";
                          const totalSeconds = Math.floor(diffMs / 1000);
                          const days = Math.floor(totalSeconds / 86400);
                          const hours = Math.floor((totalSeconds % 86400) / 3600);
                          const minutes = Math.floor((totalSeconds % 3600) / 60);
                          return `${days} hari ${String(hours).padStart(2, "0")} jam ${String(minutes).padStart(2, "0")} menit`;
                        })() : "Pilih start & end untuk melihat durasi"}
                      </div>
                    </div> */}

                    {/* End */}
                    <div>
                      <Label>Rental End Date & Time</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full rounded-full">
                            <CalendarIcon /> {formatDateTime(endDate)}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2">
                          <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
                          <input
                              type="date"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              min={startDate || new Date().toISOString().split("T")[0]}
                          />
                          {errors.end_date && (
                              <p className="text-red-500 text-sm">{errors.end_date}</p>
                          )}
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleBooking}>Lanjutkan / Book</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Driver & Pickup */}
              <Card>
                <CardContent className="p-6 space-y-6">
                  {/* Driver */}
                  <div>
                    <Label className="mb-2 block">Driver</Label>
                    <RadioGroup value={driverOption} onValueChange={setDriverOption} className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="with-driver" id="with-driver" />
                        <Label htmlFor="with-driver">
                          With Driver <span className="text-gray-500">Rp {(car.driver_fee ?? 0).toLocaleString()}</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="self-drive" id="self-drive" />
                        <Label htmlFor="self-drive">Self Drive</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Pickup */}
                  <div>
                    <Label className="mb-2 block">Pick-Up Location</Label>
                    <RadioGroup
                      value={pickupOption}
                      onValueChange={(val) => {
                        setPickupOption(val);
                        if (val === "other") getCurrentLocationAndCalculatePickup();
                      }}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="owner" id="pickup-owner" />
                        <Label htmlFor="pickup-owner">At Owner’s Location</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="pickup-other" />
                        <Label htmlFor="pickup-other">
                          At Other Location{" "}
                          <span className="text-gray-500">
                            {loadingPickup ? "Menghitung..." : `Rp ${(pickupFee ?? 0).toLocaleString()}`}
                          </span>
                        </Label>
                      </div>
                    </RadioGroup>

                    <div className="mt-4 border p-4 rounded-lg">
                      <p className="font-semibold">Meeting Point Location</p>
                      <p className="text-sm text-gray-600">{pickup_location?.name ?? "-"}</p>
                      <p className="text-sm">{pickup_location?.address ?? "-"}</p>
                      <p className="text-sm">{pickup_location?.phone ?? "-"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Kanan - Ringkasan & Payment */}
            <div className="space-y-6">
              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    <p>{car.brand} {car.model} {car.type}</p>
                    <p className="text-sm font-normal">{car.owner_name}</p>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Input type="text" value={`${duration} hari`} disabled />
                  <Separator />
                  <div className="flex justify-between"><span>Total Price</span><span>Rp {(car.total_price ?? 0).toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Driver Fee</span><span>Rp {(car.driver_fee ?? 0).toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Pick Up Location</span><span>Rp {(car.pickup_fee ?? 0).toLocaleString()}</span></div>
                  <Separator />
                  <div className="flex justify-between font-bold"><span>Total Payment</span><span>Rp {(car.total_payment ?? 0).toLocaleString()}</span></div>
                  <p className="text-xs text-gray-500">
                    With driver bookings, meals, fuel, tolls, etc. are additional costs not included in the system.
                  </p>
                </CardContent>
              </Card>

              {/* Payment */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span>Payment Method</span>
                    <Button variant="link" className="p-0 text-blue-500">Choose Payment Method</Button>
                  </div>
                  <p className="font-semibold">{payment_method ?? "-"}</p>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Payment</span>
                    <span
                      value={`Rp ${totalPrice.toLocaleString("id-ID")}`}
                    >
                      {/* Rp {(car.total_payment ?? 0).toLocaleString()} */}
                    </span>
                  </div>
                  <Button
                    className="w-full bg-[#1e6fa1] hover:bg-[#195b82]"
                    onClick={() => HandlePayNow({ car, setLoading })}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Pay Now"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Navbar>
      </div>
    </>
  );
}
