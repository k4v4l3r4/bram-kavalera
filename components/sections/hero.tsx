// === HERO SECTION UPDATED WITH 3D TEXT + LETTER BY LETTER ===

"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
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

// === ANIMASI HURUF PER HURUF + EFEK 3D ===
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

export default function HeroSection() {
  const [data, setData] = useState<HeroData | null>(null)

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

  if (!data?.title) {
    return (
      <section className="py-32 text-center container bg-gray-50">
        <h2 className="text-2xl font-bold">Data Hero Belum Tersedia</h2>
        <p className="text-muted-foreground">Silakan cek Environment Variables Vercel Anda.</p>
      </section>
    )
  }

  const heroImage = data.images?.[0] || null

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden animate-gradient">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />

      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

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

            {/* === TEKS 3D ANIMATED === */}
            <div className="space-y-4 text-balance group transition-transform duration-700 ease-out">

              {/* PURNABHAKTI */}
              <motion.h1
                className="text-5xl md:text-6xl font-extrabold text-blue-800 drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)]"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
              >
                {"PURNABHAKTI".split("").map((char, i) => (
                  <motion.span key={i} variants={letterVariants}>
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              {/* BATAN · BPPT */}
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-blue-700 drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)]"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.7 } } }}
              >
                {"BATAN · BPPT".split("").map((char, i) => (
                  <motion.span key={i} variants={letterVariants}>
                    {char}
                  </motion.span>
                ))}
              </motion.h2>

              {/* LIPI · PUSPIPTEK */}
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-blue-700 drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)]"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 1.5 } } }}
              >
                {"LIPI · PUSPIPTEK".split("").map((char, i) => (
                  <motion.span key={i} variants={letterVariants}>
                    {char}
                  </motion.span>
                ))}
              </motion.h2>
            </div>

            <p className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {data.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
<Link
  href="/about"
  className="relative inline-block px-8 py-3 font-medium text-white bg-blue-600 rounded-full overflow-hidden group shadow-lg hover:shadow-blue-500/40 hover:scale-105 transition-all duration-500 cta-pulse"
>
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
  <span className="relative z-10 flex items-center gap-2 animate-pulse">
    ABOUT US <ArrowRight className="h-4 w-4" />
  </span>
</Link>
            </div>

            {data.institutions?.length > 0 && (
              <div className="pt-8 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-4 font-medium">Didukung oleh:</p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-10">
                  {data.institutions.map((inst, index) => {
                    if (!inst.logo) return null
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative h-24 w-24 transition-transform duration-300 hover:-translate-y-1"
                      >
                        <Image
                          src={urlFor(inst.logo).width(300).auto("format").quality(90).url()}
                          alt={inst.alt || inst.label || "Institution Logo"}
                          fill
                          loading="lazy"
                          decoding="async"
                          className="object-contain brightness-110 contrast-110"
                          sizes="96px"
                        />
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>

          {/* === GAMBAR HERO === */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full max-w-[600px] lg:max-w-none"
          >
            {heroImage ? (
              <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 backdrop-blur-md bg-white/10 shadow-xl group perspective">
                <Image
                  src={urlFor(heroImage).width(1200).auto("format").quality(80).url()}
                  alt={(heroImage as any).alt || "Hero Image"}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:rotate-y-6 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </div>
            ) : null}
          </motion.div>

        </div>
      </div>
    </section>
  )
}

