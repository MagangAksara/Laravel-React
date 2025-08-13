import React from "react";
import { Star } from "lucide-react";

const Reviews = () => {
    // const { car } = usePage().props;
    
    return(
        <>
            <div className="mt-12 ">
                <div className="flex items-center gap-2">
                    <Star size={20} className="text-yellow-400" />
                    <Star size={20} className="text-yellow-400" />
                    <Star size={20} className="text-yellow-400" />
                    <Star size={20} className="text-yellow-400" />
                    <Star size={20} className="text-gray-300" />
                    <span className="ml-2 text-gray-700">4/5</span>
                </div>

                {/* List Review */}
                {[1, 2].map((i) => (
                <div key={i} className="mt-4 bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="user"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p className="font-semibold">Amelia</p>
                            <p className="text-xs text-gray-500">12 Agustus 2024 12:32</p>
                        </div>
                    </div>
                    <div className="flex gap-1 mt-2">
                        {[...Array(4)].map((_, idx) => (
                            <Star key={idx} size={16} className="text-yellow-400" />
                        ))}
                        <Star size={16} className="text-gray-300" />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                        Pengalaman menyewa mobil ini sangat memuaskan. Mobil datang dalam kondisi bersih, wangi, dan nyaman.
                    </p>
                </div>
                ))}
            </div>
        </>
    );
}

export default Reviews;

