"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import type { SanityImageSource } from "@sanity/image-url/lib/types"
import { useEffect, useState } from "react"

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

export default function HeroSection() {
  const [data, setData] = useState<HeroData | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "hero"][0]{title, subtitle, images, institutions}`
      try {
        const result = await client.fetch(query)
        setData(result)
      } catch (err) {
        console.error("Gagal ambil data hero:", err)
      }
    }
    fetchData()
  }, [])

  // === AUTO SLIDE ===
  useEffect(() => {
    if (!data?.images?.length) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.images.length)
    }, 5000) // ganti tiap 5 detik
    return () => clearInterval(interval)
  }, [data?.images])

  if (!data?.title) {
    return (
      <section className="py-32 text-center container bg-gray-50">
        <h2 className="text-2xl font-bold">Data Hero Belum Tersedia</h2>
        <p className="text-muted-foreground">Silakan cek Environment Variables Vercel Anda.</p>
      </section>
    )
  }

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden animate-gradient">
      <div className="container px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* === TEKS === */}
        <div className="space-y-8 text-center lg:text-left">
          <span className="inline-block px-4 py-1 text-xs font-bold text-white bg-blue-600 rounded-full shadow">
            Official Website PPRNP
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 drop-shadow">
            PURNABHAKTI
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-700 drop-shadow">
            BATAN · BPPT
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-700 drop-shadow">
            LIPI · PUSPIPTEK
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {data.subtitle}
          </p>
          <Link
            href="/about"
            className="inline-block px-8 py-3 font-medium text-white bg-blue-600 rounded-full shadow-lg hover:scale-105 transition-all duration-500"
          >
            ABOUT US <ArrowRight className="inline h-4 w-4 ml-2" />
          </Link>
        </div>

        {/* === GAMBAR SLIDE AUTO === */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-white/20 backdrop-blur-md bg-white/10 shadow-xl">
          <AnimatePresence mode="wait">
            {data.images?.[activeIndex] && (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={urlFor(data.images[activeIndex]).width(1600).auto("format").quality(85).url()}
                  alt={`Hero Image ${activeIndex + 1}`}
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
