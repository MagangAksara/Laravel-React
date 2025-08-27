import React from "react";
import Sidebar from "./Navbar/Sidebar";
import Header from "./Navbar/Header";
import { usePage } from "@inertiajs/react";

const Layout = ({ children }) => {
    const { url, component } = usePage();
    const hideSidebar = component === "Profile/Edit"; 

    return (
        <div className="flex flex-col bg-gray-50">
            {/* Sidebar */}
            <Header />

            {/* Main Content */}
            <div className="flex flex-row">
                {!hideSidebar && <Sidebar />}
                <main className="p-6 w-full">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
