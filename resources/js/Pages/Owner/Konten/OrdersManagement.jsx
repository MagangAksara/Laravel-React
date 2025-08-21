import React from "react";
import Layout from "../Layout";
import { Head } from "@inertiajs/react";

const OrdersManagement = () => {
  return (
    <>
        <Head title="Orders Management" />
        <Layout>
            <h2 className="text-xl font-semibold mb-4">Orders Management</h2>
            <div className="bg-white p-6 rounded-lg shadow">Konten orders di sini...</div>
        </Layout>
    </>
  );
};

export default OrdersManagement;
