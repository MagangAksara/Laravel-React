import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import FilterSidebar from "./DashboardComponent/FilterSidebar";
import CarCard from "./DashboardComponent/CarCard";
import { Head, Link as InertiaLink, usePage } from '@inertiajs/react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Menu } from "lucide-react";

const Dashboard = () => {
  const { cars: initialCars } = usePage().props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [filters, setFilters] = useState({});
  const [filteredCars, setFilteredCars] = useState(initialCars.data ?? []);

  const uniqueBrands = [...new Set((initialCars.data ?? []).map(car => car.brand))].filter(Boolean);
  const uniqueModels = [...new Set((initialCars.data ?? []).map(car => car.model))].filter(Boolean);
  const uniqueTypes = [...new Set((initialCars.data ?? []).map(car => car.type))].filter(Boolean);
  const uniqueTransmissions = [...new Set((initialCars.data ?? []).map(car => car.type_transmisi))].filter(Boolean);
  const uniqueSeats = [...new Set((initialCars.data ?? []).map(car => car.capacity))]
    .filter(Boolean)
    .map(seat => ({
      value: seat.toString(),   // string untuk combobox
      label: `${seat} seats`    // label untuk ditampilkan
    }));
  const uniqueFuels = [...new Set((initialCars.data ?? []).map(car => car.fuel_type))].filter(Boolean);
  const uniqueCities = [...new Set((initialCars.data ?? []).map(car => car.owner_city))].filter(Boolean);

  useEffect(() => {
    let data = [...(initialCars.data ?? [])]; // pastikan array

    // Brand
    if (filters.brand) {
      data = data.filter(car => car.brand === filters.brand);
    }

    // Location (contoh pakai dummy dulu)
    if (filters.city) {
      data = data.filter(car => car.owner_city === filters.city);
    }

    // Transmission
    if (filters.transmission) {
      data = data.filter(car => car.type_transmisi === filters.transmission);
    }

    // Seat
    if (filters.seats) {
      data = data.filter(car => car.capacity === filters.seats);
    }

    // Fuel
    if (filters.fuel) {
      data = data.filter(car => car.fuel_type === filters.fuel);
    }

    // Available
    if (filters.available) {
      data = data.filter(car => car.is_available === true);
    }

    // Price
    if (filters.min_price) {
      data = data.filter(car => car.price >= filters.min_price);
    }
    if (filters.max_price) {
      data = data.filter(car => car.price <= filters.max_price);
    }

    // Rental Date (cek overlap)
    if (filters.start_date && filters.end_date) {
      data = data.filter(car =>
        !car.rentals.some(r => {
          const start = new Date(r.start_date);
          const end = new Date(r.end_date);
          return (
            (start <= new Date(filters.end_date) && end >= new Date(filters.start_date)) &&
            ["on_rent", "waiting_for_check", "confirmed_payment"].includes(r.status)
          );
        })
      );
    }

    setFilteredCars(data);
  }, [filters, initialCars]);

  // const uniqueBrands        = [...new Set(filteredCars.map(car => car.brand))].filter(Boolean);
  // const uniqueModels        = [...new Set(filteredCars.map(car => car.model))].filter(Boolean);
  // const uniqueTypes         = [...new Set(filteredCars.map(car => car.type))].filter(Boolean);
  // const uniqueTransmissions = [...new Set(filteredCars.map(car => car.type_transmisi))].filter(Boolean);
  // const uniqueSeats         = [...new Set(filteredCars.map(car => car.capacity))]
  //   .filter(Boolean)
  //   .map(seat => ({ value: seat.toString(), label: `${seat} seats` }));
  // const uniqueFuels         = [...new Set(filteredCars.map(car => car.fuel_type))].filter(Boolean);
  // const uniqueCities        = [...new Set(filteredCars.map(car => car.owner_city))].filter(Boolean);

  return (
    <>
      <Head title="Dashboard" />
      <Layout>
        <div className="flex items-start gap-6 p-6 bg-gray-50 min-h-screen">
          <button
            className="fixed top-25 left-0 z-20 flex items-center justify-center p-2 rounded-r-full bg-white shadow md:hidden w-8"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md transform transition-transform duration-300 md:relative md:translate-x-0 md:shadow-none ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <div className="overflow-y-auto">
              <FilterSidebar
                brands={uniqueBrands}
                models={uniqueModels}
                types={uniqueTypes}
                transmissions={uniqueTransmissions}
                seats={uniqueSeats}
                fuels={uniqueFuels}
                cities={uniqueCities}
                setFilters={setFilters}
              />
            </div>
          </aside>

          {/* Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-20 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <main className="flex-1 flex flex-col overflow-y-auto">

            {/* Grid Cars Card */}
            <div className="grid gap-6 flex-1 items-stretch grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
              {filteredCars.length > 0 ? (
                filteredCars.map((car, idx) => (
                  <InertiaLink
                    key={idx}
                    href={route('cars.show', car.id)}
                    className='block'
                  >
                    <CarCard {...car} />
                  </InertiaLink>
                ))
              ) : (
                <p className="text-gray-500 col-span-full">No cars available</p>
              )}
            </div>

            {/* Pagination */}
            {initialCars.last_page > 1 && (
              <div className="mt-6 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    {initialCars.prev_page_url && (
                      <PaginationItem>
                        <PaginationPrevious href={initialCars.prev_page_url} />
                      </PaginationItem>
                    )}

                    {Array.from({ length: initialCars.last_page }, (_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href={`?page=${i + 1}`}
                          isActive={initialCars.current_page === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    {initialCars.next_page_url && (
                      <PaginationItem>
                        <PaginationNext href={initialCars.next_page_url} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}

          </main >
        </div >
      </Layout >
    </>
  );
}

export default Dashboard;
