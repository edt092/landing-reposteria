'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle } from 'lucide-react';

// Mensajes predefinidos del flujo de conversación
const MESSAGES = {
  // FASE 1
  greetingInitial: "¡Hola! 🎄 ¡Felices Fiestas! Soy Yuli, tu asistente para endulzar esta Navidad. ¿Te gustaría sorprender a tu familia con postres mágicos y convertirlos en una tradición familiar?",
  followUp60s: "Permíteme contarte rápido: con nuestro Ebook Recetas Secretas de la Abuela aprenderás paso a paso más de 20 postres navideños increíbles, incluso si es tu primera vez en la cocina. ¿Te gustaría conocer los detalles?",

  // FASE 2
  motivationQuestion: "¿Qué te emociona más: preparar postres espectaculares para tu familia 🎂 o empezar un negocio dulce esta temporada 💰?",
  motivationFamily: "¡Qué hermoso! 💝 Imagina la cara de tu familia al probar tus creaciones. Con nuestras recetas paso a paso (con fotos y videos), hasta los principiantes logran postres dignos de pastelería. Cada receta está diseñada para que sea fácil y el resultado sea espectacular.",
  motivationBusiness: "¡Excelente visión! 💰 Muchas de nuestras clientas han convertido estas recetas en negocios exitosos. Los postres navideños tienen alta demanda y buenos márgenes. Te daremos las herramientas para empezar hoy mismo.",

  doubtQuestion: "¿Tu mayor duda sería si las recetas son fáciles o el precio?",
  doubtEasy: "¡Perfecto! Te cuento: cada receta tiene instrucciones paso a paso, con fotos de cada etapa y videos explicativos. Están diseñadas específicamente para principiantes. Además, incluimos una sección de 'Solución de problemas' para que nada salga mal. Si es tu primera vez cocinando, ¡este es tu ebook!",
  doubtPrice: "Entiendo totalmente. Mira, el ebook cuesta solo $14.50 USD (pago único), pero el valor real que recibes es muchísimo mayor: más de 20 recetas profesionales, 6 bonos extras valorados en $150, actualizaciones gratis de por vida, y acceso inmediato. Es menos que el costo de UNA torta en pastelería, pero obtienes conocimiento para toda la vida.",

  bonusQuestion: "¿Quieres que te cuente los 6 BONOS 🎁 que vienen si accedes hoy?",
  bonusList: `¡Claro! Aquí están los 6 BONOS EXCLUSIVOS que recibes HOY (valorados en más de $150):

🎁 BONO 1: Guía de Decoración Profesional (Valor $35) - Aprende técnicas de pastelería con fondant, glaseado y más para que tus postres luzcan de revista

🎁 BONO 2: 10 Recetas Express (Valor $25) - Menos de 30 minutos. Para cuando tienes poco tiempo pero quieres impresionar

🎁 BONO 3: Calculadora de Costos y Precios (Valor $30) - Si quieres vender, sabrás exactamente cuánto cobrar para maximizar tus ganancias

🎁 BONO 4: Videos Paso a Paso Exclusivos (Valor $40) - Videos explicativos de las técnicas más complejas, para que no te pierdas ningún detalle

🎁 BONO 5: Grupo Privado VIP en Telegram (Valor $20) - Soporte directo, recetas nuevas cada mes y una comunidad increíble de reposteras

🎁 BONO 6: Plantillas Imprimibles GRATIS - Moldes y plantillas para decorar como profesional

Todos estos bonos (valorados en +$150) son GRATIS si accedes hoy. ¡Es una locura!`,

  // FASE 3
  urgencyClose: `¡Es el momento! 🚀 Por solo $14.50 USD (pago único), obtienes:

✅ Acceso de por vida al ebook completo
✅ Más de 20 recetas navideñas profesionales (incluye versiones veganas, sin gluten y bajas en azúcar)
✅ Los 6 BONOS que te mencioné (valorados en +$150)
✅ Actualizaciones gratis para siempre
✅ Acceso INMEDIATO (lo recibes en tu email en menos de 2 minutos)
✅ Garantía de 7 días - 100% reembolso sin preguntas
✅ Soporte directo en grupo VIP de Telegram

¿Lista para endulzar tu Navidad y tu futuro?`,

  purchaseLink: "🎉 ¡Perfecto! Aquí está tu enlace de compra seguro (Hotmart):\n\n👉 https://go.hotmart.com/E102944858K?ap=3d6d\n\nEl pago es 100% seguro y recibirás el acceso en tu email inmediatamente. En menos de 2 minutos estarás descargando tu ebook y bonos. ¡Nos vemos del otro lado! 🎄✨",

  // FAQ
  faqHowToBuy: "¡Es súper fácil! 💳 Solo haz clic en el enlace de compra, completa tus datos de pago (aceptamos tarjetas y otros métodos), y listo. Recibirás el acceso inmediato en tu email. Todo el proceso es seguro a través de Hotmart. ¿Te gustaría que te envíe el enlace ahora?",
  faqPayment: "Aceptamos todos los métodos de pago 💳: tarjetas de crédito/débito, PayPal, transferencia bancaria y más. El pago es procesado por Hotmart, una plataforma 100% segura. Además, tienes garantía de 7 días: si no te gusta, te devolvemos tu dinero sin preguntas.",
  faqWorks: "¡Así funciona! 📲 Después de tu pago, recibes un email instantáneo (en menos de 2 minutos) con tu link de acceso. Desde ahí descargas el ebook completo en formato PDF + todos los 6 bonos. Puedes verlo en tu celular, tablet o computadora - las veces que quieras. Las más de 20 recetas están paso a paso con fotos de cada etapa, videos explicativos, lista de ingredientes, tips profesionales y solución de problemas. Empiezas cuando quieras, a tu ritmo. Es tuyo para siempre con actualizaciones gratis incluidas.",
  faqPrice: "El precio es de solo $14.50 USD (pago único). Precio normal $35 USD, pero ahora con 60% de descuento. No hay cargos mensuales ni costos ocultos. Pagas una vez y es tuyo de por vida, incluyendo todas las actualizaciones futuras y los 6 bonos gratis valorados en +$150. Es menos que el costo de UNA torta en pastelería, pero obtienes conocimiento para toda la vida.",
  faqBonus: "¡Los 6 bonos son increíbles! Incluyen: 1) Guía de Decoración Pro ($35), 2) 10 Recetas Express ($25), 3) Calculadora de Costos ($30), 4) Videos Exclusivos ($40), 5) Grupo VIP Telegram ($20), y 6) Plantillas Imprimibles (GRATIS). Todo valorado en +$150 y es tuyo GRATIS si accedes hoy. ¿Quieres que te dé más detalles de cada uno?",
  faqBeginner: "¡Este ebook está hecho ESPECIALMENTE para principiantes! 🌟 No necesitas experiencia previa. Cada receta tiene instrucciones paso a paso con fotos, videos explicativos, y una sección de solución de problemas. Si nunca has cocinado, este es perfecto para empezar.",

  // NUEVAS FAQ COMPLETAS
  faqFormat: "Es un **Ebook Digital** en formato PDF descargable 📱💻. No es un curso con videos largos. Son recetas paso a paso con fotos, instrucciones claras y videos cortos de apoyo. Lo descargas y es tuyo para siempre, sin necesidad de internet después.",
  faqCourseOrEbook: "Es un **Ebook Digital Completo**, no un curso. 📚 Incluye más de 20 recetas navideñas paso a paso con fotos, videos explicativos cortos, guías de decoración, calculadora de costos, y acceso al grupo VIP. Lo mejor: es tuyo para siempre, lo descargas y lo usas cuando quieras.",
  faqGuarantee: "¡Sí! Tienes **Garantía Total de 7 días** 🛡️. Si por cualquier motivo no te gusta el ebook, solo escribes a soporte y te devolvemos el 100% de tu dinero, sin preguntas. Es una compra sin riesgo.",
  faqDelivery: "¡El acceso a la plataforma se envía vía EMAIL una vez realizado el pago! ⚡ En menos de 2 minutos después de tu compra, recibes un correo electrónico con tu link de acceso al ebook. No es un envío físico, es 100% digital. Lo descargas en tu celular, tablet o computadora y empiezas de inmediato. ¡Sin esperas!",
  faqAccess: "Después de comprar recibes un email con tu link de acceso. Desde ahí descargas el ebook en PDF y todos los bonos. Es tuyo para siempre, puedes descargarlo las veces que quieras. También recibes acceso al grupo VIP de Telegram.",
  faqEquipment: "¡No necesitas nada especial! 🏠 Solo utensilios básicos de cocina que ya tienes en casa: bowls, batidora (o puedes batir a mano si no tienes), horno convencional, algunos moldes básicos, y utensilios comunes como espátulas y cucharas. Todas las recetas están diseñadas para cocinas caseras normales, sin equipamiento profesional ni costoso. Además, te damos alternativas si no tienes algún utensilio específico. ¡Todo es accesible y económico!",
  faqSell: "¡Por supuesto que puedes vender! 💰 Muchas de nuestras clientas han iniciado negocios exitosos con estas recetas. Los postres navideños tienen alta demanda de octubre a enero. Incluimos el BONO #3: Calculadora de Costos y Precios (valorada en $30) - una herramienta que te dice exactamente cuánto cobrar para tener buenas ganancias, considerando ingredientes, tiempo y ganancia deseada. Con solo vender 2-3 postres ya recuperaste tu inversión de $14.50. Muchas chicas están ganando entre $200-$500 extra al mes con esto. ¡Es una excelente oportunidad!",
  faqUpdates: "Sí, recibes **actualizaciones GRATIS de por vida** 🎁. Constantemente agregamos nuevas recetas, técnicas, videos y contenido exclusivo. Cuando publiquemos algo nuevo, lo recibes automáticamente en tu email sin costo extra. Ya hemos agregado más de 5 recetas nuevas este año y seguiremos agregando más. Es una inversión única que crece con el tiempo. Pagas $14.50 una vez y recibes contenido para siempre.",
  faqTime: "¡Puedes empezar HOY MISMO! 🚀 En cuanto compres, recibes el acceso inmediato (menos de 2 minutos). Las recetas tienen diferentes tiempos de preparación: tenemos el BONO de 10 Recetas Express que toman menos de 30 minutos (perfectas para cuando tienes poco tiempo), y otras recetas más elaboradas de 1-3 horas para cuando quieres hacer algo espectacular. Tú decides cuál hacer según tu tiempo disponible. Además, puedes preparar ingredientes con anticipación para ahorrar tiempo.",
  faqIngredients: "Los ingredientes son fáciles de conseguir en cualquier supermercado 🛒. Nada raro ni costoso. Además, cada receta incluye alternativas por si no encuentras algo específico. Todo está pensado para que sea accesible.",
  faqDifficult: "¡Para nada! Están diseñadas específicamente para principiantes 👩‍🍳. Cada paso está explicado con fotos y videos. Tenemos una sección de 'Solución de problemas' para evitar errores comunes. Si es tu primera vez, este ebook es perfecto.",
  faqSupport: "Tienes soporte completo: un grupo privado VIP en Telegram donde estamos para ayudarte, resolver dudas y compartir tips. Además, tienes acceso directo a soporte técnico por email. ¡No estás sola en esto!",

  // NUEVAS FAQ ADICIONALES - Para cubrir todas las dudas posibles
  faqOven: "¡Funciona con cualquier tipo de horno! 🔥 Ya sea eléctrico, a gas, de convección o tradicional. Las recetas incluyen instrucciones adaptadas para cada tipo de horno, con tiempos y temperaturas ajustables. Incluso incluimos algunas recetas que NO necesitan horno (postres en frío, en sartén, etc.) para que tengas opciones. ¡Todos pueden hacerlo!",
  faqPortions: "Las recetas están diseñadas para porciones FLEXIBLES 👨‍👩‍👧‍👦. La mayoría son para 8-12 porciones (ideal para familia), pero te enseñamos cómo ajustar las cantidades fácilmente si necesitas más o menos. Hay recetas individuales, para compartir, y para grandes grupos. Además, la Calculadora de Costos (BONO #3) te ayuda a calcular ingredientes para cualquier cantidad.",
  faqPrint: "¡Sí, puedes imprimirlo! 🖨️ El ebook viene en formato PDF de alta calidad, perfecto para imprimir. Muchas clientas lo imprimen y lo tienen en su cocina como libro de referencia. También puedes guardarlo en tu celular o tablet para tenerlo siempre a mano mientras cocinas. Es tuyo para usar como prefieras.",
  faqCountry: "¡Funciona en TODOS los países! 🌎 Las recetas incluyen medidas en gramos, mililitros Y en tazas/cucharadas para que puedas usar el sistema que prefieras. Los ingredientes son universales y fáciles de conseguir en cualquier supermercado del mundo. Además, damos alternativas locales para ingredientes específicos. El ebook está en español claro y fácil de entender.",
  faqAllergies: "¡Sí, tenemos opciones para ti! 🌱 Todas las recetas incluyen versiones alternativas: veganas (sin productos animales), sin gluten (para celíacos), bajas en azúcar (para diabéticos), y sin lactosa. También indicamos posibles alérgenos en cada receta. Nadie se queda sin disfrutar de un postre delicioso en Navidad.",
  faqTrust: "¡Totalmente confiable! ⭐ Ya somos más de 500 familias felices que transformaron su Navidad con este ebook. Tenemos calificación de 4.9/5 estrellas. El pago es procesado por Hotmart, una de las plataformas más seguras y grandes de Latinoamérica. Además, tienes garantía de 7 días - si no te gusta, te devolvemos el 100%. Es una compra totalmente segura y sin riesgo.",
  faqShare: "El acceso es personal e intransferible 👤. Está diseñado para uso individual o familiar en el mismo hogar. Si quieres compartirlo con amigas o familiares, ellas pueden adquirirlo también (¡solo cuesta $14.50!). Esto nos ayuda a seguir creando contenido de calidad y agregando recetas nuevas para ti. Gracias por apoyarnos 💕",
  faqRecipeTypes: "¡Incluye TODO lo que necesitas para una Navidad completa! 🎄 Más de 20 recetas: Tortas navideñas (panetón, torta de frutas, red velvet navideña), Galletas decoradas (jengibre, mantecilla, navideñas), Cupcakes temáticos, Postres en copas (tiramisú, cheesecake, mousse), Brownies y alfajores, Decoraciones comestibles, Técnicas de glaseado y fondant, Postres sin horno, ¡y más! Tienes variedad para toda la temporada.",
  faqLanguage: "Está 100% en ESPAÑOL 🇪🇸 con lenguaje claro, sencillo y fácil de entender. No necesitas saber inglés ni ningún otro idioma. Las instrucciones están escritas paso a paso de forma muy simple, como si tu mejor amiga te estuviera enseñando. Además, los videos no requieren audio, son completamente visuales. ¡Cualquier persona puede entenderlo!",
  faqTechnical: "¡No te preocupes! 🛠️ Si tienes algún problema técnico para descargar o acceder al ebook, tenemos soporte técnico directo. Solo escribes a soporte y te ayudamos inmediatamente (respondemos en menos de 24 horas, generalmente en pocas horas). También tienes acceso al grupo VIP de Telegram donde hay ayuda en tiempo real. Nunca te quedarás sin tu ebook, ¡te ayudamos hasta que lo tengas!",
  faqExperience: "¡NO necesitas ninguna experiencia previa! 🌟 Este ebook está diseñado específicamente para principiantes absolutos. Cada receta tiene instrucciones paso a paso con fotos de cada etapa, videos explicativos, tips profesionales y una sección de solución de problemas. Si nunca has horneado o cocinado antes, este es el ebook perfecto para empezar. Muchas de nuestras clientas comenzaron sin experiencia y ahora están vendiendo sus postres. ¡Tú también puedes!",
  faqModules: "No es un curso con módulos, es un **Ebook Digital Completo** 📚. Incluye más de 20 recetas navideñas organizadas por categorías (tortas, galletas, cupcakes, postres en copas, etc.) + 6 BONOS extras. Todo está disponible INSTANTÁNEAMENTE al comprar. No hay módulos que se liberan por semanas - ¡lo tienes todo desde el minuto 1! Descargas el PDF completo y empiezas cuando quieras, con la receta que quieras.",
  faqAvailability: "¡Tienes acceso 24/7 para siempre! ⏰ Una vez que compres, el ebook es tuyo de por vida. Lo descargas y lo usas cuando quieras, a tu ritmo, sin límites de tiempo. Puedes cocinar a las 3 AM si quieres 😄. No hay horarios, no hay fechas límite, no hay restricciones. Además, recibes todas las actualizaciones futuras gratis. Empiezas cuando gustes y lo usas cuantas veces quieras. Es TUYO para siempre.",

  // MENSAJES DE CIERRE
  closeAttempt1: "Entiendo que necesites pensarlo 😊. Solo te recuerdo que los 6 BONOS EXTRAS (valorados en +$150) solo están disponibles HOY con este precio especial de $14.50. Mañana vuelve al precio normal de $35. ¿Hay algo específico que te gustaría saber antes de decidir?",
  closeAttempt2: "¡No dejes pasar esta oportunidad! 🎄 Por solo $14.50 obtienes todo lo necesario para brillar esta Navidad (ebook + $150 en bonos). Tienes garantía de 7 días sin riesgo. ¿Qué te detiene? ¿Es el precio, las recetas, o alguna otra duda?",
  closeAttempt3: "Última llamada 🔔. En este momento hay más de 50 personas viendo esta oferta. Los 6 bonos gratis valorados en $150 solo están disponibles HOY a las 23:59. Son solo $14.50 vs $35 que costará mañana. ¿Lista para asegurar tu acceso ahora?",
  closeFinal: "Entiendo tu decisión. Solo déjame decirte que esta oferta especial con los 6 bonos gratis (+$150 de valor) termina hoy. Si cambias de opinión, aquí está el enlace: https://go.hotmart.com/E102944858K?ap=3d6d\n\nPor solo $14.50 puedes transformar tu Navidad. ¡Felices Fiestas! 🎄✨",

  // MANEJO DE OBJECIONES
  objectionExpensive: "Entiendo tu preocupación por el precio 💰. Déjame ponértelo así: son solo $14.50 (menos que 2 cafés ☕ o una pizza). Normalmente cuesta $35, hoy tiene 60% de descuento + $150 en bonos gratis. Con una SOLA receta que vendas, ya recuperaste tu inversión varias veces. Además, tienes garantía de 7 días. Si no te gusta, te devuelven TODO. Es una inversión sin riesgo. ¿Qué dices?",
  objectionNoTime: "¡Te entiendo perfectamente! Por eso incluimos recetas EXPRESS de 30 minutos ⚡. No necesitas horas en la cocina. Además, el ebook es tuyo para siempre, lo usas cuando puedas. ¿Vemos cómo empezar con las recetas rápidas?",
  objectionCantCook: "¡Esa es exactamente la razón por la que creamos este ebook! 👩‍🍳 Está diseñado para principiantes TOTAL. Cada paso tiene fotos, videos explicativos, y tips para no fallar. Si nunca has cocinado, este es perfecto para empezar. ¿Probamos?",
  objectionThinking: "Claro, tómate tu tiempo para pensarlo 💭. Solo ten en cuenta que los 6 BONOS GRATIS (valorados en +$150) terminan HOY con este precio de $14.50. Mañana vuelve a $35 y sin bonos. ¿Hay algo específico que te ayudaría a decidir?",
  objectionNotSure: "Es normal tener dudas 🤔. ¿Qué es lo que más te preocupa? ¿El precio? ¿Si las recetas funcionan? ¿El nivel de dificultad? Cuéntame y te ayudo a resolver esa duda específica. Además, recuerda que tienes garantía de 7 días sin riesgo - si no te gusta, te devolvemos el 100%.",
  objectionLater: "Te entiendo, todos estamos ocupados ⏰. Pero mira, los 6 bonos gratis (valorados en +$150) y el precio de $14.50 terminan HOY. Mañana vuelve a $35 y sin bonos. Si lo dejas para después, perderás $150 en bonos extras + pagarás el doble. Son solo 2 minutos para asegurar tu acceso. ¿Qué tal si accedes ahora y lo revisas cuando tengas tiempo?",
  objectionNoMoney: "Entiendo completamente 💸. Pero piénsalo así: son solo $14.50 (menos que una pizza). Con solo vender 2-3 galletas o un postre pequeño ya recuperas la inversión. Y el ebook es tuyo PARA SIEMPRE con actualizaciones gratis. Puedes empezar a vender cuando quieras, pero los $150 en bonos gratis terminan HOY. ¿Aseguramos tu acceso con los bonos?",

  // PREGUNTAS ESPECÍFICAS
  paymentInstallments: "No, debido a que es un precio en promoción 💝. Por solo $14.50 USD (pago único) obtienes acceso completo de por vida + los 6 bonos valorados en +$150. Es menos que el costo de una pizza, ¡y es tuyo para siempre! 🎁",
  recipeCount: "¡Descubre el Recetario de 500 Recetas Navideñas perfecto para emprender desde casa y disfrutar de la Navidad! 🎄✨ Este recetario está diseñado para quienes buscan: 🍪 Crear y vender deliciosos postres navideños. 👩‍🍳 Aprender fácilmente con recetas paso a paso. 🎉 Generar ingresos sin salir de casa. Incluye: 🎁 500 recetas únicas de galletas, pasteles y más. 🎁 Bonos exclusivos GRATIS: Actividades para niños, guías de eventos, 84 Recetas Navideñas Adicionales, Acceso Exclusivo a nuestra Comunidad de WhatsApp, y más. ¡Empieza hoy y transforma tu Navidad en una oportunidad de negocio! 🎁💰",
};

