# Plan: Landing page para Quilas — Hotel en la Huasteca Potosina

## Resumen

Página web de una sola vista (single-page) para promocionar **Quilas**, hotel en Huichihuayán, San Luis Potosí, a 10 minutos del río El Nacimiento y del vado de Huichihuayán, como punto central entre los principales atractivos de la Huasteca Potosina. Diferenciador de marca: un entorno rodeado de naturaleza donde el huésped puede desconectar de la rutina, reconectar consigo mismo y encontrar paz. Sin login, sin backend, sin recolección de correos.

Estilo: "acogedor natural" — verde bosque, orgánico, cálido, relajado.

## Decisiones de diseño

### Paleta (verde bosque + tonos tierra/madera para calidez)

| Color | Hex | Rol |
|---|---|---|
| Verde bosque | `#1F3D2C` | Textos oscuros, navbar, footer (ancla) |
| Verde musgo | `#4B7B5B` | Botones CTA, iconos, acentos |
| Terracota cálida | `#C1694A` | Acento secundario: badges de tiempo, hover, detalles |
| Arena cálida | `#F1E7D6` | Fondo de secciones alternas |
| Blanco cálido | `#FBF8F2` | Fondo principal y tarjetas |
| Café madera | `#4A3728` | Texto secundario, bordes, detalles de footer |

Todos los valores se convierten a `oklch` como tokens semánticos en `src/styles.css`.

### Tipografía
Sans-serif legible (cuerpo) + serif orgánica (títulos), cargadas vía `<link>` en `__root.tsx`.

### Imágenes
- **Hero y habitaciones**: preferir fotografía real del hotel. Mientras no haya material propio, se generan placeholders temporales claramente reemplazables.
- **Atractivos turísticos**: preferir fotografía real de cada sitio (lugares icónicos y reconocibles); banco de imágenes libres de derechos mientras se consigue material propio.
- Formato WebP, `srcset`/tamaños responsivos, lazy loading fuera del primer scroll.

### Logo
Se usan las dos versiones: `logo_negro.png` sobre fondos claros y `logo_blanco.png` sobre fondos oscuros u overlays del hero. Monocromático, combina con la paleta sin recolorear. **Pendiente: los archivos aún no están subidos al proyecto** — hasta entonces se usa el nombre "Quilas" en texto con la tipografía serif.

### Idiomas
Toggle ES/EN en el navbar, con estado local y diccionario simple por sección. Todo el contenido (atractivos, habitaciones, nosotros) existe en ambos idiomas.

### Responsivo (mobile-first)
La mayoría de visitantes llegan desde celular: se construye primero para móvil y se expande a tablet/desktop. Carruseles con swipe táctil, botones con área táctil mínima de 44x44px y separación suficiente, navbar con menú hamburguesa.

## Estructura de la página

Single-page con navegación por anclas: `#habitaciones`, `#atractivos`, `#escapadas`, `#nosotros`, `#contacto`.

### 1. Navbar (sticky, translúcido)
- Logo Quilas (versión según fondo)
- Enlaces: Inicio, Habitaciones, Atractivos, Nosotros, Contacto
- Toggle idioma ES/EN
- Botón "Reservar" (WhatsApp)
- Botón flotante de WhatsApp visible en toda la página (esquina inferior)

### 2. Hero (pantalla completa)
- Título: "Quilas"
- Subtítulo: reconecta contigo y con la naturaleza, en el corazón de la Huasteca Potosina
- Botones: "Reservar por WhatsApp" + "Ver atractivos cercanos"

### 3. Habitaciones (`#habitaciones`)
Carrusel estilo Apple (swipe en móvil, flechas en desktop): una slide por tipo, foto grande + texto al pie.

| Tipo | Camas | Capacidad máxima |
|---|---|---|
| Cabaña | 1 cama matrimonial | 2 adultos + 1 menor de 12 años |
| Habitación Doble | 2 camas matrimoniales | 4 personas |
| Habitación Triple | 3 camas matrimoniales | 6 personas |

Si se consiguen varias fotos por habitación, cada slide puede tener su propio mini-carrusel interno.

### 4. Cercanos (`#atractivos`, menos de 35 minutos)
Carrusel estilo Apple, foto grande + texto explicativo al pie.

| Atractivo | Tiempo | Descripción |
|---|---|---|
| Río El Nacimiento | 10 min | Río de aguas cristalinas turquesa, ideal para nadar; el atractivo más cercano al hotel. |
| Vado de Huichihuayán | 10 min | Zona de río de fácil acceso, perfecta para un chapuzón rápido o día de campo. |
| Sótano de las Huahuas, Aquismón | 20 min | Impresionante caverna natural, famosa por sus loros y guacamayas al atardecer. |
| Las Pozas / Castillo Surrealista de Edward James, Xilitla | 25 min | Jardín escultórico surrealista entre la selva, patrimonio artístico único en el mundo. |
| Museo Leonora Carrington, Xilitla | 25 min | Espacio dedicado a la obra de la artista surrealista, en el corazón del pueblo mágico de Xilitla. |
| Castillo de la Salud "Beto Ramón", Axtla de Terrazas | 25 min | Construcción emblemática de la región, ideal para una parada fotográfica. |

### 5. Un poco más lejos, pero vale la pena (`#escapadas`, 35 min a 1 h 40)

