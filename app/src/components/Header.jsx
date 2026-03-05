"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (token) {
      setIsLoggedIn(true);
      setUserRole(user.role);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  // Reusable nav link component with flag hover effect
  const NavLink = ({ href, children }) => (
    <Link 
      href={href} 
      className="relative text-[#272953] font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-300 group hover:text-[#313467] hover:scale-110"
    >
      {/* Yellow top stripe */}
      <span className="absolute -top-2 left-0 w-0 h-0.5 bg-[#F5CF4A] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(245,207,74,0.8)]" />
      
      {/* Text content */}
      <span className="relative drop-shadow-[0_0_0px_rgba(49,52,103,0)] transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(49,52,103,0.6)]">
        {children}
      </span>
      
      {/* Red bottom stripe */}
      <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#D8413A] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(216,65,58,0.8)]" />
    </Link>
  );

  return (
    <header 
      className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out ${
        isScrolled 
          ? "bg-[var(--viva-w)]/90 backdrop-blur-xl border-b border-white/30 shadow-2xl py-3" 
          : "bg-[#EDEAE6]/60 backdrop-blur-md border-b border-[#272953]/10 py-4"
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6">

        {/* CONTAINER LEFT | LANGUAGE */}
        <div className="relative w-1/4">
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-2 text-[#272953] hover:text-[#D8413A] transition-colors font-bold text-xs tracking-tighter group"
          >
            <Globe className="w-4 h-4 group-hover:text-[#F5CF4A] transition-colors" />
            <span>ESPAÑOL | LAT</span>
            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${langMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* MENU */}
          {langMenuOpen && (
            <div className="absolute top-full mt-3 w-44 bg-[var(--viva-w)]/95 backdrop-blur-xl border border-white/30 rounded-xl shadow-2xl overflow-hidden z-50">
              <button className="w-full text-left px-4 py-3 text-xs font-bold text-[#272953] hover:bg-[#313467]/10 hover:text-[#313467] border-b border-white/20 transition-all">
                ESPAÑOL (LAT)
              </button>
              <button className="w-full text-left px-4 py-3 text-xs font-bold text-[#272953] hover:bg-[#313467]/10 hover:text-[#313467] border-b border-white/20 transition-all">
                ENGLISH (UK)
              </button>
              <button className="w-full text-left px-4 py-3 text-xs font-bold text-[#272953] hover:bg-[#313467]/10 hover:text-[#313467] transition-all">
                FRANÇAIS (CA)
              </button>
            </div>
          )}
        </div>

        {/* CONTAINER CENTER | NAV + LOGO + NAV */}
        <div className="flex items-center gap-10">
          
          {/* NAV LEFT */}
          <nav className="flex gap-8">
            <NavLink href="/destinos">Destinos</NavLink>
            <NavLink href="/descubre">Descubre</NavLink>
          </nav>

          {/* LOGO CENTERED */}
          <Link href="/" className="relative group px-4">
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 transition-all rounded bg-[#272953] px-2 py-1 text-xs text-white group-hover:scale-100 font-['Poppins'] whitespace-nowrap">
              Volver a Inicio
            </span>
            <img
              src="/images/brand/VivaCOL_Horizontal-Logo_RGB_W-FullColor.png"
              alt="VivaCOL Logo"
              className={`transition-all duration-500 hover:scale-105 drop-shadow-lg ${isScrolled ? 'h-8' : 'h-9'} w-auto`}
            />
          </Link>

          {/* NAV RIGHT */}
          <nav className="flex gap-8">
            <NavLink href="/nosotros">Nosotros</NavLink>
            <NavLink href="/contacto">Contacto</NavLink>
          </nav>
        </div>

        {/* BOTONES DINAMICOS */}
        <div className="flex items-center justify-end gap-4 w-1/4">
          {!isLoggedIn ? (
            <>
              <NavLink href="/login">Ingresar</NavLink>
              <Link
                href="/login"
                className="bg-[#313467] text-white px-8 py-2.5 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:scale-105 hover:bg-[#272953] transition-all duration-300 shadow-lg"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <>
              {/* LINK A DASHBOARD SEGÚN ROL */}
              <Link
                href={userRole === "admin" ? "/admin" : "/user"}
                className={`px-6 py-2 rounded-full font-bold text-[10px] hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2 ${
                  userRole === "admin" 
                    ? "bg-[#F5CF4A] text-[#272953] hover:bg-[#F5B740]" 
                    : "bg-[#313467] text-white hover:bg-[#272953]"
                }`}
              >
                <span className={`w-2 h-2 rounded-full animate-pulse ${
                  userRole === "admin" ? "bg-[#272953]" : "bg-[#F5CF4A]"
                }`} />
                {userRole === "admin" ? "Admin Panel" : "Mi Perfil"}
              </Link>
              
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.href = "/";
                }}
                className="bg-[#D8413A] text-white px-6 py-2 rounded-full font-bold text-[10px] hover:scale-105 hover:bg-[#b91c1c] transition-all duration-300 shadow-lg"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}