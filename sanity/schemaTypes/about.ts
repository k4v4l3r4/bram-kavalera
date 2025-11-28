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
      type: 'blockContent',
    }),
    
    // FIELD OBJECTIVES (Tujuan PPRNP)
    defineField({
      name: 'objectives',
      title: 'Objectives (Tujuan PPRNP)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'goal', type: 'blockContent', title: 'Poin Tujuan' },
          ],
        },
      ],
      description: 'Gunakan untuk poin-poin panjang Tujuan PPRNP. Masukkan satu poin per item.',
    }),
    
    // GROUP VISI & MISI
    defineField({
        name: 'visiMisiGroup',
        title: 'Visi & Misi',
        type: 'object',
        fields: [
            defineField({
                name: 'vision',
                title: '', 
                type: 'blockContent', 
            }),
            defineField({
                name: 'missions',
                title: '', 
                type: 'array',
                of: [{ type: 'string' }],
            }),
        ]
    }),

    // ❌ BAGIAN 'focusAreas' SUDAH DIHAPUS DARI SINI ❌
    // Karena sudah dipindah ke Expert Forum
  ],
})