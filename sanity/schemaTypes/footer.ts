import { defineField, defineType } from 'sanity'

export const footerType = defineType({
  name: 'footer',
  title: 'Footer (Sosmed & Brand)',
  type: 'document',
  fields: [
    // Bagian Brand (Kiri Bawah)
    defineField({
      name: 'brandDescription',
      title: 'Deskripsi Singkat (Bawah Logo)',
      type: 'blockContent',
      rows: 3,
      initialValue: 'Wadah silaturahmi dan kolaborasi warga untuk menciptakan lingkungan yang harmonis.'
    }),

    // Social Media Links
    defineField({
      name: 'socialInstagram',
      title: 'Link Instagram',
      type: 'url',
    }),
    defineField({
      name: 'socialFacebook',
      title: 'Link Facebook',
      type: 'url',
    }),
    defineField({
      name: 'socialYoutube',
      title: 'Link YouTube',
      type: 'url',
    }),

    // Bagian Newsletter (Atas)
    defineField({
      name: 'newsletterTitle',
      title: 'Judul Newsletter',
      type: 'string',
      initialValue: 'Tetap Terhubung Bersama Kami'
    }),
    defineField({
      name: 'newsletterDesc',
      title: 'Deskripsi Newsletter',
      type: 'blockContent',
      initialValue: 'Dapatkan informasi terbaru seputar kegiatan dan pengumuman.'
    }),
  ],
})