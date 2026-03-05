// app/src/components/FeaturedPlaces.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

// IDs exactos que queremos mostrar y sus configuraciones
const TARGET_IDS = [1, 2, 3, 4, 5, 6];

const ATTRACTION_CONFIG = {
  1: { 
    name: "Museo del Oro", 
    image: '/images/attractions/museo-del-oro.jpg',
  },
  2: { 
    name: "Laguna del Cacique Guatavita", 
    image: '/images/attractions/laguna-guatavita.jpg',
  },
  3: { 
    name: "Villa de Leyva", 
    image: '/images/attractions/villa-leyva.jpg',
  },
  4: { 
    name: "Lago de Tota", 
    image: '/images/attractions/laguna-de-tota.jpg',
  },
  5: { 
    name: "Caño Cristales", 
    image: '/images/attractions/cano-cristales.png',
  },
  6: { 
    name: "Cerro Azul", 
    image: '/images/attractions/cerro-azul.jpg',
  },
};

export default function FeaturedPlaces() {
  const [attractions, setAttractions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api-colombia.com/api/v1/TouristicAttraction');
        
        if (!response.ok) throw new Error('API Error');
        
        const allData = await response.json();
        
        console.log('Total attractions:', allData.length);
        console.log('First few:', allData.slice(0, 3).map(i => ({id: i.id, name: i.name})));
        
        // BUSCAR específicamente los IDs 1-6 en TODA la respuesta
        const foundAttractions = TARGET_IDS.map(targetId => {
          const apiItem = allData.find(item => item.id === targetId);
          
          if (!apiItem) {
            console.warn(`ID ${targetId} not found in API`);
            return null;
          }
          
          const config = ATTRACTION_CONFIG[targetId];
          
          return {
            id: apiItem.id,
            name: apiItem.name,
            description: apiItem.description || `Descubre ${apiItem.name}`,
            image: config.image, // SIEMPRE usar nuestra imagen local
            city: apiItem.city?.name || 'Colombia',
          };
        }).filter(Boolean); // Eliminar nulls si algún ID no existe

        // Si no encontramos todos, mostrar error
        if (foundAttractions.length !== 6) {
          console.error(`Only found ${foundAttractions.length}/6 attractions`);
          setError(`Solo se encontraron ${foundAttractions.length} de 6 atracciones`);
        }

        console.log('Found attractions:', foundAttractions.map(a => ({id: a.id, name: a.name})));
        setAttractions(foundAttractions);
        
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttractions();
  }, []);

  // Auto-rotación
  useEffect(() => {
    if (attractions.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % attractions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [attractions.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % attractions.length);
  }, [attractions.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + attractions.length) % attractions.length);
  }, [attractions.length]);

  const goToSlide = (index) => setCurrentIndex(index);

  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at 0% 50%, rgba(49, 52, 103, 0.85) 0%, transparent 15%), radial-gradient(circle at 100% 50%, rgba(49, 52, 103, 0.85) 0%, transparent 15%)'
        }}></div>
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#272953] mx-auto mb-4"></div>
          <p className="text-[#272953] font-medium">Cargando destinos...</p>
        </div>
      </section>
    );
  }

  if (error || attractions.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at 0% 50%, rgba(49, 52, 103, 0.85) 0%, transparent 15%), radial-gradient(circle at 100% 50%, rgba(49, 52, 103, 0.85) 0%, transparent 15%)'
        }}></div>
        <div className="relative z-10 text-center px-4">
          <p className="text-red-600 font-medium mb-2">Error cargando destinos</p>
          <p className="text-gray-600 text-sm">{error || 'No se encontraron atracciones'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#272953] text-white rounded-lg hover:bg-[#1a1b3d] transition"
          >
            Reintentar
          </button>
        </div>
      </section>
    );
  }

  const current = attractions[currentIndex];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Radial gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 0% 50%, rgba(49, 52, 103, 0.85) 0%, transparent 15%), radial-gradient(circle at 100% 50%, rgba(49, 52, 103, 0.85) 0%, transparent 15%)'
      }}></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-[#272953] text-center mb-12 drop-shadow-lg font-[family-name:var(--font-viva-titulo)]">
          Destinos Destacados
        </h2>

        <div className="relative group">
          {/* Imagen principal - SOLO IMÁGENES LOCALES */}
          <div className="relative overflow-hidden rounded-xl shadow-2xl h-64 md:h-[500px] w-full bg-gray-200">
            {attractions.map((attraction, index) => (
              <div
                key={attraction.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <Image
                  src={attraction.image}
                  alt={attraction.name}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  onError={(e) => {
                    console.error('Image failed:', attraction.image);
                    // Si falla la imagen, mostrar placeholder gris con iniciales
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span class="text-4xl font-bold text-gray-500">
                          ${attraction.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                        </span>
                      </div>
                    `;
                  }}
                />
                
                {/* Overlay móvil */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 md:hidden">
                  <h3 className="text-white text-xl font-bold">{attraction.name}</h3>
                  <p className="text-white/90 text-sm mt-1">{attraction.city}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Flechas */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 z-20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 z-20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Info */}
        <div className="mt-8 text-center">
          <span className="inline-block px-3 py-1 bg-[#272953]/10 text-[#272953] text-sm font-medium rounded-full mb-2">
            {current?.city}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-[#272953] mb-3 font-[family-name:var(--font-viva-titulo)]">
            {current?.name}
          </h3>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-[family-name:var(--font-viva-cuerpo)]">
            {truncateText(current?.description)}
          </p>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-6">
          {attractions.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#272953] w-8' 
                  : 'bg-gray-400 w-2 hover:bg-gray-600'
              }`}
            />
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-4 text-center font-medium">
          {currentIndex + 1} / {attractions.length}
        </p>
      </div>
    </section>
  );
}