# Cómo reemplazar el texto "Quilas" por un logo

El texto "Quilas" aparece en **4 lugares** del sitio. Aquí están todos, con el código exacto para cambiar cada uno por una imagen de logo.

## Requisito previo

Sube tu(s) archivo(s) de logo a la carpeta `src/assets/`. Si el logo necesita verse sobre fondos oscuros (hero/footer) usa una versión blanca (`logo_blanco.png`); sobre fondos claros (navbar sólido) usa una versión oscura (`logo_negro.png`). Si solo tienes un logo, sirve uno monocromático.

Luego importa la imagen arriba del componente, por ejemplo:

```tsx
import logoBlanco from "@/assets/logo_blanco.png";
import logoNegro from "@/assets/logo_negro.png";
```

## 1. Hero (el "Quilas" grande del main) — `src/components/Hero.tsx`

Es el título grande sobre la foto del hero. Ahora mismo es texto:

```tsx
<h1 className="font-display mt-3 text-5xl leading-none font-semibold text-forest-foreground sm:text-7xl lg:text-8xl">
  {t.hero.title}
</h1>
```

Reemplázalo por una imagen (fondo oscuro → logo blanco):

```tsx
<img
  src={logoBlanco}
  alt="Quilas"
  className="mt-3 h-24 w-auto sm:h-32 lg:h-40"
/>
```

Ajusta `h-24`/`h-32`/`h-40` al tamaño que quieras.

## 2. Navbar (logo arriba a la izquierda) — `src/components/Navbar.tsx`, líneas 44-52

Ahora es texto "Quilas" que cambia de color según el fondo:

```tsx
<a href="#inicio" className={cn("font-display truncate text-2xl ...")}>
  Quilas
</a>
```

Reemplázalo por un logo que cambie según el fondo (claro/oscuro):

```tsx
<a href="#inicio" className="inline-flex items-center">
  <img
    src={onSolid ? logoNegro : logoBlanco}
    alt="Quilas"
    className="h-9 w-auto"
  />
</a>
```

`onSolid` ya existe en el componente (`const onSolid = scrolled || open;`), así que el logo oscuro aparece cuando la navbar tiene fondo claro, y el blanco cuando está transparente sobre el hero.

## 3. Footer — `src/components/Footer.tsx`, línea 17

Fondo oscuro → logo blanco:

```tsx
<p className="font-display text-2xl font-semibold">Quilas</p>
```

Reemplázalo por:

```tsx
<img src={logoBlanco} alt="Quilas" className="h-10 w-auto" />
```

## 4. Texto del título del hero en el diccionario (opcional)

`src/lib/content.ts` guarda el texto `"Quilas"` en `hero.title` (línea ~69 en ES y ~254 en EN). Si reemplazaste el `<h1>` por una imagen **ya no se usa**, pero déjalo o borra la línea; no afecta nada.

## Resumen de archivos a editar

| Lugar | Archivo | Línea |
|---|---|---|
| Hero (main) | `src/components/Hero.tsx` | 22-24 |
| Navbar | `src/components/Navbar.tsx` | 44-52 |
| Footer | `src/components/Footer.tsx` | 17 |

## Notas

- Usa `h-*` para la altura y `w-auto` para mantener proporciones; así el logo no se deforma.
- Para accessibilidad y SEO, el `<h1>` del hero conviene mantenerlo como texto. Si lo cambias por imagen, asegúrate de que el `alt` del logo diga "Quilas" y considera dejar el subtítulo (que ya aporta contexto SEO).
- Si tu logo es un PNG con transparencia, se ve bien sobre cualquier fondo.
