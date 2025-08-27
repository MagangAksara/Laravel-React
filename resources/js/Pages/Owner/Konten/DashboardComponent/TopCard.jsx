import React, { useMemo, useState } from "react";

import { Calendar } from "lucide-react";

const TopCard = ({ name, date, time }) => {

    return (
        <>
            <div className="relative bg-gradient-to-r from-blue-700 to-blue-300 lg:to-sky-100 text-white rounded-2xl p-6 mt-3 mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center shadow-md w-full lg:w-[95%]">
                <div className="z-10">
                    <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg text-sm mb-4 w-fit">
                        <Calendar className="w-4 h-4" />
                        <p>{date}, {time}</p>
                    </div>
                    <h2 className="text-xl lg:text-2xl font-semibold">
                        Welcome in, {name}
                    </h2>
                    <p className="text-sm opacity-90">Have a nice day!</p>
                </div>
                <div className="hidden md:flex mt-4 lg:mt-0 lg:absolute lg:-right-[90px] lg:-bottom-[52px]">
                    <img
                        src="/pictures/dashboard/owner/car-illustration.png"
                        alt="Car Rent Illustration"
                        className="w-60 lg:w-80"
                    />
                </div>
            </div>
        </>
    );
}

export default TopCard;