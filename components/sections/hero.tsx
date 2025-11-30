"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Atom, Microscope, Cpu, Landmark } from "lucide-react"
import { client } from "@/sanity/lib/client"

export function HeroSection() {
  const [data, setData] = useState<any>(null)
  const [currentImage, setCurrentImage] = useState(0)

  // 1. Ambil Data Gambar dari Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(`
          *[_type == "hero"][0]{
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

  // 2. Efek slide ganti gambar otomatis
  useEffect(() => {
    if (!data?.images?.length) return
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % data.images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [data])

  const heroImages = data?.images || []

  // Variabel untuk Animasi Teks (Split Word)
  const titleWords = ["Pioner", "Penghuni"]

  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-20 md:pt-32 md:pb-24 lg:pt-32 lg:pb-32">
      {/* Background Elements */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10"
      />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* BAGIAN KIRI: TEKS JUDUL & LOGO */}
          <div className="flex flex-col justify-center space-y-8 z-10">
            <div className="space-y-4">
              {/* Badge */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-green-100 text-green-700 w-fit"
              >
                <span className="flex h-2 w-2 rounded-full bg-green-600 mr-2 animate-pulse" />
                Selamat Datang di Official Website
              </motion.div>
              
              {/* JUDUL BESAR DENGAN EFEK GRADIENT & ANIMASI */}
              <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl xl:text-7xl leading-[1.1]">
                {/* Baris 1 */}
                <div className="flex flex-wrap gap-x-3">
                  {titleWords.map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
                
                {/* Baris 2 (Highlight Gradient) */}
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-teal-500 to-blue-600 pb-2"
                >
                  Rumah Negara
                  {/* Garis Bawah Bergerak */}
                  <motion.span 
                    className="absolute left-0 bottom-1 h-1.5 w-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    style={{ originX: 0 }}
                  />
                </motion.span>
                <br />
                <motion.span
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.5 }}
                >
                  Puspiptek
                </motion.span>
              </h1>
              
              {/* Deskripsi */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed"
              >
                Wadah silaturahmi, informasi, dan kolaborasi untuk mewujudkan komunitas Puspiptek yang sehat, aman, dan produktif.
              </motion.p>
            </div>

            {/* LOGO INSTANSI (GRID) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-4 gap-6 mt-6 items-center opacity-80 grayscale hover:grayscale-0 transition-all duration-500"
            >
              {/* BATAN */}
              <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center gap-3">
                <Atom className="text-[#0056b3] h-12 w-12" />
                <span className="text-sm font-bold text-slate-700">BATAN</span>
              </motion.div>
              
              {/* LIPI */}
              <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center gap-3">
                <Microscope className="text-[#0056b3] h-12 w-12" />
                <span className="text-sm font-bold text-slate-700">LIPI</span>
              </motion.div>

              {/* BPPT */}
              <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center gap-3">
                <Cpu className="text-[#0056b3] h-12 w-12" />
                <span className="text-sm font-bold text-slate-700">BPPT</span>
              </motion.div>

              {/* PUSPIPTEK */}
              <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center gap-3">
                <Landmark className="text-[#0056b3] h-12 w-12" />
                <span className="text-sm font-bold text-slate-700">PUSPIPTEK</span>
              </motion.div>
            </motion.div>
          </div>

          {/* BAGIAN KANAN: GAMBAR CAROUSEL */}
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