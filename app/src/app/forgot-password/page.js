"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error procesando solicitud");
        return;
      }

      setMessage("Si el email existe en nuestra base de datos, recibirás instrucciones para restablecer tu contraseña.");
      setEmail("");
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center p-4"
      style={{ 
        backgroundImage: `linear-gradient(rgba(39, 41, 83, 0.7), rgba(39, 41, 83, 0.7)), url('/images/wallpapers/VivaCOL-003.jpg')` 
      }}
    >
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <img 
              src="/images/brand/VivaCOL_Icon-Logo_RGB_FullColor.png" 
              alt="VivaCOL" 
              className="h-16 w-auto mx-auto" 
            />
          </Link>
          <h2 className="font-['Montserrat'] font-black text-3xl text-[#EDEAE6] mb-2">
            Recuperar Contraseña
          </h2>
          <p className="text-[#EDEAE6]/80 text-sm">
            Ingresa tu email y te enviaremos instrucciones
          </p>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
            <p className="text-green-100 text-sm text-center">{message}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-100 text-sm text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-[#EDEAE6]/30 rounded-lg text-[#EDEAE6] placeholder-[#EDEAE6]/50 focus:outline-none focus:border-[#F5CF4A] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F5CF4A] text-[#272953] py-3 rounded-full font-bold tracking-wider hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? "Enviando..." : "Enviar instrucciones"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link 
            href="/login" 
            className="text-[#EDEAE6] text-sm hover:text-[#F5CF4A] transition-colors"
          >
            ← Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
}