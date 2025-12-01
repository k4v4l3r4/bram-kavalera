"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play } from "lucide-react"
import { motion } from "framer-motion"
import useSWR from "swr"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

// ==============================
// FETCHER UNTUK SWR (AMAN)
// ==============================
const fetcher = (query: string) =>
  client.fetch(query, {}, { next: { revalidate: 3600 } })

// ==============================
// IMAGE OPTIMIZER
// ==============================
const img = (src: any, w = 1600, q = 70) =>
  urlFor(src).width(w).quality(q).auto("format").url()

// ==============================
// QUERY SANITY
// ==============================
const HERO_QUERY = `
  *[_type == "hero"][0] {
    title,
    subtitle,
    images,
    institutions
  }
`

// ==============================
// COMPONENT HERO SECTION
// ==============================
export default function HeroSection() {
  // gunakan SWR agar aman & tidak hang
  const { data, error } = useSWR(HERO_QUERY, fetcher)

  if (error) {
    return (
      <section className="py-32 text-center container">
        <h2 className="text-2xl font-bold">Gagal memuat data</h2>
        <p className="text-muted-foreground">Periksa koneksi Sanity</p>
      </section>
    )
  }

  if (!data) {
    return (
      <section className="py-32 text-center container">
        <h2 className="text-xl font-bold">Memuat...</h2>
      </section>
    )
  }

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="container px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12">

        {/* ===============================
            BAGIAN TEKS + ANIMASI
        ================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-8 text-center lg:text-left"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {data.title}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              {data.subtitle}
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <Link
              href="/#expert-clusters"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Jelajahi Expertise
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="/#about"
              className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Play className="mr-2 h-4 w-4 fill-current" />
              Tentang Kami
            </Link>
          </div>

          {/* ===============================
              LOGO INSTITUSI
          ================================ */}
          {data.institutions?.length > 0 && (
            <div className="pt-8 border-t border-border/50 grayscale opacity-80 hover:opacity-100 transition-opacity">
              <p className="text-sm text-muted-foreground mb-4 font-medium">
                Didukung oleh:
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                {data.institutions.map((inst: any, idx: number) => (
                  <div key={idx} className="relative h-10 w-24">
                    <Image
                      src={img(inst.logo, 300, 60)}
                      alt={inst.alt || inst.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* ===============================
            GAMBAR HERO + ANIMASI
        ================================ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1 w-full max-w-[600px]"
        >
          <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border">
            <Image
              src={img(data.images?.[0], 1800, 65)}
              alt={data.images?.[0]?.alt || "Hero Image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
