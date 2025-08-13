// resources/js/Pages/Customer/Booking.jsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link, router, usePage } from "@inertiajs/react";

export default function Booking() {
  // Ambil data dari Laravel controller lewat Inertia props
  const { car, pickup_location, return_location, payment_method } = usePage().props;

  const [driverOption, setDriverOption] = useState("with-driver");
  const [pickupOption, setPickupOption] = useState("owner");
  const [returnOption, setReturnOption] = useState("owner");
  const [loading, setLoading] = useState(false);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const handlePayNow = async () => {
    try {
      setLoading(true);

      // 1. Ambil CSRF cookie dari Laravel Sanctum
      await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include", // penting: simpan cookie di browser
      });

      // 2. Ambil nilai XSRF-TOKEN dari cookie browser
      const xsrfToken = getCookie('XSRF-TOKEN');
      
      // 2. Kirim request ke API dengan cookie
      const response = await fetch("http://127.0.0.1:8000/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken)
        },
        credentials: "include", // penting: kirim cookie laravel_session & XSRF-TOKEN
        body: JSON.stringify({
          amount: car.total_payment,
          description: `Rental ${car.brand} ${car.model}`,
          payer_email: "customer@email.com",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.checkout_link) {
        window.location.href = result.checkout_link; // redirect ke Xendit
      } else {
        alert("Gagal membuat pembayaran: checkout_link tidak ditemukan.");
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-[#f8fcff]">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-[#1e6fa1]">EazyRide</h1>
        <Button variant="ghost" className="rounded-full border px-4">
          Profile
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Date & Time */}
          <Card>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div>
                <Label>Rental Start Date & Time</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Senin, 11 Agustus 2025 09:00" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="start1">Senin, 11 Agustus 2025 09:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Rental End Date & Time</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selasa, 12 Agustus 2025 15:00" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="end1">Selasa, 12 Agustus 2025 15:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Driver */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <Label className="mb-2 block">Driver</Label>
                <RadioGroup
                  value={driverOption}
                  onValueChange={setDriverOption}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="with-driver" id="with-driver" />
                    <Label htmlFor="with-driver">
                      With Driver{" "}
                      <span className="text-gray-500">
                        Rp {car.driver_fee.toLocaleString()}
                      </span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="self-drive" id="self-drive" />
                    <Label htmlFor="self-drive">Self Drive</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Pick-Up */}
              <div>
                <Label className="mb-2 block">Pick-Up Location</Label>
                <RadioGroup
                  value={pickupOption}
                  onValueChange={setPickupOption}
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
                        Rp {car.pickup_fee.toLocaleString()}
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
                <div className="mt-4 border p-4 rounded-lg">
                  <p className="font-semibold">Meeting Point Location</p>
                  <p className="text-sm text-gray-600">{pickup_location.name}</p>
                  <p className="text-sm">{pickup_location.address}</p>
                  <p className="text-sm">{pickup_location.phone}</p>
                </div>
              </div>

              {/* Return */}
              <div>
                <Label className="mb-2 block">Return Location</Label>
                <RadioGroup
                  value={returnOption}
                  onValueChange={setReturnOption}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="owner" id="return-owner" />
                    <Label htmlFor="return-owner">At Owner’s Location</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="return-other" />
                    <Label htmlFor="return-other">
                      At Other Location{" "}
                      <span className="text-gray-500">
                        Rp {car.return_fee.toLocaleString()}
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
                <div className="mt-4 border p-4 rounded-lg">
                  <p className="font-semibold">Meeting Point Location</p>
                  <p className="text-sm text-gray-600">{return_location.name}</p>
                  <p className="text-sm">{return_location.address}</p>
                  <p className="text-sm">{return_location.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Yoger Car Malang</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-semibold">
                {car.brand} {car.model}
              </p>
              <p>Duration Rental: {car.duration}</p>
              <Separator />
              <div className="flex justify-between">
                <span>Total Price</span>
                <span>Rp {car.total_price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Driver Fee</span>
                <span>Rp {car.driver_fee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Pick Up Location</span>
                <span>Rp {car.pickup_fee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Return Location</span>
                <span>Rp {car.return_fee.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total Payment</span>
                <span>Rp {car.total_payment.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-500">
                With driver bookings, meals, fuel, tolls, etc. are counted as additional costs not included in the system.
              </p>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between">
                <span>Payment Method</span>
                <Button variant="link" className="p-0 text-blue-500">
                  Choose Payment Method
                </Button>
              </div>
              <p className="font-semibold">{payment_method}</p>
              <div className="flex justify-between text-lg font-bold">
                <span>Total Payment</span>
                <span>Rp {car.total_payment.toLocaleString()}</span>
              </div>
              <Button
                className="w-full bg-[#1e6fa1] hover:bg-[#195b82]"
                onClick={handlePayNow}
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay Now"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white mt-8">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-xl font-bold">EazyRide</h2>
            <p className="text-sm mt-2 text-gray-300">
              Lorem ipsum dolor sit amet consectetur. Varius in dolor egestas euismod nulla.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Menu</h3>
            <ul className="space-y-1 text-gray-300">
              <li>Home</li>
              <li>About Us</li>
              <li>Rent Car</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Community</h3>
            <ul className="space-y-1 text-gray-300">
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Youtube</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
