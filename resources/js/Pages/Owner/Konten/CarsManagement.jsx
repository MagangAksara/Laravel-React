import React, { useState } from "react";
import Layout from "../Layout";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CarsManagement = () => {
  const { props } = usePage();
  const { cars } = props;
  const [activeTab, setActiveTab] = useState("basic");

  const formatCurrency = (value) => {
    if (value == null) return "0";
    return value.toLocaleString("id-ID");
  };

  return (
    <>
      <Head title="Cars Management" />
      <Layout>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Cars Management</h2>
          <Button>Add Car +</Button>
        </div>

        <Card>
          {/* Tabs Section */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="m-0">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="important">Important Information</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
              <TabsTrigger value="rent">Rent Details</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Action buttons */}
          <div className="flex flex-row justify-end gap-2 mr-6 mb-1">
            <Button variant="outline">Add Transmission</Button>
            <Button variant="outline">Add Brand</Button>
            <Button variant="outline">Filter By Brand</Button>
          </div>

          {/* Table */}
          {/* <CardHeader>
                <CardTitle>Car List</CardTitle>
              </CardHeader> */}
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">No</th>
                    <th className="border p-2">Availability</th>
                    <th className="border p-2">Photo</th>
                    <th className="border p-2">Brand</th>
                    <th className="border p-2">Model</th>
                    <th className="border p-2">Type</th>
                    <th className="border p-2">Price/day</th>
                    <th className="border p-2">Driver</th>
                    <th className="border p-2">Driver Fee/day</th>
                    <th className="border p-2">Year</th>
                    <th className="border p-2">Color</th>
                    <th className="border p-2">Transmission</th>
                    <th className="border p-2">Fuel</th>
                    <th className="border p-2">Seat</th>
                    <th className="border p-2">City</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car, i) => (
                    <tr key={car.id} className="text-center">
                      <td className="border p-2">{i + 1}</td>
                      <td className="border p-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${car.availability
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                            }`}
                        >
                          {car.availability ? "Available" : "Not Available"}
                        </span>
                      </td>
                      <td className="border p-2">
                        <img
                          src={car.photo}
                          alt={car.model}
                          className="h-12 mx-auto"
                        />
                      </td>
                      <td className="border p-2">{car.brand}</td>
                      <td className="border p-2">{car.model}</td>
                      <td className="border p-2">{car.type}</td>
                      <td className="border p-2">
                        Rp {formatCurrency(car.price_day)}
                      </td>
                      <td className="border p-2">{car.driver}</td>
                      <td className="border p-2">
                        Rp {formatCurrency(car.driver_fee)}
                      </td>
                      <td className="border p-2">{car.year}</td>
                      <td className="border p-2">{car.color}</td>
                      <td className="border p-2">{car.transmission}</td>
                      <td className="border p-2">{car.fuel}</td>
                      <td className="border p-2">{car.seat}</td>
                      <td className="border p-2">{car.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Layout>
    </>
  );
};

export default CarsManagement;
