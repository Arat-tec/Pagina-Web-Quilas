# Plan: Landing page para hotel en la Huasteca Potosina

## Resumen

Página web de una sola vista (single-page) para promocionar un hotel en la Huasteca Potosina. Sin login, sin backend — únicamente presentación y promoción del negocio. Estilo visual "fresco natural": verdes, orgánico, relajado, evocando la selva y los paisajes de la región.

## Decisiones de diseño

- **Paleta** (basada en la selección del usuario): verde profundo `#14532d`, verde vivo `#16a34a`, verde menta `#dcfce7`, crema natural `#f7fee7`.
- **Tipografía**: Sans-serif acogedora y legible (cuerpo) + serif orgánica para títulos (sensación natural/hotelera). Se cargan vía `<link>` en `__root.tsx`.
- **Tono**: Cálido, cercano, inspirador — resalta la naturaleza, el descanso y la aventura de la Huasteca.
- **Imágenes**: Se generarán con el generador de imágenes: hero de paisaje selvático con cabañas/Hotel, y 2-3 imágenes para la sección de servicios (alberca/habitación/restaurant). Estilo fotográfico realista, verde y luminoso.
- **Fondo**: Tonos crema/menta suaves, con secciones alternando para ritmo visual.

## Estructura de la página (src/routes/index.tsx)

Single-page con navegación por anclas (`#servicios`, `#nosotros`, `#contacto`):

1. **Navbar** (sticky, translúcido)
   - Logo/nombre del hotel
   - Enlaces de navegación: Inicio, Servicios, Nosotros, Contacto
   - Botón "Reservar" (WhatsApp)

2. **Hero** (pantalla completa con imagen de fondo generada)
   - Título grande: nombre/lema del hotel
   - Subtítulo: propuesta de valor (descanso en la naturaleza de la Huasteca)
   - Botón "Reservar por WhatsApp" + "Ver servicios"

3. **Servicios** (`#servicios`)
   - Grid de tarjetas con íconos: Habitaciones, Alberca, Restaurante, Tours, Estacionamiento, WiFi
   - 2-3 imágenes generadas de apoyo

4. **Sobre nosotros** (`#nosotros`)
   - Texto: historia y misión del hotel, ubicación privilegiada cerca de cascadas (Cascadas de Tamul, Puente de Dios, etc.)
   - Imagen lateral

5. **Contacto y ubicación** (`#contacto`)
   - Tarjeta de contacto: teléfono, WhatsApp (link `wa.me`), Facebook, dirección
   - Mapa de Google embebido (iframe) centrado en la Huasteca Potosina
   - Botón grande de WhatsApp

6. **Footer**
   - Nombre, redes, copyright, repetir enlaces rápidos

## Implementación técnica

- **Un solo archivo de contenido**: `src/routes/index.tsx` (single-page con secciones y anclas). No se crean rutas adicionales.
- **SEO**: `head()` propio en `index.tsx` con título único, meta description, og:title, og:description, og:type=website, twitter:card. `og:image` apuntando a la URL absoluta del hero generado.
- **Tokens de color**: se amplían los tokens en `src/styles.css` (paleta verde natural) respetando oklch y el sistema shadcn existente.
- **Fuentes**: se cargan en `__root.tsx` con `<link>` de Google Fonts.
- **Navbar**: reactivo con scroll, menú hamburguesa en móvil (sin librerías externas, estado local).
- **Imágenes**: generadas a `src/assets/` e importadas como módulos ES6.
- **Sin backend**: todo es estático; los links de contacto son `tel:`, `https://wa.me/`, y `https://facebook.com/`.

## Contenido placeholder a confirmar

Estos valores se llenarán con datos reales que el usuario debe proporcionar (se usan placeholders claros mientras tanto):
- Nombre del hotel
- Teléfono y número de WhatsApp
- Dirección exacta
- URL de Facebook
- Texto de "Sobre nosotros"

## Tareas

1. Ampliar tokens de color en `src/styles.css` (paleta verde natural, oklch).
2. Agregar fuentes (Google Fonts) en `__root.tsx` (`<link>` en head).
3. Generar imágenes (hero + 2-3 de servicios) con el generador de imágenes.
4. Crear componentes pequeños en `src/components/` (Navbar, Hero, Servicios, Nosotros, Contacto, Footer) — mantener index.tsx limpio.
5. Implementar `src/routes/index.tsx` ensamblando las secciones con navegación por anclas.
6. Configurar `head()` con SEO completo y `og:image`.
7. Verificar build y preview.

## Notas

- No se habilita Lovable Cloud (no hay login, ni base de datos, ni backend).
- El usuario deberá reemplazar los placeholders de contacto con sus datos reales antes de publicar.
