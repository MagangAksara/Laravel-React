import React from "react";
import { Head, Link } from '@inertiajs/react';
import NavbarDraft from "./WelcomeComponent/NavbarDraft.jsx";
import HeroClip from "./WelcomeComponent/HeroClip.jsx";
// import HeroClip_D from "./WelcomeComponent/HeroClip_D.jsx";
import AboutUsDraft from "./WelcomeComponent/AboutUsDraft.jsx";
import CarsDraft from "./WelcomeComponent/CarsDraft.jsx";
import FooterDraft from "./ComponetGlobal/FooterDraft.jsx";

const Welcome = ({ cars }) => {
  return (
    <div className="font-sans text-gray-800">
 
      {/* Navbar */}
      <NavbarDraft/>

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
  );
};

export default Welcome;
