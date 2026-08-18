# Plan: Sincronizar tus ediciones manuales a Lovable vía GitHub

## Diagnóstico

Descargaste el código como **ZIP** desde GitHub (no con `git clone`) y modificaste los
archivos en tu computadora, pero **no subiste (push) nada de vuelta a GitHub**.

- Un ZIP es una copia plana de archivos: **no tiene historial de git ni conexión** con GitHub.
- Por eso tus cambios viven solo en tu máquina y nunca llegaron a GitHub.
- La sincronización bidireccional de Lovable es: **Lovable ↔ rama `main` de GitHub**.
  Si tus cambios no están en `main` en GitHub, Lovable no los ve.

**Regla:** cualquier edición manual debe terminar en la rama `main` de GitHub mediante un
`git push` para que aparezca en Lovable. Editar archivos descargados no sincroniza nada.

## Solución (elige una ruta)

### Ruta A — Recomendada: clonar con git y subir tus cambios

Esta es la forma correcta y la que mantiene la sincronización funcionando a futuro.

1. En GitHub, copia la URL del repositorio (botón verde **Code → HTTPS**).
2. En tu computadora, en una terminal:
   ```sh
   git clone https://github.com/TU_USUARIO/NOMBRE_REPO.git
   cd NOMBRE_REPO
   ```
3. Copia los archivos que ya modificaste (de tu carpeta del ZIP) **sobre** los archivos del
   clon. Por ejemplo, reemplaza `src/lib/site.ts`, las imágenes en `src/assets/`, etc.
4. Revisa qué cambió:
   ```sh
   git status
   git diff
   ```
5. Confirma y sube los cambios a la rama `main`:
   ```sh
   git add -A
   git commit -m "Actualizo datos de contacto e imágenes reales"
   git push origin main
   ```
6. Espera unos segundos. Lovable detecta el push y **sincroniza automáticamente** los cambios
   de vuelta al editor y al preview. Verás tus modificaciones reflejadas.

> Nota: si git te pide credenciales, usa un **Personal Access Token** (GitHub → Settings →
> Developer settings → Tokens) como contraseña, o configura la GitHub CLI.

### Ruta B — Editar directamente en github.com (sin instalar nada)

Si no quieres usar la terminal:

1. Ve a tu repositorio en github.com.
2. Navega al archivo que quieres cambiar (ej. `src/lib/site.ts`) y haz clic en el lápiz
   (✏️ Edit).
3. Haz los cambios y **Commit changes** directamente a la rama `main`.
4. Para imágenes: usa **Add file → Upload files** y sube las fotos a `src/assets/`
   manteniendo exactamente los mismos nombres (`hero.jpg`, `room-cabana.jpg`, etc.).
5. Lovable sincroniza cada commit de `main` automáticamente.

### Ruta C — Subir solo las imágenes (lo más rápido para tu caso)

Si lo único que quieres cambiar son las fotos reales y los datos de contacto:

1. Sube las imágenes a `src/assets/` en GitHub con **los mismos nombres** que ya existen
   (ruta B, paso 4). La página las tomará sin tocar el código.
2. Edita `src/lib/site.ts` en github.com con tu teléfono/WhatsApp/Facebook/coordenadas reales.

## Lo que NO funciona

- ✗ Editar el ZIP descargado y esperar: no hay conexión a GitHub, los cambios no suben solos.
- ✗ Hacer push a una rama que no sea `main`: Lovable sincroniza desde `main`.
- ✗ Abrir un Pull Request y dejarlo sin fusionar: hasta que se mergee a `main`, Lovable no lo ve.

## Verificación

Después del `git push` a `main` (o del commit en github.com):
- Vuelve al editor de Lovable; verás los archivos actualizados en el árbol de archivos.
- El preview reflejará tus cambios. Si no, recarga el preview (los cambios de GitHub tardan
  unos segundos en sincronizar).

## Conclusión

No necesitas que yo edite nada aquí: el problema está en el flujo de tu lado. Sigue la
**Ruta A** para tener el flujo correcto de aquí en adelante, o la **Ruta B/C** si solo
quieres cambios puntuales sin tocar la terminal. Una vez que tus cambios estén en la rama
`main` de GitHub, aparecerán solos en Lovable.
