# ChatYuli - Asistente Comercial Digital

## Características Implementadas

### 1. Diseño y UX
- ✅ Burbuja flotante en esquina inferior derecha tipo Messenger
- ✅ Se abre automáticamente 1 segundo después de cargar la página
- ✅ Avatar de Yuli visible (/public/img/yuli.jpeg)
- ✅ Animaciones suaves con Framer Motion
- ✅ Indicador de estado "en línea" animado
- ✅ Badge de notificación con animación pulsante

### 2. Simulación Humana
- ✅ Retardo aleatorio entre 3-4 segundos en cada respuesta
- ✅ Indicador de "escribiendo..." con 3 puntos animados
- ✅ Sonido de notificación al recibir mensaje de Yuli
- ✅ Scroll automático al último mensaje

### 3. Flujo de Conversación (3 Fases)

#### FASE 1: Saludo y Captación
- Mensaje inicial automático al abrir
- Timer de 60 segundos para mensaje de seguimiento si no hay respuesta
- Detección de respuestas afirmativas/negativas

#### FASE 2: Beneficios y Dudas
- Pregunta sobre motivación (familia vs negocio)
- Respuestas personalizadas según elección
- Pregunta sobre dudas (facilidad vs precio)
- Oferta de 5 bonos exclusivos

#### FASE 3: Cierre
- Mensaje con urgencia y beneficios completos
- Detección automática de intención de compra
- Envío automático del enlace de Hotmart

### 4. FAQ Automático
El chat detecta palabras clave y responde automáticamente:

| Palabras Clave | Respuesta |
|----------------|-----------|
| "cómo compro", "cómo comprar" | Explicación del proceso de compra |
| "pago", "tarjeta", "paypal" | Métodos de pago aceptados |
| "funciona", "cómo funciona" | Explicación de cómo funciona el ebook |
| "precio", "costo", "cuánto" | Información sobre el precio |
| "bonos", "regalos", "extras" | Lista de bonos incluidos |
| "principiante", "primera vez", "fácil" | Aseguramiento para principiantes |
| "comprar", "acceder", "sí", "quiero" | Envío del enlace de compra |

### 5. Almacenamiento Local
- Estado del chat se mantiene durante la sesión
- Historial de mensajes preservado hasta recargar página
- Context del usuario (motivación, dudas) guardado en estado

## Estructura del Código

```
components/
  └── ChatYuli.jsx
      ├── Estados (useState):
      │   ├── isOpen - Control de visibilidad del chat
      │   ├── messages - Array de mensajes
      │   ├── inputValue - Valor del input
      │   ├── isTyping - Indicador de escritura
      │   ├── currentPhase - Fase actual del flujo (1, 2, 3)
      │   ├── userContext - Contexto del usuario (motivación, dudas, etc.)
      │   ├── hasShownFollowUp - Control del mensaje de 60s
      │   └── lastUserMessageTime - Timestamp para timer de seguimiento
      │
      ├── Funciones Principales:
      │   ├── sendYuliMessage() - Envía mensaje con delay y animación
      │   ├── detectIntent() - Detecta intención por palabras clave
      │   ├── processUserResponse() - Procesa respuesta y avanza flujo
      │   └── handleSendMessage() - Envía mensaje del usuario
      │
      └── Efectos (useEffect):
          ├── Auto-apertura al cargar
          ├── Timer de 60 segundos
          └── Scroll automático
```

## Uso

### Ya está integrado
El componente ya está importado en `app/layout.tsx`, por lo que estará disponible en todas las páginas automáticamente.

### Personalización

#### Cambiar mensajes:
Edita el objeto `MESSAGES` en `components/ChatYuli.jsx`

#### Agregar nuevas palabras clave:
Edita el objeto `KEYWORDS` en `components/ChatYuli.jsx`

#### Modificar tiempos:
```javascript
// Delay de apertura inicial (línea ~143)
setTimeout(() => { setIsOpen(true); }, 1000); // Cambiar 1000ms

// Timer de seguimiento (línea ~151)
followUpTimerRef.current = setTimeout(() => {...}, 60000); // Cambiar 60000ms

// Delay de respuestas (línea ~180)
const randomDelay = delay || Math.random() * 1000 + 3000; // Cambiar rango
```

#### Cambiar colores:
Busca las clases de Tailwind con `pink-500` y `rose-500` y cámbialas por otros colores.

## Notas Técnicas

### Sonido
El componente incluye un sonido de notificación codificado en base64. Si quieres cambiarlo por uno personalizado:

1. Agrega tu archivo de audio a `public/sounds/notification.mp3`
2. Cambia la línea del audio ref:
```jsx
<audio ref={audioRef} src="/sounds/notification.mp3" preload="auto" />
```

### Imagen de Yuli
Asegúrate de que el archivo `/public/img/yuli.jpeg` exista y sea una imagen cuadrada para mejor visualización.

### Compatibilidad
- ✅ Next.js 16
- ✅ React 19
- ✅ Framer Motion 12
- ✅ TailwindCSS 4

## Mejoras Futuras Opcionales

1. **Persistencia con localStorage**: Guardar historial entre recargas
2. **Backend API**: Conectar con base de datos para analytics
3. **WhatsApp Integration**: Botón para continuar conversación en WhatsApp
4. **A/B Testing**: Diferentes variantes de mensajes
5. **Analytics**: Tracking de conversiones y fases

## Enlace de Compra

El enlace de Hotmart está configurado como:
```
https://go.hotmart.com/N102903996I?ap=9dde
```

Para cambiarlo, edita la línea en `MESSAGES.purchaseLink`.

## Soporte

Para cualquier duda o personalización adicional, consulta la documentación de:
- [Next.js](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
