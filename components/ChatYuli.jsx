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
  doubtPrice: "Entiendo totalmente. Mira, el ebook cuesta solo $15 USD (pago único), pero el valor real que recibes es muchísimo mayor: más de 20 recetas profesionales, 5 bonos extras, actualizaciones gratis de por vida, y acceso inmediato. Es menos que el costo de UNA torta en pastelería, pero obtienes conocimiento para toda la vida.",

  bonusQuestion: "¿Quieres que te cuente los 5 BONOS 🎁 que vienen si accedes hoy?",
  bonusList: `¡Claro! Aquí están los 5 BONOS EXCLUSIVOS que recibes HOY:

🎁 BONO 1: Guía de Decoración Profesional - Aprende técnicas de pastelería para que tus postres luzcan de revista

🎁 BONO 2: 10 Recetas Express (menos de 30 min) - Para cuando tienes poco tiempo pero quieres impresionar

🎁 BONO 3: Calculadora de Costos y Precios - Si quieres vender, sabrás exactamente cuánto cobrar para tener ganancias

🎁 BONO 4: Videos Paso a Paso - Para que no te pierdas ningún detalle

🎁 BONO 5: Grupo Privado VIP en Telegram - Soporte, recetas nuevas cada mes y una comunidad increíble

Todos estos bonos son GRATIS si accedes hoy. Mañana solo estará disponible el ebook base.`,

  // FASE 3
  urgencyClose: `¡Es el momento! 🚀 Por solo $15 USD (pago único), obtienes:

✅ Acceso de por vida al ebook completo
✅ Más de 20 recetas navideñas profesionales
✅ Los 5 BONOS que te mencioné
✅ Actualizaciones gratis para siempre
✅ Acceso INMEDIATO (lo recibes en tu email en menos de 2 minutos)
✅ Garantía de 7 días (si no te gusta, te devolvemos el dinero)

¿Lista para endulzar tu Navidad y tu futuro?`,

  purchaseLink: "🎉 ¡Perfecto! Aquí está tu enlace de compra seguro (Hotmart):\n\n👉 https://go.hotmart.com/N102903996I?ap=9dde\n\nEl pago es 100% seguro y recibirás el ebook en tu email inmediatamente. ¡Nos vemos del otro lado! 🎄✨",

  // FAQ
  faqHowToBuy: "¡Es súper fácil! 💳 Solo haz clic en el enlace de compra, completa tus datos de pago (aceptamos tarjetas y otros métodos), y listo. Recibirás el acceso inmediato en tu email. Todo el proceso es seguro a través de Hotmart. ¿Te gustaría que te envíe el enlace ahora?",
  faqPayment: "Aceptamos todos los métodos de pago 💳: tarjetas de crédito/débito, PayPal, transferencia bancaria y más. El pago es procesado por Hotmart, una plataforma 100% segura. Además, tienes garantía de 7 días: si no te gusta, te devolvemos tu dinero sin preguntas.",
  faqWorks: "¡Así funciona! Después de tu pago, recibes un email instantáneo con tu acceso al ebook en formato PDF descargable. Puedes verlo en tu celular, tablet o computadora. Las recetas están paso a paso con fotos y videos. Empiezas cuando quieras, es tuyo para siempre.",
  faqPrice: "El precio es de $15 USD (pago único). No hay cargos mensuales ni costos ocultos. Pagas una vez y es tuyo de por vida, incluyendo todas las actualizaciones futuras. Es menos que el costo de UNA torta en pastelería, pero obtienes conocimiento para toda la vida.",
  faqBonus: "¡Los 5 bonos son increíbles! Incluyen: Guía de Decoración Profesional, 10 Recetas Express, Calculadora de Costos para vender, Videos Paso a Paso, y acceso al Grupo VIP en Telegram. Todo GRATIS si accedes hoy. ¿Quieres que te dé más detalles de cada uno?",
  faqBeginner: "¡Este ebook está hecho ESPECIALMENTE para principiantes! 🌟 No necesitas experiencia previa. Cada receta tiene instrucciones paso a paso con fotos, videos explicativos, y una sección de solución de problemas. Si nunca has cocinado, este es perfecto para empezar.",

  // NUEVAS FAQ COMPLETAS
  faqFormat: "Es un **Ebook Digital** en formato PDF descargable 📱💻. No es un curso con videos largos. Son recetas paso a paso con fotos, instrucciones claras y videos cortos de apoyo. Lo descargas y es tuyo para siempre, sin necesidad de internet después.",
  faqCourseOrEbook: "Es un **Ebook Digital Completo**, no un curso. 📚 Incluye más de 20 recetas navideñas paso a paso con fotos, videos explicativos cortos, guías de decoración, calculadora de costos, y acceso al grupo VIP. Lo mejor: es tuyo para siempre, lo descargas y lo usas cuando quieras.",
  faqGuarantee: "¡Sí! Tienes **Garantía Total de 7 días** 🛡️. Si por cualquier motivo no te gusta el ebook, solo escribes a soporte y te devolvemos el 100% de tu dinero, sin preguntas. Es una compra sin riesgo.",
  faqDelivery: "¡El acceso a la plataforma se envía vía EMAIL una vez realizado el pago! ⚡ En menos de 2 minutos después de tu compra, recibes un correo electrónico con tu link de acceso al ebook. No es un envío físico, es 100% digital. Lo descargas en tu celular, tablet o computadora y empiezas de inmediato. ¡Sin esperas!",
  faqAccess: "Después de comprar recibes un email con tu link de acceso. Desde ahí descargas el ebook en PDF y todos los bonos. Es tuyo para siempre, puedes descargarlo las veces que quieras. También recibes acceso al grupo VIP de Telegram.",
  faqEquipment: "¡No necesitas nada especial! 🏠 Solo utensilios básicos de cocina que ya tienes en casa: bowls, batidora (o puedes batir a mano), horno, y algunos moldes. Todas las recetas están diseñadas para cocinas caseras normales, sin equipamiento profesional.",
  faqSell: "¡Por supuesto! 💰 Muchas de nuestras clientas usan estas recetas para vender. Incluimos un BONO especial: Calculadora de Costos y Precios, para que sepas exactamente cuánto cobrar y tener buenas ganancias. Los postres navideños se venden muy bien.",
  faqUpdates: "Sí, recibes **actualizaciones GRATIS de por vida** 🎁. Cuando agreguemos nuevas recetas o contenido, lo recibes automáticamente sin costo extra. Es una inversión única que crece con el tiempo.",
  faqTime: "¡Puedes empezar HOY MISMO! 🚀 Las recetas tienen diferentes tiempos: tenemos recetas express de 30 minutos y otras más elaboradas de 2-3 horas. Tú decides cuál hacer según tu tiempo disponible.",
  faqIngredients: "Los ingredientes son fáciles de conseguir en cualquier supermercado 🛒. Nada raro ni costoso. Además, cada receta incluye alternativas por si no encuentras algo específico. Todo está pensado para que sea accesible.",
  faqDifficult: "¡Para nada! Están diseñadas específicamente para principiantes 👩‍🍳. Cada paso está explicado con fotos y videos. Tenemos una sección de 'Solución de problemas' para evitar errores comunes. Si es tu primera vez, este ebook es perfecto.",
  faqSupport: "Tienes soporte completo: un grupo privado VIP en Telegram donde estamos para ayudarte, resolver dudas y compartir tips. Además, tienes acceso directo a soporte técnico por email. ¡No estás sola en esto!",

  // MENSAJES DE CIERRE
  closeAttempt1: "Entiendo que necesites pensarlo 😊. Solo te recuerdo que los 5 BONOS EXTRAS (valorados en $97) solo están disponibles HOY. Mañana el precio aumenta y pierdes los bonos. ¿Hay algo específico que te gustaría saber antes de decidir?",
  closeAttempt2: "¡No dejes pasar esta oportunidad! 🎄 Por solo $15 obtienes todo lo necesario para brillar esta Navidad. Tienes garantía de 7 días sin riesgo. ¿Qué te detiene? ¿Es el precio, las recetas, o alguna otra duda?",
  closeAttempt3: "Última llamada 🔔. En este momento hay 47 personas viendo esta oferta. Los bonos gratis se acaban HOY a las 23:59. ¿Lista para asegurar tu acceso ahora?",
  closeFinal: "Entiendo tu decisión. Solo déjame decirte que esta oferta especial con los 5 bonos gratis termina hoy. Si cambias de opinión, aquí está el enlace: https://go.hotmart.com/N102903996I?ap=9dde\n\n¡Felices Fiestas! 🎄✨",

  // MANEJO DE OBJECIONES
  objectionExpensive: "Entiendo tu preocupación por el precio 💰. Déjame ponértelo así: son solo $15 (menos que 2 cafés ☕). Con una SOLA receta que vendas, ya recuperaste tu inversión. Además, tienes garantía de 7 días. Si no te gusta, te devuelven TODO. Es una inversión sin riesgo. ¿Qué dices?",
  objectionNoTime: "¡Te entiendo perfectamente! Por eso incluimos recetas EXPRESS de 30 minutos ⚡. No necesitas horas en la cocina. Además, el ebook es tuyo para siempre, lo usas cuando puedas. ¿Vemos cómo empezar con las recetas rápidas?",
  objectionCantCook: "¡Esa es exactamente la razón por la que creamos este ebook! 👩‍🍳 Está diseñado para principiantes TOTAL. Cada paso tiene fotos, videos explicativos, y tips para no fallar. Si nunca has cocinado, este es perfecto para empezar. ¿Probamos?",
  objectionThinking: "Claro, tómate tu tiempo para pensarlo 💭. Solo ten en cuenta que los 5 BONOS GRATIS (valorados en $97) terminan HOY. Mañana solo estará el ebook básico a precio normal. ¿Hay algo específico que te ayudaría a decidir?",
  objectionNotSure: "Es normal tener dudas 🤔. ¿Qué es lo que más te preocupa? ¿El precio? ¿Si las recetas funcionan? ¿El nivel de dificultad? Cuéntame y te ayudo a resolver esa duda. Además, recuerda que tienes garantía de 7 días sin riesgo.",
  objectionLater: "Te entiendo, todos estamos ocupados ⏰. Pero mira, los 5 bonos gratis terminan HOY. Si lo dejas para después, perderás $97 en bonos extras. Son solo 2 minutos para asegurar tu acceso. ¿Qué tal si accedes ahora y lo revisas cuando tengas tiempo?",
  objectionNoMoney: "Entiendo completamente 💸. Pero piénsalo así: con solo vender 2-3 postres ya recuperas la inversión. Y el ebook es tuyo PARA SIEMPRE. Puedes empezar cuando tengas más liquidez, pero los bonos gratis terminan HOY. ¿Aseguramos tu acceso con los bonos?",
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

  // OBJECIONES
  objectionExpensive: ['caro', 'costoso', 'mucho dinero', 'muy caro', 'es mucho'],
  objectionNoTime: ['no tengo tiempo', 'sin tiempo', 'ocupada', 'ocupado', 'mucho trabajo'],
  objectionCantCook: ['no sé cocinar', 'no se cocinar', 'nunca cociné', 'nunca cocine', 'no cocino'],
  objectionThinking: ['lo voy a pensar', 'lo pensaré', 'lo pensare', 'déjame pensar', 'dejame pensar'],
  objectionNotSure: ['no estoy segura', 'no estoy seguro', 'tengo dudas', 'no sé', 'no se'],
  objectionLater: ['más tarde', 'mas tarde', 'después', 'despues', 'luego', 'otro día', 'otro dia'],
  objectionNoMoney: ['no tengo dinero', 'sin dinero', 'no puedo pagar', 'no tengo plata', 'sin plata'],
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
  const [lastQuestionType, setLastQuestionType] = useState(null); // Para trackear preguntas de cierre
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
  };

  // Abrir chat automáticamente al cargar y enviar primer mensaje
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      sendYuliMessage(MESSAGES.greetingInitial);
    }, 1000);

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

  // Enviar mensaje de Yuli con delay y animación
  const sendYuliMessage = (text, delay = null) => {
    const randomDelay = delay || Math.random() * 1000 + 3000; // 3-4 segundos

    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        text,
        sender: 'yuli',
        timestamp: new Date()
      }]);
      setIsTyping(false);
      setLastBotMessageTime(new Date());
      playNotificationSound();
    }, randomDelay);
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

      {/* Botón flotante - Responsive */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 sm:p-4 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300"
            style={{ minWidth: '56px', minHeight: '56px' }}
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            <motion.div
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center font-bold"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              1
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ventana de chat - Responsive */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 right-0 left-0 sm:bottom-6 sm:right-6 sm:left-auto z-50 w-full sm:w-[400px] md:w-[420px] h-[100dvh] sm:h-[85vh] sm:max-h-[650px] bg-white sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border-t sm:border border-gray-200"
          >
            {/* Header - Responsive */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 sm:p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3 sm:gap-3">
                <div className="relative">
                  <img
                    src="/img/yuli.jpeg"
                    alt="Yuli"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 w-3 h-3 sm:w-3 sm:h-3 bg-green-400 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </div>
                <div className="text-white">
                  <h3 className="font-bold text-base sm:text-lg leading-tight">Yuli</h3>
                  <p className="text-xs sm:text-xs opacity-90 leading-tight">Asistente Comercial</p>
                </div>
              </div>
              <button
                onClick={handleCloseChat}
                className="text-white hover:bg-white/20 rounded-full p-2 sm:p-2 transition-colors active:bg-white/30"
                style={{ minWidth: '40px', minHeight: '40px' }}
                aria-label="Cerrar chat"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Mensajes - Responsive */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-4 space-y-4 sm:space-y-4 bg-gradient-to-b from-gray-50 to-white chat-messages">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'yuli' && (
                    <img
                      src="/img/yuli.jpeg"
                      alt="Yuli"
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-1.5 sm:mr-2 object-cover flex-shrink-0 self-end"
                    />
                  )}
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-3 sm:p-3.5 rounded-2xl whitespace-pre-line ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-br-none shadow-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="text-sm sm:text-sm leading-relaxed break-words">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Indicador de escritura - Responsive */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <img
                    src="/img/yuli.jpeg"
                    alt="Yuli"
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-1.5 sm:mr-2 object-cover flex-shrink-0 self-end"
                  />
                  <div className="bg-gray-100 p-2.5 sm:p-3 rounded-2xl rounded-bl-none">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"
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
            <div className="p-3 sm:p-4 border-t border-gray-200 bg-white safe-area-bottom">
              <div className="flex gap-2 sm:gap-3 items-end">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-4 sm:px-4 py-3 sm:py-2.5 text-base sm:text-base border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                  style={{ minHeight: '44px' }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3 sm:p-3 rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <Send className="w-5 h-5 sm:w-5 sm:h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatYuli;
