"use client"

import { useState, useEffect } from "react"
import { client } from "@/sanity/lib/client"

export default function HousingInfoSection() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(`
          *[_type == "housingInfo"]{
            title,
            content
          }
        `)
        setItems(result)
      } catch (error) {
        console.error("Gagal ambil housing info:", error)
      }
    }
    fetchData()
  }, [])

  if (!items.length) return null

  return (
    <section id="info" className="py-20">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Info Warga</h2>

        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow border">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
