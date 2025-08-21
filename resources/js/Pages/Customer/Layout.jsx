import React from "react";
import Navbar from '@/Pages/Customer/Navbar/Navbar';
import PageHeader from '@/Pages/Customer/Navbar/PageHeader';

const Layout = ({ children }) => {
    return (
        <Navbar header={<PageHeader/>}>
            <main>{children}</main>
        </Navbar>
    );
};

export default Layout;
