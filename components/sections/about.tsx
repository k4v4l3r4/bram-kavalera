"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { client } from "@/sanity/lib/client"
import { PortableTextRenderer } from "@/components/PortableTextRenderer"
import { CheckCircle2, History } from "lucide-react"

interface AboutData {
  title: string | null
  description: any
  visiMisiGroup: {
    missions: string[]
    vision: any
  } | null
  objectives: { goal: any }[] | null
}

const renderSafeContent = (content: any) => {
  if (!content) return null
  if (Array.isArray(content)) return <PortableTextRenderer blocks={content} />
  if (typeof content === "string")
    return <p className="text-muted-foreground leading-relaxed">{content}</p>
  return null
}

export default function AboutSection() {
  const [data, setData] = useState<AboutData | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await client.fetch(
          `*[_type == "about"][0]{title, description, visiMisiGroup, objectives}`
        )
        setData(result)
      } catch (err) {
        console.error("Gagal ambil data About:", err)
      }
    }
    fetchData()
  }, [])

  if (!data || !data.title) {
    return (
      <section id="about" className="py-20 text-center container">
        <p className="text-muted-foreground">
          Konten Tentang Kami belum tersedia.
        </p>
      </section>
    )
  }

  const missions = data.visiMisiGroup?.missions || []
  const visionBlocks = data.visiMisiGroup?.vision || []
  const objectives = data.objectives || []

  return (
    <section
      id="about"
      className="py-10 md:py-14 bg-muted/30 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[45%] h-[45%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-[10%] right-[5%] w-[28%] h-[28%] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-4">
          {/* === Bagian Deskripsi & Tujuan === */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 bg-background/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border h-full"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter">
              {data.title}
            </h2>
            <div className="text-muted-foreground text-base md:text-lg">
              {renderSafeContent(data.description)}
            </div>
            {objectives.length > 0 && <div className="h-px bg-border my-4" />}
            <ul className="space-y-3 pt-3">
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
                  <div className="leading-relaxed text-sm md:text-base flex-1">
                    {renderSafeContent(item.goal)}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* === Bagian Visi & Misi === */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border h-full"
          >
            <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
              <History className="h-5 w-5 text-primary" /> Visi & Misi
            </h3>
            <div className="space-y-6">
              <div className="text-muted-foreground text-sm md:text-base">
                {renderSafeContent(visionBlocks)}
              </div>
              <div className="h-px bg-border" />
              <ul className="space-y-3 mt-2">
                {missions.map((misi: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-muted-foreground text-sm"
                  >
                    <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                    <span>{misi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}