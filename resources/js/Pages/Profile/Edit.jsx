import { useState } from 'react'; // ✅ Tambahkan ini
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformation from './Partials/UpdateProfileInformationForm';
import UpdateAddressInformation from './Partials/UpdateAddressInformation';

import TabsProfile from '@/assets/TabsProfile'; // ✅ Pastikan path sesuai lokasi file Tabs

import OwnerLayout from '../Owner/Layout';
import CustomerLayout from '../Customer/Layout';

export default function Edit({ mustVerifyEmail, status, addresses }) {
    const { auth } = usePage().props; // Ambil props auth dari inertia
    const role = auth?.user?.role; // contoh: 'owner' atau 'customer'

    const Layout = role === 'owner' ? OwnerLayout : CustomerLayout;

    const [activeTab, setActiveTab] = useState('profile'); // ✅ useState sudah aman

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'address', label: 'Address' },
    ];

    // Tentukan className dinamis berdasarkan role
    const containerClass = role === 'customer' ? 'py-6' : '';

    return (
        <>
            <Layout>
                <Head title="Profile" />
                <div className={containerClass}>
                    <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                            {/* Tabs */}
                            <TabsProfile tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

                            {/* Tab Content */}
                            <div className="mt-6">
                                {activeTab === 'profile' && (
                                    <UpdateProfileInformation
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                    />
                                )}

                                {activeTab === 'address' && (
                                    <UpdateAddressInformation addresses={addresses} />
                                )}
                            </div>
                        </div>

                        {/* Optional: Password & Delete Section */}
                        {/* <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div> */}

                        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
