import React from "react";
import Navbar from "@/Pages/Customer/Navbar/Navbar";
import PageHeader from "./Navbar/PageHeader";
import FooterDraft from './Navbar/FooterDraft';

const Layout = ({ header, children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar + PageHeader sticky di atas */}
            <div className="sticky top-0 z-40 bg-white shadow-sm">
                <Navbar header={<PageHeader />} />

                {/* Konten scrollable */}
                <main>{children}</main>

                <FooterDraft />
            </div>
        </div>
    );
};

export default Layout;
