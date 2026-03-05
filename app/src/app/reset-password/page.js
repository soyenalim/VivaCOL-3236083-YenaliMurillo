"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Token no válido o expirado");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error restableciendo contraseña");
        return;
      }

      setSuccess(true);
      setMessage("Contraseña actualizada exitosamente");
      
      setTimeout(() => {
        router.push("/login");
      }, 3000);

    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div 
        className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center p-4"
        style={{ 
          backgroundImage: `linear-gradient(rgba(39, 41, 83, 0.7), rgba(39, 41, 83, 0.7)), url('/images/wallpapers/VivaCOL-006.jpg')` 
        }}
      >
        <div className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-['Montserrat'] font-black text-2xl text-[#EDEAE6] mb-2">
              ¡Contraseña actualizada!
            </h2>
            <p className="text-[#EDEAE6]/80 text-sm">{message}</p>
            <p className="text-[#EDEAE6]/60 text-xs mt-4">Redirigiendo al login...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center p-4"
      style={{ 
        backgroundImage: `linear-gradient(rgba(39, 41, 83, 0.7), rgba(39, 41, 83, 0.7)), url('/images/wallpapers/VivaCOL-006.jpg')` 
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
            Nueva Contraseña
          </h2>
          <p className="text-[#EDEAE6]/80 text-sm">
            Crea una contraseña segura para tu cuenta
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-100 text-sm text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-[#EDEAE6]/30 rounded-lg text-[#EDEAE6] placeholder-[#EDEAE6]/50 focus:outline-none focus:border-[#F5CF4A] transition-colors"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-[#EDEAE6]/30 rounded-lg text-[#EDEAE6] placeholder-[#EDEAE6]/50 focus:outline-none focus:border-[#F5CF4A] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !token}
            className="w-full bg-[#F5CF4A] text-[#272953] py-3 rounded-full font-bold tracking-wider hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? "Actualizando..." : "Restablecer contraseña"}
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