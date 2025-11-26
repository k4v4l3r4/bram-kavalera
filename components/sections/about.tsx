"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  CheckCircle2, History, 
  HeartPulse, ShieldCheck, Lightbulb, HandHeart, Sprout, Microscope 
} from "lucide-react"
import { client } from "@/sanity/lib/client"
import { PortableTextRenderer } from "@/components/portable-text-renderer"

// 1. Mapping Ikon
const iconMap: any = {
  HeartPulse: HeartPulse,
  ShieldCheck: ShieldCheck,
  Lightbulb: Lightbulb,
  HandHeart: HandHeart,
  Sprout: Sprout,
  Microscope: Microscope,
}

export function AboutSection() {
  const [data, setData] = useState<any>(null)

  // 2. Ambil data dari Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(`
          *[_type == "about"][0]{
            title,
            description,
            visiMisiGroup,
            focusAreas,
            objectives
          }
        `)
        setData(result)
      } catch (error) {
        console.error("Gagal ambil data about:", error)
      }
    }
    fetchData()
  }, [])

  if (!data) return null

  // Data default
  const missions = data.visiMisiGroup?.missions || []
  const visionBlocks = data.visiMisiGroup?.vision || [] 
  const focusAreas = data.focusAreas || []
  const objectives = data.objectives || []

  // Variabel animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <section id="about" className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          
          {/* KOLOM KIRI: Judul & Tujuan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border h-full"
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              {data.title || "Judul Tentang Kami"}
            </h2>
            
            {data.description && (
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {data.description}
                </p>
            )}

            {objectives.length > 0 && (
                <div className="h-px bg-border" />
            )}

            {/* BAGIAN TUJUAN PPRNP */}
            <div className="space-y-4 pt-4">
                <ul className="space-y-4">
                    {objectives.map((item: any, i: number) => (
                        <motion.li 
                            key={i} 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="flex items-start gap-4 text-muted-foreground"
                        >
                            <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-1" />
                            <p className="leading-relaxed text-base">
                                {item.goal}
                            </p>
                        </motion.li>
                    ))}
                </ul>
            </div>
            
          </motion.div>

          {/* KOLOM KANAN: Visi & Misi */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border h-full"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Visi & Misi
            </h3>

            <div className="space-y-6">
              <div>
                {/* Isi Visi (Tanpa Label) */}
                <div className="text-muted-foreground">
                  <PortableTextRenderer blocks={visionBlocks} />
                </div>
              </div>
              
              {/* Garis pemisah tipis antara Visi dan Misi */}
              <div className="h-px bg-border" />
              
              <div>
                {/* Isi Misi (Tanpa Label) */}
                <ul className="space-y-3 mt-2">
                  {missions.map((misi: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                      <span>{misi}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* BAGIAN BAWAH: KARTU FOKUS UTAMA */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold mb-10 text-center"
          >
            Fokus Utama Kami
          </motion.h3>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {focusAreas.map((item: any, i: number) => {
              const IconComponent = iconMap[item.icon] || Lightbulb

              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group bg-background p-6 rounded-xl border hover:shadow-xl transition-all hover:-translate-y-1 h-full"
                >
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}