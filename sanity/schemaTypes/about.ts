import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About Section (Tentang Kami)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Utama',
      type: 'string',
      initialValue: 'Membangun Kebersamaan di Lingkungan Teknologi'
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Panjang',
      type: 'text',
    }),
    defineField({
      name: 'vision',
      title: 'Visi',
      type: 'text',
    }),
    defineField({
      name: 'missions',
      title: 'Daftar Misi',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'focusAreas',
      title: 'Kartu Fokus Utama',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Judul Kartu' },
            { name: 'description', type: 'text', title: 'Deskripsi Kartu' },
            {
              name: 'icon',
              title: 'Pilih Ikon',
              type: 'string',
              options: {
                list: [
                  { title: 'Jantung (Kesehatan)', value: 'HeartPulse' },
                  { title: 'Perisai (Keamanan)', value: 'ShieldCheck' },
                  { title: 'Lampu (Ide/Produktif)', value: 'Lightbulb' },
                  { title: 'Tangan (Sosial)', value: 'HandHeart' },
                  { title: 'Tanaman (Lingkungan)', value: 'Sprout' },
                  { title: 'Mikroskop (Edukasi)', value: 'Microscope' },
                ],
              },
            },
          ],
        },
      ],
    }),
  ],
})