"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import { client } from "@/sanity/lib/client"

export default function ExpertForumSection() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(
          `
            *[_type == "expertForum"][0]{
              heading,
              description,
              overlayTitle,
              schedule,
              buttonText,
              "imageUrl": image.asset->url
            }
          `,
          {},
          { next: { revalidate: 3600 } } // 🔥 caching aman
        )

        setData(result)
      } catch (error) {
        console.error("Gagal ambil data expert forum:", error)
      }
    }

    fetchData()
  }, [])

  if (!data) return null

  return (
    <section
      id="expert-forum"
      className="pt-0 md:pt-0 pb-16 md:pb-24 bg-muted/50 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video lg:aspect-[4/3] group w-full h-full min-h-[380px]"
          >
            {data?.imageUrl ? (
              <Image
                src={data.imageUrl}
                alt="Expert Forum Banner"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-500">
                Belum ada foto
              </div>
            )}

            {/* Overlay Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-8">
              <div className="text-white transform transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <div className="bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3 backdrop-blur-md">
                  LIVE SESSION
                </div>
                <p className="font-bold text-2xl mb-1 drop-shadow-md leading-tight">
                  {data?.overlayTitle || "Sesi Berbagi Pengetahuan"}
                </p>
                <p className="text-sm opacity-90 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {data?.schedule || "Jumat, 19:00 WIB"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* TEXT & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-slate-900 leading-tight">
              {data?.heading || "Diskusi & Kolaborasi Para Expert"}
            </h2>

            <blockquote className="border-l-4 border-primary pl-6 py-2">
              <p className="text-muted-foreground text-lg leading-relaxed italic">
                {data?.description ||
                  "Solusi cerdas dari para pakar senior — cepat, tepat, dan berbasis pengalaman nyata."}
              </p>
            </blockquote>

            <Button
              size="lg"
              className="rounded-full shadow-xl bg-primary hover:bg-primary/90 px-8 py-6 text-lg group"
            >
              {data?.buttonText || "Lihat Jadwal"}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
