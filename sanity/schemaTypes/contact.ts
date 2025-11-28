import { defineField, defineType } from 'sanity'

export const contactType = defineType({
  name: 'contact',
  title: 'Contact Info (Hubungi Kami)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Seksi',
      type: 'string',
      initialValue: 'Hubungi Kami'
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat',
      type: 'blockContent',
      initialValue: 'Punya pertanyaan, saran, atau ingin berpartisipasi? Hubungi pengurus.'
    }),
    
    // INFO KONTAK
    defineField({
      name: 'address',
      title: 'Alamat Sekretariat',
      type: 'blockContent',
      rows: 3
    }),
    defineField({
      name: 'email',
      title: 'Alamat Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Nomor WhatsApp (Contoh: 628123456789)',
      type: 'string',
      description: 'Gunakan kode negara (62) di depan agar link WA berfungsi.'
    }),
  ],
})