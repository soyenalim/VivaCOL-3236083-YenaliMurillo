"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeHeaderSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Yellow radial from LEFT edge center and RIGHT edge center - like your image! */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 0% 50%, rgba(245, 207, 74, 0.9) 0%, transparent 15%), radial-gradient(circle at 100% 50%, rgba(245, 207, 74, 0.9) 0%, transparent 15%)'
      }}></div>

      <div className="relative max-w-[1440px] mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: Text Content */}
          <div 
            className={`space-y-8 transition-all duration-1000 ease-out transform ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <div className="space-y-4">
              <h1 className="font-['Montserrat'] font-black text-5xl md:text-6xl lg:text-7xl text-[#272953] leading-tight drop-shadow-lg">
                Descubre la magia de Colombia
              </h1>
              <div className="w-24 h-1.5 bg-[#D8413A] rounded-full shadow-lg"></div>
            </div>
            
            <p className="font-['Poppins'] text-lg md:text-xl text-[#272953]/90 max-w-lg leading-relaxed drop-shadow-md">
              Desde las playas cristalinas del Caribe hasta las montañas nevadas de los Andes. 
              Cada rincón cuenta una historia única esperando ser vivida.
            </p>

            <Link
              href="/descubre"
              className="inline-flex items-center gap-3 bg-[#272953] text-white px-8 py-4 rounded-full font-['Montserrat'] font-bold text-sm tracking-wider hover:scale-105 hover:bg-[#313467] transition-all duration-300 shadow-2xl group backdrop-blur-sm"
            >
              EXPLORAR DESTINOS
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* RIGHT: Banner Image Container */}
          <div 
            className={`relative transition-all duration-1000 delay-300 ease-out transform ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            {/* Glassmorphism container con aspect ratio */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/40 backdrop-blur-md bg-white/10 aspect-[16/10]">
              <img
                src="/images/brand/VivaCOL_Banner_RGB_FullColor.png"
                alt="Descubre Colombia"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#272953]/70 to-transparent"></div>
            </div>

            {/* Floating accent elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#F5CF4A]/30 rounded-full blur-2xl border border-white/20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#D8413A]/20 rounded-full blur-2xl border border-white/10"></div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-[#272953]/40 rounded-full flex justify-center pt-2 bg-white/20 backdrop-blur-sm">
          <div className="w-1.5 h-3 bg-[#272953]/60 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}