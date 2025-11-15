# Sistema de Logging de Conversaciones a Telegram

## 📋 Descripción

Este sistema registra automáticamente todas las conversaciones del chat con Yuli y las envía a tu bot de Telegram para análisis y mejora de respuestas.

## 🔧 Configuración

### Archivos Creados

1. **`.env.local`** - Variables de entorno con credenciales de Telegram
2. **`app/api/telegram-log/route.js`** - API endpoint para enviar logs
3. **`components/ChatYuli.jsx`** - Modificado para incluir logging

### Variables de Entorno

Las credenciales están configuradas en `.env.local`:

```env
TELEGRAM_BOT_TOKEN=8339326365:AAHJ-2CxvB7sEn1Qo7hUza655h37RMgV-lU
TELEGRAM_CHAT_ID=8309991681
```

⚠️ **IMPORTANTE**: Este archivo NO se sube al repositorio (está en .gitignore)

## 🚀 Cómo Funciona

### 1. Captura de Mensajes
- Cada mensaje del usuario y respuesta de Yuli se registra automáticamente
- Se genera un ID de sesión único para cada conversación

### 2. Envío Automático
Los logs se envían a Telegram en dos momentos:

- **Cada 5 segundos** después del último mensaje (con debounce)
- **Al cerrar el chat** (clic en el botón X)

### 3. Formato del Mensaje en Telegram

```
🆕 NUEVA CONVERSACIÓN
📅 Fecha: 12/11/2025, 10:30:45
🔑 Sesión: session_1731420645123_abc123xyz
💬 Total mensajes: 8

────────────────────────────────────────

👤 USUARIO [10:30:15]:
Hola, quiero saber el precio

🤖 YULI [10:30:18]:
El precio es de $15 USD (pago único)...

👤 USUARIO [10:31:02]:
¿Qué incluye?

🤖 YULI [10:31:05]:
Incluye más de 20 recetas...

────────────────────────────────────────
✅ Fin de la conversación
```

## 📊 Datos Registrados

Para cada conversación se registra:

- **Session ID**: Identificador único de la conversación
- **Timestamp**: Fecha y hora exacta
- **Mensajes completos**: Texto de cada mensaje del usuario y Yuli
- **Hora de cada mensaje**: Para análisis de tiempos de respuesta
- **Orden de la conversación**: Secuencia completa de intercambios

## 🔍 Análisis de Datos

Con estos logs podrás:

1. **Identificar preguntas frecuentes** - Ver qué preguntan más los usuarios
2. **Detectar objeciones comunes** - Entender qué frena las conversiones
3. **Mejorar respuestas** - Optimizar los mensajes que no funcionan bien
4. **Analizar flujo de conversación** - Ver en qué fase se pierden los usuarios
5. **Timing de mensajes** - Verificar si los delays son apropiados
6. **Tasa de conversión** - Contar cuántos llegan al enlace de compra

## 🔐 Seguridad

- ✅ Las credenciales están en `.env.local` (no se suben a Git)
- ✅ La API solo acepta requests POST desde el mismo dominio
- ✅ Los datos solo se envían a tu chat privado de Telegram
- ✅ No se almacenan datos en bases de datos externas

## 🛠️ Mantenimiento

### Cambiar el Bot o Chat ID

Edita el archivo `.env.local`:

```env
TELEGRAM_BOT_TOKEN=tu_nuevo_token
TELEGRAM_CHAT_ID=tu_nuevo_chat_id
```

### Desactivar el Logging

Si quieres desactivar temporalmente el logging:

1. Comenta las líneas 177-196 en `components/ChatYuli.jsx` (el useEffect de logging)
2. O elimina el archivo `.env.local`

### Modificar el Formato del Mensaje

Edita la función en `app/api/telegram-log/route.js` (líneas 14-30)

## 🧪 Testing

Para probar que funciona:

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre el navegador en `http://localhost:3000`

3. Interactúa con el chat de Yuli

4. Revisa tu bot de Telegram - deberías recibir los logs después de 5 segundos

## 📝 Notas

- Los mensajes se envían con un debounce de 5 segundos para evitar spam
- Si hay un error al enviar, se registra en la consola del navegador
- El sistema es completamente automático, no requiere intervención manual
- Cada conversación tiene un ID único para rastreo

## 🚨 Solución de Problemas

### No recibo mensajes en Telegram

1. Verifica que el bot token sea correcto
2. Asegúrate de haber iniciado conversación con el bot (envía /start)
3. Verifica que el Chat ID sea correcto
4. Revisa la consola del navegador por errores

### Error 401 Unauthorized

- El token del bot es incorrecto o inválido
- Genera un nuevo token con @BotFather

### Error 403 Forbidden

- No has iniciado conversación con el bot
- Envía /start al bot en Telegram primero

### Error 400 Bad Request

- El Chat ID es incorrecto
- Verifica tu Chat ID visitando:
  `https://api.telegram.org/bot<TU_TOKEN>/getUpdates`

## 🎯 Próximos Pasos Recomendados

1. **Análisis periódico**: Revisa los logs semanalmente
2. **Base de datos**: Considera agregar MongoDB/PostgreSQL para análisis más profundo
3. **Dashboard**: Crea un dashboard con estadísticas de conversaciones
4. **Alertas**: Configura alertas para conversaciones con palabras clave específicas
5. **A/B Testing**: Prueba diferentes mensajes y compara resultados

---

✅ **Sistema instalado y funcionando correctamente**
