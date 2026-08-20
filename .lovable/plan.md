# Cómo cambiar los colores de los botones de contacto

Hay dos niveles: las **clases de utilidad** que cada botón usa en `Contact.tsx`,
y los **tokens de color** que alimentan esas clases en `src/styles.css`.

---

## Nivel 1 — Las clases en `src/components/Contact.tsx` (líneas 78–104)

Cada botón tiene su color en el atributo `className`. Estos son los tres botones del bloque de contacto:

```tsx
// Airbnb  → línea 83  → usa bg-primary + text-primary-foreground
className="... bg-primary ... text-primary-foreground ..."

// WhatsApp → línea 92 → usa bg-forest + text-forest-foreground
className="... bg-forest ... text-forest-foreground ..."

// Llamar  → línea 99  → borde + texto transparente (border border-border ... text-foreground)
className="... border border-border ... text-foreground ..."
```

Para cambiar el color de un botón, edita la clase `bg-*` y su `text-*-foreground` correspondiente.
Ejemplos:
- Airbnb en terracotta: cambiar `bg-primary` / `text-primary-foreground` → `bg-terracotta` / `text-terracotta-foreground`
- WhatsApp en moss: cambiar `bg-forest` / `text-forest-foreground` → `bg-moss` / `text-moss-foreground`

Otros botones de color (con su token) disponibles en tu paleta:
- `bg-forest` / `bg-moss` / `bg-terracotta` / `bg-sand` / `bg-primary` / `bg-accent`
- Cada uno con su `*-foreground` para el texto.

Los botones de Google Maps y Waze están en las **líneas 121–138** del mismo archivo
(`bg-accent` el de Maps, y `border` transparente el de Waze).

---

## Nivel 2 — Los valores reales del color en `src/styles.css`

Las clases anteriores (`bg-forest`, `bg-terracotta`, etc.) apuntan a variables CSS
definidas en `:root` (líneas 66–99). Si quieres cambiar el tono exacto de un color
en todo el sitio, edita su valor `oklch(...)`:

```css
:root {
  --forest:   oklch(0.3 0.045 154);   /* línea 70  → botón de WhatsApp */
  --moss:     oklch(0.52 0.058 152);  /* línea 72  → botón de Airbnb (primary) */
  --terracotta: oklch(0.58 0.114 39); /* línea 74  → botón de Google Maps (accent) */
  --sand:     oklch(0.93 0.024 79);   /* línea 76 */
  --warm:     oklch(0.98 0.008 85);   /* línea 77 → fondo del sitio */
  --wood:     oklch(0.36 0.035 60);   /* línea 78 */
}
```

- `--moss` alimenta `bg-primary` (Airbnb y botón del Hero).
- `--forest` alimenta `bg-forest` (WhatsApp).
- `--terracotta` alimenta `bg-accent` (Google Maps).

Para modo oscuro, los equivalentes están en el bloque `.dark` (líneas 101–119).

---

## Resumen rápido

| Botón | Archivo / línea | Clase hoy | Token que controla el color |
|---|---|---|---|
| Airbnb | Contact.tsx:83 | `bg-primary` | `--moss` (styles.css:72) |
| WhatsApp | Contact.tsx:92 | `bg-forest` | `--forest` (styles.css:70) |
| Llamar | Contact.tsx:99 | `border-border` | `--border` (styles.css:96) |
| Google Maps | Contact.tsx:125 | `bg-accent` | `--terracotta` (styles.css:74) |
| Waze | Contact.tsx:132 | `border-border` | `--border` (styles.css:96) |
| Hero (Reserva) | Hero.tsx | `bg-primary` | `--moss` (styles.css:72) |

Cambia solo las clases (Nivel 1) para un botón individual, o el valor `oklch`
(Nivel 2) para cambiar ese color en toda la página.