// Palabras clave para detección de intenciones
const KEYWORDS = {
  purchase: ['comprar', 'acceder', 'sí', 'si', 'quiero', 'dale', 'ok', 'bueno', 'listo', 'vamos', 'envíame', 'enviame', 'dame', 'perfecto', 'claro'],
  howToBuy: ['cómo compro', 'cómo comprar', 'proceso de compra'],
  payment: ['pago', 'tarjeta', 'paypal', 'método de pago', 'formas de pago'],
  works: ['funciona', 'cómo funciona', 'recibo'],
  price: ['precio', 'costo', 'cuánto', 'cuanto', 'vale'],
  bonus: ['bonos', 'regalos', 'extras', 'incluye'],
  beginner: ['principiante', 'primera vez', 'experiencia', 'fácil', 'difícil', 'nunca he cocinado'],

  // NUEVAS DETECCIONES
  format: ['formato', 'tipo de archivo', 'pdf', 'video'],
  courseOrEbook: ['curso', 'ebook', 'e-book', 'libro', 'capacitación', 'qué es', 'que es'],
  guarantee: ['garantía', 'garantia', 'devolución', 'devolucion', 'reembolso', 'seguro'],
  delivery: ['cuándo recibo', 'cuando recibo', 'entrega', 'demora', 'tiempo de entrega', 'instantáneo', 'inmediato', 'por donde envian', 'por donde envían', 'donde envian', 'donde envían', 'envio', 'envío', 'como me lo envian', 'como me lo envían'],
  access: ['cómo accedo', 'como accedo', 'después de comprar', 'despues de comprar', 'acceso'],
  equipment: ['equipamiento', 'utensilios', 'necesito', 'herramientas', 'equipo', 'horno'],
  sell: ['vender', 'negocio', 'puedo vender', 'emprender', 'ganar dinero'],
  updates: ['actualizaciones', 'actualizar', 'nuevas recetas', 'contenido nuevo'],
  time: ['tiempo', 'cuánto tarda', 'cuanto tarda', 'demora', 'rápido', 'rapido'],
  ingredients: ['ingredientes', 'productos', 'conseguir', 'supermercado', 'dónde compro', 'donde compro'],
  difficult: ['difícil', 'dificil', 'complicado', 'complejo', 'nivel'],
  support: ['soporte', 'ayuda', 'apoyo', 'consultas', 'dudas', 'preguntas'],

  // NUEVAS DETECCIONES ADICIONALES
  oven: ['horno', 'eléctrico', 'electrico', 'gas', 'convección', 'conveccion', 'sin horno', 'tengo horno'],
  portions: ['porciones', 'cantidad', 'cuántas personas', 'cuantas personas', 'para cuántos', 'para cuantos', 'rinde'],
  print: ['imprimir', 'impresión', 'impresion', 'físico', 'fisico', 'papel'],
  country: ['país', 'pais', 'medidas', 'tazas', 'gramos', 'mililitros', 'funciona en', 'soy de'],
  allergies: ['alergia', 'vegano', 'vegana', 'gluten', 'celíaco', 'celiaco', 'diabético', 'diabetico', 'lactosa', 'azúcar', 'azucar'],
  trust: ['confiable', 'seguro', 'estafa', 'real', 'verdad', 'cuántos compraron', 'cuantos compraron', 'calificación', 'calificacion', 'reviews', 'opiniones'],
  share: ['compartir', 'amiga', 'familia', 'varias personas', 'dos personas'],
  recipeTypes: ['qué recetas', 'que recetas', 'tipo de postres', 'cuáles postres', 'cuales postres', 'qué incluye', 'que incluye', 'lista de recetas'],
  language: ['idioma', 'español', 'ingles', 'inglés', 'lenguaje'],
  technical: ['problema técnico', 'problema tecnico', 'no puedo descargar', 'error', 'no funciona', 'no carga'],
  experience: ['experiencia', 'necesito saber', 'requiere experiencia', 'sin experiencia', 'he cocinado antes'],
  modules: ['módulos', 'modulos', 'cuántos módulos', 'cuantos modulos', 'cuantas clases', 'cuántas clases', 'lecciones', 'estructura', 'organizado'],
  availability: ['24/7', '24 horas', 'cuando quiera', 'cuando guste', 'cualquier momento', 'horario', 'disponible', 'acceso siempre', 'todo el tiempo'],

  // OBJECIONES
  objectionExpensive: ['caro', 'costoso', 'mucho dinero', 'muy caro', 'es mucho'],
  objectionNoTime: ['no tengo tiempo', 'sin tiempo', 'ocupada', 'ocupado', 'mucho trabajo'],
  objectionCantCook: ['no sé cocinar', 'no se cocinar', 'nunca cociné', 'nunca cocine', 'no cocino'],
  objectionThinking: ['lo voy a pensar', 'lo pensaré', 'lo pensare', 'déjame pensar', 'dejame pensar'],
  objectionNotSure: ['no estoy segura', 'no estoy seguro', 'tengo dudas', 'no sé', 'no se'],
  objectionLater: ['más tarde', 'mas tarde', 'después', 'despues', 'luego', 'otro día', 'otro dia'],
  objectionNoMoney: ['no tengo dinero', 'sin dinero', 'no puedo pagar', 'no tengo plata', 'sin plata'],

  // PREGUNTAS ESPECÍFICAS
  paymentInstallments: ['pagar por partes', 'en partes', 'cuotas', 'pagos', 'mensualidades', 'a plazos'],
  recipeCount: ['cuantas recetas', 'cuántas recetas', 'cuantas receta', 'cantidad de recetas', 'numero de recetas', 'número de recetas', 'tiene el ebook'],
};

