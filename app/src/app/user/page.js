"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, User, Mail, Calendar } from "lucide-react";

export default function DashboardTurista() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (!userData || !userData.id) {
      router.push("/login");
      return;
    }
    if (userData.role === "admin") {
      router.push("/admin");
      return;
    }
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EDEAE6]">
        <div className="text-[#272953] text-xl font-bold">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EDEAE6] pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header del perfil */}
        <div className="bg-gradient-to-br from-[#313467] to-[#272953] rounded-3xl p-8 text-white mb-8 shadow-2xl">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-[#F5CF4A] rounded-full flex items-center justify-center text-[#272953] text-3xl font-black">
              {user.full_name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-black font-['Montserrat'] mb-2">
                ¡Hola, {user.full_name}!
              </h1>
              <p className="text-white/70">Bienvenido a tu perfil de VivaCOL</p>
            </div>
          </div>
        </div>

        {/* Info del usuario */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <User className="text-[#F5CF4A]" size={24} />
              <h3 className="font-bold text-[#272953]">Nombre completo</h3>
            </div>
            <p className="text-gray-600">{user.full_name}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="text-[#F5CF4A]" size={24} />
              <h3 className="font-bold text-[#272953]">Correo electrónico</h3>
            </div>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <User className="text-[#F5CF4A]" size={24} />
              <h3 className="font-bold text-[#272953]">Username</h3>
            </div>
            <p className="text-gray-600">@{user.username}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="text-[#F5CF4A]" size={24} />
              <h3 className="font-bold text-[#272953]">Miembro desde</h3>
            </div>
            <p className="text-gray-600">
              {new Date(user.created_at).toLocaleDateString('es-CO')}
            </p>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-4">
          <Link
            href="/destinos"
            className="flex-1 bg-[#F5CF4A] text-[#272953] py-4 rounded-2xl font-bold text-center hover:bg-[#F5B740] transition-colors shadow-lg"
          >
            Explorar Destinos
          </Link>
          
          <button
            onClick={handleLogout}
            className="flex-1 bg-[#D8413A] text-white py-4 rounded-2xl font-bold hover:bg-[#BD2E26] transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}