'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Sparkles,
  Gift,
  Clock,
  Download,
  CheckCircle2,
  Star,
  Heart,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Play,
} from 'lucide-react';
import { Button } from '@/components/Button';
import { FAQ } from '@/components/FAQ';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* HERO SECTION - Storytelling Emocional */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-teal-50"
      >
        {/* Animated Background Elements */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-delayed" />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
        </motion.div>

        <div className="container mx-auto max-w-7xl px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="text-center lg:text-left"
            >
              <motion.div
                variants={fadeIn}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full mb-8 shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                <span className="font-bold text-sm">Edición Especial Navidad 2024</span>
              </motion.div>

              <motion.h1
                variants={fadeIn}
                className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight"
              >
                La Navidad <span className="gradient-text">Nunca Fue</span> Tan Dulce
              </motion.h1>

              <motion.p
                variants={fadeIn}
                className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed"
              >
                Imagina la cara de tu familia al probar postres que parecen sacados de una pastelería profesional...
                <span className="font-bold text-pink-600"> pero hechos en tu propia cocina</span>.
              </motion.p>

              <motion.div
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              >
                <Link href="/carrito">
                  <Button size="lg" className="group" icon={false}>
                    Comenzar Mi Transformación
                    <ChevronRight className="ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500" />
                  <span>+20 Recetas Profesionales</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500" />
                  <span>Acceso Inmediato</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-500" />
                  <span>Garantía 7 Días</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Hero Image with Parallax */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 0.05}deg) rotateX(${-mousePosition.y * 0.05}deg)`
              }}
              className="relative"
            >
              <div className="relative w-full max-w-lg mx-auto">
                <img
                  src="/img/dM4 (12).avif"
                  alt="Ebook Repostería Navideña"
                  className="w-full rounded-3xl shadow-2xl shadow-glow image-zoom"
                />

                {/* Floating Badge */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-6 -right-6 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-xl"
                >
                  <div className="text-center">
                    <div className="text-3xl font-black">60%</div>
                    <div className="text-xs font-semibold">DESCUENTO</div>
                  </div>
                </motion.div>

                {/* Floating Stats */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute -bottom-6 -left-6 bg-white px-6 py-4 rounded-2xl shadow-xl border-2 border-pink-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-sm font-bold text-gray-800">
                      +500 Familias Felices
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-gray-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* STORYTELLING SECTION - El Problema */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              ¿Te Suena Familiar? 🤔
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cada Navidad es lo mismo: buscas recetas en internet, intentas seguir tutoriales confusos,
              y terminas con un desastre en la cocina...
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                emoji: "😩",
                title: "Recetas complicadas",
                description: "Tutoriales que asumen que ya sabes cocinar, sin explicaciones claras"
              },
              {
                emoji: "⏰",
                title: "Falta de tiempo",
                description: "Recetas que tardan horas y no tienes tiempo para experimentar"
              },
              {
                emoji: "💸",
                title: "Dinero desperdiciado",
                description: "Ingredientes caros que terminas tirando porque no salió bien"
              },
              {
                emoji: "😞",
                title: "Resultados decepcionantes",
                description: "Postres que no se parecen en nada a las fotos"
              },
              {
                emoji: "🤷",
                title: "Sin guía profesional",
                description: "Nadie que te explique los trucos que hacen la diferencia"
              },
              {
                emoji: "😰",
                title: "Miedo a fallar",
                description: "El estrés de arruinar la cena navideña frente a tu familia"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-3xl border-2 border-gray-200 hover:border-pink-300 transition-all cursor-pointer"
              >
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 bg-gradient-to-r from-pink-500 via-rose-500 to-teal-500 p-12 rounded-3xl text-white text-center shadow-2xl"
          >
            <h3 className="text-3xl md:text-4xl font-black mb-4">
              ¿Y Si Te Dijera Que Existe Una Solución? ✨
            </h3>
            <p className="text-xl md:text-2xl opacity-95">
              Una guía paso a paso que transforma incluso a principiantes en maestros de la repostería navideña
            </p>
          </motion.div>
        </div>
      </section>

      {/* LA SOLUCIÓN - Visual con Imágenes */}
      <section className="py-24 px-4 bg-gradient-to-br from-teal-50 via-pink-50 to-rose-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
              Conoce Tu <span className="gradient-text">Arma Secreta</span> 🎄
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto">
              No es solo un ebook. Es tu mentor personal que te guía desde cero hasta crear
              postres dignos de revista... incluso si nunca has horneado antes.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/img/WhatsApp Image 2024-10-24 at 3_44_40 PM.avif"
                alt="Vista previa del contenido"
                className="w-full rounded-3xl shadow-2xl image-zoom"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {[
                {
                  icon: <Play className="w-6 h-6" />,
                  title: "Paso a Paso Visual",
                  description: "Cada receta incluye fotos de cada etapa. Nunca te sentirás perdida."
                },
                {
                  icon: <Award className="w-6 h-6" />,
                  title: "Técnicas de Chef",
                  description: "Los secretos que separan un postre casero de uno profesional."
                },
                {
                  icon: <Heart className="w-6 h-6" />,
                  title: "Recetas con Alma",
                  description: "Las recetas secretas de mi abuela, perfeccionadas por generaciones."
                },
                {
                  icon: <TrendingUp className="w-6 h-6" />,
                  title: "Para Vender o Disfrutar",
                  description: "Úsalo para tu familia o empieza tu negocio navideño."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Segunda Fila de Contenido */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 order-2 lg:order-1"
            >
              <h3 className="text-3xl md:text-4xl font-black text-gray-900">
                Más de 20 Recetas Que Cambiarán Tu Navidad
              </h3>

              <div className="space-y-4">
                {[
                  "🎂 Tortas Navideñas Espectaculares",
                  "🍪 Galletas Decoradas Como Profesional",
                  "🧁 Cupcakes que Enamoran",
                  "🍰 Postres en Copas para Impresionar",
                  "🎄 Decoraciones Comestibles Únicas",
                  "🌟 Técnicas de Glaseado Avanzado"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-lg text-gray-700"
                  >
                    <CheckCircle2 className="w-6 h-6 text-teal-500 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-teal-100 to-pink-100 p-6 rounded-2xl border-2 border-teal-200">
                <p className="text-lg font-semibold text-gray-800">
                  💡 <span className="font-black">BONUS:</span> Todas las recetas incluyen versiones
                  para veganos, sin gluten y bajas en azúcar. ¡Para que todos disfruten!
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <img
                src="/img/WhatsApp Image 2024-10-24 at 3_44_40 PM (1).avif"
                alt="Recetas del ebook"
                className="w-full rounded-3xl shadow-2xl image-zoom"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRANSFORMACIÓN - Antes/Después Storytelling */}
      <section className="py-24 px-4 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Tu Transformación Navideña 🌟
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Mira lo que lograrás en solo 30 días con nuestro sistema paso a paso
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* ANTES */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-3xl border-2 border-red-500"
            >
              <div className="text-red-400 font-black text-2xl mb-6">❌ ANTES</div>
              <ul className="space-y-4">
                {[
                  "Postres que no se parecen a las fotos",
                  "Gastas dinero en ingredientes desperdiciados",
                  "Te da vergüenza servir tus creaciones",
                  "No sabes por dónde empezar",
                  "Estrés en cada preparación"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <span className="text-red-400">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* DESPUÉS */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-teal-500 to-emerald-500 p-8 rounded-3xl border-2 border-teal-300 shadow-glow-teal"
            >
              <div className="text-white font-black text-2xl mb-6">✓ DESPUÉS</div>
              <ul className="space-y-4">
                {[
                  "Postres dignos de pastelería profesional",
                  "Inviertes inteligentemente y sin desperdicios",
                  "Tu familia te pide recetas constantemente",
                  "Dominas técnicas de chef",
                  "Disfrutas cada momento en la cocina"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-white">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/carrito">
              <Button size="lg" variant="secondary" icon={false}>
                Quiero Mi Transformación Ahora
                <Sparkles className="ml-2 flex-shrink-0" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BONOS - Visual y Atractivo */}
      <section className="py-24 px-4 bg-gradient-to-br from-pink-50 to-teal-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-3 rounded-full font-black text-xl mb-6 animate-pulse-glow">
              🎁 OFERTA POR TIEMPO LIMITADO
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
              Bonos Exclusivos de Regalo
            </h2>
            <p className="text-xl md:text-2xl text-gray-700">
              Valorados en más de <span className="text-teal-600 font-black">$150 USD</span> -
              Tuyos GRATIS al acceder hoy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                image: "/img/BONO 3.avif",
                title: "Bono #1: Guía de Decoración Pro",
                value: "$35",
                description: "Técnicas profesionales de decoración con fondant, glaseado y más"
              },
              {
                image: "/img/PNG 2.avif",
                title: "Bono #2: Recetas Express",
                value: "$25",
                description: "10 recetas que puedes hacer en menos de 30 minutos"
              },
              {
                image: "/img/WhatsApp Image 2024-10-24 at 3_44_40 PM (2).avif",
                title: "Bono #3: Calculadora de Costos",
                value: "$30",
                description: "Herramienta para calcular precios y maximizar tus ganancias"
              },
              {
                image: "/img/dM4 (9).avif",
                title: "Bono #4: Videos Exclusivos",
                value: "$40",
                description: "Videos paso a paso de las técnicas más complejas"
              },
              {
                image: "/img/dM4 (11).avif",
                title: "Bono #5: Grupo VIP",
                value: "$20",
                description: "Acceso al grupo privado de Telegram con soporte directo"
              },
              {
                image: "/img/aa2.avif",
                title: "Bono #6: Plantillas Imprimibles",
                value: "GRATIS",
                description: "Moldes y plantillas para decorar como profesional"
              }
            ].map((bonus, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="relative">
                  <img
                    src={bonus.image}
                    alt={bonus.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-full font-bold">
                    Valor: {bonus.value}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-gray-900 mb-3">{bonus.title}</h3>
                  <p className="text-gray-600">{bonus.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-pink-500 via-rose-500 to-teal-500 p-10 rounded-3xl text-center text-white shadow-2xl"
          >
            <h3 className="text-3xl md:text-4xl font-black mb-4">
              Todo Esto Por Solo $15 USD 🤯
            </h3>
            <p className="text-xl md:text-2xl mb-6 opacity-95">
              Precio normal: <span className="line-through">$35 USD</span> -
              <span className="font-black"> Ahorra 60% HOY</span>
            </p>
            <p className="text-lg opacity-90 mb-8">
              Esta oferta especial termina cuando el contador llegue a cero
            </p>
            <Link href="/carrito">
              <Button size="lg" variant="secondary" icon={false}>
                Acceder Con Descuento Ahora
                <Gift className="ml-2 flex-shrink-0" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* GARANTÍA */}
      <section className="py-24 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/img/GARANTIA-FONDO-NEGRO.avif"
                alt="Garantía de 7 días"
                className="w-full rounded-3xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-12 h-12 text-teal-400" />
                <h2 className="text-3xl md:text-4xl font-black">
                  Garantía de Satisfacción Total
                </h2>
              </div>

              <p className="text-xl text-gray-300 mb-6">
                Estamos tan seguros de que amarás nuestro ebook que te ofrecemos una garantía
                incondicional de 7 días.
              </p>

              <div className="bg-gradient-to-r from-teal-500/20 to-emerald-500/20 p-6 rounded-2xl border-2 border-teal-400 mb-6">
                <p className="text-lg leading-relaxed">
                  Si por cualquier razón no estás completamente satisfecha, simplemente envíanos
                  un email y te devolvemos el <span className="font-black text-teal-400">100% de tu dinero</span>.
                  Sin preguntas, sin complicaciones.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  "✓ Reembolso completo garantizado",
                  "✓ Sin preguntas ni explicaciones",
                  "✓ Respuesta en menos de 24 horas",
                  "✓ Proceso 100% automático"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-teal-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-24 px-4 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Historias de Éxito Real ⭐
            </h2>
            <p className="text-xl text-gray-700">
              Más de 500 personas ya transformaron su Navidad
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                role: "Ama de Casa",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                rating: 5,
                text: "¡Increíble! Nunca había horneado y ahora mis postres son los más pedidos en la familia. Las instrucciones son súper claras."
              },
              {
                name: "Ana Martínez",
                role: "Emprendedora",
                image: "https://randomuser.me/api/portraits/women/65.jpg",
                rating: 5,
                text: "Empecé mi negocio gracias a este ebook. Ya vendí más de 50 postres y mis clientes están encantados. ¡Mejor inversión!"
              },
              {
                name: "Laura Rodríguez",
                role: "Maestra",
                image: "https://randomuser.me/api/portraits/women/32.jpg",
                rating: 5,
                text: "Los bonos son oro puro. La calculadora de costos me ayudó a poner precios justos. Ahora esto es mi ingreso extra."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Preguntas Frecuentes 💭
            </h2>
          </motion.div>

          <FAQ
            items={[
              {
                question: '¿Necesito experiencia previa en repostería?',
                answer: '¡Para nada! El ebook está diseñado específicamente para principiantes. Cada receta tiene instrucciones paso a paso con fotos y videos. Si es tu primera vez horneando, este es el lugar perfecto para empezar.'
              },
              {
                question: '¿Cuándo recibiré el acceso?',
                answer: 'Inmediatamente después de completar tu compra. Recibirás un email con tu acceso en menos de 2 minutos. Podrás descargar todo el contenido y empezar hoy mismo.'
              },
              {
                question: '¿Qué pasa si no me gusta?',
                answer: 'Tienes 7 días de garantía total. Si por cualquier razón no estás satisfecha, te devolvemos el 100% de tu dinero sin preguntas.'
              },
              {
                question: '¿Puedo acceder desde mi celular?',
                answer: 'Sí, el ebook funciona en cualquier dispositivo: celular, tablet, computadora. Lo descargas una vez y es tuyo para siempre.'
              },
              {
                question: '¿Las recetas son difíciles de seguir?',
                answer: 'Todo lo contrario. Cada receta está diseñada para ser súper clara. Incluye lista de ingredientes, pasos numerados, fotos de cada etapa, tips profesionales y solución de problemas comunes.'
              },
              {
                question: '¿Realmente puedo ganar dinero con esto?',
                answer: 'Absolutamente. Muchas de nuestras clientas han iniciado negocios exitosos. Te incluimos una calculadora de costos para que sepas exactamente cuánto cobrar y tengas buenas ganancias.'
              }
            ]}
          />
        </div>
      </section>

      {/* FINAL CTA - Urgencia */}
      <section className="py-24 px-4 bg-gradient-to-br from-pink-600 via-rose-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 variants={fadeIn} className="text-4xl md:text-6xl font-black mb-6">
              No Dejes Pasar Esta Oportunidad 🎄
            </motion.h2>

            <motion.p variants={fadeIn} className="text-xl md:text-2xl mb-8 opacity-95">
              Imagina cómo se sentirá ver las caras de tu familia al probar tus creaciones...
              <br />
              Esa sensación de orgullo al escuchar "¿Dónde compraste esto?"
              <br />
              Y responder: <span className="font-black">"Lo hice yo misma"</span>
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border-2 border-white/30 mb-10 max-w-2xl mx-auto"
            >
              <div className="text-5xl font-black mb-4">$15 USD</div>
              <div className="text-lg opacity-90 line-through mb-2">Precio regular: $35 USD</div>
              <div className="text-2xl font-bold">
                Ahorra 60% - Solo por tiempo limitado
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Link href="/carrito">
                <Button size="lg" variant="secondary" icon={false}>
                  SÍ, Quiero Transformar Mi Navidad Ahora
                  <Sparkles className="ml-2 flex-shrink-0" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm opacity-90"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Acceso Inmediato</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Garantía 7 Días</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Pago 100% Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Soporte Premium</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-8 h-8 text-pink-400" />
              <span className="text-2xl font-black">Recetas Navideñas</span>
            </div>

            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Transformando familias a través del arte de la repostería navideña.
              Más de 500 personas ya confiaron en nosotros.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-400">
              <Link href="/carrito" className="hover:text-pink-400 transition-colors">
                Comenzar
              </Link>
              <span>•</span>
              <a href="mailto:soporte@recetasnavidenas.com" className="hover:text-pink-400 transition-colors">
                Soporte
              </a>
              <span>•</span>
              <a href="#" className="hover:text-pink-400 transition-colors">
                Términos y Condiciones
              </a>
              <span>•</span>
              <a href="#" className="hover:text-pink-400 transition-colors">
                Política de Privacidad
              </a>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500 text-sm">
                © 2024 Recetas Navideñas. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
