import React, { useMemo, useState } from "react";
import Layout from "../Layout";
import { Head, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

// Icons
import { Car, Wallet, ChevronsUpDown } from "lucide-react";

// ExtraComponent
import StatusCombobox from "./DashboardComponent/StatusCombobox";
import TopCard from "./DashboardComponent/TopCard";
import BarCharts from "./DashboardComponent/BarCharts";

const Dashboard = ({ 
    name, 
    totalCars, 
    earning, 
    onRent, 
    upcoming = [] ,
    chartData, 
    period,
}) => {

    const today = new Date();
    const date = today.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const time = today.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const [statusFilter, setStatusFilter] = useState("all");

    const filteredUpcoming = useMemo(() => {
        if (statusFilter === "all") return upcoming;
        return upcoming.filter(item => item.status === statusFilter);
    }, [upcoming, statusFilter]);

    const [open, setOpen] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState(period || "month");

    const periodOptions = [
        { label: "Bulan", value: "month" },
        { label: "Tahun", value: "year" },
    ]

    const selectedChart = periodOptions.find(s => s.value === selectedPeriod);

    const handlePeriodChange = (value) => {
        setSelectedPeriod(value);
        setOpen(false);

        toast.loading("Memuat data...");

        router.get(
            route("owner.dashboard"),
            { period: value },
            {
                preserveState: true,
                replace: true,
                onSuccess: () => {
                    toast.success(
                        `Filter diubah ke ${value === "month" ? "Bulan" : "Tahun"}`
                    );
                },
                onError: () => {
                    toast.error("Gagal memuat data");
                },
            }
        );
    };

    return (
        <>
            <Head title="Dashboard" />
            <Layout>
                {/* Header */}
                <TopCard
                    name={name}
                    date={date}
                    time={time}
                />
                {/* Info Cards */}
                <div className="grid grid-cols-3 gap-6 mt-10 mb-8">
                    <Card className="shadow-md rounded-xl col-span-3 sm:col-span-1">
                        {/* Menghitung jumlah Car yang dimiliki oleh user yang login dari tb car dengan melihat id_user yang login */}
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <Car className="w-8 h-8 text-blue-600 mb-2" />
                            <h3 className="text-2xl font-bold">{totalCars}</h3>
                            <p className="text-gray-500 text-sm">Total Cars</p>
                        </CardContent>
                    </Card>
                    <Card className="shadow-md rounded-xl col-span-3 sm:col-span-1">
                        {/* Menghitung jumlah pendapatan bulan ini, dilihat dari tabel rental kolom total_price dengan melihat card id dari user id user yang login dan memiliki status = confirmed payment */}
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <Wallet className="w-8 h-8 text-green-600 mb-2" />
                            <h3 className="text-2xl font-bold">
                                {new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                    minimumFractionDigits: 0,
                                }).format(earning)}
                            </h3>
                            <p className="text-gray-500 text-sm">Earning / month</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md rounded-xl col-span-3 sm:col-span-1">
                        {/* menghitung banyak sewa yang dilakukan terhadap mobil yang dimiliki oleh user yang login */}
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <Car className="w-8 h-8 text-orange-600 mb-2" />
                            <h3 className="text-2xl font-bold">{onRent}</h3>
                            <p className="text-gray-500 text-sm">On Rent</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom Grid */}
                <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-6 items-stretch">
                    {/* Left Section (chart) */}
                    <Card className="shadow-md rounded-xl col-span-1 lg:col-span-2 max-h-[390px]">
                        <CardContent className="p-6 h-fit flex flex-col">
                            {/* Bisa taruh grafik di sini */}
                            <div className="flex flex-row justify-between mb-3">
                                <div>
                                    <p className="text-gray-400">Activity</p>
                                    <p className="text-black font-semibold">Earning</p>
                                </div>
                                <div>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="flex items-center px-5 py-2 border rounded-full bg-white text-m font-light shadow hover:bg-gray-50 focus:outline-none"
                                            >
                                                {selectedChart ? `${selectedChart.label}` : "Pilih status..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-60" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-2" align="end">
                                            <div className="flex flex-col">
                                                {periodOptions.map(option => (
                                                    <button
                                                        key={option.value}
                                                        className={`px-4 py-2 text-left hover:bg-gray-100 text-sm ${
                                                            selectedPeriod === option.value
                                                                ? "font-semibold text-blue-600"
                                                                : ""
                                                        }`}
                                                        onClick={() => handlePeriodChange(option.value)}
                                                    >
                                                        {option.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <div className="flex-1 mt-5">
                                <BarCharts 
                                    chartData={chartData} 
                                    period={selectedPeriod}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right Section (Upcoming Booking) */}
                    <Card className="shadow-md rounded-xl col-span-1 max-h-[390px]">
                        <CardContent className="p-6 h-full flex flex-col">
                            <div className="flex flex-col items-center justify-between mb-4 gap-2">
                                <h4 className="font-semibold">Bookings</h4>
                                <StatusCombobox value={statusFilter} onChange={setStatusFilter} />
                            </div>
                            {/* akan menampilkan user siapa saja yang sedang menyewa, dilihat dari id car dari user yang login daam tabe rental lalu dari dabel rental dilihat user id yang merupakan customer lalu akan diambil nama user dari tb user dan dari tb rental akan diambil start date*/}
                            <div className="overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                                {filteredUpcoming.length > 0 ? (
                                    <div className="flex flex-col gap-4">
                                        {filteredUpcoming.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <img
                                                    src={item.profile_picture}
                                                    alt="avatar"
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div>
                                                    <p className="font-medium">{item.customer_name}</p>
                                                    <p className="text-sm text-gray-500">{item.start_date}</p>
                                                    <p className="text-[11px] text-gray-400">Status: {item.status}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-sm">No upcoming bookings</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Layout >
        </>
    );
};

export default Dashboard;
