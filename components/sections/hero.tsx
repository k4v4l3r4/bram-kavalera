// components/sections/hero.tsx
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

// NOTE:
// - Server component (fetch) + client component (animasi).
// - Simpan file ini utuh, jangan memecah kecuali paham.

type Institution = {
  label?: string
  logo?: any
  alt?: string
}

type HeroData = {
  title?: string
  subtitle?: string
  images?: any[]
  institutions?: Institution[]
}

// -----------------------------
// helper: build optimized image url
// -----------------------------
function img(url: any, w: number = 1200, q: number = 70) {
  try {
    return urlFor(url).width(w).quality(q).auto("format").url()
  } catch (e) {
    // fallback: jika urlFor error, kembalikan null
    return null
  }
}

// -----------------------------
// tiny inline SVG blur placeholder (very small, avoids extra fetch)
// -----------------------------
function tinyBlurDataURL(hex = "#f6f7f8") {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='10' viewBox='0 0 16 10'><rect width='16' height='10' fill='${hex}'/></svg>`
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`
}

// -----------------------------
// server: ambil data hero dari Sanity (ISR)
// -----------------------------
async function getHeroData(): Promise<HeroData | null> {
  const query = `*[_type == "hero"][0] { title, subtitle, images, institutions }`
  try {
    // next revalidate = 3600s (1 jam). aman dan cepat.
    // @ts-ignore
    return await client.fetch(query, {}, { next: { revalidate: 3600 } })
  } catch (err) {
    console.error("Gagal fetch hero:", err)
    return null
  }
}

// -----------------------------
// client component: berisi animasi & rendering safe
// -----------------------------
/* eslint-disable react/prop-types */
"use client"
import { motion } from "framer-motion"

function HeroClient({ data }: { data: HeroData }) {
  // safe checks
  const heroImageObj = data.images && data.images.length > 0 ? data.images[0] : null
  const heroImgSrc = heroImageObj ? img(heroImageObj, 1400, 70) : null

  const institutions = Array.isArray(data.institutions) ? data.institutions : []

  return (
    <section className="relative pt-28 pb-16 lg:pt-44 lg:pb-28 overflow-hidden">
      {/* light background (GPU-friendly) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/6 via-background to-background will-change-transform" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10">

          {/* LEFT: text + buttons + logos */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 space-y-6 text-center lg:text-left"
          >
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                {data.title || "Judul Tidak Diisi"}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                {data.subtitle || "Subjudul belum tersedia."}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link
                href="/#expert-clusters"
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:translate-y-[-1px] active:translate-y-0"
              >
                Jelajahi Expertise
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/#about"
                className="inline-flex h-11 items-center justify-center rounded-full border border-input bg-background px-6 text-sm font-medium shadow-sm transition-transform hover:translate-y-[-1px]"
              >
                <Play className="mr-2 h-4 w-4" />
                Tentang Kami
              </Link>
            </div>

            {/* logos */}
            {institutions.length > 0 && (
              <div className="pt-6 border-t border-border/40">
                <p className="text-sm text-muted-foreground mb-3 font-medium">Didukung oleh:</p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 opacity-80 transition-opacity">
                  {institutions.map((inst: Institution, idx: number) => {
                    // safe: hanya render jika ada asset (inst.logo.asset)
                    const hasAsset = !!inst?.logo?.asset
                    const src = hasAsset ? img(inst.logo, 360, 60) : null
                    return (
                      <div key={idx} className="flex items-center justify-center h-8 w-20 shrink-0">
                        {hasAsset && src ? (
                          <Image
                            src={src}
                            alt={inst.alt || inst.label || `logo-${idx}`}
                            width={120}
                            height={40}
                            className="object-contain"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={tinyBlurDataURL("#f6f7f8")}
                          />
                        ) : (
                          <div className="h-8 w-20 bg-gray-100 rounded-md flex items-center justify-center text-xs text-muted-foreground">
                            {inst.label || "Logo"}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>

          {/* RIGHT: hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full max-w-[640px] lg:max-w-none"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border will-change-transform">
              {heroImgSrc ? (
                // use fixed width/height instead of fill to avoid heavy layout
                <Image
                  src={heroImgSrc}
                  alt={heroImageObj?.alt || "Hero Image"}
                  width={1200}
                  height={900} // 4:3-ish
                  className="w-full h-auto object-cover block"
                  loading="eager"
                  placeholder="blur"
                  blurDataURL={tinyBlurDataURL("#eceff1")}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-muted flex items-center justify-center text-muted-foreground">
                  Belum ada gambar hero
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// -----------------------------
// Server component: fetch + pass to client
// -----------------------------
export default async function HeroSection() {
  const data = await getHeroData()

  // jika data null atau tidak ada, kembalikan fallback ringan
  if (!data) {
    return (
      <section className="py-24 text-center container">
        <h2 className="text-2xl font-bold">Data Hero belum tersedia</h2>
        <p className="text-muted-foreground">Silakan isi di Sanity Studio.</p>
      </section>
    )
  }

  // render client component (animasi) dengan data aman
  return <HeroClient data={data} />
}
