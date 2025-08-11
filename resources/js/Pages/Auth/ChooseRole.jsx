import { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export function ChooseRole() {
    const [selectedRole, setSelectedRole] = useState(null);

    const getButtonClass = (role) => {
        const isActive = selectedRole === role;
        return `py-5 px-6 rounded-lg border transition-colors duration-300 
            ${isActive ? 'border-blue-500 bg-orange-400 text-black' : 'border-gray-500 bg-blue-500 text-white hover:bg-orange-400 hover:text-black'}`;
    };

    return (
        <GuestLayout>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-white text-2xl mb-6">Choose Your Role To Get Started</h1>

                <div className="grid grid-cols-2 gap-6 w-full max-w-[280px]">
                    <button
                        onClick={() => setSelectedRole('customer')}
                        className={`${getButtonClass('customer')} flex flex-col items-center h-full max-h-[160px]`}
                    >
                        <span className="text-lg font-semibold">Customer</span>
                        <img
                            src="/mini-icon/hands-phone.png"
                            alt="Customer"
                            className="w-full h-full object-contain"
                        />
                    </button>

                    <button
                        onClick={() => setSelectedRole('owner')}
                        className={`${getButtonClass('owner')} flex flex-col items-center h-full max-h-[160px]`}
                    >
                        <span className="text-lg font-semibold">Owner</span>
                        <img
                            src="/mini-icon/cars-owner.png"
                            alt="Customer"
                            className="w-full h-full max-w-md"
                        />
                    </button>
                </div>

                <Link
                    href={selectedRole ? route('register.with.role', selectedRole) : '#'}
                    className={`mt-6 px-6 py-2 rounded bg-blue-500 text-white transition-colors duration-300 ${
                        !selectedRole ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-400 hover:text-black'
                    }`}
                >
                    Next
                </Link>
            </div>
        </GuestLayout>
    );
}

export default ChooseRole;

