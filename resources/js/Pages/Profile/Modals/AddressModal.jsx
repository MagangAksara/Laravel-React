import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function AddressModal({ show, onClose, address = null }) {
    const { data, setData, post, put, processing, reset, errors  } = useForm({
        city: '',
        district: '',
        regency: '',
        province: '',
        postal_code: '',
        detail: '',
    });
    // city: address?.city || '',
    // district: address?.district || '',
    // regency: address?.regency || '',
    // province: address?.province || '',
    // postal_code: address?.postal_code || '',
    // // full_address: address?.full_address || '',
    // detail: address?.detail || '',
    // // other_details: address?.other_details || ''

    useEffect(() => {
        if (address) {
            setData({
                city: address.city,
                district: address.district,
                regency: address.regency,
                province: address.province,
                postal_code: address.postal_code,
                // full_address: address.full_address,
                detail: address.detail,
                // other_details: address?.other_details
                // address: address.address || '',
                // city: address.city || '',
                // postal_code: address.postal_code || '',
            });
        }
    }, [address]);

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
                    <Input
                        type="text"
                        placeholder="city"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    <Input
                        type="text"
                        placeholder="district"
                        value={data.district}
                        onChange={(e) => setData('district', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    <div className='justify-between flex gap-2'>
                        <Input
                            type="text"
                            placeholder="regency"
                            value={data.regency}
                            onChange={(e) => setData('regency', e.target.value)}
                            className="w-full border rounded p-2"
                            />
                    </div>
                    <div className='justify-between flex gap-2'>
                        <Input
                            type="text"
                            placeholder="province"
                            value={data.province}
                            onChange={(e) => setData('province', e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        <Input
                            type="text"
                            placeholder="Postal Code"
                            value={data.postal_code}
                            onChange={(e) => setData('postal_code', e.target.value)}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <Textarea
                        type="text"
                        placeholder="detail"
                        value={data.detail}
                        onChange={(e) => setData('detail', e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    {/* <Textarea
                        type="text"
                        placeholder="Other Details"
                        value={data.other_details}
                        onChange={(e) => setData('other_details', e.target.value)}
                        className="w-full border rounded p-2"
                    /> */}

                    {/* Map Preview Placeholder */}
                    <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 border rounded">
                        Map Preview
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button type="submit" disabled={processing}>
                            {address ? 'Update' : 'Save'}
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
