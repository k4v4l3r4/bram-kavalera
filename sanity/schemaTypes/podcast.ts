import { defineField, defineType } from 'sanity'

export const podcastType = defineType({
  name: 'podcast',
  title: 'Podcast Section',
  type: 'document',
  fields: [
    // BAGIAN KIRI (INFO SEKSI)
    defineField({
      name: 'title',
      title: 'Judul Seksi',
      type: 'string',
      initialValue: 'Suara Warga & Inspirasi Tokoh'
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
      initialValue: 'Dengarkan bincang santai namun berbobot bersama para ahli.'
    }),
    // 👇👇 UPDATE BAGIAN INI 👇👇
    defineField({
      name: 'spotifyUrl',
      title: 'Link Profil Spotify',
      type: 'url',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'Link Profil YouTube',
      type: 'url',
    }),
      
    // BAGIAN KANAN (DAFTAR EPISODE)
    defineField({
      name: 'episodes',
      title: 'Daftar Episode',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Judul Episode' },
            { name: 'guest', type: 'string', title: 'Nama Tamu' },
            { name: 'duration', type: 'string', title: 'Durasi (misal: 45 min)' },
            
            // 👇 INI BAGIAN BARU YANG DITAMBAHKAN 👇
            defineField({ 
              name: 'url', 
              type: 'url', 
              title: 'Link Episode',
              description: 'Link langsung ke lagu/episode ini (Spotify/Youtube)' 
            }),
            // 👆 --------------------------------- 👆

            { 
              name: 'cover', 
              type: 'image', 
              title: 'Cover Album',
              options: { hotspot: true }
            },
          ],
        },
      ],
    }),
  ],
})