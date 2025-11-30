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
    }),
    defineField({
      name: 'subtitle',
      title: 'Deskripsi Pendek',
      type: 'text', // Lebih simpel daripada blockContent untuk deskripsi pendek
      rows: 3,      // Memberikan kotak input 3 baris
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
    // Field baru untuk Logo Institusi (BATAN, LIPI, dll)
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
})