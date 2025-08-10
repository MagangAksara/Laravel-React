// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';

// export default function Dashboard() {
//     return (
//         <AuthenticatedLayout
//             header={
//                 <h2 className="text-xl font-semibold leading-tight text-gray-800">
//                     Dashboard
//                 </h2>
//             }
//         >
//             <Head title="Dashboard" />

//             <div className="py-12">
//                 <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
//                     <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
//                         <div className="p-6 text-gray-900">
//                             You're logged in!
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }

// import React from "react";
// import { Head, Link } from '@inertiajs/react';
// import FilterSidebar from "./DashboardComponent_Customer/FilterSideBar";
// import CarCard from "./DashboardComponent_Customer/CarCard";
// import RentCar from "./DashboardComponent_Customer/RentCar";
// import FooterDraft from "./ComponetGlobal/FooterDraft.jsx";

// export default function Dashboard() {
//     return (
//     <div className="font-sans text-gray-800">
 
//       <FilterSidebar/>

//       <CarCard/>

//       <RentCar/>

//       <FooterDraft/>

//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import FilterSidebar from "./DashboardComponent_Customer/FilterSidebar";
import CarCard from "./DashboardComponent_Customer/CarCard";

export default function RentCar() {
  const cars = [
    {
      image: "/images/yaris.png",
      name: "Toyota Yaris G GR-Sport",
      price: 250000,
      location: "Malang",
      transmission: "Manual",
      seats: 5,
      fuel: "Petrol"
    },
    {
      image: "/images/brio.png",
      name: "Honda Brio Satya E",
      price: 200000,
      location: "Malang",
      transmission: "Matic",
      seats: 5,
      fuel: "Petrol"
    }
  ];

  return (
    <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
      <FilterSidebar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {cars.map((car, idx) => (
          <CarCard key={idx} {...car} />
        ))}
      </div>
    </div>
  );
}
