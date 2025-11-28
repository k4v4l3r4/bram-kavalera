"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Atom, Microscope, Cpu, Landmark } from "lucide-react"
import { client } from "@/sanity/lib/client"

export function HeroSection() {
  const [data, setData] = useState<any>(null)
  const [currentImage, setCurrentImage] = useState(0)

  // 1. UPDATE QUERY DISINI
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(`
          *[_type == "hero"][0]{
            title,      // <-- TAMBAHAN: Mengambil Judul Besar
            subtitle,   // <-- TAMBAHAN: Mengambil Deskripsi Pendek
            images[]{
              label,
              alt,
              "src": asset->url
            }
          }
        `)
        setData(result)
      } catch (error) {
        console.error("Gagal ambil data:", error)
      }
    }
    fetchData()
  }, [])

  // Logika Auto-Slide Gambar
  useEffect(() => {
    if (!data?.images?.length) return
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % data.images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [data])

  const heroImages = data?.images || []

  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-32 lg:pb-24">
      {/* Background Decoration */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10"
      />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* BAGIAN KIRI: TEXT & LOGO INSTANSI */}
          <div className="flex flex-col justify-center space-y-8 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Badge Hijau Muda */}
              <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-green-100 text-green-700 w-fit">
                <span className="flex h-2 w-2 rounded-full bg-green-600 mr-2 animate-pulse" />
                Selamat Datang di Official Website
              </div>
              
              {/* 2. UPDATE JUDUL (H1) DISINI */}
              <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl xl:text-7xl leading-[1.1]">
                {/* Jika ada data dari Sanity, tampilkan. Jika loading/kosong, tampilkan default */}
                {data?.title ? (
                  data.title
                ) : (
                  <>
                    Pioner Penghuni<br />
                    <span className="text-[#009B7C]">Rumah Negara</span><br />
                    Puspiptek
                  </>
                )}
              </h1>
              
              {/* 3. UPDATE DESKRIPSI (P) DISINI */}
              <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
                {data?.subtitle ? (
                   data.subtitle
                ) : (
                   "Wadah silaturahmi, informasi, dan kolaborasi untuk mewujudkan komunitas Puspiptek yang sehat, aman, dan produktif."
                )}
              </p>
            </motion.div>

            {/* Logo Instansi dengan Rotasi Horizontal */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-4 gap-6 mt-6 items-center"
            >
              {[
                { icon: Atom, label: "BATAN" },
                { icon: Microscope, label: "LIPI" },
                { icon: Cpu, label: "BPPT" },
                { icon: Landmark, label: "PUSPIPTEK" },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={idx}
                    className="flex flex-col items-center gap-3"
                    animate={{ rotateY: [0, 180, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: idx * 0.5,
                    }}
                  >
                    <Icon className="text-[#0056b3] h-12 w-12" />
                    <span className="text-sm font-bold text-slate-700">{item.label}</span>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* BAGIAN KANAN: SLIDER GAMBAR */}
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
                      <p>Belum ada gambar di CMS</p>
                   </div>
                )}
              </AnimatePresence>

              {/* Indikator Slider */}
              {heroImages.length > 1 && (
                <div className="absolute bottom-8 right-8 flex gap-2 z-20">
                  {heroImages.map((_: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentImage ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}