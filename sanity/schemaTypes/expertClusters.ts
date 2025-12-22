import { defineField, defineType } from 'sanity'

export const expertClustersType = defineType({
  name: 'expertClusters',
  title: 'Expertise Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Seksi',
      type: 'string',
      initialValue: 'Expertise Profile'
    }),
    defineField({
      name: 'clusters',
      title: 'Daftar Klaster',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Nama Klaster (misal: AGRICULTURE)'
            },
            {
              name: 'description',
              type: 'blockContent',
              title: 'Deskripsi Singkat'
            },
            {
              name: 'icon',
              title: 'Pilih Ikon',
              type: 'string',
              options: {
                list: [
                  // AGRICULTURE & BIOTECH
                  { title: 'Tanaman (Agriculture)', value: 'Sprout' },
                  { title: 'Daun (Agriculture Alt)', value: 'Leaf' },

                  // ENERGY
                  { title: 'Petir (Energy)', value: 'Zap' },
                  { title: 'Matahari (Energy Alt)', value: 'Sun' },

                  // WATER & CLIMATE
                  { title: 'Tetes Air (Water Resources)', value: 'Droplets' },
                  { title: 'Globe (Environment & Climate)', value: 'Globe' },

                  // MANUFACTURING & ENGINEERING
                  { title: 'Roda Gigi (Engineering)', value: 'Cog' },
                  { title: 'Kunci Inggris (Engineering Alt)', value: 'Wrench' },
                  { title: 'Layer (Advanced Materials)', value: 'Layers' },

                  // MANAGEMENT & STRATEGY
                  { title: 'Tas Kerja (Management)', value: 'Briefcase' },
                  { title: 'Grafik Naik (Performance)', value: 'TrendingUp' },

                  // HEALTH
                  { title: 'Jantung (Health & Biomedical)', value: 'HeartPulse' },

                  // SOCIETY
                  { title: 'Pengguna (Social Empowerment)', value: 'Users' },

                  // SAFETY & DISASTER
                  { title: 'Perisai (Mitigation)', value: 'ShieldCheck' },

                  // EDUCATION / SKILL
                  { title: 'Lampu (Innovation)', value: 'Lightbulb' },
                  { title: 'Mikroskop (Research)', value: 'Microscope' }
                ],
              },
            },

            // DAFTAR PAKAR
            {
              name: 'experts',
              title: 'Daftar Pakar',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'name',
                      title: 'Nama Pakar',
                      type: 'string'
                    },
                    {
                      name: 'role',
                      title: 'Bidang / Peran',
                      type: 'string'
                    },
                    {
                      name: 'photo',
                      title: 'Foto Pakar',
                      type: 'image',
                      options: { hotspot: true }
                    },
                    {
                      name: 'whatsapp',
                      title: 'Nomor WhatsApp (628...)',
                      type: 'string',
                      description: 'Gunakan format 628123456789 (tanpa + atau spasi)'
                    },
                    {
                      name: 'linkedin',
                      title: 'LinkedIn Profile',
                      type: 'url',
                      description: 'Contoh: https://www.linkedin.com/in/username',
                      validation: Rule =>
                        Rule.uri({
                          scheme: ['http', 'https']
                        })
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
