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
   * Datos que mandó la familia (WhatsApp 10-nov-2026):
   *   Misa 11:00 a. m. — Parroquia Ntra. Sra. de Juquilita, calle Veracruz s/n, col. México 83
   *   Recepción 3:00 p. m. — jardín en Calle Margarita 4809, col. Viveros del Valle
   * La bienvenida muestra fecha + lugar de la misa. La ciudad no la dieron: null = no se muestra.
   */
  fechaLarga: '5 de Diciembre de 2026' as string | null,
  lugar: 'Parroquia Ntra. Sra. de Juquilita' as string | null,
  ciudad: null as string | null,

  frase: 'Que este encuentro con Jesús sea para mí luz en el camino de la vida.',

  hashtag: '#PrimeraComuniónDeMateo',

  /** Código del panel de administración (/#admin) */
  adminCode: '2026',
};
