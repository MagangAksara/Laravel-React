import React from "react";
import Dropdown from '@/Components/Dropdown';
import { Settings } from "lucide-react";
import { Link } from "@inertiajs/react";

const Header = () => {
    const today = new Date();
    const date = today.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const time = today.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const handleDropdown = () => setDropdownOpen((open) => !open);

    return (
        <>
            <header className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
                <div>
                    <Link href={route("dashboard")}>
                        <h1 className="text-2xl font-bold">Eazy<span className="text-blue-200">Ride</span></h1>
                    </Link>
                </div>
                <div className="flex items-center gap-4 relative">
                    {!route('dashboard') && (
                        <p className="text-sm text-gray-600">{date}, {time}</p>
                    )}
                    <div className="relative">
                        <Settings
                            className="cursor-pointer text-gray-700"
                            onClick={handleDropdown}
                        />
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                                <Dropdown.Link
                                    href={route('profile.edit')}
                                >
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