| Atractivo | Tiempo | Descripción |
|---|---|---|
| Río Tambaque | 40 min | Río de aguas color turquesa entre formaciones rocosas, popular para nadar y hacer rappel. |
| Sótano de las Golondrinas, Aquismón | 1 h | Uno de los abismos naturales más profundos del mundo, hogar de miles de golondrinas y vencejos. |
| Puente de Dios, Aquismón | 1 h 30 min | Formación natural con cascadas y pozas turquesa dentro de una cueva semiabierta. |
| Cascadas de Tamasopo | 1 h 30 min | Serie de caídas de agua entre pozas naturales ideales para nadar. |
| Puente de Dios, Tamasopo | 1 h 35 min | Cascadas y pozas de aguas turquesa rodeadas de vegetación exuberante. |
| Cascadas de Tamul | 1 h 40 min | La caída de agua más alta de la Huasteca, accesible en recorrido en lancha por el río Tampaón. |

Debajo de este carrusel: botón CTA "Reserva y vive todo esto" → WhatsApp.

### 6. Sobre nosotros (`#nosotros`)
Texto (borrador): en Quilas estamos rodeados de naturaleza para que nuestros huéspedes puedan conectar consigo mismos y con su entorno, salir de la rutina y encontrar paz — todo a poca distancia de los principales atractivos de la Huasteca Potosina. Imagen lateral.

### 7. Contacto y ubicación (`#contacto`)
- Tarjeta de contacto: teléfono, WhatsApp (`wa.me`), Facebook, dirección
- Mapa de Google embebido (iframe), centrado en Huichihuayán
- Botón "Cómo llegar" con opción Google Maps y Waze
- Botón grande de WhatsApp y de llamada

### 8. Footer
Nombre, redes, copyright, enlaces rápidos.

## Criterios UX/UI a respetar en la construcción

- **Contraste**: la terracota `#C1694A` solo en fondos de botón/badges o acento gráfico, nunca como texto pequeño sobre crema/arena.
- **Legibilidad sobre fotos**: degradado oscuro (scrim) detrás del texto al pie de cada slide.
- **Indicio de swipe**: mostrar un "peek" del siguiente slide asomando al borde, además de los dots.
- **Autoplay**: si existe, lento y se detiene en cuanto el usuario interactúa.
- **Evitar CLS**: `aspect-ratio` fijo reservado en todas las imágenes.
- **CTA repetido pero no invasivo**: navbar, hero, tras escapadas, y flotante. Cuidar que el flotante no tape los dots del carrusel en móvil.
- **Área táctil** mínima 44x44px con separación adecuada.
- **Alt text** descriptivo en todas las imágenes (accesibilidad + SEO).

## Implementación técnica

- **Un solo archivo de contenido**: `src/routes/index.tsx`, sin rutas adicionales (single-page con anclas, según lo solicitado explícitamente).
- **Componentes** en `src/components/`: `Navbar`, `Hero`, `Habitaciones`, `Cercanos`, `Escapadas`, `Nosotros`, `Contacto`, `Footer`, `WhatsAppFab`, y un `Carousel` reutilizable (swipe táctil, dots/flechas, peek, scrim y texto al pie).
- **Tokens de color** ampliados en `src/styles.css` en `oklch`, mapeados en `@theme inline`; sin clases de color hardcodeadas en componentes.
- **Fuentes** vía Google Fonts con `<link>` en `__root.tsx` (nunca `@import` remoto en CSS).
- **Toggle de idioma**: estado local + diccionario ES/EN por sección, en un módulo `src/lib/content.ts`.
- **SEO**: `head()` propio en `index.tsx` con título, meta description, `og:title`/`og:description`/`og:type`, `twitter:card` y `og:image` (hero).
- **Sin backend**: contacto vía `tel:`, `https://wa.me/`, `https://waze.com/ul?...`, `https://facebook.com/`.

## Contenido pendiente a confirmar

- Teléfono/WhatsApp, dirección exacta, URL de Facebook
- Archivos `logo_negro.png` y `logo_blanco.png` (aún no subidos al proyecto)
- Fotos reales de las 3 habitaciones, del hotel y de los 12 atractivos
- Revisión del contenido en inglés

Mientras tanto se usan placeholders claramente marcados para reemplazar antes de publicar.

## Tareas

1. Ampliar tokens de color en `src/styles.css` (oklch, verde bosque + tierra/madera).
2. Agregar fuentes (Google Fonts) en `__root.tsx`.
3. Generar/conseguir imágenes: hero, 3 habitaciones, 12 atractivos, nosotros (optimizadas).
4. Construir el componente `Carousel` reutilizable (swipe, dots, peek, scrim).
5. Crear los componentes de sección: Navbar, Hero, Habitaciones, Cercanos, Escapadas, Nosotros, Contacto, Footer, WhatsAppFab.
6. Crear el diccionario de contenido ES/EN e implementar el toggle de idioma.
7. Ensamblar `src/routes/index.tsx` con navegación por anclas.
8. Configurar botón "Cómo llegar" con Google Maps / Waze.
9. Configurar `head()` con SEO completo y `og:image`.
10. Reservar `aspect-ratio` fijo en imágenes para evitar saltos de layout.
11. Probar responsividad, contraste y accesibilidad en móvil, tablet y desktop.
12. Verificar build y preview.

## Notas

- No se habilita Lovable Cloud (sin login, base de datos ni backend).
- Los placeholders de contacto, logo y fotos deben reemplazarse con material real antes de publicar.
