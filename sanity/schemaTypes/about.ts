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
    
    // FIELD OBJECTIVES
    defineField({
      name: 'objectives',
      title: 'Objectives (Tujuan PPRNP)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'goal', type: 'text', title: 'Poin Tujuan' },
          ],
        },
      ],
      description: 'Gunakan untuk poin-poin panjang Tujuan PPRNP. Masukkan satu poin per item.',
    }),
    
    // 👇 GROUP VISI & MISI (LABEL DIHILANGKAN) 👇
    defineField({
        name: 'visiMisiGroup',
        title: 'Objectif Visi & Misi', // <-- JUDUL UTAMA (Yang akan tetap muncul)
        type: 'object',
        fields: [
            defineField({
                name: 'vision',
                // 👇 PERBAIKAN: Label dihilangkan (title: '')
                title: '', 
                type: 'blockContent', 
            }),
            defineField({
                name: 'missions',
                // 👇 PERBAIKAN: Label dihilangkan (title: '')
                title: '', 
                type: 'array',
                of: [{ type: 'string' }],
            }),
        ]
    }),
    // 👆 END GROUP VISI & MISI 👆

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