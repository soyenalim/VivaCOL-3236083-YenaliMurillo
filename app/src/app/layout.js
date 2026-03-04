// src/app/layout.js
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";

const fontTitulo = Montserrat({
  subsets: ["latin"],
  variable: "--font-viva-titulo",
  weight: ["900"],
});

const fontCuerpo = Poppins({
  subsets: ["latin"],
  variable: "--font-viva-cuerpo",
  weight: ["400", "700"],
});

export const metadata = {
  title: "VivaCOL - Agencia de Viajes",
  description: "Explora la magia de Colombia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${fontTitulo.variable} ${fontCuerpo.variable} antialiased m-0 p-0`}>
        {/* Aquí NO ponemos el Header, para que sea cada página la que decida si lo lleva o no */}
        <main>{children}</main>
      </body>
    </html>
  );
}