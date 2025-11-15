import { NextResponse } from 'next/server';

// RUTA DE API DESACTIVADA TEMPORALMENTE - Las conversaciones no se registrarán en Telegram
// export async function POST(request) {
//   try {
//     const { messages, sessionId, timestamp } = await request.json();

//     const botToken = process.env.TELEGRAM_BOT_TOKEN;
//     const chatId = process.env.TELEGRAM_CHAT_ID;

//     if (!botToken || !chatId) {
//       return NextResponse.json(
//         { error: 'Telegram credentials not configured' },
//         { status: 500 }
//       );
//     }

//     // Formatear el mensaje para Telegram
//     let messageText = `🆕 NUEVA CONVERSACIÓN\n`;
//     messageText += `📅 Fecha: ${new Date(timestamp).toLocaleString('es-ES')}\n`;
//     messageText += `🔑 Sesión: ${sessionId}\n`;
//     messageText += `💬 Total mensajes: ${messages.length}\n`;
//     messageText += `\n${'─'.repeat(40)}\n\n`;

//     // Agregar cada mensaje de la conversación
//     messages.forEach((msg, index) => {
//       const emoji = msg.sender === 'user' ? '👤 USUARIO' : '🤖 YULI';
//       const time = new Date(msg.timestamp).toLocaleTimeString('es-ES');
//       messageText += `${emoji} [${time}]:\n${msg.text}\n\n`;
//     });

//     messageText += `${'─'.repeat(40)}\n`;
//     messageText += `✅ Fin de la conversación`;

//     // Enviar a Telegram
//     const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

//     const response = await fetch(telegramApiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         chat_id: chatId,
//         text: messageText,
//         parse_mode: 'HTML',
//       }),
//     });

//     const data = await response.json();

//     if (!data.ok) {
//       console.error('Telegram API error:', data);
//       return NextResponse.json(
//         { error: 'Failed to send message to Telegram', details: data },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ success: true, data });
//   } catch (error) {
//     console.error('Error sending to Telegram:', error);
//     return NextResponse.json(
//       { error: 'Internal server error', details: error.message },
//       { status: 500 }
//     );
//   }
// }
