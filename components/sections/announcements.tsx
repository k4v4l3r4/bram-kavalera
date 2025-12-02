"use client"

import { useState, useEffect } from "react"
import { client } from "@/sanity/lib/client"

export default function AnnouncementsSection() {
  const [announcements, setAnnouncements] = useState<any[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(`
          *[_type == "announcements"] | order(date desc){
            title,
            date,
            content
          }
        `)
        setAnnouncements(result)
      } catch (error) {
        console.error("Gagal ambil data pengumuman:", error)
        setAnnouncements([])
      }
    }
    fetchData()
  }, [])

  if (!announcements || announcements.length === 0) return null

  return (
    <section id="news" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Pengumuman & Berita</h2>

        <div className="space-y-6">
          {announcements.map((item: any, index: number) => (
            <div key={index} className="p-6 bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-1">{item.title || "Tanpa Judul"}</h3>
              <p className="text-sm text-muted-foreground mb-3">{item.date || ""}</p>
              <div className="text-muted-foreground leading-relaxed">
                {typeof item.content === "string" ? <p>{item.content}</p> : <p>Konten tidak tersedia.</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
