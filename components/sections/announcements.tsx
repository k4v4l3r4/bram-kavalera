// FILE: components/sections/announcements.tsx
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { PortableTextRenderer } from "@/components/PortableTextRenderer"

interface AnnouncementItem {
  title: string
  date: string
  category?: string
  readTime?: string
  image?: any
  excerpt?: any
}

interface AnnouncementsData {
  title: string
  description?: any
  items: AnnouncementItem[]
}

export default function AnnouncementsSection() {
  const [data, setData] = useState<AnnouncementsData | null>(null)

  useEffect(() => {
    client
      .fetch(
        `*[_type == "announcements"][0]{
          title,
          description,
          items[]{
            title,
            date,
            category,
            readTime,
            image,
            excerpt
          }
        }`,
        {},
        { next: { revalidate: 3600 } }
      )
      .then(setData)
      .catch((err) => console.error("Error fetch announcements:", err))
  }, [])

  if (!data) return null

  return (
    <section
  id="news"
  className="pt-8 md:pt-12 pb-16 md:pb-24 bg-muted/50"
>

      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            {data.title || "Pengumuman & Berita"}
          </h2>

          {data.description && (
            <div className="mt-3 text-muted-foreground">
              <PortableTextRenderer blocks={data.description} />
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items?.map((item, i) => (
            <div
              key={i}
              className="flex flex-col bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition"
            >
              {item.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={urlFor(item.image)
                      .width(600)
                      .auto("format")
                      .quality(80)
                      .url()}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs text-muted-foreground mb-3">
                  {item.date} • {item.readTime || "2 min read"}
                  {item.category && ` • ${item.category}`}
                </p>

                {item.excerpt && (
                  <div className="text-sm text-muted-foreground flex-1 line-clamp-3">
                    <PortableTextRenderer blocks={item.excerpt} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
