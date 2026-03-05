"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// ... resto del código

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div 
      className={`bg-white/90 backdrop-blur-sm rounded-lg shadow-md overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-xl ring-1 ring-red-100' : 'hover:shadow-lg'}`}
    >
      <button
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer focus:outline-none"
        onClick={onClick}
      >
        <span className="font-semibold text-gray-900 text-lg pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0 text-red-600"
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
              <div className="pt-3">
                {answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    // Column 1
    {
      question: "¿Qué es VivaCOL y cómo funciona?",
      answer: "VivaCOL es tu guía inteligente para descubrir Colombia. Conectamos viajeros con experiencias locales auténticas, desde playas caribeñas hasta selvas amazónicas, todo en una plataforma fácil de usar."
    },
    {
      question: "¿Necesito crear una cuenta para usar la plataforma?",
      answer: "Puedes explorar destinos sin cuenta, pero necesitarás registrarte (gratis) para guardar favoritos, recibir ofertas exclusivas y acceder a nuestra comunidad de viajeros."
    },
    {
      question: "¿Cómo puedo guardar mis destinos favoritos?",
      answer: "Simplemente haz clic en el ícono de corazón en cualquier destino. Se guardarán automáticamente en tu lista de deseos personal para que puedas planificar tu ruta ideal."
    },
    {
      question: "¿Es seguro usar VivaCOL para planificar mi viaje?",
      answer: "Absolutamente. Verificamos todos nuestros socios locales y ofrecemos soporte 24/7. Tu seguridad y satisfacción son nuestra prioridad número uno."
    },
    // Column 2
    {
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos tarjetas de crédito/débito (Visa, Mastercard, Amex), PayPal, y pagos locales como PSE para tu mayor comodidad."
    },
    {
      question: "¿Puedo cancelar o modificar mi reserva?",
      answer: "Sí, entendemos que los planes cambian. Ofrecemos políticas de cancelación flexibles dependiendo del proveedor, visibles antes de confirmar tu compra."
    },
    {
      question: "¿Ofrecen guías en español e inglés?",
      answer: "¡Por supuesto! Colombia te espera sin barreras. Nuestras experiencias están disponibles en múltiples idiomas para que disfrutes cada detalle."
    },
    {
      question: "¿Cómo contacto al soporte si tengo un problema?",
      answer: "Nuestro equipo está disponible 24/7 vía chat en vivo, WhatsApp o correo electrónico. Respondemos en menos de 5 minutos para resolver cualquier duda."
    }
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Split data for columns
  const leftColumn = faqData.slice(0, 4);
  const rightColumn = faqData.slice(4, 8);

  return (
    <section className="relative min-h-screen w-full overflow-hidden font-sans">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'radial-gradient(circle at 0% 50%, rgba(216, 65, 58, 0.85) 0%, transparent 25%), radial-gradient(circle at 100% 50%, rgba(216, 65, 58, 0.85) 0%, transparent 25%)'
          }}
        />
        {/* Subtle overlay to ensure text readability if needed, though cards are white */}
        <div className="absolute inset-0 bg-gray-50/30" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
          Preguntas Frecuentes
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
          Todo lo que necesitas saber para comenzar tu aventura por Colombia
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {leftColumn.map((item, index) => (
              <FAQItem 
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={activeIndex === index}
                onClick={() => handleToggle(index)}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {rightColumn.map((item, index) => {
              // Offset index for the second column to ensure unique state keys
              const actualIndex = index + 4;
              return (
                <FAQItem 
                  key={actualIndex}
                  question={item.question}
                  answer={item.answer}
                  isOpen={activeIndex === actualIndex}
                  onClick={() => handleToggle(actualIndex)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;