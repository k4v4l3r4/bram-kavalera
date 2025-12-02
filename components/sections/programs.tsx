"use client"

import { useState, useEffect } from "react"
import { Calendar, Users2, BookOpen, Camera, ArrowRight, HelpCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { client } from "@/sanity/lib/client"

// Mapping Ikon (CMS String -> React Component)
const iconMap = {
  Users2: Users2,
  Calendar: Calendar,
  BookOpen: BookOpen,
  Camera: Camera,
} as const

// Mapping Warna (CMS String -> Tailwind Classes)
const colorMap = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
} as const

type ProgramItem = {
  title: string
  description: string
  tag: string
  color: keyof typeof colorMap
  icon: keyof typeof iconMap
  image?: string
}

type ProgramsData = {
  sectionTitle: string
  sectionDescription: string
  items: ProgramItem[]
}

export default function ProgramsSection() {
  const [data, setData] = useState<ProgramsData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: ProgramsData = await client.fetch(
          `*[_type == "programs"][0]{ sectionTitle, sectionDescription, items[]{ title, description, tag, color, icon, "image": image.asset->url } }`
        )
        setData(result)
      } catch (error) {
        console.error("Gagal ambil data programs:", error)
      }
    }
    fetchData()
  }, [])

  if (!data) return null

  const programs = data.items || []

  return (
    <section
      id="programs"
      className="pt-16 pb-20 md:pt-20 md:pb-24 bg-background relative"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl mb-4 text-primary">
              {data.sectionTitle || "Program Unggulan"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {data.sectionDescription || "Deskripsi program belum diisi."}
            </p>
          </motion.div>
          <Link
            href="#"
            className="hidden md:inline-flex items-center justify-center rounded-full border border-input bg-background px-8 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Lihat Semua Program <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {programs.map((program, i) => {
            const IconComponent = iconMap[program.icon] || HelpCircle
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                </div>

                <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2.5 rounded-xl ${colorClass} text-white shadow-lg backdrop-blur-sm bg-opacity-90`}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {program.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-foreground transition-colors">
                      {program.title}
                    </h3>

                    <p className="text-white/80 line-clamp-2 mb-4 group-hover:text-white group-hover:line-clamp-none transition-colors duration-300">
                      {program.description}
                    </p>

                    <div className="flex items-center text-white/70 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="#"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Lihat Semua Program <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
