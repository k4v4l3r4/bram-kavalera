"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Users2, BookOpen, Camera, ArrowRight, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"
import { client } from "@/sanity/lib/client"
import { PortableTextRenderer } from "@/components/PortableTextRenderer"

// Ikon Map (HARUS sama dengan schema)
const iconMap: Record<string, any> = {
  Users2,
  Calendar,
  BookOpen,
  Camera,
}

// Warna Map
const colorMap: Record<string, string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
}

type ProgramItem = {
  title: string
  description: any        // blockContent dari Sanity
  tag: string
  color: string
  icon: string
  image?: string
}

type ProgramsData = {
  sectionTitle: string
  sectionDescription: any // blockContent dari Sanity
  items: ProgramItem[]
}

export default function ProgramsSection() {
  const [data, setData] = useState<ProgramsData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: ProgramsData = await client.fetch(`
          *[_type == "programs"][0]{
            sectionTitle,
            sectionDescription,
            items[]{
              title,
              description,
              tag,
              color,
              icon,
              "image": image.asset->url
            }
          }
        `)

        setData(result)
      } catch (error) {
        console.error("Gagal ambil data programs:", error)
      }
    }

    fetchData()
  }, [])

  if (!data) return null

  return (
    <section
  id="programs"
  className="pt-8 pb-20 md:pt-12 md:pb-24 bg-background relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl mb-4 text-primary">
              {data.sectionTitle}
            </h2>

            {/* SUPPORT BLOCKCONTENT */}
            <div className="text-lg text-muted-foreground">
              <PortableTextRenderer blocks={data.sectionDescription} />
            </div>
          </motion.div>

          <Link
            href="#"
            className="hidden md:inline-flex items-center justify-center rounded-full border border-input bg-background px-8 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Lihat Semua Program <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {data.items?.map((program, i) => {
            const Icon = iconMap[program.icon] || HelpCircle
            const colorClass = colorMap[program.color] || "bg-gray-500"

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl bg-background border border-border shadow-sm hover:shadow-2xl transition-all duration-500 ease-out h-[320px] md:h-[350px]"
              >
                {/* IMAGE */}
                <div className="absolute inset-0 z-0">
                  {program.image ? (
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />
                </div>

                {/* CONTENT */}
                <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">

                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2.5 rounded-xl ${colorClass} text-white shadow-lg backdrop-blur-sm bg-opacity-90`}>
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {program.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">{program.title}</h3>

                    {/* DESCRIPTION SUPPORT BLOCK TEXT */}
                    <div className="text-white/80 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                      <PortableTextRenderer blocks={program.description} />
                    </div>

                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}