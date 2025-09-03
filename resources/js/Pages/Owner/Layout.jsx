import React from "react";
import Sidebar from "./Navbar/Sidebar";
import Header from "./Navbar/Header";
import { usePage } from "@inertiajs/react";
import { Toaster } from "@/components/ui/sonner";

const Layout = ({ children }) => {
    const { component } = usePage();
    const hideSidebar = component === "Profile/Edit";

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* header */}
            <Header />

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar tetap */}
                {!hideSidebar && <Sidebar />}

                {/* Konten yang bisa discroll */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>

            </div>
            
            {/* Toaster biar notifikasi muncul di semua halaman */}
            <Toaster position="top-right" richColors />
        </div>
    );
};

export default Layout;
