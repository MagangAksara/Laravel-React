import { useState } from 'react';
import AddressModal from '../Modals/AddressModal';

export default function UpdateAddressInformation({ addresses = [] }) {
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);

    return (
        <>
            <section className="bg-white shadow rounded p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-gray-900">Address List</h2>
                    <button
                        onClick={() => {
                            setEditData(null);
                            setShowModal(true);
                        }}
                        className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                    >
                        Add Address +
                    </button>
                </div>

                {addresses.map((address) => (
                    <div
                        key={address.id}
                        className="flex items-start justify-between p-4 border rounded-lg mb-2"
                    >
                        <div>
                            <p className="font-semibold">{address.full_address}</p>
                            <p className="text-sm text-gray-600">
                                {address.city}, {address.province} ({address.postal_code})
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setEditData(address);
                                    setShowModal(true);
                                }}
                                className="text-blue-500 hover:underline"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            <AddressModal
                show={showModal}
                onClose={() => setShowModal(false)}
                address={editData}
            />
        </>
    );
}
