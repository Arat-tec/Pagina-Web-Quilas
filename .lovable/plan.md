# Plan: Editar el código a mano y que se sincronice con Lovable

## Cómo funciona la sincronización

La conexión Lovable ↔ GitHub es **bidireccional y automática**, pero solo con la rama
`main`. El flujo correcto es:

```text
Tu compu --git push--> rama main en GitHub --sync--> Lovable (editor + preview)
       ^                                                                |
       └──────────────────────── git pull ───────────────────────────────┘
```

**Regla clave:** cualquier cambio que quieras ver en Lovable debe terminar en la rama
`main` de GitHub mediante un `git push`. Editar archivos sueltos en tu computadora no
sincroniza nada hasta que los confirmas y subes.

## Pasos para empezar a editar correctamente

1. **Clona el repositorio** (no descargues ZIP). En GitHub, copia la URL del repo
   (botón verde **Code → HTTPS**) y en tu computadora:
   ```sh
   git clone https://github.com/TU_USUARIO/NOMBRE_REPO.git
   cd NOMBRE_REPO
   ```
2. **Edita** los archivos que quieras cambiar. Los más útiles para tu hotel:
   - `src/lib/site.ts` → teléfono, WhatsApp, Facebook, dirección, coordenadas reales.
   - `src/assets/` → imágenes. Reemplaza manteniendo los mismos nombres
     (`hero.jpg`, `room-cabana.jpg`, `atr-nacimiento.jpg`, etc.) y se actualizan solas.
   - `src/lib/content.ts` → textos y descripciones (ES/EN).
3. **Revisa** qué cambió:
   ```sh
   git status
   git diff
   ```
4. **Confirma y sube** a la rama `main`:
   ```sh
   git add -A
   git commit -m "Actualizo datos de contacto e imágenes reales"
   git push origin main
   ```
5. **Listo.** Lovable detecta el push y sincroniza los cambios al editor y al preview en
   unos segundos.

## Para mantener todo sincronizado a futuro

- Antes de editar, actualiza tu copia local con lo más reciente de Lovable:
  ```sh
  git pull origin main
  ```
- Sube siempre con `commit` + `push` a `main`. Nunca dejes cambios sin subir.
- Si git pide credenciales, usa un **Personal Access Token** (GitHub → Settings →
  Developer settings → Tokens) como contraseña, o configura la GitHub CLI.

## Lo que NO funciona

- ✗ Editar archivos sueltos en tu compu y esperar: sin `push` no hay sincronización.
- ✗ Hacer `push` a una rama que no sea `main`: Lovable solo lee `main`.
- ✗ Dejar un Pull Request sin fusionar: hasta que se mergea a `main`, Lovable no lo ve.

## Alternativa sin terminal: editar directo en github.com

Si no quieres instalar git: ve a tu repo en github.com, abre el archivo (ej.
`src/lib/site.ts`), clic en el lápiz ✏️, edita y **Commit changes** a `main`. Para
imágenes usa **Add file → Upload files** a `src/assets/` con los mismos nombres.
Cada commit en `main` se sincroniza solo.

## Verificación

Tras el `git push` a `main` (o commit en github.com):
- Vuelve al editor de Lovable: verás los archivos actualizados en el árbol de archivos.
- El preview reflejará tus cambios. Si no, recarga (la sincronización tarda unos segundos).
