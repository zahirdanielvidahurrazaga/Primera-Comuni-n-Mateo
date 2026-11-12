import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EVENT } from '@/lib/event';
import Emblema from '@/components/Emblema';

interface WelcomeScreenProps {
  onJoin: (name: string) => void;
}

/**
 * La bienvenida es la invitación misma: una tarjeta de papel con esquinas
 * redondeadas sobre lino, con la paloma, la corona de flores y el nombre.
 */
export default function WelcomeScreen({ onJoin }: WelcomeScreenProps) {
  const [name, setName] = useState('');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 1700);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onJoin(name.trim());
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-[100dvh] px-4 py-5 sm:py-10"
      style={{ background: 'radial-gradient(ellipse 120% 90% at 50% 20%, #F1EEE8 0%, #E7E3DB 60%, #DEDAD1 100%)' }}
    >
      <motion.main
        initial={{ opacity: 0, y: 18, rotate: -0.6 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[420px] min-h-[calc(100dvh-40px)] sm:min-h-0 flex flex-col items-center text-center px-8 pt-10 pb-9 rounded-[26px]"
        style={{
          background: 'linear-gradient(180deg, #FBFAF6 0%, #F6F4EE 100%)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.9) inset, 0 24px 60px -20px rgba(59,61,82,0.28), 0 4px 14px rgba(59,61,82,0.07)',
        }}
      >
        <Emblema className="w-[min(62vw,240px)] h-auto mt-2" />

        <AnimatePresence>
          {showContent && (
            <motion.div
              key="texto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center w-full"
            >
              <p
                className="mt-6 font-heading font-medium uppercase text-[var(--accent-dark)] tracking-[0.32em]"
                style={{ fontSize: 'clamp(0.85rem, 3.9vw, 1rem)' }}
              >
                {EVENT.titulo}
              </p>

              <p
                className="mt-4 max-w-[285px] font-heading italic text-[var(--muted-foreground)] leading-snug"
                style={{ fontSize: 'clamp(0.92rem, 3.9vw, 1.02rem)' }}
              >
                “{EVENT.frase}”
              </p>

              <h1
                className="font-script text-[var(--accent-dark)] mt-3 -mb-1"
                style={{ fontSize: 'clamp(3.4rem, 17vw, 4.6rem)', lineHeight: 1.25 }}
              >
                {EVENT.nombre}
              </h1>

              {(EVENT.fechaLarga || EVENT.lugar) && (
                <div className="mt-2 font-heading text-[var(--accent-dark)]">
                  {EVENT.fechaLarga && (
                    <p className="italic tracking-[0.06em]" style={{ fontSize: '1.02rem' }}>{EVENT.fechaLarga}</p>
                  )}
                  {EVENT.lugares.length > 0 ? (
                    <div className="mt-4 grid grid-cols-2 gap-x-4 text-[var(--accent-dark)]">
                      {EVENT.lugares.map((l, i) => (
                        <div key={l.tipo} className={`flex flex-col items-center px-1 ${i > 0 ? 'border-l border-[var(--silver)]/60' : ''}`}>
                          <p className="uppercase tracking-[0.24em] font-medium" style={{ fontSize: '0.68rem' }}>{l.tipo}</p>
                          <p className="italic mt-0.5" style={{ fontSize: '0.95rem' }}>{l.hora}</p>
                          <p className="mt-1 leading-tight text-[var(--foreground)]/80" style={{ fontSize: '0.8rem' }}>{l.nombre}</p>
                          {l.mapa && (
                            <a
                              href={l.mapa}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1 rounded-full border border-[var(--accent)]/70 px-3 py-1 font-sans text-[var(--accent-dark)] active:scale-95 transition-transform"
                              style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}
                            >
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
                                <circle cx="12" cy="9.5" r="2.5" />
                              </svg>
                              Cómo llegar
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : EVENT.lugar && (
                    <p className="mt-1 uppercase tracking-[0.22em]" style={{ fontSize: '0.82rem' }}>{EVENT.lugar}</p>
                  )}
                  {EVENT.ciudad && (
                    <p className="uppercase tracking-[0.22em]" style={{ fontSize: '0.82rem' }}>{EVENT.ciudad}</p>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Formulario ── */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[300px] mt-auto pt-8"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative group">
                  <input
                    type="text"
                    required
                    autoComplete="given-name"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-0 pt-3 pb-3 bg-transparent border-b border-[var(--silver)]/60 outline-none text-center text-[1.25rem] transition-colors duration-500 placeholder:text-[var(--muted-foreground)]/50 text-[var(--foreground)] font-heading italic tracking-wide focus:border-[var(--accent)]"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--accent-dark)] origin-left transition-all duration-500 group-focus-within:w-full" />
                </div>

                <motion.button
                  whileTap={{ scale: 0.985 }}
                  type="submit"
                  className="w-full py-[15px] text-[10px] font-semibold tracking-[0.3em] uppercase rounded-full transition-colors duration-300 text-[var(--background)] bg-[var(--accent-dark)] hover:bg-[var(--foreground)]"
                  style={{ boxShadow: '0 8px 22px -8px rgba(102,104,138,0.55)' }}
                >
                  Entrar a la galería
                </motion.button>
              </form>

              <p className="mt-5 text-[8.5px] tracking-[0.36em] uppercase text-[var(--muted-foreground)]/75 font-sans">
                Comparte tus fotos de este día
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
}
