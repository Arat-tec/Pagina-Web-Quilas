# Plan: Borrar el botón secundario del Hero

## Cambio
Eliminar el botón "Ver atractivos cercanos" / "See nearby attractions" del componente `src/components/Hero.tsx`.

## Archivo afectado
- `src/components/Hero.tsx` (líneas 39–44): borrar el `<a href="#atractivos">` que corresponde al botón secundario.

## Detalle
- Se conserva únicamente el botón primario de reserva por WhatsApp.
- El contenedor `flex` que agrupa ambos botones se mantiene (solo contendrá el botón primario), conservando el espaciado y el estilo responsive.
- No se requiere tocar `content.ts`: los textos `hero.secondary` quedarán sin usar, lo cual es inofensivo. (Opcional: limpiarlos después, pero no es necesario.)

## Resultado
El Hero mostrará solo el botón "Reservar por WhatsApp".
