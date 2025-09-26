import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function AddressModal({ show, onClose, address = null }) {
    const { data, setData, post, put, processing, reset, errors } = useForm({
        city: '',
        district: '',
        regency: '',
        province: '',
        postal_code: '',
        latitude: '',
        longitude: '',
        detail: '',
    });

    const [loadingLocation, setLoadingLocation] = useState(false);

    useEffect(() => {
        if (address) {
            setData({
                city: address.city,
                district: address.district,
                regency: address.regency,
                province: address.province,
                postal_code: address.postal_code,
                latitude: address.latitude,
                longitude: address.longitude,
                detail: address.detail,
            });
        }
    }, [address]);

    // clear form setiap kali modal ditutup
    useEffect(() => {
        if (!show) {
            reset();
        }
    }, [show, reset]);

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Browser tidak mendukung geolokasi.");
            return;
        }
        setLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setData('latitude', pos.coords.latitude);
                setData('longitude', pos.coords.longitude);
                setLoadingLocation(false);
            },
            (err) => {
                alert("Gagal mengambil lokasi: " + err.message);
                setLoadingLocation(false);
            }
        );
    }

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
                    <Label className="block text-gray-500">City</Label>
                    <Input
                        type="text"
                        placeholder="City"
                        value={data.city}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                            setData('city', value);
                        }}
                        className="w-full border rounded pb-2"
                    />

                    <Label className="block text-gray-500">District</Label>
                    <Input
                        type="text"
                        placeholder="District"
                        value={data.district}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                            setData('district', value);
                        }}
                        className="w-full border rounded p-2"
                    />

                    <Label className="block text-gray-500">Regency</Label>
                    <Input
                        type="text"
                        placeholder="Regency"
                        value={data.regency}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                            setData('regency', value);
                        }}
                        className="w-full border rounded p-2"
                    />

                    <div className='justify-between flex gap-2'>
                        <div>
                            <Label className="block text-gray-500">Province</Label>
                            <Input
                                type="text"
                                placeholder="Province"
                                value={data.province}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                    setData('province', value);
                                }}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div>
                            <Label className="block text-gray-500">Postal Code</Label>
                            <Input
                                type="text"
                                placeholder="Postal Code"
                                value={data.postal_code}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    setData('postal_code', value);
                                }}
                                className="w-full border rounded p-2"
                            />
                        </div>
                    </div>
                    <div className='justify-between items-end flex gap-1'>
                        <div>
                            <Label className="block text-gray-500">Latitude</Label>
                            <Input
                                type="text"
                                value={data.latitude}
                                readOnly
                                className="w-full border rounded p-2 text-center"
                            />
                        </div>
                        <div>
                            <Label className="block text-gray-500">Longitude</Label>
                            <Input
                                type="text"
                                value={data.longitude}
                                readOnly
                                className="w-full border rounded p-2 text-center"
                            />
                        </div>
                        <Button
                            onClick={getCurrentLocation}
                            className="bg-blue-500 text-white"
                        >
                            {loadingLocation ? "..." : "Cari"}
                        </Button>
                    </div>
                    <Label className="block text-gray-500">Details</Label>
                    <Textarea
                        type="text"
                        placeholder="Details"
                        value={data.detail}
                        onChange={(e) => setData('detail', e.target.value)}
                        className="w-full border rounded p-2"
                    />

                    {/* Map Preview Placeholder */}
                    {/* <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 border rounded">
                        Map Preview
                    </div> */}

                    <div className="flex justify-end gap-2 mt-4">
                        <button type="submit" disabled={processing}>
                            {address ? 'Update' : 'Save'}
                        </button>
                        <button
                            type="button"
                            onClick={() => onClose()}
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
