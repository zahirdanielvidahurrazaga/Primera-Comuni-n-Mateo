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
   * La bienvenida muestra fecha + lugar de la misa. Ambos en Puebla (la ciudad no se muestra en la tarjeta).
   */
  fechaLarga: '5 de Diciembre de 2026' as string | null,
  lugar: 'Parroquia Ntra. Sra. de Juquilita' as string | null,
  ciudad: null as string | null,

  /**
   * Botones "Cómo llegar" de la bienvenida (la galería también hace de invitación).
   * `mapa` = enlace de Google Maps que mandó la familia; null = no se muestra el botón.
   */
  lugares: [
    {
      tipo: 'Misa',
      hora: '11:00 a. m.',
      nombre: 'Parroquia Ntra. Sra. de Juquilita',
      direccion: 'Calle Veracruz s/n, col. México 83, Puebla',
      // Por nombre + dirección: Google Maps resuelve la parroquia.
      mapa: 'https://www.google.com/maps/search/?api=1&query=Parroquia+Nuestra+Se%C3%B1ora+de+Juquilita%2C+Calle+Veracruz%2C+M%C3%A9xico+83%2C+Puebla%2C+Pue.' as string | null,
    },
    {
      tipo: 'Recepción',
      hora: '3:00 p. m.',
      nombre: 'Jardín',
      direccion: 'Calle Margarita 4809, col. Viveros del Valle, Puebla',
      // Pin exacto que mandó la familia (12-nov-2026).
      mapa: 'https://www.google.com/maps/search/?api=1&query=19.070362%2C-98.148361' as string | null,
    },
  ],

  /**
   * Las fotos se pueden subir a partir de la misa (hora de Puebla, UTC−6 todo el año).
   * Antes, en lugar de los botones de Cámara/Galería sale una cuenta regresiva.
   * Para probar antes: abrir la galería con `?prueba` en la URL (queda guardado en ese teléfono;
   * `?prueba=0` lo quita). Es un candado del lado del navegador, no de la base.
   */
  aperturaFotos: new Date('2026-12-05T11:00:00-06:00'),

  frase: 'Que este encuentro con Jesús sea para mí luz en el camino de la vida.',

  hashtag: '#PrimeraComuniónDeMateo',

  /** Código del panel de administración (/#admin) */
  adminCode: '2026',
};
