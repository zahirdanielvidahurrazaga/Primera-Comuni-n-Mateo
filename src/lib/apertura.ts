import { useEffect, useState } from 'react';
import { EVENT } from '@/lib/event';

const LLAVE_PRUEBA = 'mateo_modo_prueba';

/** `?prueba` en la URL abre la subida antes de tiempo en ESE teléfono (para probar). */
function modoPrueba(): boolean {
  try {
    const q = new URLSearchParams(window.location.search);
    if (q.has('prueba')) {
      if (q.get('prueba') === '0') localStorage.removeItem(LLAVE_PRUEBA);
      else localStorage.setItem(LLAVE_PRUEBA, '1');
    }
    return localStorage.getItem(LLAVE_PRUEBA) === '1';
  } catch {
    return false;
  }
}

export interface Apertura {
  abierto: boolean;
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

function calcular(prueba: boolean): Apertura {
  const ms = Math.max(0, EVENT.aperturaFotos.getTime() - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    abierto: prueba || ms === 0,
    dias: Math.floor(s / 86400),
    horas: Math.floor((s % 86400) / 3600),
    minutos: Math.floor((s % 3600) / 60),
    segundos: s % 60,
  };
}

/** Cuenta regresiva hasta la misa; se vuelve `abierto` sola al llegar la hora. */
export function useApertura(): Apertura {
  const [prueba] = useState(modoPrueba);
  const [estado, setEstado] = useState(() => calcular(prueba));
  useEffect(() => {
    if (estado.abierto) return;
    const t = setInterval(() => setEstado(calcular(prueba)), 1000);
    return () => clearInterval(t);
  }, [estado.abierto, prueba]);
  return estado;
}
