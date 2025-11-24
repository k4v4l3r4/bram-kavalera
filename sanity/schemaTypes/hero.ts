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
      type: 'text',
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
            {
              name: 'label',
              type: 'string',
              title: 'Label',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
          ],
        },
      ],
    }),
  ],
})