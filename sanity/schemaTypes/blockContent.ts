import { defineType, defineArrayMember } from 'sanity'

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // 👇 1. DAFTAR GAYA TEKS & ALIGNMENT 👇
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' }, 
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'H6', value: 'h6' },
        { title: 'Quote', value: 'blockquote' },
        // Opsi Alignment
        { title: 'Rata Kiri', value: 'normal_left' },
        { title: 'Rata Tengah', value: 'normal_center' },
        { title: 'Rata Kanan', value: 'normal_right' },
        { title: 'Rata Kanan-Kiri (Justify)', value: 'normal_justify' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      // 👇 2. DEKORASI TEKS (BOLD, ITALIC, UNDERLINE, DLL) 👇
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' }, // Garis Bawah
          { title: 'Strike', value: 'strike-through' }, // Coret
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean'
              }
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})