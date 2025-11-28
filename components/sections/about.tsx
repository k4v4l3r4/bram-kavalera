"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  CheckCircle2, History 
} from "lucide-react"
import { client } from "@/sanity/lib/client"
import { PortableTextRenderer } from "@/components/portable-text-renderer"

export function AboutSection() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(`
          *[_type == "about"][0]{
            title,
            description,
            visiMisiGroup,
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

  const missions = data.visiMisiGroup?.missions || []
  const visionBlocks = data.visiMisiGroup?.vision || [] 
  const objectives = data.objectives || []

  // --- FUNGSI PENGAMAN (SAFETY CHECK) ---
  // Fungsi ini mengecek: Apakah ini data baru (Array) atau data lama (String)?
  const renderSafeContent = (content: any) => {
    if (!content) return null;

    // Jika data berbentuk Array (Block Content Baru) -> Pakai Renderer Canggih
    if (Array.isArray(content)) {
      return <PortableTextRenderer blocks={content} />;
    }

    // Jika data berbentuk String (Teks Lama) -> Tampilkan biasa (Fallback)
    if (typeof content === 'string') {
      return <p className="text-muted-foreground leading-relaxed">{content}</p>;
    }

    return null;
  };

  return (
    <section id="about" className="py-10 md:py-14 bg-muted/30 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[45%] h-[45%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-[10%] right-[5%] w-[28%] h-[28%] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-4">

          {/* KOLOM KIRI */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 bg-background/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border h-full"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">
              {data.title || "Judul Tentang Kami"}
            </h2>
            
            {/* 1. DESKRIPSI (Gunakan Fungsi Pengaman) */}
            <div className="text-muted-foreground text-base md:text-lg">
               {renderSafeContent(data.description)}
            </div>

            {objectives.length > 0 && (
                <div className="h-px bg-border my-4" />
            )}

            {/* 2. OBJECTIVES */}
            <div className="space-y-3 pt-3">
                <ul className="space-y-3">
                    {objectives.map((item: any, i: number) => (
                        <motion.li 
                            key={i} 
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.36, delay: i * 0.05 }}
                            className="flex items-start gap-3 text-muted-foreground"
                        >
                            <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-1" />
                            
                            {/* Gunakan Fungsi Pengaman juga disini */}
                            <div className="leading-relaxed text-sm md:text-base flex-1">
                                {renderSafeContent(item.goal)}
                            </div>
                            
                        </motion.li>
                    ))}
                </ul>
            </div>
          </motion.div>

          {/* KOLOM KANAN */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border h-full"
          >
            <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Visi & Misi
            </h3>

            <div className="space-y-6">
              {/* 3. VISI */}
              <div>
                <div className="text-muted-foreground text-sm md:text-base">
                  {/* Vision biasanya sudah aman karena dari awal BlockContent, tapi pakai safe check lebih bagus */}
                  {renderSafeContent(visionBlocks)}
                </div>
              </div>
              
              <div className="h-px bg-border" />
              
              {/* 4. MISI */}
              <div>
                <ul className="space-y-3 mt-2">
                  {missions.map((misi: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
                      <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                      <span>{misi}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}