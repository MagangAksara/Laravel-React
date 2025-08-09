import React from "react";
import { Head, Link } from '@inertiajs/react';
import NavbarDraft from "./WelcomeComponent/NavbarDraft.jsx";
import HeroClip from "./WelcomeComponent/HeroClip.jsx";
import AboutUsDraft from "./WelcomeComponent/AboutUsDraft.jsx";
import CarsDraft from "./WelcomeComponent/CarsDraft.jsx";
import FooterDraft from "./WelcomeComponent/FooterDraft.jsx";

const Welcome = ({ cars }) => {
  return (
    <div className="font-sans text-gray-800">
 
      {/* Navbar */}
      <NavbarDraft/>

      {/* Hero */}
      <HeroClip/>

      {/* About Us */}
      <AboutUsDraft/>

      {/* Choose your car */}
      <section className="p-12 bg-white">
        <CarsDraft cars={cars} />

        <div className="flex justify-center mt-8">
          <button className="px-6 py-3 bg-blue-600 rounded-full text-white text-lg hover:bg-blue-700">
            See More →
          </button>
        </div>
      </section>


      {/* Footer */}
      <FooterDraft/>

    </div>
  );
};

export default Welcome;
