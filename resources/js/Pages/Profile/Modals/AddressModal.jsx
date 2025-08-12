import { useForm } from '@inertiajs/react';

export default function AddressModal({ show, onClose, address = null }) {
    const { data, setData, post, put, processing, reset } = useForm({
        name: address?.name || '',
        number_phone: address?.number_phone || '',
        province: address?.province || '',
        city: address?.city || '',
        district: address?.district || '',
        postal_code: address?.postal_code || '',
        full_address: address?.full_address || '',
        other_details: address?.other_details || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (address) {
            put(route('address.update', address.id), { onSuccess: () => onClose() });
        } else {
            post(route('address.store'), { onSuccess: () => onClose() });
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
                <h2 className="text-lg font-semibold mb-4">
                    {address ? 'Update Address' : 'Add Address'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        placeholder="Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    <input
                        type="text"
                        placeholder="Number Phone"
                        value={data.number_phone}
                        onChange={(e) => setData('number_phone', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    <input
                        type="text"
                        placeholder="Province"
                        value={data.province}
                        onChange={(e) => setData('province', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    <input
                        type="text"
                        placeholder="City / Regency"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    <input
                        type="text"
                        placeholder="District"
                        value={data.district}
                        onChange={(e) => setData('district', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    <input
                        type="text"
                        placeholder="Postal Code"
                        value={data.postal_code}
                        onChange={(e) => setData('postal_code', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    <input
                        type="text"
                        placeholder="Full Address"
                        value={data.full_address}
                        onChange={(e) => setData('full_address', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    <input
                        type="text"
                        placeholder="Other Details"
                        value={data.other_details}
                        onChange={(e) => setData('other_details', e.target.value)}
                        className="w-full border rounded p-2"
                    />

                    {/* Map Preview Placeholder */}
                    <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 border rounded">
                        Map Preview
                    </div>

                    <div className="flex justify-between mt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                onClose();
                            }}
                            className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
