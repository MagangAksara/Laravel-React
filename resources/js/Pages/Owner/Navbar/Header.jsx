import React from "react";
import Dropdown from '@/Components/Dropdown';
import { Settings } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

const Header = ({ name }) => {
    const { url } = usePage();

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
                        <h1 className="text-3xl font-playfair font-bold ml-3">Eazy<span className="text-blue-500">Ride</span></h1>
                    </Link>
                </div>
                <div className="flex items-center gap-4 relative">
                    {url !== "/dashboard" && (
                        <p className="text-sm text-gray-600">{date}, {time}</p>
                    )}
                    <div className="relative">
                        {/* <div onClick={handleDropdown}>
                            {name}
                        </div> */}
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
