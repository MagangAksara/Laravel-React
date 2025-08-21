import React from "react";
// import { Link } from "@inertiajs/react";

export default function AboutUsDraft() {
    return (
        <section id="about-us" className="flex flex-col gap-8 p-12 bg-white items-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            <h2 className="text-[32px] font-semibold mt-10 mb-3 text-center">About Us</h2>
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white">
                <img
                    src="/pictures/welcome/about_us.png"
                    // src="https://i.pinimg.com/1200x/5b/4c/3b/5b4c3b419c8eecbedd2b5f351e9b7c1b.jpg"
                    alt="About Us"
                    className="rounded-xl shadow-md w-full md:w-1/2 object-cover"
                />
                <div className="md:w-1/2 space-y-4 flex flex-col items-center text-center">
                    <h2 className="text-[32px] font-semibold">
                        <span style={{ color: "#122121" }}>Easy</span>
                        <span style={{ color: "#4e8eb8" }}>Ride</span>
                    </h2>
                    <p className="text-[25px] font-semibold text-gray-700">
                        Lorem ipsum dolor sit amet consectetur.
                        Accumsan facilisis vitae adipiscing cum quam morbi rhoncus egestas integer. Fusce habitant
                        proin a pulvinar sollicitudin. Turpis pulvinar cursus sagittis arcu cum eros vestibulum. Elit
                        amet interdum elementum adipiscing nam aenean ac ac.
                    </p>
                </div>
            </div>
        </section>
    );
}