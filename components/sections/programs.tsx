"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { client } from "@/sanity/lib/client"

export default function ProgramsSection() {
  const [programs, setPrograms] = useState<any[]>([])

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const result = await client.fetch(`
          *[_type == "programs"]{
            title,
            description,
            "imageUrl": image.asset->url
          }
        `)
        setPrograms(result)
      } catch (error) {
        console.error("Gagal ambil data programs:", error)
      }
    }
    fetchPrograms()
  }, [])

  if (!programs.length) return null

  return (
    <section id="programs" className="py-20">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Program & Kegiatan</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((item, index) => (
            <div key={index} className="border rounded-xl overflow-hidden shadow bg-white">
              {item.imageUrl && (
                <div className="relative w-full h-48">
                  <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                </div>
              )}
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
