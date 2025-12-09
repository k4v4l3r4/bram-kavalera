// FILE: schemas/announcements.ts
import { defineField, defineType } from "sanity"

export const announcementsType = defineType({
  name: "announcements",
  title: "Announcements (Pengumuman)",
  type: "document",
  fields: [
    // BAGIAN JUDUL SEKSI
    defineField({
      name: "title",
      title: "Judul Seksi",
      type: "string",
      initialValue: "Pengumuman & Berita",
    }),
    defineField({
      name: "description",
      title: "Deskripsi Seksi",
      type: "blockContent",
      // Tidak pakai initialValue string, isi manual di Studio
    }),

    // BAGIAN DAFTAR BERITA
    defineField({
      name: "items",
      title: "Daftar Berita",
      type: "array",
      of: [
        defineType({
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Judul Berita",
            }),
            defineField({
              name: "date",
              type: "date",
              title: "Tanggal Tayang",
              options: { dateFormat: "YYYY-MM-DD" }, // format aman
            }),
            defineField({
              name: "category",
              title: "Kategori / Label",
              type: "string",
              options: {
                list: [
                  { title: "Info Penting", value: "Info Penting" },
                  { title: "Agenda", value: "Agenda" },
                  { title: "Keamanan", value: "Keamanan" },
                  { title: "Sosial", value: "Sosial" },
                  { title: "Berita Duka", value: "Berita Duka" },
                ],
              },
            }),
            defineField({
              name: "readTime",
              type: "string",
              title: "Waktu Baca (misal: 2 min read)",
              initialValue: "2 min read",
            }),
            defineField({
              name: "image",
              type: "image",
              title: "Foto Utama",
              options: { hotspot: true },
            }),
            defineField({
              name: "excerpt",
              type: "blockContent",
              title: "Ringkasan Berita (Excerpt)",
            }),
          ],
        }),
      ],
    }),
  ],
})