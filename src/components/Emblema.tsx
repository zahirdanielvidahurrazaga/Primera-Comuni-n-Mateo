import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * El emblema de la invitación: media corona de flores en línea fina (izquierda y
 * abajo), un círculo punteado que la completa, y encima la paloma blanca de papel
 * (foto recortada). La corona se dibuja sola al entrar.
 */

type P = [number, number];

const C = 100;          // centro del círculo
const R = 70;           // radio de la corona
const DESDE = 226;      // la corona va de arriba-izquierda…
const HASTA = 34;       // …bajando por la izquierda hasta abajo-derecha
const rad = (g: number) => (g * Math.PI) / 180;
const punto = (g: number, r = R): P => [C + r * Math.cos(rad(g)), C + r * Math.sin(rad(g))];
const f = (n: number) => n.toFixed(2);

/** hoja de punta, con nervadura; nace en (0,0) y apunta hacia +x */
const HOJA = 'M0,0 C3,-3.1 8.5,-3.3 12.5,0 C8.5,3.3 3,3.1 0,0 Z M1.2,0 Q6,-0.4 11,0';
/** pétalo redondeado; nace en (0,0) */
const PETALO = 'M0,0 C0.6,-2.2 3.6,-2.4 4,0 C3.6,2.4 0.6,2.2 0,0 Z';

function armarCorona() {
  // tallo principal, con una ondulación muy leve para que parezca dibujado a mano
  const pasos = 56;
  let tallo = '';
  for (let i = 0; i <= pasos; i++) {
    const g = DESDE - ((DESDE - HASTA) * i) / pasos;
    const [x, y] = punto(g, R + Math.sin(i * 0.7) * 0.7);
    tallo += `${i ? 'L' : 'M'}${f(x)},${f(y)}`;
  }

  // hojas en pares alternados; grandes al centro, chiquitas hacia las puntas
  const hojas: { x: number; y: number; giro: number; escala: number }[] = [];
  let lado = 1;
  for (let g = DESDE - 3; g > HASTA + 2; g -= 5.4) {
    const t = (DESDE - g) / (DESDE - HASTA);
    const escala = 0.38 + Math.pow(Math.sin(t * Math.PI), 0.7) * 0.62;
    const [x, y] = punto(g);
    const avance = g - 90; // hacia dónde crece el tallo (de arriba hacia abajo-derecha)
    hojas.push({ x, y, giro: avance + lado * 34, escala });
    lado *= -1;
  }
  // brotes que cierran las dos puntas
  const [x0, y0] = punto(DESDE);
  const [x1, y1] = punto(HASTA);
  hojas.push({ x: x0, y: y0, giro: DESDE + 90 + 180, escala: 0.42 });
  hojas.push({ x: x1, y: y1, giro: HASTA - 90, escala: 0.42 });

  // pocas flores, más presentes; cada una un poco fuera o dentro del tallo
  const flores = [
    { g: 200, r: R - 1, e: 0.95 },
    { g: 152, r: R + 1, e: 1.2 },
    { g: 104, r: R - 1, e: 1 },
    { g: 66, r: R + 1, e: 1.25 },
  ].map(({ g, r, e }, i) => {
    const [x, y] = punto(g, r);
    return { x, y, escala: e, giro: i * 23 };
  });

  // racimitos de bayas entre flor y flor
  const bayas: P[] = [];
  [176, 128, 86, 48].forEach((g, i) => {
    const fuera = i % 2 ? -4.2 : 4.2;
    for (let k = 0; k < 3; k++) bayas.push(punto(g + k * 2.1, R + fuera + (k === 1 ? 1.4 * Math.sign(fuera) : 0)));
  });

  // puntitos que completan el círculo (derecha y arriba)
  const puntos: P[] = [];
  for (let g = HASTA - 9; g > DESDE - 360 + 9; g -= 6) puntos.push(punto(g, R));

  return { tallo, hojas, flores, bayas, puntos };
}

export default function Emblema({ className = '' }: { className?: string }) {
  const corona = useMemo(armarCorona, []);
  const quieto = useReducedMotion();
  const dibujo = (delay: number, dur = 1.6) =>
    quieto
      ? {}
      : { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { delay, duration: dur, ease: [0.45, 0, 0.2, 1] as const } };
  const aparece = (delay: number) =>
    quieto ? {} : { initial: { opacity: 0, scale: 0.6 }, animate: { opacity: 1, scale: 1 }, transition: { delay, duration: 0.6 } };


  return (
    <svg viewBox="20 20 160 160" className={className} role="img" aria-label="Paloma y corona de flores">
      <defs>
        {/* relieve: la foto trae su papel, aquí solo la sombra de "pegada a la tarjeta" */}
        <filter id="relieve" x="-15%" y="-15%" width="130%" height="135%">
          <feDropShadow dx="0.3" dy="1.4" stdDeviation="1.1" floodColor="#3B3D52" floodOpacity="0.16" />
        </filter>
      </defs>

      {/* ── corona ── */}
      <g fill="none" stroke="var(--accent)" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round">
        <motion.path d={corona.tallo} {...dibujo(0.1, 1.9)} />
        {corona.hojas.map((h, i) => (
          <g key={i} transform={`translate(${f(h.x)},${f(h.y)}) rotate(${h.giro.toFixed(1)}) scale(${h.escala.toFixed(2)})`}>
            <motion.path d={HOJA} vectorEffect="non-scaling-stroke" style={{ transformOrigin: '0px 0px' }} {...aparece(0.3 + i * 0.04)} />
          </g>
        ))}
        {corona.flores.map((fl, i) => (
          <g key={i} transform={`translate(${f(fl.x)},${f(fl.y)}) rotate(${fl.giro}) scale(${fl.escala})`}>
            <motion.g style={{ transformOrigin: '0px 0px' }} {...aparece(1 + i * 0.14)}>
              {[0, 72, 144, 216, 288].map(g => (
                <path key={g} d={PETALO} transform={`rotate(${g}) translate(0.8,0)`} fill="var(--background)" vectorEffect="non-scaling-stroke" />
              ))}
              <circle r="0.85" fill="var(--accent)" stroke="none" />
            </motion.g>
          </g>
        ))}
        {corona.bayas.map(([x, y], i) => (
          <motion.circle key={i} cx={f(x)} cy={f(y)} r="0.8" {...aparece(1.2 + i * 0.03)} />
        ))}
      </g>

      {/* ── círculo punteado ── */}
      <g fill="var(--silver)">
        {corona.puntos.map(([x, y], i) => (
          <motion.circle key={i} cx={f(x)} cy={f(y)} r="0.6" {...(quieto ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1.3 + i * 0.025 } })} />
        ))}
      </g>

      {/* ── paloma de papel (public/paloma.webp, generada y recortada; ver CLAUDE.md) ── */}
      <motion.image
        href="/paloma.webp"
        x="59" y="57" width="82" height="81.6"
        preserveAspectRatio="xMidYMid meet"
        filter="url(#relieve)"
        initial={quieto ? false : { opacity: 0, y: 6, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.7, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: '100px 98px' }}
      />
    </svg>
  );
}
