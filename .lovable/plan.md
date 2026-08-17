# Plan: Cómo reemplazar las imágenes generadas por fotos reales

## Contexto
La landing usa 17 imágenes generadas con IA en `src/assets/`, importadas en tres archivos:
- `src/components/Hero.tsx` → `hero.jpg`
- `src/components/About.tsx` → `nosotros.jpg`
- `src/lib/content.ts` → 3 habitaciones (`room-cabana.jpg`, `room-doble.jpg`, `room-triple.jpg`) y 12 atractivos (`atr-*.jpg`)

El usuario aún no tiene las fotos, pero ya decidió que **yo me encargo de optimizarlas** cuando las suba.

## Flujo que seguirás cuando tengas las fotos

1. **Tomas o reúnes las fotos reales.** No importa el nombre, el tamaño ni el formato (JPG, PNG o HEIC convertido). Puedes subirlas de a una o en grupos de hasta 10 por mensaje.

2. **Las arrastras a este chat** (o usas el botón **+ → Adjuntar**). Cada foto queda disponible para mí automáticamente.

3. **Me dices qué foto va dónde.** Por ejemplo:
   - "Esta es para el hero"
   - "Estas tres son las habitaciones: cabaña, doble, triple"
   - "Esta es el río El Nacimiento", "esta es Tamul", etc.
   No necesitas recordar los nombres técnicos; con que me indiques el lugar, yo lo mapeo.

4. **Yo hago el resto, sin que tú toques código:**
   - Optimizo cada foto: la redimensiono a un ancho adecuado (~1600px para hero y atractivos, ~1200px para habitaciones), la exporto como JPG/WebP comprimido y verifico el peso.
   - Reemplazo el archivo correspondiente en `src/assets/` (o creo el nuevo y actualizo el import si el nombre cambia).
   - Si una foto requiere recortar proporción (por ejemplo el hero es panorámico), la ajusto al recorte correcto.
   - La página se actualiza sola en la vista previa; tú solo refrescas y ves el resultado.

5. **Revisamos juntos.** Si alguna foto no encaja bien en su espacio (proporción, encuadre), me lo dices y la reajusto o la cambiamos por otra.

## Buenas prácticas para tus fotos (opcional, ayuda pero no es obligatorio)
- Toma en horizontal y con buena luz (de día, para los paisajes).
- El hero funciona mejor panorámico (tipo celular en horizontal o cámara).
- Para habitaciones, encuadra la cama/espacio completo desde una esquina.
- No te preocupes por el tamaño: sube la resolución original y yo la optimizo.

## Notas técnicas
- Las optimizaciones (resize/recorte) las haré con herramientas locales en el sandbox (sin afectar tus originales).
- No se usa almacenamiento externo ni "Cloud" para esto: las fotos viven en el repo del proyecto, igual que las generadas actuales.
- Si en el futuro quieres que tus huéspedes suban fotos (galería de usuarios), eso sí requeriría activar almacenamiento en la nube; pero para tu landing promocional no hace falta.

## Estado
Pendiente de que el usuario suba sus fotos reales. No hay cambios de código ahora mismo; este plan describe el proceso a seguir en cuanto disponga de las imágenes.
