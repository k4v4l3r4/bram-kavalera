"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, X } from "lucide-react"
import { client } from "@/sanity/lib/client"

interface HeroSectionProps {
  onToggleAbout?: () => void
  isAboutOpen?: boolean
}

export function HeroSection({ onToggleAbout, isAboutOpen = false }: HeroSectionProps) {
  const [data, setData] = useState<any>(null)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(`
          *[_type == "hero"][0]{
            title, subtitle,
            images[]{ label, alt, "src": asset->url },
            institutions[]{ label, alt, "src": logo.asset->url }
          }
        `)
        setData(result)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (!data?.images?.length) return
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % data.images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [data])

  const heroImages = data?.images || []
  const institutions = data?.institutions || []
  const titleText = data?.title || "MEDIA INFORMASI & KOMUNIKASI"
  const subtitleText = data?.subtitle || "Wadah silaturahmi, informasi, dan kolaborasi untuk mewujudkan komunitas Puspiptek yang sehat, aman, dan produktif."

  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-32 lg:pb-24">
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10"
      />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* KIRI */}
          <div className="flex flex-col justify-center space-y-8 z-10">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-green-100 text-green-700 w-fit">
                <span className="flex h-2 w-2 rounded-full bg-green-600 mr-2 animate-pulse" />
                Selamat Datang di Official Website
              </div>

              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl xl:text-7xl leading-[1.1] flex flex-wrap gap-x-3 gap-y-1">
                {titleText.split(" ").map((word: string, i: number) => (
                  <motion.span
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                    className="bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent pb-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed"
              >
                {subtitleText}
              </motion.p>
            </div>

            {/* LOGO INSTITUSI */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-4 gap-6 mt-6 items-center"
            >
              {institutions.length > 0 ? (
                institutions.map((item: any, idx: number) => (
                  <motion.div
                    key={idx}
                    className="flex flex-col items-center gap-3"
                    animate={{ rotateY: [0, 180, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: idx * 0.5 }}
                  >
                    <div className="relative w-12 h-12">
                      {item.src ? (
                        <Image
                          src={item.src}
                          alt={item.alt || item.label}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-slate-200 rounded-full" />
                      )}
                    </div>
                    <span className="text-sm font-bold text-slate-700">{item.label}</span>
                  </motion.div>
                ))
              ) : (
                <p className="text-sm text-slate-400 col-span-4">Belum ada logo institusi</p>
              )}
            </motion.div>

            {/* TOMBOL TOGGLE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="pt-4"
            >
              <button
                onClick={onToggleAbout}
                className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3 text-sm font-medium text-white transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isAboutOpen
                    ? "bg-slate-600 hover:bg-slate-700 hover:scale-105 focus:ring-slate-500"
                    : "bg-gradient-to-r from-teal-500 to-blue-600 hover:shadow-teal-500/30 hover:scale-105 focus:ring-teal-500"
                }`}
              >
                <span>{isAboutOpen ? "Tutup Info" : "Tentang Kami"}</span>
                {isAboutOpen ? (
                  <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
                ) : (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </button>
            </motion.div>
          </div>

          {/* KANAN: SLIDER */}
          <div className="relative mx-auto w-full max-w-[600px] aspect-[4/3] lg:aspect-square lg:order-last">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-green-100 to-blue-100 rotate-6 scale-95 blur-2xl -z-10" />
            <div className="relative h-full w-full overflow-hidden rounded-3xl border-[6px] border-white shadow-2xl bg-muted">
              <AnimatePresence mode="wait">
                {heroImages.length > 0 ? (
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={heroImages[currentImage].src}
                      alt={heroImages[currentImage].alt || "Hero Image"}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute bottom-8 left-8 right-8 text-white"
                    >
                      <p className="text-sm font-medium text-white/90 mb-1 uppercase tracking-wider">Highlight</p>
                      <h3 className="text-2xl font-bold leading-tight">{heroImages[currentImage].label}</h3>
                    </motion.div>
                  </motion.div>
                ) : (
                  <div className="flex h-full items-center justify-center bg-slate-100 text-slate-400">
                    <p>No Image</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div