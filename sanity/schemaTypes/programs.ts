import { defineField, defineType } from 'sanity'

export const programsType = defineType({
  name: 'programs',
  title: 'Programs Section (Program Unggulan)',
  type: 'document',
  fields: [
    // 1. Bagian Judul Utama Seksi
    defineField({
      name: 'sectionTitle',
      title: 'Judul Seksi',
      type: 'string',
      initialValue: 'Program Unggulan'
    }),
    defineField({
      name: 'sectionDescription',
      title: 'Deskripsi Seksi',
      type: 'text',
      initialValue: 'Berbagai inisiatif kolaboratif untuk meningkatkan kualitas hidup warga.'
    }),

    // 2. Daftar Kartu Program
    defineField({
      name: 'items',
      title: 'Daftar Program',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Nama Program' },
            { name: 'description', type: 'text', title: 'Deskripsi Singkat' },
            { name: 'tag', type: 'string', title: 'Label Tag (misal: Mingguan)' },
            { 
              name: 'image', 
              type: 'image', 
              title: 'Foto Background',
              options: { hotspot: true }
            },
            {
              name: 'color',
              title: 'Warna Tema',
              type: 'string',
              options: {
                list: [
                  { title: 'Biru', value: 'blue' },
                  { title: 'Hijau', value: 'green' },
                  { title: 'Ungu', value: 'purple' },
                  { title: 'Oranye', value: 'orange' },
                  { title: 'Merah', value: 'red' },
                ],
              },
            },
            {
              name: 'icon',
              title: 'Ikon',
              type: 'string',
              options: {
                list: [
                  { title: 'Orang (Users)', value: 'Users2' },
                  { title: 'Kalender (Calendar)', value: 'Calendar' },
                  { title: 'Buku (Education)', value: 'BookOpen' },
                  { title: 'Kamera (Dokumentasi)', value: 'Camera' },
                ],
              },
            },
          ],
        },
      ],
    }),
  ],
})