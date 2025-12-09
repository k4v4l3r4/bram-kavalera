// FILE: components/sections/hero.tsx
"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import type { SanityImageSource } from "@sanity/image-url/lib/types"
import { motion } from "framer-motion"

interface Institution {
  label: string
  logo: SanityImageSource
  alt?: string
}

interface HeroData {
  title: string
  subtitle: string
  images: SanityImageSource[]
  institutions: Institution[]
}

async function getHeroData(): Promise<HeroData | null> {
  const query = `*[_type == "hero"][0]{
    title,
    subtitle,
    images,
    institutions
  }`
  try {
    const data = await client.fetch(query, {}, { next: { revalidate: 3600 } })
    return data
  } catch (error) {
    console.error("Gagal mengambil data hero:", error)
    return null
  }
}

export default function HeroSection() {
  const [data, setData] = useState<HeroData | null>(null)

  useEffect(() => {
    getHeroData().then(setData)
  }, [])

  if (!data?.title) {
    return (
      <section className="py-32 text-center container bg-gray-50">
        <h2 className="text-2xl font-bold">Data Hero Belum Tersedia</h2>
        <p className="text-muted-foreground">
          Silakan cek Environment Variables Vercel Anda.
        </p>
      </section>
    )
  }

  const heroImage = data.images?.[0] || null

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background gradient animasi */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-purple-500 to-pink-500 animate-gradient-x opacity-20" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* === KONTEN TEKS === */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-4xl md:text-6xl font-bold tracking-tight"
              >
                {data.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0"
              >
                {data.subtitle}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-pink-500 px-8 text-sm font-medium text-white shadow-lg transition-transform duration-300 hover:scale-105"
              >
                VISI & MISI
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>

            {/* === LOGO INSTITUSI === */}
            {data.institutions?.length > 0 && (
              <div className="pt-8 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-4 font-medium">
                  Didukung oleh:
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-10">
                  {data.institutions.map((inst, index) => {
                    if (!inst.logo) return null
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.15 }}
                        className="relative h-24 w-24"
                      >
                        <Image
                          src={urlFor(inst.logo)
                            .width(300)
                            .auto("format")
                            .quality(90)
                            .url()}
                          alt={inst.alt || inst.label || "Institution Logo"}
                          fill
                          loading="lazy"
                          decoding="async"
                          className="object-contain brightness-110 contrast-110 hover:drop-shadow-lg transition"
                          sizes="96px"
                        />
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* === GAMBAR HERO === */}
          <div className="flex-1 w-full max-w-[600px] lg:max-w-none">
            {heroImage ? (
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border group"
              >
                <Image
                  src={urlFor(heroImage)
                    .width(1200)
                    .auto("format")
                    .quality(80)
                    .url()}
                  alt={(heroImage as any).alt || "Hero Image"}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            ) : (
              <div
                className="aspect-video bg-muted rounded-xl flex items-center justify-center text-muted-foreground"
                aria-hidden="true"
              >
                No Image Uploaded
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}