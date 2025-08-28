import React from "react";

export default function FooterDraft() {
    return (
      <footer
        className="text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1516211230282-08ff4c531afa?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundColor: "rgba(0,0,0,0.5)", // unutukk memberikan efek gelap pada background
          backgroundBlendMode: "multiply",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 bg-opacity-80 rounded-lg p-6">
        <div>
        <div className="text-[32px] text-2xl font-bold text-blue-400 mb-4">
            <span style={{ color: "#FDFCFD" }}>Easy</span>
            <span style={{ color: "#4e8eb8" }}>Ride</span>
          </div>
        <p className="text-gray-400">
          Lorem ipsum dolor sit amet consectetur. Varius in dolor egestas euismod nulla. Vitae sed tristique nam pharetra.
        </p>
        </div>
        <div >
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
    );
}
