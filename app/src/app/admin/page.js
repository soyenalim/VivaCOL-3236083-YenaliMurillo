"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Power, Trash2, MapPin, Users, LayoutDashboard, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [regions, setRegions] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Verificar autenticación
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || user.role !== "admin") {
      router.push("/login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Fetch users de TU backend
      const usersRes = await fetch("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const usersData = await usersRes.json();
      if (usersData.success) setUsers(usersData.data.users);

      // Fetch departamentos de API-Colombia
      const deptRes = await fetch("https://api-colombia.com/api/v1/Department");
      const deptData = await deptRes.json();
      setDepartments(deptData.slice(0, 6));

      // Fetch regiones de API-Colombia
      const regRes = await fetch("https://api-colombia.com/api/v1/Region");
      const regData = await regRes.json();
      setRegions(regData.slice(0, 6));

      // Fetch atracciones de API-Colombia
      const attrRes = await fetch("https://api-colombia.com/api/v1/TouristicAttraction");
      const attrData = await attrRes.json();
      setAttractions(attrData.slice(0, 6));

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: !currentStatus })
      });

      if (response.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, status: !currentStatus } : u));
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (userId) => {
    if (!confirm("¿Estás seguro de eliminar este usuario?")) return;
    
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(u => u.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeUsers = users.filter(u => u.status).length;
  const inactiveUsers = users.filter(u => !u.status).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EDEAE6]">
        <div className="text-[#272953] text-xl font-bold">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER FIJO SUPERIOR */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-[#313467] text-white z-50 shadow-lg">
        <div className="h-full max-w-[1920px] mx-auto px-6 flex items-center justify-between">
          
          {/* Logo a la izquierda */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-3">
              <img 
                src="/images/brand/VivaCOL_Horizontal-Logo_RGB_W-FullColor.png" 
                alt="VivaCOL" 
                className="h-10 w-auto drop-shadow-lg"
              />
              <div className="hidden sm:block border-l border-white/30 pl-3">
                <p className="text-xs text-white/70 leading-tight">Panel</p>
                <p className="text-xs font-bold leading-tight">Administrativo</p>
              </div>
            </Link>
          </div>

          {/* Navegación centrada y espaciada */}
          <nav className="flex items-center gap-2 md:gap-8 lg:gap-12">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === "dashboard" 
                  ? "bg-[#F5CF4A] text-[#272953] font-bold" 
                  : "hover:bg-white/10 text-white/90 hover:text-white"
              }`}
            >
              <LayoutDashboard size={20} />
              <span className="hidden md:inline">Dashboard</span>
            </button>
            
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === "users" 
                  ? "bg-[#F5CF4A] text-[#272953] font-bold" 
                  : "hover:bg-white/10 text-white/90 hover:text-white"
              }`}
            >
              <Users size={20} />
              <span className="hidden md:inline">Usuarios</span>
            </button>
            
            <button
              onClick={() => setActiveTab("places")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === "places" 
                  ? "bg-[#F5CF4A] text-[#272953] font-bold" 
                  : "hover:bg-white/10 text-white/90 hover:text-white"
              }`}
            >
              <MapPin size={20} />
              <span className="hidden md:inline">Lugares Colombia</span>
            </button>
          </nav>

          {/* Cerrar sesión a la derecha */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-lg transition-all shrink-0"
          >
            <LogOut size={20} />
            <span className="hidden lg:inline font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL - Con padding top para compensar el header fijo */}
      <main 
        className="flex-1 pt-20 min-h-screen"
        style={{
          backgroundImage: "url('/images/brand/VivaCOL_Pattern-Flat_RGB_Grey-Scale-Light.png')",
          backgroundSize: '1000px',
          backgroundRepeat: 'repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Sub-header con título de página */}
        <div className="bg-white/80 backdrop-blur border-b border-gray-200 px-8 py-4 sticky top-20 z-40">
          <div className="max-w-[1920px] mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-['Montserrat'] font-black text-[#272953]">
                {activeTab === "dashboard" && "Dashboard Principal"}
                {activeTab === "users" && "Gestión de Usuarios"}
                {activeTab === "places" && "Lugares de Colombia"}
              </h1>
              <p className="text-sm text-gray-500">
                {activeTab === "dashboard" && "Resumen de la plataforma VivaCOL"}
                {activeTab === "users" && "Administra los accesos y estados de usuarios"}
                {activeTab === "places" && "Explora departamentos, regiones y atracciones"}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-[#272953] text-white px-4 py-2 rounded-full">
              <div className="w-8 h-8 bg-[#F5CF4A] rounded-full flex items-center justify-center text-[#272953] font-bold">
                A
              </div>
              <div className="text-sm hidden sm:block">
                <p className="font-bold">Administrador</p>
                <p className="text-xs text-white/70">VivaCOL System</p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8 max-w-[1920px] mx-auto">
          
          {/* DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#F5CF4A]">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Total Usuarios</p>
                      <p className="text-4xl font-black text-[#272953] mt-2">{users.length}</p>
                    </div>
                    <div className="p-3 bg-[#F5CF4A]/20 rounded-lg">
                      <Users className="text-[#F5CF4A]" size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Usuarios Activos</p>
                      <p className="text-4xl font-black text-[#272953] mt-2">{activeUsers}</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg">
                      <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-gray-400">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Usuarios Inactivos</p>
                      <p className="text-4xl font-black text-[#272953] mt-2">{inactiveUsers}</p>
                    </div>
                    <div className="p-3 bg-gray-200 rounded-lg">
                      <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#D8413A]">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Departamentos</p>
                      <p className="text-4xl font-black text-[#272953] mt-2">{departments.length}+</p>
                    </div>
                    <div className="p-3 bg-[#D8413A]/20 rounded-lg">
                      <MapPin className="text-[#D8413A]" size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  onClick={() => setActiveTab("users")}
                  className="bg-gradient-to-br from-[#313467] to-[#272953] rounded-2xl p-8 text-[#141414] cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <Users size={48} className="mb-4 text-[#F5CF4A]" />
                  <h3 className="text-2xl font-bold mb-2">Gestionar Usuarios</h3>
                  <p className="text-white/70">Activar, desactivar o eliminar usuarios del sistema</p>
                </div>

                <div 
                  onClick={() => setActiveTab("places")}
                  className="bg-gradient-to-br from-[#D8413A] to-[#BD2E26] rounded-2xl p-8 text-[#141414] cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <MapPin size={48} className="mb-4 text-[#F5CF4A]" />
                  <h3 className="text-2xl font-bold mb-2">Explorar Colombia</h3>
                  <p className="text-white/70">Ver departamentos, regiones y atracciones turísticas</p>
                </div>
              </div>
            </div>
          )}

          {/* USERS TAB */}
          {activeTab === "users" && (
            <div className="space-y-6">
              {/* Search */}
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Buscar por nombre, email o username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#F5CF4A] focus:ring-2 focus:ring-[#F5CF4A]/20"
                />
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-[#272953] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Nombre</th>
                      <th className="px-6 py-4 text-left font-bold">Email</th>
                      <th className="px-6 py-4 text-left font-bold">Username</th>
                      <th className="px-6 py-4 text-left font-bold">Rol</th>
                      <th className="px-6 py-4 text-left font-bold">Estado</th>
                      <th className="px-6 py-4 text-left font-bold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-[#272953]">{user.full_name}</td>
                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 text-gray-600">@{user.username}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            user.role === "admin" 
                              ? "bg-[#F5CF4A] text-[#272953]" 
                              : "bg-gray-200 text-gray-700"
                          }`}>
                            {user.role?.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            user.status 
                              ? "bg-green-100 text-green-700" 
                              : "bg-gray-200 text-gray-600"
                          }`}>
                            {user.status ? "ACTIVO" : "INACTIVO"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => toggleUserStatus(user.id, user.status)}
                              className={`p-2 rounded-lg transition-colors ${
                                user.status 
                                  ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200" 
                                  : "bg-green-100 text-green-600 hover:bg-green-200"
                              }`}
                              title={user.status ? "Desactivar" : "Activar"}
                            >
                              <Power size={18} />
                            </button>
                            <button 
                              onClick={() => deleteUser(user.id)}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredUsers.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No se encontraron usuarios
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PLACES TAB - API Colombia */}
          {activeTab === "places" && (
            <div className="space-y-8">
              
              {/* Departamentos */}
              <div>
                <h3 className="text-xl font-bold text-[#272953] mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  Departamentos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {departments.map((dept) => (
                    <div key={dept.id} className="bg-white rounded-2xl p-6 shadow-lg">
                      <h4 className="font-bold text-[#272953] text-lg mb-2">{dept.name}</h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {dept.description?.substring(0, 100)}...
                      </p>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {dept.municipalities} municipios
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regiones */}
              <div>
                <h3 className="text-xl font-bold text-[#272953] mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                  Regiones
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regions.map((region) => (
                    <div key={region.id} className="bg-white rounded-2xl p-6 shadow-lg">
                      <h4 className="font-bold text-[#272953] text-lg mb-2">{region.name}</h4>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {region.description?.substring(0, 150)}...
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Atracciones */}
              <div>
                <h3 className="text-xl font-bold text-[#272953] mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  Atracciones Turísticas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {attractions.map((attr) => (
                    <div key={attr.id} className="bg-white rounded-2xl p-6 shadow-lg">
                      <h4 className="font-bold text-[#272953] text-lg mb-2">{attr.name}</h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {attr.description?.substring(0, 100)}...
                      </p>
                      {attr.images && attr.images[0] && (
                        <img 
                          src={attr.images[0]} 
                          alt={attr.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}