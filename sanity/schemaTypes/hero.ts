import { defineField, defineType } from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero Section (Halaman Depan)',
  type: 'document',
  fields: [
    // 1. Judul Besar
    defineField({
      name: 'title',
      title: 'Judul Besar',
      type: 'string',
      validation: (rule) => rule.required().error('Judul wajib diisi agar website tidak error.'),
    }),
    
    // 2. Subjudul / Deskripsi
    defineField({
      name: 'subtitle',
      title: 'Deskripsi Pendek',
      type: 'text',
      rows: 3,
    }),

    // 3. Slide Gambar Utama
    defineField({
      name: 'images',
      title: 'Gambar Slide',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { 
              name: 'alt', 
              type: 'string', 
              title: 'Alt Text (Untuk SEO)',
              validation: (rule) => rule.required().warning('Sebaiknya isi Alt Text untuk Google search.'),
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),

    // 4. Logo Institusi Partner
    defineField({
      name: 'institutions',
      title: 'Logo Institusi',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Nama Institusi', type: 'string' },
            { 
              name: 'logo', 
              title: 'Logo', 
              type: 'image', 
              options: { hotspot: true } 
            },
            { name: 'alt', title: 'Alt Text', type: 'string' },
          ],
          preview: {
            select: {
              title: 'label',
              media: 'logo'
            }
          }
        },
      ],
    }),
  ],

  // Preview di Admin Panel
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'images.0',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title || 'Hero Belum Ada Judul',
        subtitle: subtitle || 'Halaman Depan',
        media: media,
      }
    },
  },
})