import React from "react";
import Layout from "../Layout";
import FilterSidebar from "./DashboardComponent/FilterSidebar";
import CarCard from "./DashboardComponent/CarCard";
import { Head, Link as InertiaLink, usePage } from '@inertiajs/react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Dashboard = () => {
  const { cars } = usePage().props;

  return (
    <>
      <Head title="Dashboard" />
      <Layout>
        <div className="flex items-start gap-6 p-6 bg-gray-50 min-h-screen">

          <FilterSidebar />

            <div className="flex-1 flex flex-col">

              {/* Grid Cars Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                {cars.data && cars.data.length > 0 ? (
                  cars.data.map((car, idx) => (
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
              {cars.last_page > 1 && (
                <div className="mt-6 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      {cars.prev_page_url && (
                        <PaginationItem>
                          <PaginationPrevious href={cars.prev_page_url} />
                        </PaginationItem>
                      )}

                      {Array.from({ length: cars.last_page }, (_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            href={`?page=${i + 1}`}
                            isActive={cars.current_page === i + 1}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      {cars.next_page_url && (
                        <PaginationItem>
                          <PaginationNext href={cars.next_page_url} />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}

            </div>
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;
