import { defineField, defineType } from 'sanity'

export const expertClustersType = defineType({
  name: 'expertClusters',
  title: 'Expertise Profile', // <-- JUDUL DOKUMEN BARU
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Seksi',
      type: 'string',
      initialValue: 'Expertise Profile' // <-- INITIAL VALUE BARU
    }),
    defineField({
      name: 'clusters',
      title: 'Daftar Klaster',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Nama Klaster (misal: AGRICULTURE)' },
            { name: 'description', type: 'blockContent', title: 'Deskripsi Singkat' },
            {
              name: 'icon',
              title: 'Pilih Ikon',
              type: 'string',
              options: {
                list: [
                  { title: 'Tanaman (Agriculture)', value: 'Sprout' },
                  { title: 'Daun (Agriculture Alt)', value: 'Leaf' },
                  { title: 'Petir (Energy)', value: 'Zap' },
                  { title: 'Matahari (Energy Alt)', value: 'Sun' },
                  { title: 'Roda Gigi (Engineering)', value: 'Cog' },
                  { title: 'Kunci Inggris (Engineering Alt)', value: 'Wrench' },
                  { title: 'Tas Kerja (Management)', value: 'Briefcase' },
                  { title: 'Grafik Naik (Management Alt)', value: 'TrendingUp' },
                  { title: 'Jantung (Kesehatan)', value: 'HeartPulse' },
                  { title: 'Perisai (Keamanan)', value: 'ShieldCheck' },
                  { title: 'Lampu (Ide)', value: 'Lightbulb' },
                  { title: 'Mikroskop (Edukasi)', value: 'Microscope' },
                ],
              },
            },
            // DAFTAR PAKAR DI DALAM KLASTER
            {
              name: 'experts',
              title: 'Daftar Pakar',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'name', title: 'Nama Pakar', type: 'string' },
                    { name: 'role', title: 'Keahlian', type: 'string' },
                    { name: 'photo', title: 'Foto Pakar', type: 'image', options: { hotspot: true } },
                    { 
                      name: 'whatsapp', 
                      title: 'Nomor WhatsApp (628...)', 
                      type: 'string',
                      description: 'Gunakan format 628123456789 (tanpa + atau spasi)'
                    }
                  ]
                }
              ]
            }
          ],
        },
      ],
    }),
  ],
})