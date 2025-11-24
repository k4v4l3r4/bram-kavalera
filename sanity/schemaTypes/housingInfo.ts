import { defineField, defineType } from 'sanity'

export const housingInfoType = defineType({
  name: 'housingInfo',
  title: 'Housing Info (Info Perumahan)',
  type: 'document',
  fields: [
    // BAGIAN KIRI (JUDUL & DESKRIPSI)
    defineField({
      name: 'title',
      title: 'Judul Seksi',
      type: 'string',
      initialValue: 'Informasi Rumah Negara'
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Seksi',
      type: 'text',
      initialValue: 'Panduan penting bagi penghuni kawasan Rumah Negara Puspiptek.'
    }),

    // BAGIAN DAFTAR KARTU INFO
    defineField({
      name: 'items',
      title: 'Daftar Kartu Info',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Judul Info' },
            { name: 'description', type: 'text', title: 'Isi Info' },
            {
              name: 'icon',
              title: 'Ikon',
              type: 'string',
              options: {
                list: [
                  { title: 'Sirine (Darurat)', value: 'Siren' },
                  { title: 'Bus (Transportasi)', value: 'Bus' },
                  { title: 'Gedung (Fasilitas)', value: 'Building2' },
                  { title: 'Pin Map (Lokasi)', value: 'MapPin' },
                ],
              },
            },
            {
              name: 'color',
              title: 'Warna Ikon',
              type: 'string',
              options: {
                list: [
                  { title: 'Merah', value: 'red' },
                  { title: 'Biru', value: 'blue' },
                  { title: 'Hijau', value: 'green' },
                  { title: 'Kuning', value: 'yellow' },
                ],
              },
            },
          ],
        },
      ],
    }),

    // BAGIAN KANAN (GALERI PETA - UPDATED)
    defineField({
      name: 'mapImages', // Nama field jamak (Array)
      title: 'Galeri Peta Kawasan',
      description: 'Upload beberapa gambar (Peta Evakuasi, Denah Blok, dll)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Judul Peta (misal: Jalur Evakuasi)',
            },
          ],
        },
      ],
    }),
  ],
})