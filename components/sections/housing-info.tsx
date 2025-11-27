"use client"

import { useState, useEffect } from "react"
import { MapPin, Siren, Bus, Building2, Info, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { client } from "@/sanity/lib/client"

// 1. Mapping Ikon
const iconMap: any = {
  Siren: Siren,
  Bus: Bus,
  Building2: Building2,
  MapPin: MapPin,
}

// 2. Mapping Warna
const colorMap: any = {
  red: { bg: "bg-red-100", text: "text-red-600" },
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  green: { bg: "bg-green-100", text: "text-green-600" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-600" },
  default: { bg: "bg-gray-100", text: "text-gray-600" },
}

export function HousingInfoSection() {
  const [data, setData] = useState<any>(null)
  const [currentMap, setCurrentMap] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(`
          *[_type == "housingInfo"][0]{
            title,
            description,
            "maps": mapImages[]{
              caption,
              "url": asset->url
            },
            items[]{
              title,
              description,
              icon,
              color
            }
          }
        `)
        setData(result)
      } catch (error) {
        console.error("Gagal ambil data housing info:", error)
      }
    }
    fetchData()
  }, [])

  const maps = data?.maps || []
  const items = data?.items || []

  // --- FITUR AUTO SLIDE ---
  useEffect(() => {
    if (maps.length <= 1) return

    const timer = setInterval(() => {
      setCurrentMap((prev) => (prev + 1) % maps.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [maps.length])

  const nextMap = () => setCurrentMap((prev) => (prev + 1) % maps.length)
  const prevMap = () => setCurrentMap((prev) => (prev - 1 + maps.length) % maps.length)

  if (!data) return null

  return (
    <section id="info" className="py-16 md:py-20 bg-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* BAGIAN KIRI: LIST INFO */}
          <div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-6">
              {data.title || "Informasi Rumah Negara"}
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              {data.description || "Panduan penting bagi penghuni kawasan."}
            </p>

            <div className="grid gap-6">
              {items.map((item: any, i: number) => {
                const IconComponent = iconMap[item.icon] || Info
                const style = colorMap[item.color] || colorMap.default

                return (
                  <div key={i} className="flex gap-4 p-4 bg-background rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                    <div className={`p-3 rounded-full h-fit ${style.bg} ${style.text}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* BAGIAN KANAN: GALERI PETA (AUTO SLIDER) */}
          <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden border shadow-lg bg-muted group">
            
            {maps.length > 0 ? (
              <>
                <Image
                  src={maps[currentMap].url}
                  alt="Peta Kawasan"
                  width={600}
                  height={800}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 backdrop-blur-sm z-10">
                  <p className="text-white font-medium text-center transition-all duration-500">
                    {maps[currentMap].caption || `Peta ${currentMap + 1}`}
                  </p>
                </div>

                {maps.length > 1 && (
                  <>
                    <button 
                      onClick={prevMap}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-black shadow-lg transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button 
                      onClick={nextMap}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-black shadow-lg transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    
                    <div className="absolute top-4 right-4 flex gap-1 z-20">
                      {maps.map((_: any, idx: number) => (
                        <div 
                          key={idx}
                          className={`h-2 w-2 rounded-full shadow-sm transition-all duration-500 ${idx === currentMap ? 'bg-white w-4' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                <div className="text-center p-6">
                  <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4 animate-bounce" />
                  <p className="text-muted-foreground font-medium">Belum ada peta diupload</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
