# Landing Page - Recetas Navideñas 🎄

Landing page moderna y de alta conversión para ebook de recetas navideñas, construida con Next.js 15, TypeScript, Tailwind CSS y Framer Motion.

## 🚀 Características

- ✨ **Diseño moderno** con gradientes, glassmorphism y micro-interacciones
- 📱 **Totalmente responsivo** con diseño mobile-first
- ⚡ **Optimizado para conversión** con múltiples CTAs estratégicamente ubicados
- 🎨 **Animaciones suaves** con Framer Motion
- 🔍 **SEO optimizado** con metadatos completos
- ⚡ **Rendimiento optimizado** con Next.js 15
- 🎯 **Múltiples secciones**: Hero, Problema/Solución, Beneficios, Precio, FAQ, Testimonios, etc.

## 📋 Tecnologías Utilizadas

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Fonts**: Google Fonts (Geist)

## 🛠️ Instalación

1. Navega al directorio del proyecto:
```bash
cd landing-page
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
landing-page/
├── app/
│   ├── layout.tsx          # Layout principal con metadatos SEO
│   ├── page.tsx             # Página principal con todas las secciones
│   └── globals.css          # Estilos globales y animaciones
├── components/
│   ├── Button.tsx           # Componente de botón CTA reutilizable
│   └── FAQ.tsx              # Componente de preguntas frecuentes
├── public/                  # Archivos estáticos
└── README.md
```

## 🎨 Secciones de la Landing Page

1. **Hero Section**: Título principal, subtítulo y CTA destacado
2. **Problema/Solución**: Preguntas que identifican al público objetivo
3. **Por qué es diferente**: Propuesta de valor única
4. **¿Qué vas a aprender?**: Descripción del contenido
5. **Beneficios**: Lista de ventajas del producto
6. **Precio**: Sección destacada con el precio y descuento
7. **Bonos**: Regalos incluidos con la compra
8. **Testimonios**: Prueba social de clientes satisfechos
9. **Resumen**: Recapitulación de todo lo incluido
10. **FAQ**: Preguntas frecuentes con acordeón interactivo
11. **CTA Final**: Última llamada a la acción
12. **Footer**: Información de copyright

## 🔗 Configuración de CTAs

Todos los botones de llamada a la acción (CTA) están configurados para redirigir a:
```
https://go.hotmart.com/N102903996I?ap=9dde
```

Para cambiar el enlace, edita la constante `CTA_LINK` en `app/page.tsx`:

```typescript
const CTA_LINK = 'https://tu-enlace-aqui.com';
```

## 🎯 Optimización SEO

La landing page incluye:
- Metadatos completos (título, descripción, keywords)
- Open Graph tags para redes sociales
- Twitter Card tags
- Configuración de robots para indexación
- Idioma configurado en español (es)

Para personalizar, edita los metadatos en `app/layout.tsx`.

## 🎨 Personalización de Colores

La paleta de colores principal usa:
- **Rosa**: `from-pink-400 to-pink-500`
- **Teal/Verde azulado**: `from-teal-300 to-emerald-300`

Para cambiar los colores, edita las clases de Tailwind en los componentes.

## 📱 Responsive Design

La landing page está optimizada para:
- 📱 **Mobile**: < 768px
- 💻 **Tablet**: 768px - 1024px
- 🖥️ **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recomendado)

1. Sube tu código a GitHub
2. Conecta tu repositorio con Vercel
3. Vercel detectará automáticamente Next.js y configurará el build
4. ¡Listo!

### Otros Servicios

```bash
# Build de producción
npm run build

# Iniciar servidor de producción
npm start
```

## 📝 Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Crea el build de producción
npm start        # Inicia el servidor de producción
npm run lint     # Ejecuta el linter
```

## 🎯 Mejoras Futuras Sugeridas

- [ ] Agregar Google Analytics
- [ ] Implementar pixel de Facebook
- [ ] Agregar más testimonios reales
- [ ] Incluir galería de imágenes de recetas
- [ ] Agregar video promocional
- [ ] Implementar chat en vivo
- [ ] A/B testing de headlines
- [ ] Agregar contador de urgencia

## 📄 Licencia

Este proyecto es privado y confidencial.

## 🤝 Soporte

Para cualquier consulta o soporte, contacta al desarrollador.

---

**Desarrollado con ❤️ usando Next.js 15 y Tailwind CSS**
