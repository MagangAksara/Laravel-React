import { Head, Link } from "@inertiajs/react";
import Navbar from "../ComponetGlobal/Navbar";
import React, { useState } from "react";
import PageHeader from "../ComponetGlobal/PageHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const Rental = ({ rentals = [] }) => {
  const [status, setStatus] = useState("all");

  // filter berdasarkan status
  const filteredRentals =
    status === "all" ? rentals : rentals.filter((o) => o.status === status);

  return (
    <>
      <Head title="Rentals" />
      <Navbar header={<PageHeader />}>
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
            <Tabs value={status} onValueChange={setStatus}>
              <TabsList className="grid grid-cols-5 gap-2">
                {/* ngikut status dari tb payment */}
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="pending">Pending Payment</TabsTrigger>
                <TabsTrigger value="confirmed payment">Confirmed</TabsTrigger>
                <TabsTrigger value="on_rent">On Rent</TabsTrigger>
                <TabsTrigger value="waiting_for_check">Waiting for Check</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Rentals List */}
            <div className="space-y-4">
              {filteredRentals.length > 0 ? (
                filteredRentals.map((order) => (
                  <Card key={order.id} className="shadow-md">
                    {/* Header */}
                    <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div className="text-sm text-gray-500">
                        Booking ID {order.booking_id}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{order.date}</span>
                        <Badge
                          variant={
                            order.status === "pending_payment"
                              ? "outline"
                              : order.status === "confirmed_payment"
                              ? "default"
                              : order.status === "on_rent"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {order.statusLabel}
                        </Badge>
                      </div>
                    </CardHeader>

                    {/* Content */}
                    <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      {/* Car Info */}
                      <div className="flex items-center gap-4">
                        <img
                          src={order.car?.image}
                          alt={order.car?.model}
                          className="w-20 h-14 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-semibold">
                            {order.car?.brand} {order.car?.model}{" "}
                            {order.car?.type}
                          </p>
                          <p className="text-sm text-gray-500">
                            Duration Rental: {order.duration} day
                          </p>
                          <p className="text-sm text-gray-500">
                            Price per day: Rp {order.price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Payment Info */}
                      <div className="text-right space-y-1">
                        <p className="text-sm text-gray-500">Total Payment</p>
                        <p className="font-semibold text-lg">
                          Rp {order.totalPayment.toLocaleString()}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-row gap-2 w-full md:w-auto">
                        {order.status === "pending" && (
                          <Button 
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={() => window.location.href = order.url_payment}
                          >
                            Pay Now
                          </Button>
                        )}
                        {order.status === "confirmed payment" && (
                          <Button variant="destructive">Cancelled</Button>
                        )}
                        {order.status === "completed" && (
                          <Button variant="outline">Give Review</Button>
                        )}
                        <Button variant="outline">See Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-gray-500">Tidak ada data rental</p>
              )}
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default Rental;