const ChatYuli = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [userContext, setUserContext] = useState({});
  const [hasShownFollowUp, setHasShownFollowUp] = useState(false);
  const [lastUserMessageTime, setLastUserMessageTime] = useState(null);
  const [lastBotMessageTime, setLastBotMessageTime] = useState(null);
  const [closeAttemptCount, setCloseAttemptCount] = useState(0);
  const [hasAnsweredQuestion, setHasAnsweredQuestion] = useState(false);
  const [lastQuestionType, setLastQuestionType] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  const followUpTimerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const logTimerRef = useRef(null);

  // Scroll automático al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Función para enviar logs a Telegram - DESACTIVADA TEMPORALMENTE
  // const sendLogsToTelegram = async () => {
  //   if (messages.length === 0) return;

  //   try {
  //     const response = await fetch('/api/telegram-log', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         messages,
  //         sessionId,
  //         timestamp: new Date().toISOString(),
  //       }),
  //     });

  //     if (!response.ok) {
  //       console.error('Error enviando logs a Telegram:', await response.text());
  //     }
  //   } catch (error) {
  //     console.error('Error al enviar logs:', error);
  //   }
  // };

  // Enviar logs cada vez que se actualicen los mensajes (con debounce) - DESACTIVADO TEMPORALMENTE
  // useEffect(() => {
  //   if (messages.length > 0) {
  //     // Limpiar timer anterior
  //     if (logTimerRef.current) {
  //       clearTimeout(logTimerRef.current);
  //     }

  //     // Enviar logs después de 5 segundos de inactividad
  //     logTimerRef.current = setTimeout(() => {
  //       sendLogsToTelegram();
  //     }, 5000);
  //   }

  //   return () => {
  //     if (logTimerRef.current) {
  //       clearTimeout(logTimerRef.current);
  //     }
  //   };
  // }, [messages]);

  // Enviar logs cuando el usuario cierra el chat - DESACTIVADO TEMPORALMENTE
  const handleCloseChat = () => {
    // sendLogsToTelegram(); // FUNCIÓN DESACTIVADA
    setIsOpen(false);
    // Mostrar badge si hay mensajes sin leer
    if (messages.length > 0 && messages[messages.length - 1].sender === 'yuli') {
      setShowBadge(true);
    }
  };

  // Abrir chat y limpiar badge
  const handleOpenChat = () => {
    setIsOpen(true);
    setShowBadge(false);
  };

  // Abrir chat automáticamente al cargar y enviar primer mensaje (después de 3 segundos)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      setShowBadge(false);
      sendYuliMessage(MESSAGES.greetingInitial);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Timer para mensaje de seguimiento (60 segundos)
  useEffect(() => {
    if (lastUserMessageTime && currentPhase === 1 && !hasShownFollowUp) {
      followUpTimerRef.current = setTimeout(() => {
        sendYuliMessage(MESSAGES.followUp60s);
        setHasShownFollowUp(true);
      }, 60000); // 60 segundos
    }

    return () => {
      if (followUpTimerRef.current) {
        clearTimeout(followUpTimerRef.current);
      }
    };
  }, [lastUserMessageTime, currentPhase, hasShownFollowUp]);

  // Sistema de seguimiento de cierre automático (cada 60 segundos después de responder una pregunta)
  useEffect(() => {
    if (hasAnsweredQuestion && lastBotMessageTime && closeAttemptCount < 4) {
      closeTimerRef.current = setTimeout(() => {
        const now = new Date();
        const timeSinceLastUser = lastUserMessageTime ? (now - lastUserMessageTime) / 1000 : Infinity;

        // Solo enviar si han pasado más de 55 segundos desde el último mensaje del usuario
        if (timeSinceLastUser > 55) {
          if (closeAttemptCount === 0) {
            sendYuliMessage(MESSAGES.closeAttempt1);
            // closeAttempt1 hace una pregunta al final, pero NO es una pregunta de cierre directa
          } else if (closeAttemptCount === 1) {
            sendYuliMessage(MESSAGES.closeAttempt2);
            // closeAttempt2 también hace pregunta pero NO es cierre directo
          } else if (closeAttemptCount === 2) {
            sendYuliMessage(MESSAGES.closeAttempt3);
            setLastQuestionType('close'); // Esta sí es pregunta de cierre directa
          } else if (closeAttemptCount === 3) {
            sendYuliMessage(MESSAGES.closeFinal);
          }
          setCloseAttemptCount(prev => prev + 1);
        }
      }, 60000); // 60 segundos
    }

    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, [hasAnsweredQuestion, lastBotMessageTime, closeAttemptCount, lastUserMessageTime]);

  // Reproducir sonido de notificación
  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  };

  // Enviar mensaje de Yuli con delay y animación - Simulando escritura humana
  const sendYuliMessage = (text, delay = null) => {
    // Calcular delay basado en longitud del mensaje para simular lectura y escritura humana
    const baseDelay = 2500; // 2.5 segundos base
    const textLength = text.length;
    const readingTime = Math.min(textLength * 30, 4000); // ~30ms por carácter, máx 4 seg
    const thinkingTime = Math.random() * 2000 + 1000; // 1-3 segundos de "pensamiento"

    const calculatedDelay = delay !== null ? delay : (baseDelay + readingTime + thinkingTime);

    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        text,
        sender: 'yuli',
        timestamp: new Date()
      }]);
      setIsTyping(false);
      setLastBotMessageTime(new Date());

      // Mostrar badge si el chat está cerrado
      if (!isOpen) {
        setShowBadge(true);
      }

      playNotificationSound();
    }, calculatedDelay);
  };

  // Detectar intención del usuario basado en palabras clave
  const detectIntent = (text) => {
    const lowerText = text.toLowerCase();

    for (const [intent, keywords] of Object.entries(KEYWORDS)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        return intent;
      }
    }

    return null;
  };

  // Procesar respuesta del usuario
  const processUserResponse = (text) => {
    const intent = detectIntent(text);
    const lowerText = text.toLowerCase();

    // Resetear contador de intentos de cierre cuando el usuario responde
    setCloseAttemptCount(0);

    // DETECTAR RESPUESTAS AFIRMATIVAS DESPUÉS DE PREGUNTAS DE CIERRE
    // Si el usuario responde afirmativamente después de una pregunta de cierre, enviar link inmediatamente
    if (lastQuestionType === 'close' && (lowerText === 'sí' || lowerText === 'si' || lowerText === 'claro' || lowerText === 'dale' || lowerText === 'ok' || lowerText === 'quiero' || lowerText === 'listo' || lowerText === 'vamos')) {
      sendYuliMessage(MESSAGES.purchaseLink);
      setLastQuestionType(null);
      setHasAnsweredQuestion(false); // No seguir intentando cerrar después de enviar el link
      return;
    }

    // MANEJO DE OBJECIONES (prioridad alta - se manejan primero)
    if (intent === 'objectionExpensive') {
      sendYuliMessage(MESSAGES.objectionExpensive);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("¿Aseguramos tu acceso con los bonos gratis? 💎");
        setLastQuestionType('close');
      }, 5000);
      return;
    }

    if (intent === 'objectionNoTime') {
      sendYuliMessage(MESSAGES.objectionNoTime);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("¿Te envío el enlace para que lo tengas listo? ⚡");
        setLastQuestionType('close');
      }, 5000);
      return;
    }

    if (intent === 'objectionCantCook') {
      sendYuliMessage(MESSAGES.objectionCantCook);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("¿Empezamos tu aventura en la cocina? 👩‍🍳");
        setLastQuestionType('close');
      }, 5000);
      return;
    }

    if (intent === 'objectionThinking') {
      sendYuliMessage(MESSAGES.objectionThinking);
      setHasAnsweredQuestion(true);
      return;
    }

    if (intent === 'objectionNotSure') {
      sendYuliMessage(MESSAGES.objectionNotSure);
      setHasAnsweredQuestion(true);
      return;
    }

    if (intent === 'objectionLater') {
      sendYuliMessage(MESSAGES.objectionLater);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Son solo 2 minutos para asegurar los bonos. ¿Lo hacemos? ⏰");
        setLastQuestionType('close');
      }, 5000);
      return;
    }

    if (intent === 'objectionNoMoney') {
      sendYuliMessage(MESSAGES.objectionNoMoney);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("¿Aseguramos tu inversión con garantía? 💰");
        setLastQuestionType('close');
      }, 5000);
      return;
    }

    // PREGUNTAS ESPECÍFICAS (Alta prioridad)
    // Pregunta sobre pagar por partes
    if (intent === 'paymentInstallments') {
      sendYuliMessage(MESSAGES.paymentInstallments);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("¿Te gustaría asegurar tu acceso con este precio especial? 🎄");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // Pregunta sobre cantidad de recetas
    if (intent === 'recipeCount') {
      sendYuliMessage(MESSAGES.recipeCount);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("¿Te gustaría acceder ahora y comenzar a explorar todas estas recetas? 🍪");
        setLastQuestionType('close');
      }, 5000);
      return;
    }

    // ORDEN CORRECTO: Primero responder FAQ, luego ofrecer enlace
    // FAQ - Formato del producto
    if (intent === 'format' || intent === 'courseOrEbook') {
      sendYuliMessage(MESSAGES.faqCourseOrEbook);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("¿Te gustaría que te envíe el enlace de compra para acceder ahora? 🎁");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Garantía
    if (intent === 'guarantee') {
      sendYuliMessage(MESSAGES.faqGuarantee);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Es una compra sin riesgo. ¿Lista para acceder? 🛡️");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Entrega
    if (intent === 'delivery') {
      sendYuliMessage(MESSAGES.faqDelivery);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("¿Quieres tu acceso instantáneo ahora? ⚡");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Acceso
    if (intent === 'access') {
      sendYuliMessage(MESSAGES.faqAccess);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("¿Te gustaría asegurar tu acceso ahora? 📥");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Equipamiento
    if (intent === 'equipment') {
      sendYuliMessage(MESSAGES.faqEquipment);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Solo necesitas lo que ya tienes. ¿Empezamos? 👩‍🍳");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Vender
    if (intent === 'sell') {
      sendYuliMessage(MESSAGES.faqSell);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("¿Lista para empezar tu negocio dulce? 💰");
        setLastQuestionType('close'); // Marcar como pregunta de cierre
      }, 4000);
      return;
    }

    // FAQ - Actualizaciones
    if (intent === 'updates') {
      sendYuliMessage(MESSAGES.faqUpdates);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Pagas una vez, recibes para siempre. ¿Accedemos? 🎁");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Tiempo
    if (intent === 'time') {
      sendYuliMessage(MESSAGES.faqTime);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("¿Quieres empezar hoy mismo? 🚀");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Ingredientes
    if (intent === 'ingredients') {
      sendYuliMessage(MESSAGES.faqIngredients);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Todo es fácil de conseguir. ¿Comenzamos? 🛒");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Dificultad
    if (intent === 'difficult' || intent === 'beginner') {
      sendYuliMessage(MESSAGES.faqBeginner);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Perfecto para principiantes. ¿Lista para sorprenderte? 🌟");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Soporte
    if (intent === 'support') {
      sendYuliMessage(MESSAGES.faqSupport);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Tendrás todo el apoyo que necesitas. ¿Accedemos? 💪");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // NUEVAS FAQ ADICIONALES
    // FAQ - Tipo de horno
    if (intent === 'oven') {
      sendYuliMessage(MESSAGES.faqOven);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Funciona con cualquier horno. ¿Lista para empezar? 🔥");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Porciones
    if (intent === 'portions') {
      sendYuliMessage(MESSAGES.faqPortions);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Porciones flexibles para cualquier ocasión. ¿Accedemos? 👨‍👩‍👧‍👦");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Imprimir
    if (intent === 'print') {
      sendYuliMessage(MESSAGES.faqPrint);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Puedes imprimirlo o usarlo digital. ¿Te envío el enlace? 🖨️");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - País/Medidas
    if (intent === 'country') {
      sendYuliMessage(MESSAGES.faqCountry);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Funciona en todo el mundo. ¿Aseguramos tu acceso? 🌎");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Alergias
    if (intent === 'allergies') {
      sendYuliMessage(MESSAGES.faqAllergies);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Versiones para todos. Nadie se queda sin postre. ¿Empezamos? 🌱");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Confiabilidad
    if (intent === 'trust') {
      sendYuliMessage(MESSAGES.faqTrust);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("100% confiable y seguro. ¿Lista para unirte a las 500+ familias felices? ⭐");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Compartir
    if (intent === 'share') {
      sendYuliMessage(MESSAGES.faqShare);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Es uso personal/familiar. ¿Aseguramos tu acceso por $14.50? 👤");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Tipos de recetas
    if (intent === 'recipeTypes') {
      sendYuliMessage(MESSAGES.faqRecipeTypes);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Más de 20 recetas para toda la Navidad. ¿Accedemos? 🎄");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Idioma
    if (intent === 'language') {
      sendYuliMessage(MESSAGES.faqLanguage);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("100% en español, súper fácil de entender. ¿Empezamos? 🇪🇸");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Problemas técnicos
    if (intent === 'technical') {
      sendYuliMessage(MESSAGES.faqTechnical);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Tenemos soporte técnico completo. ¿Lista para acceder? 🛠️");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Experiencia necesaria
    if (intent === 'experience') {
      sendYuliMessage(MESSAGES.faqExperience);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Cero experiencia necesaria. ¿Empezamos tu aventura en la cocina? 🌟");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Módulos/Estructura
    if (intent === 'modules') {
      sendYuliMessage(MESSAGES.faqModules);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Todo disponible desde el minuto 1. ¿Accedemos ahora? 📚");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Disponibilidad 24/7
    if (intent === 'availability') {
      sendYuliMessage(MESSAGES.faqAvailability);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Acceso 24/7 para siempre. ¿Aseguramos tu acceso? ⏰");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Cómo comprar
    if (intent === 'howToBuy') {
      sendYuliMessage(MESSAGES.faqHowToBuy);
      setHasAnsweredQuestion(true);
      return;
    }

    // FAQ - Métodos de pago
    if (intent === 'payment') {
      sendYuliMessage(MESSAGES.faqPayment);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Pago 100% seguro. ¿Te envío el enlace? 💳");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Cómo funciona
    if (intent === 'works') {
      sendYuliMessage(MESSAGES.faqWorks);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Es tuyo para siempre. ¿Accedemos? 📱");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Precio
    if (intent === 'price') {
      sendYuliMessage(MESSAGES.faqPrice);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Solo $15 por todo esto. ¿Aseguramos tu acceso? 💎");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // FAQ - Bonos
    if (intent === 'bonus') {
      sendYuliMessage(MESSAGES.faqBonus);
      setHasAnsweredQuestion(true);
      setTimeout(() => {
        sendYuliMessage("Los bonos terminan HOY. ¿Accedemos ahora? 🎁");
        setLastQuestionType('close');
      }, 4000);
      return;
    }

    // Flujo de compra - SOLO ENVIAR LINK cuando el usuario PIDE COMPRAR
    if (intent === 'purchase') {
      sendYuliMessage(MESSAGES.purchaseLink);
      setHasAnsweredQuestion(false); // No seguir intentando cerrar después de enviar el link
      return;
    }

    // Lógica por fases
    if (currentPhase === 1) {
      // Respuesta afirmativa al saludo inicial
      if (lowerText.includes('sí') || lowerText.includes('si') || lowerText.includes('claro') || lowerText.includes('bueno')) {
        setCurrentPhase(2);
        sendYuliMessage(MESSAGES.motivationQuestion);
      } else if (lowerText.includes('no')) {
        sendYuliMessage(MESSAGES.followUp60s);
        setHasShownFollowUp(true);
      }
    } else if (currentPhase === 2) {
      // Pregunta de motivación
      if (!userContext.motivation) {
        if (lowerText.includes('familia') || lowerText.includes('casa') || lowerText.includes('preparar')) {
          setUserContext(prev => ({ ...prev, motivation: 'family' }));
          sendYuliMessage(MESSAGES.motivationFamily);
          setTimeout(() => sendYuliMessage(MESSAGES.doubtQuestion), 4000);
        } else if (lowerText.includes('negocio') || lowerText.includes('vender') || lowerText.includes('dinero') || lowerText.includes('emprender')) {
          setUserContext(prev => ({ ...prev, motivation: 'business' }));
          sendYuliMessage(MESSAGES.motivationBusiness);
          setTimeout(() => sendYuliMessage(MESSAGES.doubtQuestion), 4000);
        }
      } else if (!userContext.doubt) {
        // Pregunta de dudas
        if (lowerText.includes('fácil') || lowerText.includes('facil') || lowerText.includes('difícil') || lowerText.includes('dificil') || lowerText.includes('receta')) {
          setUserContext(prev => ({ ...prev, doubt: 'easy' }));
          sendYuliMessage(MESSAGES.doubtEasy);
          setTimeout(() => sendYuliMessage(MESSAGES.bonusQuestion), 4000);
        } else if (lowerText.includes('precio') || lowerText.includes('costo') || lowerText.includes('cuánto') || lowerText.includes('cuanto')) {
          setUserContext(prev => ({ ...prev, doubt: 'price' }));
          sendYuliMessage(MESSAGES.doubtPrice);
          setTimeout(() => sendYuliMessage(MESSAGES.bonusQuestion), 4000);
        }
      } else if (!userContext.shownBonus) {
        // Pregunta de bonos
        if (lowerText.includes('sí') || lowerText.includes('si') || lowerText.includes('claro') || lowerText.includes('cuenta')) {
          setUserContext(prev => ({ ...prev, shownBonus: true }));
          setCurrentPhase(3);
          sendYuliMessage(MESSAGES.bonusList);
          setTimeout(() => {
            sendYuliMessage(MESSAGES.urgencyClose);
            setLastQuestionType('close'); // Marcar como pregunta de cierre
          }, 5000);
        }
      }
    }
  };

  // Enviar mensaje del usuario
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setLastUserMessageTime(new Date());
    setHasInteracted(true);

    processUserResponse(inputValue);

    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Audio para notificaciones */}
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE" preload="auto" />

      {/* Botón flotante con efecto de pulso - Responsive */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-3 right-3 md:bottom-8 md:right-8 z-[60]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              delay: 0.5,
              type: 'spring',
              stiffness: 260,
              damping: 20
            }}
          >
            {/* Efecto de pulso animado */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-ping opacity-75" />

            <motion.button
              whileHover={{ scale: 1.1, shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenChat}
              className="relative bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 md:p-5 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300"
              aria-label="Abrir chat"
            >
              <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />

              {/* Badge de notificación */}
              <AnimatePresence>
                {showBadge && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center font-bold border-2 border-white"
                  >
                    !
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ventana de chat - Responsive */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20
            }}
            className="fixed bottom-16 right-3 w-[90vw] sm:w-[85vw] md:bottom-32 md:right-8 md:w-full md:max-w-md z-[55] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden border border-gray-200"
            style={{ maxHeight: 'calc(100vh - 80px)', height: 'auto' }}
          >
            {/* Header - Responsive */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 md:p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="relative">
                  <img
                    src="/img/yuli.jpeg"
                    alt="Yuli"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white object-cover"
                    onError={(e) => {
                      // Fallback si la imagen no carga
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  {/* Avatar fallback con inicial */}
                  <div className="hidden w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-gradient-to-br from-pink-400 to-rose-400 items-center justify-center">
                    <span className="text-white font-bold text-lg md:text-xl">Y</span>
                  </div>
                  {/* Indicador "en línea" */}
                  <motion.div
                    className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </div>
                <div className="text-white">
                  <h3 className="font-bold text-base md:text-lg">Yuli</h3>
                  <div className="flex items-center gap-1.5 text-xs md:text-sm opacity-90">
                    <motion.div
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                    <span>En línea</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseChat}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                aria-label="Cerrar chat"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mensajes - Responsive */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gray-50" style={{ minHeight: '200px', maxHeight: '60vh' }}>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1
                  }}
                  className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'yuli' && (
                    <img
                      src="/img/yuli.jpeg"
                      alt="Yuli"
                      className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-gray-200 object-cover flex-shrink-0 self-end"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  )}
                  {/* Avatar fallback para mensajes */}
                  {message.sender === 'yuli' && (
                    <div className="hidden w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-gray-200 bg-gradient-to-br from-pink-400 to-rose-400 items-center justify-center flex-shrink-0 self-end">
                      <span className="text-white font-bold text-xs">Y</span>
                    </div>
                  )}
                  <div className="flex flex-col max-w-[85%] md:max-w-[75%]">
                    <div
                      className={`px-3 py-2 md:px-4 md:py-3 rounded-2xl whitespace-pre-line ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-tr-none shadow-sm'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
                      }`}
                    >
                      <p className="text-xs md:text-sm leading-relaxed break-words">{message.text}</p>
                    </div>
                    {/* Timestamp */}
                    <span className={`text-[10px] md:text-xs text-gray-500 mt-1 px-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Indicador de escritura - Responsive */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 justify-start"
                >
                  <img
                    src="/img/yuli.jpeg"
                    alt="Yuli"
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-gray-200 object-cover flex-shrink-0 self-end"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-gray-200 bg-gradient-to-br from-pink-400 to-rose-400 items-center justify-center flex-shrink-0 self-end">
                    <span className="text-white font-bold text-xs">Y</span>
                  </div>
                  <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input - Responsive */}
            <div className="p-2 md:p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-1.5 md:gap-2 items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all text-gray-900"
                />
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-2 md:p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
                  aria-label="Enviar mensaje"
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                </motion.button>
              </div>

              {/* Mensaje informativo solo en desktop */}
              <p className="hidden md:block text-xs text-gray-500 text-center mt-3">
                Presiona Enter para enviar
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatYuli;
