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
      title: "Judul Penjelasan PUSPIPTEK",
      type: "string",
    }),

    defineField({
      name: "penjelasanPusiptekImage",
      title: "Gambar PUSPIPTEK",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "penjelasanPusiptekContent",
      title: "Isi Penjelasan PUSPIPTEK",
      type: "blockContent",
    }),

    /* ===============================
       TENTANG PPRNP
    =============================== */
    defineField({
      name: "tentangPPRNPTitle",
      title: "Judul Tentang PPRNP",
      type: "string",
    }),

    defineField({
      name: "tentangPPRNPImage",
      title: "Gambar PPRNP",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "tentangPPRNPContent",
      title: "Isi Tentang PPRNP",
      type: "blockContent",
    }),

    /* ===============================
       VISI MISI NILAI
    =============================== */
    defineField({
      name: "visi",
      title: "Visi",
      type: "text",
    }),

    defineField({
      name: "misi",
      title: "Misi",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "nilai",
      title: "Nilai",
      type: "array",
      of: [{ type: "string" }],
    }),

    /* ===============================
       STRUKTUR ORGANISASI (FINAL)
    =============================== */
    defineField({
      name: "pengurus",
      title: "Struktur Pengurus",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "nama",
              title: "Nama",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "jabatan",
              title: "Jabatan",
              type: "string",
              options: {
                list: [
                  { title: "Penasehat", value: "penasehat" },
                  { title: "Ketua", value: "ketua" },
                  { title: "Wakil Ketua", value: "wakil_ketua" },
                  { title: "Sekretaris", value: "sekretaris" },
                  { title: "Bendahara", value: "bendahara" },
                  { title: "Koordinator", value: "koordinator" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "level",
              title: "Level Struktur",
              type: "string",
              options: {
                list: [
                  { title: "Penasehat", value: "penasehat" },
                  { title: "Inti", value: "inti" },
                  { title: "Bidang", value: "bidang" },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "bidang",
              title: "Bidang (Opsional)",
              type: "string",
              description: "Isi jika jabatan Koordinator",
            }),
          ],
        },
      ],
    }),
  ],
})
