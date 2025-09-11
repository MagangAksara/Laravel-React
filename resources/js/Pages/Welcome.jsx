import React from "react";
import { Head } from '@inertiajs/react';
import NavbarDraft from "./WelcomeComponent/NavbarDraft.jsx";
import HeroClip from "./WelcomeComponent/HeroClip.jsx";
import AboutUsDraft from "./WelcomeComponent/AboutUsDraft.jsx";
import CarsDraft from "./WelcomeComponent/CarsDraft.jsx";
import FooterDraft from "./WelcomeComponent/FooterDraft.jsx";

const Welcome = ({ cars, userName }) => {
  return (
    <>
      <Head title="Welcome" />

      <div className="font-sans text-gray-800">
  
        {/* Navbar */}
        <NavbarDraft name={userName} />

        {/* Hero */}
        <HeroClip/>
        {/* <HeroClip_D/> */}

        {/* About Us */}
        <AboutUsDraft/>

        {/* Choose your car */}
        <CarsDraft cars={cars}/>

        {/* Footer */}
        <FooterDraft/>

      </div>
    </>
  );
};

export default Welcome;
