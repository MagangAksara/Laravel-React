// HeroClip.jsx
import React, { useId } from "react";

  export default function HeroClip({ imageUrl }) {
  const img =
    imageUrl ??
    "https://images.unsplash.com/photo-1656685299734-52a0bb4425aa?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0";

  return (
    <section id="hero" className="relative w-full" style={{ height: "580px" }}>
      {/* Bentuk utama */}
      {/* <div className="relative"> */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${img})`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 h-full"
          style={{
            width: "55%",
            height: "15%",
            boxShadow: "20px 20px 20px rgba(0,0,0,0.15)",
            background: "transparent",
            pointerEvents: "none" // biar gak menghalangi interaksi
          }}
        />
      {/* </div> */}

      {/* Bentuk kedua mengatur  */}
      {/* <div
        className="absolute bottom-0 left-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${img})`, 
          width: "55%",
          height: "15%",
          borderBottomRightRadius: "20px",
        }}
      /> */}

      {/* Konten di atas gambar */}
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

      {/* Bentuk penutup putih di sudut bawah kiri */}
      <div
        className="absolute bottom-0 right-0 p-0 m-0"
        style={{
          width: "45%",
          height: "15%",
          background: "white", // untuk menhapus efek garis tepi yang muncul akibat inset di box shadow
          borderTopLeftRadius: "20px",
          boxShadow: "inset 12px 12px 20px rgba(0,0,0,0.15)"
        }}
      />
      {/* <div
        className="absolute bottom-0 right-0 bg-white"
        style={{
          width: "45%",
          height: "15%",
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "-20px",
          background: `
          //   linear-gradient(to right, rgba(0,0,0,0.10), transparent 10%),
          //   linear-gradient(to bottom, rgba(0,0,0,0.15), transparent 20%),
          //   white
          // `,
          backgroundBlendMode: "multiply",

          // Mask untuk bentuk “S” di sudut kiri
          WebkitMaskImage: `
            radial-gradient(circle at top left, black 20px, transparent 21px),
            radial-gradient(circle at bottom left, black 21px)
          `,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          WebkitMaskComposite: "source-over",
          maskComposite: "intersect" // untuk browser yang mendukung
        }}
      /> */}
    </section>
  );
}