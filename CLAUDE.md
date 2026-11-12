# Primera Comunión de Mateo — Galería compartida

Galería de fotos en vivo para que los invitados suban y vean las fotos del día,
escaneando un QR en las mesas. Sin registro, sin apps que instalar.

**Este archivo es la fuente de verdad del proyecto.** Léelo completo al retomar.

Copiada el 24-oct-2026 de `~/Developer/comunion-grecia` (misma app: masonry en
tiempo real, Polaroid con firma, lightbox, corazones, panel `/#admin` con ZIP,
QR imprimible) con el diseño rehecho.

---

## El evento

| | |
|---|---|
| Niño | **Mateo** |
| Fecha | **PENDIENTE** (la familia no la ha confirmado) |
| Lugar | **PENDIENTE** |
| Frase | "Que este encuentro con Jesús sea para mí luz en el camino de la vida." |

Todos estos datos viven en **`src/lib/event.ts`** (`fechaLarga`, `lugar`,
`ciudad` en `null` = no se muestran). Cuando lleguen, llenar ahí y también
`FECHA` en `scripts/make-qr.mjs` para la tarjeta del QR.

---

## Stack

- Vite 6 + React 19 + TypeScript
- Tailwind CSS v4 (por plugin de Vite, sin archivo de config)
- Supabase — base de datos + Storage + tiempo real
- Framer Motion + react-photo-album (masonry)
- Deploy: Cloudflare Pages

---

## Diseño — NO cambiar sin indicación

Referencia que pasó Zahir: invitación de papel con esquinas redondeadas, paloma
blanca de papel en relieve sobre una media corona de flores en línea fina y un
círculo punteado, textos en tinta lavanda grisácea. "Sencillo pero que se vea bien."

```
--background  #F5F2EC   papel marfil
--foreground  #3B3D52   tinta azul-lavanda oscura
--accent      #8E8FAE   lavanda (la corona)
--accent-dark #66688A   lavanda oscura (textos, nombre, botón)
--silver      #B4B2BC   gris de los puntitos
--muted-fg    #6E6F82   texto secundario
```

Tipografías: **Pinyon Script** (el nombre), **Cormorant Garamond** (versalitas
espaciadas y la frase en itálica), **Inter** (textos chicos), **Caveat** (firma
de las Polaroids).

Elementos:
- **Bienvenida = la invitación** (`WelcomeScreen.tsx`): tarjeta de papel con
  esquinas de 26px sobre fondo lino; en celular ocupa casi toda la pantalla.
- **`Emblema.tsx`**: corona (tallo, hojas, florecitas de 5 pétalos, ramitas)
  generada en código y que se DIBUJA sola al entrar, puntitos que completan el
  círculo, y la paloma: **`public/paloma.webp`** (24-oct: la dibujada en SVG no
  convencía; foto de paloma de papel generada con Codex/ChatGPT, original en
  `fuentes/paloma-original.png`, fondo quitado con Vision de macOS
  (`~/Developer/demos/scripts/giro/recortar`), recortada a 640 px).
- **Polaroid**: marco blanco `6px 6px 54px 6px`, inclinación aleatoria por foto.
- **Grano**: overlay SVG animado al 2.2%.
- Los textos chicos NO deben bajar de ~60% de opacidad.

### La animación del corazón (`HeartButton.tsx`)

Referencias: el **doble tap de Instagram** y el **estallido de partículas de
Twitter/X**, pero traducidos a esta paleta — en vez de confeti de colores, van
**pétalos y corazones diminutos** en los dos lavandas, que hacen eco de las flores
de la invitación.

Tres capas que ocurren juntas al DAR corazón (nunca al quitarlo — festejar que
alguien se arrepintió no tiene sentido):

1. El corazón se hunde y rebota — `scale: [1, 0.72, 1.34, 0.94, 1]`.
2. Una **onda** delgada se expande y se desvanece.
3. **Siete partículas** (3 corazoncitos + 4 pétalos) salen en abanico HACIA
   ARRIBA, no en círculo parejo: se siente ligero, como pétalos que se sueltan,
   y no como confeti de videojuego.

En el lightbox, además, **doble tap sobre la foto** da corazón y hace florecer un
corazón grande encima. Solo DA, nunca quita — si ya tenía, el doble tap no lo
arranca.

Dos decisiones de color que costaron ver y no hay que revertir:
- Las partículas **no usan plata ni lavanda claro como color principal**: sobre el
  marco BLANCO del Polaroid desaparecen.
- El corazón grande del doble tap es **lavanda con halo blanco**, no blanco:
  un corazón blanco se pierde sobre fotos claras (un vestido, un perro blanco).

Todo respeta `prefers-reduced-motion`: si el invitado pidió menos movimiento en
su teléfono, el corazón cambia sin estallido.

---

## Base de datos — PENDIENTE

Todavía **no hay proyecto de Supabase** para Mateo (ni `.env.local`).
`supabase/schema.sql` (copiado de Grecia, idempotente) es la fuente de verdad:
tablas `photos` + `photo_likes`, RLS abierta a propósito (invitados sin registro),
`photo_likes` con `REPLICA IDENTITY FULL` (sin eso los contadores no bajan al
quitar corazón), bucket público `communion-photos`.

Ojo: la cuenta gratis "Naturalaguas" (la de Grecia) ya está en su tope de 2
proyectos activos.

Para correr SQL: POST a `api.supabase.com/v1/projects/<ref>/database/query`
**con curl, no python-urllib** (Cloudflare bloquea ese user-agent).

---

## Cómo se corre

```bash
npm install
npm run dev              # http://localhost:5173
npm run build            # tsc -b && vite build
npm run qr -- <url>      # genera el QR de las mesas (ver abajo)
```

Variables de entorno (`.env.local` local, y las MISMAS en Cloudflare Pages):

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## Rutas

- `/` — galería para los invitados
- `/#admin` — panel: estadísticas, borrar fotos, descargar todo en ZIP.
  Código de acceso en `src/lib/event.ts` (`adminCode`). Es una puerta de
  cortesía del lado del navegador, no seguridad real.

---

## El QR de las mesas

```bash
npm run qr -- https://<la-url-real>
```

Deja dos cosas:
- `public/qr.png` — QR suelto a 1400 px
- `qr-card.html` — 4 tarjetas por hoja A4 con la marca del evento.
  Se abre en Chrome y se imprime con Cmd+P → "Guardar como PDF".
  Sale vectorial, que es lo que pide la imprenta.

---

## ⚠️ Supabase gratuito se pausa solo

Un proyecto gratuito de Supabase **se pausa a los 7 días sin actividad**, y un
proyecto pausado responde NXDOMAIN: la galería simplemente no carga.

Esto ya le pasó al proyecto de la boda de Mariana.

Como la app se arma con semanas de
anticipación, **hay que despertar el proyecto unos días antes del evento** y
volver a entrar a la galería para confirmar que responde. Sin eso, la app llega
muerta el día de la fiesta.

---

## Lo que falta

1. **Fecha y lugar** (ver arriba).
2. **Supabase**: crear proyecto, aplicar `supabase/schema.sql`, `.env.local`.
3. **Desplegar** en Cloudflare Pages (mismas 2 variables) y `npm run qr -- <url>`.
4. **Despertar Supabase** unos días antes del evento.
