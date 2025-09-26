import React from "react";

export default function AboutUsDraft() {
    return (
        <section id="about-us" className="flex flex-col gap-8 p-12 bg-white items-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            <h2 className="text-[32px] font-semibold mt-10 mb-3 text-center">About Us</h2>
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white">
                <img
                    // src="/pictures/welcome/about_us.png"
                    src="https://i.pinimg.com/736x/23/24/31/2324316e6195921cd96dfc6dc0dc4cd3.jpg"
                    // src="https://i.pinimg.com/1200x/5b/4c/3b/5b4c3b419c8eecbedd2b5f351e9b7c1b.jpg"
                    alt="About Us"
                    className="rounded-xl shadow-md w-full md:w-1/2 md:h-[450px] object-cover"
                />
                <div className="md:w-1/2 space-y-4 flex flex-col items-center text-center">
                    <h2 className="text-[32px] font-semibold">
                        <span style={{ color: "#122121" }}>Easy</span>
                        <span style={{ color: "#4e8eb8" }}>Ride</span>
                    </h2>
                    <p className="text-[25px] font-semibold text-gray-700">
                        Here to make your journey easier, more comfortable, and safer with flexible car rental services at transparent prices. Our focus is to provide a hassle-free driving experience, from booking to returning the vehicle. Every trip with Eazy Ride is designed to be enjoyable, supporting your daily activities—whether for work, vacation, or exploring the city—with safety, comfort, and excellent service as our top priorities.
                    </p>
                    <p className="text-[25px] font-semibold text-gray-700">Eazy Ride – Ride Easy, Travel Happy.</p>
                </div>
            </div>
        </section>
    );
}