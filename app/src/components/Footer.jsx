"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Facebook, Github, Instagram, Music2 } from "lucide-react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition >= documentHeight - 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility();
    
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-700 ease-in-out transform ${
        isVisible 
          ? "translate-y-0 opacity-100" 
          : "translate-y-full opacity-0"
      }`}
    >
      {/* Glassmorphism container matching header/login style */}
      <div className="bg-[var(--viva-w)]/90 backdrop-blur-xl border-t border-white/30 shadow-2xl">
        <div className="max-w-[1440px] mx-auto px-6 py-8">
          
          {/* Main footer content - Single row with logo centered and icons on sides */}
          <div className="flex items-center justify-center gap-16">
            
            {/* LEFT SIDE: 2 Social Icons */}
            <div className="flex items-center gap-6">
              <Link 
                href="https://facebook.com" 
                target="_blank"
                className="group relative"
              >
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 transition-all rounded bg-[#272953] px-2 py-1 text-xs text-white group-hover:scale-100 font-['Poppins'] whitespace-nowrap">
                  Facebook
                </span>
                <div className="p-3 bg-[#F5CF4A]/35 border border-[#F5CF4A] rounded-full hover:scale-110 transition-transform duration-300">
                  <Facebook className="w-5 h-5 text-[#F5CF4A]" />
                </div>
              </Link>
              
              <Link 
                href="https://instagram.com" 
                target="_blank"
                className="group relative"
              >
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 transition-all rounded bg-[#272953] px-2 py-1 text-xs text-white group-hover:scale-100 font-['Poppins'] whitespace-nowrap">
                  Instagram
                </span>
                <div className="p-3 bg-[#F5CF4A]/35 border border-[#F5CF4A] rounded-full hover:scale-110 transition-transform duration-300">
                  <Instagram className="w-5 h-5 text-[#F5CF4A]" />
                </div>
              </Link>
            </div>

            {/* CENTER: Logo Icon */}
            <Link 
              href="/" 
              className="group relative hover:scale-105 transition-transform duration-300"
            >
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 transition-all rounded bg-[#272953] px-2 py-1 text-xs text-white group-hover:scale-100 font-['Poppins'] whitespace-nowrap">
                Volver a Inicio
              </span>
              <img
                src="/images/brand/VivaCOL_Icon-Logo_RGB_FullColor.png"
                alt="VivaCOL"
                className="h-16 w-auto"
              />
            </Link>

            {/* RIGHT SIDE: 2 Social Icons */}
            <div className="flex items-center gap-6">
              <Link 
                href="https://github.com" 
                target="_blank"
                className="group relative"
              >
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 transition-all rounded bg-[#272953] px-2 py-1 text-xs text-white group-hover:scale-100 font-['Poppins'] whitespace-nowrap">
                  GitHub
                </span>
                <div className="p-3 bg-[#313467]/35 border border-[#313467] rounded-full hover:scale-110 transition-transform duration-300">
                  <Github className="w-5 h-5 text-[#313467]" />
                </div>
              </Link>
              
              <Link 
                href="https://tiktok.com" 
                target="_blank"
                className="group relative"
              >
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 transition-all rounded bg-[#272953] px-2 py-1 text-xs text-white group-hover:scale-100 font-['Poppins'] whitespace-nowrap">
                  TikTok
                </span>
                <div className="p-3 bg-[#D8413A]/35 border border-[#D8413A] rounded-full hover:scale-110 transition-transform duration-300">
                  <Music2 className="w-5 h-5 text-[#D8413A]" />
                </div>
              </Link>
            </div>

          </div>

          {/* Copyright - Below the main row */}
          <div className="mt-8 text-center">
            <p className="text-[#272953] font-['Montserrat'] font-semibold text-[10px] tracking-[0.3em] uppercase">
              COPYRIGHT © {new Date().getFullYear()} VIVA COLOMBIA SAS
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}