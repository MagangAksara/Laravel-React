import React from "react";
import { Home, FileText, Car } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

const Sidebar = () => {
  const { url } = usePage();

  const menu = [
    { name: "Dashboard", icon: <Home size={16} />, link: "/dashboard" },
    { name: "Orders Management", icon: <FileText size={16} />, link: "/orders" },
    { name: "Cars Management", icon: <Car size={16} />, link: "/cars" },
  ];

  return (
    <aside className="w-60 bg-blue-600 text-white min-h-screen p-4 rounded-tr-[65px]">
      <nav className="flex flex-col gap-2 mt-5">
        {menu.map((item, idx) => (
          <Link
            key={idx}
            href={item.link}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
              url.startsWith(item.link) ? "bg-white text-blue-800 font-semibold" : "hover:bg-blue-500"
            }`}
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;