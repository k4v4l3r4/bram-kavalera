"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { client } from "@/sanity/lib/client"
import { PortableTextRenderer } from "@/components/PortableTextRenderer"
import type { PortableTextBlock } from "@portabletext/types"

interface Product {
  name?: string
  slug?: { current?: string }
  category?: string
  description?: PortableTextBlock[]
  imageUrl?: string
}

export function ProductInnovation() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    client
      .fetch(
        `*[_type=="productInnovation" && defined(slug.current)]{
          name,
          slug,
          category,
          description,
          "imageUrl": image.asset->url
        }`
      )
      .then(setProducts)
      .catch(console.error)
  }, [])

  if (!products.length) return null

  return (
    <section id="product-innovation" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
          Produk Branding & Inovasi
        </h2>

        <div
          className={`grid gap-8 ${
            products.length === 1
              ? "grid-cols-1 max-w-md mx-auto"
              : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {products.map((product, i) => {
            const slug = product.slug?.current

            return (
              <motion.div
                key={slug || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden border bg-white shadow hover:shadow-xl transition"
              >
                {/* IMAGE */}
                <div className="relative h-52 bg-muted">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name || "Produk"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                      No Image
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col h-full">
                  {product.category && (
                    <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-full w-fit">
                      {product.category}
                    </span>
                  )}

                  <h3 className="mt-3 text-xl font-bold">
                    {product.name || "Produk Tanpa Nama"}
                  </h3>

                  {/* DESCRIPTION (PORTABLE TEXT – SAFE) */}
                  {product.description && (
                    <div className="mt-2 text-sm text-muted-foreground line-clamp-4">
                      <PortableTextRenderer blocks={product.description} />
                    </div>
                  )}

                  {/* CTA */}
                  {slug ? (
                    <Link
                      href={`/produk/${slug}`}
                      className="mt-5 inline-flex w-full justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90"
                    >
                      Lihat Detail →
                    </Link>
                  ) : (
                    <span className="mt-5 inline-flex w-full justify-center rounded-full bg-muted px-5 py-2 text-sm font-semibold text-muted-foreground cursor-not-allowed">
                      Detail belum tersedia
                    </span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
