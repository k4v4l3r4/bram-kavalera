"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CalendarDays, ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { client } from "@/sanity/lib/client"

export function AnnouncementsSection() {
  const [data, setData] = useState<any>(null)

  // Fungsi untuk mengubah format tanggal (2025-11-23 -> 23 Nov 2025)
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(`
          *[_type == "announcements"][0]{
            title,
            description,
            items[]{
              title,
              date,
              category,
              readTime,
              excerpt,
              "imageUrl": image.asset->url
            }
          }
        `)
        setData(result)
      } catch (error) {
        console.error("Gagal ambil data pengumuman:", error)
      }
    }
    fetchData()
  }, [])

  if (!data) return null

  const news = data.items || []

  return (
    <section id="news" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-3">
              {data.title || "Pengumuman & Berita"}
            </h2>
            <p className="text-muted-foreground text-lg">
              {data.description || "Informasi terkini seputar kegiatan warga."}
            </p>
          </div>
          <Button variant="outline" className="gap-2 hidden md:flex rounded-full bg-transparent">
            Lihat Semua Berita <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 bg-background ring-1 ring-border/50">
                <div className="relative h-48 w-full overflow-hidden">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="secondary"
                      className="bg-background/90 backdrop-blur-sm text-foreground hover:bg-background shadow-sm font-medium"
                    >
                      {item.category || "Umum"}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3 pt-5 px-6">
                  <div className="flex justify-between items-center mb-3 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                      {formatDate(item.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1.5 h-3.5 w-3.5" />
                      {item.readTime || "1 min read"}
                    </div>
                  </div>
                  <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </CardHeader>

                <CardContent className="flex-1 px-6 pb-4">
                  <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </CardContent>

                <CardFooter className="px-6 pb-6 pt-0">
                  <Button
                    variant="link"
                    className="px-0 text-primary h-auto font-semibold group-hover:gap-2 transition-all p-0"
                  >
                    Baca Selengkapnya <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="gap-2 rounded-full w-full bg-transparent">
            Lihat Semua Berita <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}