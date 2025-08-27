import React from "react";
import { Home, FileText, Car } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

const Sidebar = () => {
  const { url } = usePage();

  const menu = [
    { name: "Dashboard", icon: <Home size={20} />, link: "/dashboard" },
    { name: "Orders Management", icon: <FileText size={20} />, link: "/orders" },
    { name: "Cars Management", icon: <Car size={20} />, link: "/cars" },
  ];

  return (
    <aside className="bg-blue-600 text-white min-h-screen p-4 rounded-tr-[60px] w-20 md:w-60 transition-all duration-300 ease-in-out group">
      <nav className="flex flex-col gap-2 mt-5">
        {menu.map((item, idx) => (
          <Link
            key={idx}
            href={item.link}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition
              ${url.startsWith(item.link)
                ? "bg-white text-blue-800 font-semibold"
                : "hover:bg-blue-500"
              }`}
          >
            <span>{item.icon}</span>
            <span className="hidden md:inline">
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;