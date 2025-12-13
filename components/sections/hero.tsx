// === HERO SECTION UPDATED WITH 3D TEXT + LETTER BY LETTER ===

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

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(6px)",
    rotateX: 35,
    transformPerspective: 600,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    rotateX: 0,
    transition: { duration: 0.12, ease: "easeOut" },
  },
}

function InstitutionLogo({ logo, alt, label }: Institution) {
  return (
    <div className="flex items-center justify-center h-24 w-24 p-2 bg-white/10 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1">
      <Image
        src={urlFor(logo).width(200).auto("format").quality(90).url()}
        alt={alt || label || "Institution Logo"}
        width={96}
        height={96}
        loading="lazy"
        decoding="async"
        className="object-contain brightness-110 contrast-110"
      />
    </div>
  )
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />

      <div className="container px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* === TEKS === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-8 text-center lg:text-left"
        >
          <span className="inline-block px-4 py-1 text-xs font-bold text-white bg-blue-600 rounded-full shadow">
            Official Website PPRNP
          </span>

          <div className="space-y-4 text-balance group transition-transform duration-700 ease-out">
            {["PURNABHAKTI", "BATAN · BPPT", "LIPI · PUSPIPTEK"].map((text, i) => (
              <motion.h2
                key={i}
                className={`text-${i === 0 ? "5xl md:text-6xl" : "4xl md:text-5xl"} font-bold text-blue-700 drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)]`}
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: i * 0.8 } } }}
              >
                {text.split("").map((char, j) => (
                  <motion.span key={j} variants={letterVariants}>
                    {char}
                  </motion.span>
                ))}
              </motion.h2>
            ))}
          </div>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {data.subtitle}
          </p>

          <Link
            href="/about"
            className="relative inline-block px-8 py-3 font-medium text-white bg-blue-600 rounded-full overflow-hidden group shadow-lg hover:shadow-blue-500/40 hover:scale-105 transition-all duration-500 cta-pulse"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
            <span className="relative z-10 flex items-center gap-2 animate-pulse">
              ABOUT US <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          {data.institutions?.length > 0 && (
            <div className="pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4 font-medium">Didukung oleh:</p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-10">
                {data.institutions.map((inst, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <InstitutionLogo {...inst} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

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
