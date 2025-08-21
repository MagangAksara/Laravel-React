import React from "react";
import Layout from "../Layout";
import { Head } from "@inertiajs/react";

const CarsManagement = () => {
  return (
    <>
        <Head title="Cars Management" />
        <Layout>
            <h2 className="text-xl font-semibold mb-4">Cars Management</h2>
            <div className="bg-white p-6 rounded-lg shadow">Konten cars di sini...</div>
        </Layout>
    </>
  );
};

export default CarsManagement;
