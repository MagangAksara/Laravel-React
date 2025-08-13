import { useState } from 'react'; // ✅ Tambahkan ini
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformation from './Partials/UpdateProfileInformationForm';
import UpdateAddressInformation from './Partials/UpdateAddressInformation';
import Navbar from '../ComponetGlobal/Navbar';
import PageHeader from '../ComponetGlobal/PageHeader';
import TabsProfile from '@/assets/TabsProfile'; // ✅ Pastikan path sesuai lokasi file Tabs

export default function Edit({ mustVerifyEmail, status, addresses }) {
    const [activeTab, setActiveTab] = useState('profile'); // ✅ useState sudah aman

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'address', label: 'Address' },
    ];

    return (
        <>
            <Navbar header={<PageHeader />}>
                <Head title="Profile" />

                <div className="py-12">
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
                                    <UpdateAddressInformation addresses={addresses}/>
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
            </Navbar>
        </>
    );
}
