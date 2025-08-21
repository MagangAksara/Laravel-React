import React from "react";
import { Settings } from "lucide-react";

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
                    <h1 className="text-2xl font-bold">Eazy<span className="text-blue-200">Ride</span></h1>
                </div>
                <div className="flex items-center gap-4 relative">
                    <p className="text-sm text-gray-600">{date}, {time}</p>
                    <div className="relative">
                        <Settings
                            className="cursor-pointer text-gray-700"
                            onClick={handleDropdown}
                        />
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                    Profile
                                </button>
                                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
