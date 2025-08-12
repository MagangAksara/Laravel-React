// resources/js/Pages/BookingPage.jsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link } from "@inertiajs/react";

export default function BookingPage() {
  const [driverOption, setDriverOption] = useState("with-driver");
  const [pickupOption, setPickupOption] = useState("owner");
  const [returnOption, setReturnOption] = useState("owner");

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
                    <Label htmlFor="with-driver">With Driver <span className="text-gray-500">Rp 200.000</span></Label>
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
                    <Label htmlFor="pickup-other">At Other Location <span className="text-gray-500">Rp 30.000</span></Label>
                  </div>
                </RadioGroup>
                <div className="mt-4 border p-4 rounded-lg">
                  <p className="font-semibold">Meeting Point Location</p>
                  <p className="text-sm text-gray-600">Amelia Putri Safani</p>
                  <p className="text-sm">Jl. Panglima Sudirman No.12, Karangploso, Malang</p>
                  <p className="text-sm">08962642xxxxx</p>
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
                    <Label htmlFor="return-other">At Other Location <span className="text-gray-500">Rp 30.000</span></Label>
                  </div>
                </RadioGroup>
                <div className="mt-4 border p-4 rounded-lg">
                  <p className="font-semibold">Meeting Point Location</p>
                  <p className="text-sm text-gray-600">Amelia Putri Safani</p>
                  <p className="text-sm">Jl. Panglima Sudirman No.12, Karangploso, Malang</p>
                  <p className="text-sm">08962642xxxxx</p>
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
              <p className="font-semibold">Toyota Yaris G GR-Sport</p>
              <p>Duration Rental: 2 days</p>
              <Separator />
              <div className="flex justify-between">
                <span>Total Price</span>
                <span>Rp 500.000</span>
              </div>
              <div className="flex justify-between">
                <span>Driver Fee</span>
                <span>Rp 200.000</span>
              </div>
              <div className="flex justify-between">
                <span>Pick Up Location</span>
                <span>Rp 30.000</span>
              </div>
              <div className="flex justify-between">
                <span>Return Location</span>
                <span>Rp 30.000</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total Payment</span>
                <span>Rp 760.000</span>
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
                <Button variant="link" className="p-0 text-blue-500">Choose Payment Method</Button>
              </div>
              <p className="font-semibold">Mandiri</p>
              <div className="flex justify-between text-lg font-bold">
                <span>Total Payment</span>
                <span>Rp 760.000</span>
              </div>
              <Link href="api/payment/create" className="w-full">
                <Button className="w-full bg-[#1e6fa1] hover:bg-[#195b82]">Pay Now</Button>
              </Link>
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
