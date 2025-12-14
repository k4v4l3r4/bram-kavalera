import { notFound } from "next/navigation"
import Image from "next/image"
import type { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { PortableTextRenderer } from "@/components/PortableTextRenderer"
import type { PortableTextBlock } from "@portabletext/types"

/* ================= TYPES ================= */
interface Product {
  name: string
  description?: PortableTextBlock[]
  category?: string
  imageUrl?: string
  whatsapp?: string
}

/* ================= FETCH ================= */
async function getProduct(slug: string): Promise<Product | null> {
  return client.fetch(
    `*[_type=="productInnovation" && slug.current==$slug][0]{
      name,
      description,
      category,
      whatsapp,
      "imageUrl": image.asset->url
    }`,
    { slug }
  )
}

/* ================= SEO ================= */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan | PPRNP",
    }
  }

  return {
    title: `${product.name} | Produk Inovasi PPRNP`,
    description: `Detail dan informasi produk ${product.name} dari PPRNP.`,
  }
}

/* ================= PAGE ================= */
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) return notFound()

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* IMAGE */}
          <div className="relative w-full h-[320px] rounded-3xl overflow-hidden border bg-muted">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div>
            {product.category && (
              <span className="inline-block mb-3 rounded-full bg-blue-50 text-blue-700 px-4 py-1 text-xs font-semibold">
                {product.category}
              </span>
            )}

            <h1 className="text-3xl md:text-4xl font-extrabold mb-6">
              {product.name}
            </h1>

            {/* DESCRIPTION (PORTABLE TEXT) */}
           {product.description && (
  <div className="prose prose-lg max-w-none mb-8">
    <PortableTextRenderer blocks={product.description} />
  </div>
)}


            <hr className="my-8 border-muted" />

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              {product.whatsapp && (
                <a
                  href={`https://wa.me/${product.whatsapp}?text=Halo, saya tertarik dengan produk ${product.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition"
                >
                  Konsultasi WhatsApp
                </a>
              )}

              <a
                href="/#product-innovation"
                className="rounded-full border px-6 py-3 font-semibold hover:bg-muted transition"
              >
                ← Kembali ke Produk
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
