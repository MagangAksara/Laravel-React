import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";

export default function NavbarDraft() {
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLinkClick = (linkName) => {
        setActiveLink(linkName);
    };

    const getLinkClass = (linkName) => {
        const baseClass = "text-white hover:text-blue-600";
        const activeClass = "text-blue-600 font-semibold";

        if (activeLink === linkName) {
            return activeClass;
        }

        return baseClass;
    };

    return (
        <nav
            className={`
                w-full flex justify-between items-center transition-all duration-300 z-50 py-3 px-6
                ${scrolled 
                    ? "fixed top-0 bg-blue-500/70 backdrop-blur-sm shadow-[0_15px_20px_-10px_rgba(0,0,0,0.3)]" 
                    : "absolute top-0 left-0 bg-transparent"
                }
            `}
        >
            <div className="text-[26px] font-semibold">
                <span style={{ color: "#122121" }}>Easy</span>
                <span style={{ color: "#4e8eb8" }}>Ride</span>
            </div>
            <div className="flex gap-4 border border-black rounded-[20px] py-1.5 px-3">
                <a 
                    href="#hero"
                    className={getLinkClass('home')}
                    onClick={() => handleLinkClick('home')}
                >
                    Home
                </a>
                <a 
                    href="#about-us" 
                    className={getLinkClass('about-us')}
                    onClick={() => handleLinkClick('about-us')}
                >
                    About Us
                </a>
                <a 
                    href="#rent-car" 
                    className={getLinkClass('rent-car')}
                    onClick={() => handleLinkClick('rent-car')}
                >
                    Rent Car
                </a>
            </div>
            <div className="flex gap-3">
                <Link href="/login">
                    <button className="px-3 py-1.5 bg-white border border-blue-600 rounded-full text-blue-600 text-sm hover:bg-blue-600 hover:text-white">
                        Login
                    </button>
                </Link>
                <Link href="/register">
                    <button className="px-3 py-1.5 bg-blue-500 border border-red-600 rounded-full text-red-600 text-sm hover:bg-red-600 hover:text-white">
                        Register
                    </button>
                </Link>
            </div>
        </nav>
    );
}