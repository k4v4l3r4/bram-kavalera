"use client"

import { useState, useEffect } from "react"
import { MessageSquare, Users, Calendar, Lightbulb, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { client } from "@/sanity/lib/client"

// Mapping Ikon dari CMS ke React Component
const iconMap: any = {
  Users: Users,
  MessageSquare: MessageSquare,
  Calendar: Calendar,
  Lightbulb: Lightbulb,
}

export function ExpertForumSection() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(`
          *[_type == "expertForum"][0]{
            heading,
            description,
            overlayTitle,
            schedule,
            buttonText,
            topics,
            "imageUrl": image.asset->url
          }
        `)
        setData(result)
      } catch (error) {
        console.error("Gagal ambil data expert forum:", error)
      }
    }
    fetchData()
  }, [])

  if (!data) return null // Atau loading skeleton jika mau

  const topics = data.topics || []

  return (
    // 👇 PERBAIKAN DI SINI: Menambahkan id="expert-forum" agar link navigasi berfungsi 👇
    <section id="expert-forum" className="py-20 md:py-28 bg-muted/50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* BAGIAN KIRI: FOTO DENGAN OVERLAY */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video lg:aspect-square group"
          >
            {/* Cek apakah ada gambar dari CMS, jika tidak pakai placeholder warna abu */}
            {data.imageUrl ? (
              <Image
                src={data.imageUrl}
                alt="Diskusi Para Ahli Puspiptek"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-500">
                Belum ada foto
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
              <div className="text-white transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                <div className="bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3 backdrop-blur-md">
                  LIVE SESSION
                </div>
                <p className="font-bold text-xl mb-1">{data.overlayTitle || "Judul Overlay"}</p>
                <p className="text-sm opacity-90 flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> {data.schedule || "Jadwal belum diatur"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* BAGIAN KANAN: KONTEN TEKS & LIST */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                {data.heading || "Judul Expert Forum"}
              </h2>
              <p className="text-muted-foreground text-lg">
                {data.description || "Deskripsi belum diisi di Admin CMS."}
              </p>
            </motion.div>

            <div className="space-y-6">
              {topics.map((item: any, index: number) => {
                const IconComponent = iconMap[item.icon] || Lightbulb

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl bg-background border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all group cursor-default"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full px-8 shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-1"
              >
                {data.buttonText || "Lihat Info"}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}