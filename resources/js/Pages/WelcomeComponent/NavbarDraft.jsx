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
        const baseClass = "text-white bg-transparan rounded-full px-2 py-1";
        const activeClass = "text-black bg-blue-200 font-semibold rounded-full px-2 py-1";

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
                    ? "fixed top-0 bg-blue-800/70 backdrop-blur-sm shadow-[0_15px_20px_-10px_rgba(0,0,0,0.3)]" 
                    : "absolute top-0 left-0 bg-black/30 backdrop-blur-sm shadow-[0_15px_20px_-10px_rgba(0,0,0,0.3)]"
                }
            `}
        >
            <div className="text-[26px] font-semibold">
                <span 
                    className="text-blue-300"
                >Easy</span>
                <span 
                    className="text-white"
                >Ride</span>
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
                    <button 
                        className="flex-1 px-3 py-1.5 bg-blue-600 border border-white rounded-full text-white text-sm hover:bg-white hover:text-black"
                        style={{
                            fontFamily:"quicksand"
                        }}
                    >
                        Login
                    </button>
                </Link>
                <Link href="/choose-role">
                    <button 
                        className="flex-1 px-3 py-1.5 bg-white border border-blue-600 rounded-full text-black text-sm hover:bg-blue-600 hover:text-white"
                        style={{
                            fontFamily:"quicksand"
                        }}
                    >
                        Register
                    </button>
                </Link>
            </div>
        </nav>
    );
}