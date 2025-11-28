import { defineField, defineType } from 'sanity'

export const announcementsType = defineType({
  name: 'announcements',
  title: 'Announcements (Pengumuman)',
  type: 'document',
  fields: [
    // BAGIAN JUDUL SEKSI
    defineField({
      name: 'title',
      title: 'Judul Seksi',
      type: 'string',
      initialValue: 'Pengumuman & Berita'
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Seksi',
      type: 'blockContent',
      initialValue: 'Informasi terkini seputar kegiatan dan himbauan untuk warga.'
    }),

    // BAGIAN DAFTAR BERITA
    defineField({
      name: 'items',
      title: 'Daftar Berita',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Judul Berita' },
            { 
              name: 'date', 
              type: 'date', 
              title: 'Tanggal Tayang',
              options: { dateFormat: 'DD-MM-YYYY' } 
            },
            {
              name: 'category',
              title: 'Kategori / Label',
              type: 'string',
              options: {
                list: [
                  { title: 'Info Penting', value: 'Info Penting' },
                  { title: 'Agenda', value: 'Agenda' },
                  { title: 'Keamanan', value: 'Keamanan' },
                  { title: 'Sosial', value: 'Sosial' },
                  { title: 'Berita Duka', value: 'Berita Duka' },
                ],
              },
            },
            { 
              name: 'readTime', 
              type: 'string', 
              title: 'Waktu Baca (misal: 2 min read)',
              initialValue: '2 min read'
            },
            { 
              name: 'image', 
              type: 'image', 
              title: 'Foto Utama',
              options: { hotspot: true }
            },
            { 
              name: 'excerpt', 
              type: 'blockContent', 
              title: 'Ringkasan Berita (Excerpt)',
              rows: 3
            },
          ],
        },
      ],
    }),
  ],
})