'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  Gift,
  Clock,
  Users,
  TrendingUp,
  Download,
  CheckCircle2,
  Star,
  Cake,
  Heart,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/Button';
import { FAQ } from '@/components/FAQ';

const CTA_LINK = 'https://go.hotmart.com/N102903996I?ap=9dde';

export default function Home() {
  const handleCTAClick = () => {
    window.open(CTA_LINK, '_blank');
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-teal-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-300/60 via-pink-200/40 to-emerald-200/60 py-16 md:py-24 lg:py-32 px-4">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="container mx-auto max-w-7xl relative z-10"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center px-4">
            <div className="text-center md:text-left">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center md:justify-start mb-6"
              >
                <span className="bg-pink-500 text-white px-5 py-2.5 rounded-full text-sm md:text-base font-semibold inline-flex items-center gap-2 shadow-md">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                  Recetas Secretas de la Abuela
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 md:mb-8 leading-tight"
              >
                Transforma tu Navidad🎄 en una experiencia dulce e inolvidable con las recetas secretas de mi abuela 🤐
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-10 md:mb-12"
              >
                Descubre cómo preparar recetas que llenarán tu mesa de magia y elogios esta temporada.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center md:justify-start"
              >
                <Button size="lg" onClick={handleCTAClick}>
                  ¡QUIERO LAS RECETAS AHORA!
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex justify-center"
            >
              <img
                src="/img/674fcd21797ae_EbookReposteraNavidea.png"
                alt="Ebook de Repostería Navideña"
                className="w-full max-w-md rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute top-10 left-10 animate-float">
          <Cake className="w-16 h-16 text-pink-300 opacity-50" />
        </div>
        <div className="absolute bottom-10 right-10 animate-float-delayed">
          <Cake className="w-20 h-20 text-teal-300 opacity-50" />
        </div>
      </section>

      {/* Problema/Solución Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-8 md:mb-12 px-4">
              ¿Te sientes identificada? 🤔
            </h2>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
              {[
                '¿Te gustaría sorprender a tus seres queridos con postres navideños que se conviertan en tradición familiar?',
                '¿Estás buscando ideas innovadoras para tus celebraciones navideñas?',
                '¿Te gustaría que todos te pidan la receta de ese postre espectacular que tú preparaste?',
                '¿Te gustaría aprender recetas fáciles que puedas monetizar en la temporada navideña?',
                '¿Te gustaría que tus hijos disfruten cocinando contigo durante las fiestas?',
                '¿Necesitas recetas que no fallan, incluso si no eres experta en repostería?'
              ].map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-5 md:p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 border-pink-500"
                >
                  <p className="text-gray-700 font-medium text-sm md:text-base">{question}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-10 md:mt-16 bg-gradient-to-r from-teal-400 to-emerald-400 p-6 md:p-10 lg:p-12 rounded-3xl shadow-2xl mx-4"
            >
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Si respondiste "SÍ" a cualquiera de estas preguntas...
              </p>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-800">
                ¡Estás a punto de descubrir la solución perfecta! 🎉
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Por qué es diferente */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-pink-100 to-teal-100">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-10 md:mb-16 px-4">
              ¿Por qué este ebook es diferente? ✨
            </h2>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {[
                {
                  icon: <Zap className="w-12 h-12" />,
                  title: 'Estructura paso a paso',
                  description: 'Cada receta incluye instrucciones claras, para que nunca te sientas perdido. Esto no es un recetario genérico, es como tener un chef guiándote en casa.'
                },
                {
                  icon: <CheckCircle2 className="w-12 h-12" />,
                  title: 'Recetas probadas y optimizadas',
                  description: 'Las recetas han sido seleccionadas y probadas para garantizar resultados deliciosos, incluso si no tienes experiencia previa en la cocina.'
                },
                {
                  icon: <Heart className="w-12 h-12" />,
                  title: 'Adaptado a tus necesidades',
                  description: 'Encontrarás opciones tanto para sorprender a tu familia como para generar ingresos extra. Desde postres fáciles para hacer con niños hasta preparaciones sofisticadas para vender.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white p-6 md:p-8 lg:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
                >
                  <div className="text-teal-500 mb-5 flex justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-3 md:mb-4">{item.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ¿Qué vas a aprender? */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 md:mb-8 px-4">
              ¿QUÉ VAS A APRENDER? 📚
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mt-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <img
                src="/img/674fc46026672_EbookReposteraNavidea1.png"
                alt="Vista previa del ebook"
                className="w-full max-w-md rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="px-4"
            >
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed">
                Obtendrás un recetario paso a paso con instrucciones claras, ideales para crear postres navideños que impresionarán a tus seres queridos y clientes.
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg">Más de 20 recetas navideñas detalladas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg">Instrucciones paso a paso con fotos</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg">Tips profesionales de decoración</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                  <span className="text-base md:text-lg">Técnicas para principiantes y avanzados</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-10 md:mb-16 text-center px-4">
              ¿CUÁLES SON LOS BENEFICIOS? 🎁
            </h2>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto">
              {[
                {
                  icon: <Download className="w-10 h-10" />,
                  title: 'Acceso desde cualquier dispositivo',
                  description: 'Podrás acceder a las recetas desde cualquier dispositivo'
                },
                {
                  icon: <Zap className="w-10 h-10" />,
                  title: 'Acceso instantáneo',
                  description: 'Obtén acceso instantáneo a todas las recetas.'
                },
                {
                  icon: <Clock className="w-10 h-10" />,
                  title: 'Pago único',
                  description: 'Es un pago único con acceso de por vida.'
                },
                {
                  icon: <TrendingUp className="w-10 h-10" />,
                  title: 'Todas las Actualizaciones',
                  description: 'Obtén acceso de por vida al ebook, todas las actualizaciones y nuevas recetas añadidas.'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="flex gap-4 md:gap-5 p-5 md:p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-pink-50 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="flex-shrink-0 text-teal-500">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Precio Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-teal-300/80 to-pink-200/60">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6 px-4">
              APROVECHA ESTA OPORTUNIDAD 🔥
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 md:mb-12 px-4">
              Accede ahora con el 60% de descuento
            </p>

            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 mx-4 sm:mx-auto border-4 border-pink-400">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center"
                >
                  <img
                    src="/img/675f777dc99ad_EbookReposteraNavidea1.png"
                    alt="Ebook Repostería Navideña"
                    className="w-full max-w-sm rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>

                <div className="text-center md:text-left">
                  <div className="mb-6 md:mb-8">
                    <p className="text-gray-600 text-base md:text-lg mb-2">Precio regular:</p>
                    <p className="text-2xl md:text-3xl text-gray-400 line-through">$35 USD</p>
                  </div>

                  <div className="mb-8 md:mb-10">
                    <p className="text-gray-800 text-xl md:text-2xl font-bold mb-4">PRECIO HOY:</p>
                    <p className="text-5xl sm:text-6xl md:text-7xl font-bold text-teal-500 mb-3">
                      $15
                    </p>
                    <p className="text-gray-600 text-sm md:text-base">
                      (El pago lo harás en la moneda de tu país)
                    </p>
                  </div>

                  <div className="mb-8 md:mb-10">
                    <p className="text-base md:text-lg text-gray-700 font-medium mb-3 md:mb-4">
                      ÚNICO PAGO Y ACCESO INMEDIATO PARA TODA LA VIDA +
                    </p>
                    <p className="text-pink-500 font-bold text-lg md:text-xl">
                      ¡BONOS DE REGALO GRATIS!
                    </p>
                  </div>

                  <div className="flex justify-center md:justify-start">
                    <Button size="lg" variant="primary" onClick={handleCTAClick}>
                      ¡QUIERO MI ACCESO AHORA!
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bonos Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6 text-center px-4">
              ADEMÁS COMPRANDO HOY RECIBIRÁS GRATIS 🎁
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-center text-gray-700 mb-10 md:mb-16 px-4">
              LOS SIGUIENTES BONOS DE REGALO
            </p>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
              {[
                { text: 'Ebook con recetas para utilizar como aperitivos esta Navidad.', image: '/img/ebook-con-recetas.png' },
                { text: 'Cócteles tradicionalmente navideños para sorprender esta Navidad.', image: '/img/cocteles.png' },
                { text: 'Plantilla para cookies. Ideal si no tienes cortantes/moldes navideños.', image: '/img/plantilla-galletas.png' },
                { text: 'Cómo montar tu negocio pastelero en Instagram y Tiktok', image: '/img/negocio-pastelero.png' },
                { text: 'Planilla para que puedas calcular el precio de cada uno de tus productos de manera AUTOMÁTICA.', image: '/img/plantilla-de-costos.png' }
              ].map((bonus, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-pink-100 to-teal-100 p-5 md:p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  {bonus.image && (
                    <div className="mb-4 flex justify-center">
                      <img
                        src={bonus.image}
                        alt="Bono de regalo"
                        className="w-full max-w-[200px] rounded-lg shadow-md"
                      />
                    </div>
                  )}
                  <div className="flex items-start gap-3 md:gap-4">
                    <Gift className="w-6 h-6 md:w-7 md:h-7 text-pink-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-800 font-medium text-sm md:text-base">{bonus.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-10 md:mt-16 text-center"
            >
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 px-4">
                PERO ESO NO ES TODO!!!
              </p>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 px-4">
                TODO ESTO COMPLETAMENTE GRATIS CON TU INSCRIPCIÓN DE HOY
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-pink-50 to-teal-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-10 md:mb-16 text-center px-4">
              ESTO ES LO QUE DICEN OTROS ALUMNOS ⭐
            </h2>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white p-4 md:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <img
                  src="/img/testimonio-a.jpg"
                  alt="Testimonio de cliente satisfecho"
                  className="w-full rounded-xl shadow-md mb-4"
                />
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-4 md:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <img
                  src="/img/testimonio-b.jpg"
                  alt="Testimonio de cliente satisfecho"
                  className="w-full rounded-xl shadow-md mb-4"
                />
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resumen Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-8 md:mb-12 px-4">
              ¿YA VISTE TODO LO QUE TE LLEVÁS? 🎉
            </h2>

            <div className="bg-gradient-to-br from-teal-100 to-pink-100 p-6 md:p-10 lg:p-12 rounded-3xl shadow-xl max-w-4xl mx-4 sm:mx-auto">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 font-medium leading-relaxed">
                Ebook con más de 20 recetas de repostería navideña + Ebook con Tentempiés navideños +
                Ebook con Cócteles navideños + Ebook Cómo vender en Instagram y Tiktok +
                Planilla de costos + Plantillas de cookies
              </p>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mt-10 md:mt-16 max-w-4xl mx-auto px-4 leading-relaxed"
            >
              Esta Navidad, no solo endulzas tu mesa, sino también tu futuro. Con estas recetas,
              puedes transformar tu pasión por la repostería en un negocio rentable,
              ¡y lo mejor de todo es que es más fácil de lo que imaginas!
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-10 md:mb-16 text-center px-4">
              Preguntas Frecuentes 💭
            </h2>

            <FAQ
              items={[
                {
                  question: 'Quiero inscribirme, ¿Cómo funciona?',
                  answer: 'Una vez realices el pago el sistema automáticamente te enviará las instrucciones a tu correo electrónico para acceder a todas las recetas donde podrás iniciar tu capacitación. Puedes disfrutar de sus actualizaciones para siempre, lo puedes llevar a cabo desde la comodidad de tu casa o tu entorno.'
                },
                {
                  question: '¿Necesito tener experiencia?',
                  answer: 'El ebook es paso a paso desde el principio y no es necesario tener experiencia previa.'
                },
                {
                  question: '¿Cuál es el precio en mi moneda?',
                  answer: 'El precio te aparecerá automáticamente en tu moneda local.'
                }
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4 bg-gradient-to-br from-pink-400 to-teal-400">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 md:mb-8 px-4">
              ¿Estás lista para empezar? 🚀
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-6 md:mb-8 px-4 leading-relaxed">
              Imagina un método simple y efectivo, que te enseña a crear postres navideños irresistibles,
              mientras aprendes a optimizar tu tiempo y recursos.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-white mb-10 md:mb-14 px-4 leading-relaxed">
              Lo que hace único este recetario no es solo la facilidad de cada receta,
              sino también la estrategia detrás de cada paso: no solo aprenderás a cocinar,
              sino también a convertir estas creaciones en un negocio exitoso.
            </p>

            <div className="flex justify-center">
              <Button size="lg" variant="secondary" onClick={handleCTAClick}>
                ¡SÍ, QUIERO TRANSFORMAR MI NAVIDAD!
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 md:py-14 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-gray-400 text-sm md:text-base mb-3 md:mb-4">
            © 2024 Recetas Navideñas. All Rights Reserved
          </p>
          <p className="text-gray-500 text-xs md:text-sm">
            No te preocupes, no hacemos spam. A mí tampoco me gusta el spam.
          </p>
        </div>
      </footer>
    </main>
  );
}
