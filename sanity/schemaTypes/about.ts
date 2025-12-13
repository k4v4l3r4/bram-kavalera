import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About Section (Tentang Kami)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Utama',
      type: 'string',
      initialValue: 'Membangun Kebersamaan di Lingkungan Teknologi'
    }),

    //-----------------------------------------
    // 1. PENJELASAN TENTANG PUSIPTEK
    //-----------------------------------------
    defineField({
      name: 'penjelasanPusiptek',
      title: 'Penjelasan Tentang Pusiptek',
      type: 'blockContent',
    }),

    //-----------------------------------------
    // 2. TENTANG PPRNP (editable nanti dari sekretariat)
    //-----------------------------------------
    defineField({
      name: 'tentangPPRNP',
      title: 'Tentang PPRNP',
      type: 'blockContent',
    }),

    //-----------------------------------------
    // 3. PENGURUS PPRNP
    //-----------------------------------------
    defineField({
      name: 'pengurus',
      title: 'Pengurus PPRNP',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Pengurus',
          fields: [
            { name: 'nama', title: 'Nama Pengurus', type: 'string' },
            { name: 'jabatan', title: 'Jabatan', type: 'string' },
            { name: 'foto', title: 'Foto', type: 'image' },
          ]
        }
      ]
    }),

    //-----------------------------------------
    // 4. DATA & INFORMASI PPRNP
    //-----------------------------------------
    defineField({
      name: 'dataInformasi',
      title: 'Data & Informasi PPRNP',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Data atau Dokumen',
          fields: [
            { name: 'judul', type: 'string', title: 'Judul Data/Informasi' },
            { name: 'file', type: 'file', title: 'Upload File (PDF/Dokumen)' },
            { name: 'deskripsi', type: 'text', title: 'Deskripsi Singkat' },
          ]
        }
      ]
    }),
  ],
})
