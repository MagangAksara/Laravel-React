// resources/js/Components/NavbarDraft.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "@inertiajs/react";
import UserMenu from "./UserMenu";

const NavbarDraft = ({ name }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const tickingRef = useRef(false);

  // optimized scroll handler using requestAnimationFrame + passive listener
  useEffect(() => {
    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 50;
          // only update state when it actually changes
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          tickingRef.current = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // run once to set initial state (in case page loaded scrolled)
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleLinkClick = useCallback((linkName) => {
    setActiveLink(linkName);
  }, []);

  const getLinkClass = useCallback((linkName) => {
    const baseClass = "text-white bg-transparent rounded-full px-3 py-1.5 transition-all duration-150";
    const activeClass = "text-black bg-blue-200 font-semibold rounded-full px-3 py-1.5 transition-all duration-150";
    return activeLink === linkName ? activeClass : baseClass;
  }, [activeLink]);

  // Assume you receive the authenticated user's name as a prop or from context.
  // For this example, let's use a placeholder name.
  const userName = name; // Replace with actual user name from props/context

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`
        w-full flex justify-between items-center transition-all duration-300 z-50 py-3 px-6
        ${scrolled
          ? "fixed top-0 left-0 right-0 bg-blue-800/70 backdrop-blur-sm shadow-[0_15px_20px_-10px_rgba(0,0,0,0.3)]"
          : "absolute top-0 left-0 right-0 bg-black/30 backdrop-blur-sm shadow-[0_15px_20px_-10px_rgba(0,0,0,0.3)]"
        }
      `}
    >
      <div className="text-[26px] font-semibold select-none">
        <span className="text-blue-300">Easy</span>
        <span className="text-white">Ride</span>
      </div>

      <div className="flex gap-4 border border-black rounded-[20px] py-1.5 px-3">
        <a
          href="#hero"
          onClick={() => handleLinkClick("home")}
          className={getLinkClass("home")}
          aria-current={activeLink === "home" ? "page" : undefined}
        >
          Home
        </a>

        <a
          href="#about-us"
          onClick={() => handleLinkClick("about-us")}
          className={getLinkClass("about-us")}
          aria-current={activeLink === "about-us" ? "page" : undefined}
        >
          About Us
        </a>

        <a
          href="#rent-car"
          onClick={() => handleLinkClick("rent-car")}
          className={getLinkClass("rent-car")}
          aria-current={activeLink === "rent-car" ? "page" : undefined}
        >
          Rent Car
        </a>
      </div>

      {userName ? (
        // Sudah login
        <UserMenu userName={userName} />
      ) : (
        // Belum login
        <div className="flex gap-3">
          <Link href="/login">
            <button
              className="px-3 py-1.5 bg-blue-600 border border-white rounded-full text-white text-sm hover:bg-white hover:text-black transition-colors"
              style={{ fontFamily: "quicksand" }}
            >
              Login
            </button>
          </Link>

          <Link href="/choose-role">
            <button
              className="px-3 py-1.5 bg-white border border-blue-600 rounded-full text-black text-sm hover:bg-blue-600 hover:text-white transition-colors"
              style={{ fontFamily: "quicksand" }}
            >
              Register
            </button>
          </Link>
        </div>
      )}

    </nav >
  );
}

export default NavbarDraft;