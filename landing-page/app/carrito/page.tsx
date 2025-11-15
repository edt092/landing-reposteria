'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Mail, CheckCircle2, ArrowRight, Gift, Sparkles } from 'lucide-react';
import { Button } from '@/components/Button';
import Link from 'next/link';

const HOTMART_CHECKOUT_URL = 'https://go.hotmart.com/E102944858K?ap=e7cc';

export default function CarritoPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      alert('Por favor ingresa un correo electrónico válido');
      return;
    }

    setIsLoading(true);

    // Simular envío y luego redirigir a Hotmart
    setTimeout(() => {
      setIsLoading(false);
      // Redirigir directamente al checkout de Hotmart
      window.location.href = HOTMART_CHECKOUT_URL;
    }, 1000);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Sparkles className="w-6 h-6 text-pink-500" />
            <span className="font-bold text-xl text-gray-800">Recetas Navideñas</span>
          </Link>
          <ShoppingCart className="w-6 h-6 text-pink-500" />
        </div>
      </header>

      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              Tu Carrito de Sueños Navideños 🎄
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Estás a un paso de transformar tu Navidad
            </p>
          </motion.div>

          {/* Formulario de Email */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-pink-200"
          >
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 rounded-full">
                <Gift className="w-12 h-12 text-white" />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
              ¡Recibe tus Guías Gratuitas! 🎁
            </h2>

            <p className="text-center text-gray-600 mb-8 text-lg">
              Ingresa tu correo y te enviaremos contenido exclusivo gratis antes de proceder al checkout.
            </p>

            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900 text-lg"
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Redirigiendo al checkout...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Acceder al Checkout
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-pink-50 rounded-2xl">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-500" />
                Lo que recibirás gratis:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>Guía de inicio rápido en repostería navideña</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>3 recetas express para empezar hoy</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>Tips profesionales de decoración</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Garantía */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <img
              src="/img/GARANTIA-FONDO-NEGRO.avif"
              alt="Garantía de 7 días"
              className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
            />
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
              Compra sin riesgo con nuestra garantía de satisfacción de 7 días.
              Si no estás completamente satisfecha, te devolvemos el 100% de tu inversión.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
