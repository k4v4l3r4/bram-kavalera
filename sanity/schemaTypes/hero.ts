import { defineField, defineType } from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero Section (Halaman Depan)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Besar',
      type: 'string',
      validation: (rule) => rule.required(), // <-- SARAN: Wajib diisi
    }),
    defineField({
      name: 'subtitle',
      title: 'Deskripsi Pendek',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'images',
      title: 'Gambar Slide',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'institutions',
      title: 'Logo Institusi',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Nama Institusi', type: 'string' },
            { name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } },
            { name: 'alt', title: 'Alt Text', type: 'string' },
          ],
        },
      ],
    }),
  ],
  // --- TAMBAHAN PREVIEW AGAR LIST DI ADMIN BAGUS ---
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'images.0', // Mengambil gambar pertama dari array images
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title || 'Tanpa Judul',
        subtitle: subtitle || 'Hero Section',
        media: media,
      }
    },
  },
})