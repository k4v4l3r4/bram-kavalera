import { defineField, defineType } from 'sanity'

export const expertForumType = defineType({
  name: 'expertForum',
  title: 'Expert Forum (Forum Ahli)',
  type: 'document',
  fields: [
    // BAGIAN KIRI (GAMBAR)
    defineField({
      name: 'image',
      title: 'Foto Utama',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'overlayTitle',
      title: 'Judul di atas Foto',
      type: 'string',
      initialValue: 'Sesi Berbagi Pengetahuan'
    }),
    defineField({
      name: 'schedule',
      title: 'Jadwal (di atas foto)',
      type: 'string',
      initialValue: 'Setiap Jumat, 19:00 WIB'
    }),

    // BAGIAN KANAN (KONTEN)
    defineField({
      name: 'heading',
      title: 'Judul Utama Seksi',
      type: 'string',
      initialValue: 'Diskusi & Kolaborasi Para Expert'
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Seksi',
      type: 'text',
    }),
    
    // DAFTAR TOPIK
    defineField({
      name: 'topics',
      title: 'Daftar Topik Diskusi',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Judul Topik' },
            { name: 'desc', type: 'text', title: 'Deskripsi Singkat' },
            {
              name: 'icon',
              title: 'Ikon',
              type: 'string',
              options: {
                list: [
                  { title: 'Orang (Users)', value: 'Users' },
                  { title: 'Pesan (Message)', value: 'MessageSquare' },
                  { title: 'Kalender (Calendar)', value: 'Calendar' },
                  { title: 'Lampu (Idea)', value: 'Lightbulb' },
                ],
              },
            },
          ],
        },
      ],
    }),
    
    // TOMBOL
    defineField({
      name: 'buttonText',
      title: 'Teks Tombol',
      type: 'string',
      initialValue: 'Lihat Jadwal Diskusi'
    }),
  ],
})