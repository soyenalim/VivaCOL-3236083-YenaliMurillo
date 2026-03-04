"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Facebook, Github, Linkedin } from "lucide-react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [bgImage, setBgImage] = useState("");

  const wallpapers = [
    "/images/wallpapers/VivaCOL-003.jpg",
    "/images/wallpapers/VivaCOL-006.jpg",
    "/images/wallpapers/VivaCOL-009.jpg",
    "/images/wallpapers/VivaCOL-012.jpg",
    "/images/wallpapers/VivaCOL-015.jpg"
  ];

  useEffect(() => {
    const randomImg = wallpapers[Math.floor(Math.random() * wallpapers.length)];
    setBgImage(randomImg);
  }, []);

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center transition-all duration-1000 ease-in-out p-4"
      style={{ 
        backgroundImage: `linear-gradient(rgba(39, 41, 83, 0.5), rgba(39, 41, 83, 0.5)), url('${bgImage}')` 
      }}
    >
      {/* MASTER CONTAINER */}
      <div className="relative w-full max-w-[950px] h-[600px] bg-[var(--viva-w)] backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl overflow-hidden">  

        {/* SIGN UP FORM | LEFT TO RIGHT */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center px-10 transition-all duration-700 ease-in-out ${
            isLogin
              ? "translate-x-0 opacity-0 z-10 pointer-events-none"
              : "translate-x-full opacity-100 z-20 pointer-events-auto"
          }`}
        >
          <h2 className="font-['Montserrat'] font-black text-4xl mb-6 text-[#EDEAE6] text-center">
            Crea tu cuenta
          </h2>
          <div className="flex gap-4 mb-6">
            <button className="p-3 bg bg-[#F5CF4A]/35 border border-[#F5CF4A] rounded-full hover:scale-105 transition-transform" data-testid="button-social-facebook-register">
              <Facebook className="w-5 h-5 text-[#F5CF4A]" />
            </button>
            <button className="p-3 bg bg-[#313467]/35 border border-[#313467] rounded-full hover:scale-105 transition-transform" data-testid="button-social-github-register">
              <Github className="w-5 h-5 text-[#313467]" />
            </button>
            <button className="p-3 bg bg-[#D8413A]/35 border border-[#D8413A] rounded-full hover:scale-105 transition-transform" data-testid="button-social-linkedin-register">
              <Linkedin className="w-5 h-5 text-[#D8413A]" />
            </button>
          </div>
          <span className="text-sm text-[#EDEAE6] mb-6">o registrate con tu correo</span>
          <input
            type="text"
            placeholder="Usuario"
            className="w-full bg-gray-100 border-none px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#313467] placeholder:text-sm"
            data-testid="input-register-name"
          />
          <input
            type="email"
            placeholder="Correo"
            className="w-full bg-gray-100 border-none px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#313467] placeholder:text-sm"
            data-testid="input-register-email"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full bg-gray-100 border-none px-4 py-3 rounded-lg mb-8 focus:outline-none focus:ring-2 focus:ring-[#313467] placeholder:text-sm"
            data-testid="input-register-password"
          />
          <button 
            className="bg-[#313467] text-white px-12 py-3 rounded-full font-bold tracking-wider hover:scale-105 transition-transform shadow-lg text-sm"
            data-testid="button-register-submit"
          >
            REGISTRATE
          </button>
        </div>

        {/* LOG IN FORM (LEFT SIDE) */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center px-10 transition-all duration-700 ease-in-out ${
            isLogin
              ? "translate-x-0 opacity-100 z-20 pointer-events-auto"
              : "translate-x-full opacity-0 z-10 pointer-events-none"
          }`}
        >
          <h2 className="font-['Montserrat'] font-black text-4xl mb-6 text-[#EDEAE6] text-center">
            Inicia Sesión
          </h2>
          <div className="flex gap-4 mb-6">
            <button className="p-3 bg bg-[#F5CF4A]/35 border border-[#F5CF4A] rounded-full hover:scale-105 transition-transform" data-testid="button-social-facebook-login">
              <Facebook className="w-5 h-5 text-[#F5CF4A]" />
            </button>
            <button className="p-3 bg bg-[#313467]/35 border border-[#313467] rounded-full hover:scale-105 transition-transform" data-testid="button-social-github-login">
              <Github className="w-5 h-5 text-[#313467]" />
            </button>
            <button className="p-3 bg bg-[#D8413A]/35 border border-[#D8413A] rounded-full hover:scale-105 transition-transform" data-testid="button-social-linkedin-login">
              <Linkedin className="w-5 h-5 text-[#D8413A]" />
            </button>
          </div>
          <span className="text-sm text-[#EDEAE6] mb-6">o ingresa con tu correo</span>
          <input
            type="email"
            placeholder="Correo"
            className="w-full bg-gray-100 border-none px-4 py-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#313467] placeholder:text-sm"
            data-testid="input-login-email"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full bg-gray-100 border-none px-4 py-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-[#313467] placeholder:text-sm"
            data-testid="input-login-password"
          />
          <a href="#" className="text-sm text-[#EDEAE6] mb-10 hover:text-[#313467] transition-colors" data-testid="link-forgot-password">
            ¿Olvidaste tu Contraseña?
          </a>
          <button 
            className="bg-[#313467] text-white px-12 py-3 rounded-full font-bold tracking-wider hover:scale-105 transition-transform shadow-lg text-sm"
            data-testid="button-login-submit"
          >
            INICIA SESIÓN
          </button>
        </div>

        {/* OVERLAY CONTAINER */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out z-50 ${
            isLogin 
              ? "translate-x-0 rounded-tl-[150px] rounded-bl-[150px] rounded-tr-none rounded-br-none" 
              : "-translate-x-full rounded-tr-[150px] rounded-br-[150px] rounded-tl-none rounded-bl-none"
          }`}
        >
          {/* OVERLAY BACKGROUND */}
          <div
            className={`absolute top-0 -left-full w-[200%] h-full bg-[#272953] backdrop-blur-md border-x transition-transform duration-700 ease-in-out ${
              isLogin ? "translate-x-0" : "translate-x-1/2"
            }`}
          >
            {/* OVERLAY LEFT | CONTENT */}
            <div
              className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center px-12 text-center text-white transition-transform duration-700 ease-in-out ${
                isLogin ? "-translate-x-[20%]" : "translate-x-0"
              }`}
            >
            <div className="relative group flex flex-col items-center">
              {/* (Tooltip) */}
              <span className="absolute -top-10 scale-0 transition-all rounded bg-[#272953] p-2 text-xs text-white group-hover:scale-100 font-['Poppins']">
                Volver a Inicio
              </span>
              <Link href="/" className="mb-4 hover:scale-105 transition-transform duration-300">
                <img 
                  src="/images/brand/VivaCOL_Icon-Logo_RGB_FullColor.png" 
                  alt="VivaCOL" 
                  className="h-24 w-auto cursor-pointer" 
                />
              </Link>
            </div>
              <h2 className="font-['Montserrat'] font-black text-4xl mb-6">¡Bienvenido de Nuevo!</h2>
              <p className="text-white/90 mb-8 font-light text-sm leading-relaxed">
                ¿Ya tienes cuenta? Inicia sesión con tus datos
              </p>
              <button
                onClick={() => setIsLogin(true)}
                className="border border-white text-white px-12 py-3 rounded-full font-bold tracking-wider hover:scale-105 transition-transform text-sm"
                data-testid="button-switch-to-login"
              >
                INICIAR SESIÓN
              </button>
            </div>

            {/* OVERLAY RIGHT | CONTENT  */}
            <div
              className={`absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center px-12 text-center text-white transition-transform duration-700 ease-in-out ${
                isLogin ? "translate-x-0" : "translate-x-[20%]"
              }`}
            >
            <div className="relative group flex flex-col items-center">
              {/* (Tooltip) */}
              <span className="absolute -top-10 scale-0 transition-all rounded bg-[#272953] p-2 text-xs text-white group-hover:scale-100 font-['Poppins']">
                Volver a Inicio
              </span>
              <Link href="/" className="mb-4 hover:scale-105 transition-transform duration-300">
                <img 
                  src="/images/brand/VivaCOL_Icon-Logo_RGB_FullColor.png" 
                  alt="VivaCOL" 
                  className="h-24 w-auto cursor-pointer" 
                />
              </Link>
            </div>
              <h2 className="font-['Montserrat'] font-black text-4xl mb-6">¡Hola Explorador!</h2>
              <p className="text-white/90 mb-8 font-light text-sm leading-relaxed">
                Registrate para seguir disfrutando de esta experiencia
              </p>
              <button
                onClick={() => setIsLogin(false)}
                className="border border-white text-white px-12 py-3 rounded-full font-bold tracking-wider hover:scale-105 transition-transform text-sm"
                data-testid="button-switch-to-register"
              >
                REGISTRARSE
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Link
          href="/"
          className="mt-8 px-8 py-2 bg-white/10 backdrop-blur-md border border-[#EDEAE6] text-[#EDEAE6] rounded-full hover:bg-white/20 transition-all flex items-center gap-2 font-medium shadow-lg group"
        >
          <span className="text-xl transition-transform group-hover:-translate-x-1"></span>  
          Volver a Inicio
        </Link>  
      </div>
    </div>
  );
}