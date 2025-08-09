import React from "react";
import { Link } from "@inertiajs/react";

export default function NavbarDraft() {
    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow-md">
            <div className="text-[32px] font-semibold text-blue-600">
                <span style={{ color: "#122121" }}>Easy</span>
                <span style={{ color: "#4e8eb8" }}>Ride</span>
            </div>
            <div className="flex gap-6">
                <a href="#" className="text-blue-600 font-semibold">home</a>
                <a href="#" className="hover:text-blue-600">about us</a>
                <a href="#" className="hover:text-blue-600">rent car</a>
            </div>
            <div className="flex gap-4">
                <Link href="/login">
                    <button className="px-4 py-2 border border-blue-600 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white">
                        login
                    </button>
                </Link>
                <Link href="/register">
                    <button className="px-4 py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700">
                        register
                    </button>
                </Link>
            </div>
        </nav>
    );
}
