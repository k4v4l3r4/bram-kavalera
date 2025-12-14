import { defineType, defineField } from "sanity"

export const productInnovation = defineType({
  name: "productInnovation",
  title: "Product Branding & Inovasi",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Nama Produk",
      type: "string",
      validation: (Rule) => Rule.required().min(3),
    }),

    defineField({
      name: "slug",
      title: "Slug URL",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().error("Slug wajib diisi dan tidak boleh kosong"),
    }),

    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Branding", value: "Branding" },
          { title: "Inovasi", value: "Inovasi" },
        ],
        layout: "radio",
      },
      validation: (Rule) =>
        Rule.required().error("Kategori wajib dipilih"),
    }),

    defineField({
      name: "image",
      title: "Gambar Produk",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.required().error("Gambar produk wajib diisi"),
    }),

defineField({
  name: "description",
  title: "Deskripsi Produk",
  type: "blockContent",
  validation: (Rule) => Rule.required(),
}),


    defineField({
      name: "whatsapp",
      title: "Nomor WhatsApp",
      type: "string",
      description: "Gunakan format internasional, contoh: 628123456789",
      validation: (Rule) =>
        Rule.regex(/^62\d{9,13}$/, {
          name: "nomor whatsapp",
          invert: false,
        }).warning("Format WhatsApp sebaiknya 62xxxxxxxxx"),
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "image",
    },
  },
})
