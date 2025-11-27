import { defineField, defineType } from 'sanity'

export const expertForumType = defineType({
  name: 'expertForum',
  title: 'Expert Forum (Header & Banner)',
  type: 'document',
  fields: [
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
    defineField({
      name: 'image',
      title: 'Foto Utama (Banner)',
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
      title: 'Jadwal',
      type: 'string',
      initialValue: 'Setiap Jumat, 19:00 WIB'
    }),
    defineField({
      name: 'buttonText',
      title: 'Teks Tombol',
      type: 'string',
      initialValue: 'Lihat Jadwal Diskusi'
    }),
    // BAGIAN TOPICS/CLUSTERS SUDAH DIHAPUS DARI SINI
  ],
})