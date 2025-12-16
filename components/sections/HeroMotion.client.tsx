"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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
    transformPerspective: 600
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    rotateX: 0,
    transition: { duration: 0.12, ease: "easeOut" }
  }
}

function InstitutionLogo({ logo, alt, label }: Institution) {
  return (
    <div className="flex items-center justify-center h-20 w-20 p-2 bg-white/10 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1">
      <Image
        src={urlFor(logo).width(200).auto("format").quality(90).url()}
        alt={alt || label || "Institution Logo"}
        width={80}
        height={80}
        className="object-contain brightness-110 contrast-110"
      />
    </div>
  )
}

export default function HeroMotion({ data }: { data: HeroData }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!data.images?.length) return
    const interval = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % data.images.length),
      5000
    )
    return () => clearInterval(interval)
  }, [data.images])

  return (
    <section className="relative pt-16 sm:pt-20 lg:pt-28 pb-6 overflow-hidden animate-gradient">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-10 items-center">

          {/* TEKS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 text-center lg:text-left max-w-xl mx-auto lg:mx-0"
          >
            <span className="inline-block px-4 py-1 text-xs font-bold text-white bg-blue-600 rounded-full">
              Official Website PPRNP
            </span>

            {["PURNABHAKTI", "BATAN · BPPT", "LIPI · PUSPIPTEK"].map((text, i) => (
              <motion.h2
                key={i}
                className="text-5xl md:text-6xl font-extrabold text-blue-700"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
              >
                {text.split("").map((char, j) => (
                  <motion.span key={j} variants={letterVariants}>
                    {char}
                  </motion.span>
                ))}
              </motion.h2>
            ))}

            <p className="text-lg text-muted-foreground">
              {data.subtitle}
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full hover:scale-105 transition"
            >
              ABOUT US <ArrowRight className="h-4 w-4" />
            </Link>

            {data.institutions?.length > 0 && (
              <div className="pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-4">Didukung oleh:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {data.institutions.map((inst, i) => (
                    <InstitutionLogo key={i} {...inst} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* IMAGE SLIDER */}
          <div className="relative w-full max-w-[520px] h-[360px] md:h-[480px] rounded-2xl overflow-hidden">
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
                    src={urlFor(data.images[activeIndex]).width(1600).url()}
                    alt="Hero Image"
                    fill
                    priority
                    className="object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
