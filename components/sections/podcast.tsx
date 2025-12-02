"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { client } from "@/sanity/lib/client"

export default function PodcastSection() {
  const [podcasts, setPodcasts] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(`
          *[_type == "podcast"]{
            title,
            subtitle,
            "imageUrl": image.asset->url
          }
        `)
        setPodcasts(result)
      } catch (error) {
        console.error("Gagal ambil podcast:", error)
      }
    }
    fetchData()
  }, [])

  if (!podcasts.length) return null

  return (
    <section id="podcast" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Podcast</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {podcasts.map((item, index) => (
            <div key={index} className="rounded-xl overflow-hidden bg-white shadow-lg">
              {item.imageUrl && (
                <div className="relative w-full h-48">
                  <Image src={item.imageUrl} fill alt={item.title} className="object-cover" />
                </div>
              )}

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
