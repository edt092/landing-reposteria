import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatYuli from "@/components/ChatYuli";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recetas Navideñas Secretas de la Abuela | Ebook de Repostería Navideña",
  description: "Descubre las recetas secretas de repostería navideña de mi abuela. Más de 20 recetas paso a paso para transformar tu Navidad. Aprende a crear postres navideños irresistibles y monetiza tu pasión. ¡Solo $15 USD!",
  keywords: [
    "recetas navideñas",
    "repostería navideña",
    "postres navideños",
    "ebook recetas",
    "cocina navideña",
    "recetas abuela",
    "negocio repostería",
    "recetas paso a paso"
  ],
  authors: [{ name: "Recetas Navideñas" }],
  creator: "Recetas Navideñas",
  publisher: "Recetas Navideñas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Recetas Navideñas Secretas de la Abuela",
    description: "Transforma tu Navidad con las recetas secretas de repostería navideña. Más de 20 recetas + bonos gratis por solo $15 USD",
    url: "https://tu-dominio.com",
    siteName: "Recetas Navideñas",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recetas Navideñas Secretas de la Abuela",
    description: "Transforma tu Navidad con recetas de repostería navideña. Solo $15 USD",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ChatYuli />
      </body>
    </html>
  );
}
