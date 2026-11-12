import { motion } from 'framer-motion';
import type { Apertura } from '@/lib/apertura';
import { EVENT } from '@/lib/event';

const dos = (n: number) => String(n).padStart(2, '0');

/** Ocupa el lugar de los botones de Cámara/Galería hasta la hora de la misa. */
export default function CuentaRegresiva({ a }: { a: Apertura }) {
  const piezas = [
    { n: a.dias, l: a.dias === 1 ? 'día' : 'días' },
    { n: a.horas, l: 'horas' },
    { n: a.minutos, l: 'min' },
    { n: a.segundos, l: 'seg' },
  ];
  const misa = EVENT.lugares[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-[360px] rounded-[26px] px-6 pt-5 pb-5 text-center"
      style={{
        background: 'rgba(245,242,236,0.82)',
        backdropFilter: 'blur(24px) saturate(160%)',
        WebkitBackdropFilter: 'blur(24px) saturate(160%)',
        border: '1px solid rgba(180,178,188,0.45)',
        boxShadow: '0 8px 30px rgba(59,61,82,0.12)',
      }}
      aria-live="polite"
    >
      <p className="font-sans uppercase tracking-[0.3em] text-[var(--muted-foreground)]" style={{ fontSize: '0.62rem' }}>
        Podrás subir tus fotos en
      </p>
      <div className="mt-3 flex justify-center gap-2">
        {piezas.map(p => (
          <div key={p.l} className="w-[62px]">
            <p className="font-heading text-[var(--accent-dark)] tabular-nums leading-none" style={{ fontSize: '2rem' }}>
              {dos(p.n)}
            </p>
            <p className="mt-1 font-sans uppercase tracking-[0.18em] text-[var(--muted-foreground)]" style={{ fontSize: '0.58rem' }}>
              {p.l}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 font-heading italic text-[var(--accent-dark)]" style={{ fontSize: '0.95rem' }}>
        a partir de la misa · {EVENT.fechaLarga?.replace(/ de 2026$/, '')}, {misa?.hora}
      </p>
    </motion.div>
  );
}
