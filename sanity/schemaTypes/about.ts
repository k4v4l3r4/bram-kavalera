// sanity/schemas/about.ts
import { defineType, defineField } from "sanity"

export const aboutType = defineType({
  name: "about",
  title: "About Section (Tentang Kami)",
  type: "document",

  fields: [
    /* ===============================
       JUDUL HALAMAN
    =============================== */
    defineField({
      name: "title",
      title: "Judul Halaman",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    /* ===============================
       PENJELASAN PUSPIPTEK
    =============================== */
    defineField({
      name: "penjelasanPusiptekTitle",
      title: "Judul Penjelasan Pusiptek",
      type: "string",
      initialValue: "Penjelasan Pusiptek",
    }),

    defineField({
      name: "penjelasanPusiptekImage",
      title: "Gambar Penjelasan Pusiptek",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "penjelasanPusiptekContent",
      title: "Isi Penjelasan Pusiptek",
      type: "blockContent",
    }),

    /* ===============================
       TENTANG PPRNP
    =============================== */
    defineField({
      name: "tentangPPRNPTitle",
      title: "Judul Tentang PPRNP",
      type: "string",
      initialValue: "Tentang PPRNP",
    }),

    defineField({
      name: "tentangPPRNPImage",
      title: "Gambar Tentang PPRNP",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "tentangPPRNPContent",
      title: "Isi Tentang PPRNP",
      type: "blockContent",
    }),

    /* ===============================
       VISI, MISI, NILAI
    =============================== */
    defineField({
      name: "visi",
      title: "Visi PPRNP",
      type: "text",
      rows: 3,
      description: "Visi organisasi dalam satu pernyataan strategis",
    }),

    defineField({
      name: "misi",
      title: "Misi PPRNP",
      type: "array",
      of: [{ type: "string" }],
      description: "Daftar misi dalam bentuk poin-poin",
    }),

    defineField({
      name: "nilai",
      title: "Nilai-Nilai PPRNP",
      type: "array",
      of: [{ type: "string" }],
      description: "Nilai utama yang dijunjung organisasi",
    }),

    /* ===============================
       PENGURUS
    =============================== */
    defineField({
      name: "pengurus",
      title: "Pengurus PPRNP",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "nama",
              title: "Nama",
              type: "string",
            }),
            defineField({
              name: "jabatan",
              title: "Jabatan",
              type: "string",
            }),
            defineField({
              name: "foto",
              title: "Foto",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        },
      ],
    }),

    /* ===============================
       DATA & INFORMASI
    =============================== */
    defineField({
      name: "dataInformasi",
      title: "Data & Informasi",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "judul",
              title: "Judul",
              type: "string",
            }),
            defineField({
              name: "deskripsi",
              title: "Deskripsi",
              type: "text",
            }),
            defineField({
              name: "file",
              title: "File",
              type: "file",
            }),
          ],
        },
      ],
    }),
  ],
})
