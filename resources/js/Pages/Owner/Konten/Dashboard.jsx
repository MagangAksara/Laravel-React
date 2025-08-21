import React from "react";
import Layout from "../Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Head } from "@inertiajs/react";

const Dashboard = () => {
    return (
        <>
        <Head title="Dashboard" />
        <Layout>
        <div className="grid grid-cols-3 gap-6">
            <Card className="shadow-md">
                <CardContent className="p-6">Box 1</CardContent>
            </Card>
            <Card className="shadow-md">
                <CardContent className="p-6">Box 2</CardContent>
            </Card>
            <Card className="shadow-md">
                <CardContent className="p-6">Box 3</CardContent>
            </Card>
        </div>
        </Layout>
    </>
    );
};

export default Dashboard;
