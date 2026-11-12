/**
 * Todos los datos del evento viven aquí.
 * Para montar otra galería (otro bautizo, otra comunión, otra boda)
 * basta con cambiar este archivo, las fotos de /public y el proyecto de Supabase.
 */

export const EVENT = {
  /** Identificador de las fotos en la base — separa este evento de cualquier otro */
  id: 'mateo-comunion-2026',

  /** Bucket de Supabase Storage donde viven las fotos */
  bucket: 'communion-photos',

  nombre: 'Mateo',
  titulo: 'Mi Primera Comunión',

  /**
   * PENDIENTE: la familia aún no confirma fecha ni lugar.
   * Mientras sean null, la pantalla de bienvenida simplemente no los muestra.
   * Ejemplo: fechaLarga: '12 de diciembre de 2026', lugar: 'Parroquia de San José', ciudad: 'Puebla, Pue.'
   */
  fechaLarga: null as string | null,
  lugar: null as string | null,
  ciudad: null as string | null,

  frase: 'Que este encuentro con Jesús sea para mí luz en el camino de la vida.',

  hashtag: '#PrimeraComuniónDeMateo',

  /** Código del panel de administración (/#admin) */
  adminCode: '2026',
};
