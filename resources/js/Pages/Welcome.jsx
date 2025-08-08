import React from "react";
import { Head, Link } from '@inertiajs/react';

const Welcome = () => {
  return (
    <div className="font-sans text-gray-800">

      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-blue-600">EazyRide</div>
        <div className="flex gap-6">
          <a href="#" className="text-blue-600 font-semibold">home</a>
          <a href="#" className="hover:text-blue-600">about us</a>
          <a href="#" className="hover:text-blue-600">rent car</a>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <button className="px-4 py-2 border border-blue-600 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white">login</button>
          </Link>
          <Link href="/register">
            <button className="px-4 py-2 bg-blue-600 rounded-full text-white hover:bg-blue-700">register</button>
          </Link>
        </div>
      </nav>

      {/* Hero */}}
      <section className="relative bg-gray-100">
        <img
          src="https://i.pinimg.com/736x/32/ef/3e/32ef3e2ce15db067e704c43d1bcb4475.jpg"
          alt="Hero Car"
          className="w-full object-cover h-[500px]"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-start px-12 bg-black/40">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            <span className="text-blue-400">Ride</span> your journey
          </h1>
          <p className="text-white text-lg mt-4 max-w-xl">
            Find your ride, book it now, and start your journey in comfort today.
          </p>
          <button className="mt-8 px-6 py-3 bg-blue-600 rounded-full text-white text-lg hover:bg-blue-700">
            Choose your car →
          </button>
        </div>
      </section>

      {/* About Us */}
      <section className="flex flex-col md:flex-row items-center gap-8 p-12 bg-white">
        <img
          src="https://i.pinimg.com/1200x/5b/4c/3b/5b4c3b419c8eecbedd2b5f351e9b7c1b.jpg"
          alt="About Us"
          className="rounded-xl shadow-md w-full md:w-1/2 object-cover"
        />
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold">About Us</h2>
          <p className="text-gray-700">
            <span className="font-bold text-blue-600">EasyRide</span> Lorem ipsum dolor sit amet consectetur.
            Accumsan facilisis vitae adipiscing cum quam morbi rhoncus egestas integer. Fusce habitant
            proin a pulvinar sollicitudin. Turpis pulvinar cursus sagittis arcu cum eros vestibulum. Elit
            amet interdum elementum adipiscing nam aenean ac ac.
          </p>
        </div>
      </section>

      {/* Choose your car */}
      <section className="p-12 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center">Choose your car</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Toyota Yaris G GR-Sport", price: "Rp.250.000/day", img: "https://source.unsplash.com/400x300/?toyota" },
            { name: "Honda Brio Satya E", price: "Rp.200.000/day", img: "https://source.unsplash.com/400x300/?honda-brio" },
            { name: "Toyota Yaris G GR-Sport", price: "Rp.250.000/day", img: "https://source.unsplash.com/400x300/?toyota-yaris" },
            { name: "Honda Brio Satya E", price: "Rp.200.000/day", img: "https://source.unsplash.com/400x300/?honda" },
          ].map((car, idx) => (
            <div key={idx} className="bg-gray-200 rounded-xl overflow-hidden shadow-md">
              <img src={car.img} alt={car.name} className="w-full h-48 object-cover" />
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">{car.name}</h3>
                <p className="text-gray-600">{car.price}</p>
                <div className="flex gap-4 text-sm text-gray-700">
                  <span>⚙️ {idx % 2 === 0 ? "Manual" : "Matic"}</span>
                  <span>🚗 {idx % 2 === 0 ? "5" : "4"}</span>
                  <span>⛽ Petrol</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button className="px-6 py-3 bg-blue-600 rounded-full text-white text-lg hover:bg-blue-700">
            See More →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-8 mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-bold text-blue-400 mb-4">EazyRide</div>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur. Varius in dolor egestas euismod nulla. Vitae sed tristique nam pharetra.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Rent Car</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Instagram</a></li>
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">YouTube</a></li>
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
