import React from "react";
import Navbar from "@/Pages/Customer/Navbar/Navbar";
import PageHeader from "./Navbar/PageHeader";
import FooterDraft from './Navbar/FooterDraft';
import { Toaster } from "@/components/ui/sonner";


const Layout = ({ children }) => {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                {/* navbar tetap tidak akan berpindah saat scroll */}
                {/* Sticky header (navbar + pageheader) */}
                <div className="sticky top-0 z-40 bg-white shadow-sm">
                    <Navbar />
                    <div className="px-8">
                        <PageHeader />
                    </div>
                </div>


                {/* children Konten scrollable */}
                <main className="flex-1">{children}</main>
                <FooterDraft />
            </div>
            <Toaster position="top-right" richColors />
        </>
    );
};

export default Layout;
