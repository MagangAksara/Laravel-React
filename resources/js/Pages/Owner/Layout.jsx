import React from "react";
import Sidebar from "./Navbar/Sidebar";
import Header from "./Navbar/Header";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col bg-gray-50">
            {/* Sidebar */}
            <Header />

            {/* Main Content */}
            <div className="flex-1 flex flex-row">
                <Sidebar />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
