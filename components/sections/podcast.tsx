"use client"

import { useState, useEffect } from "react"
import { Play, Mic2 } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Image from "next/image"
import Link from "next/link"
import { client } from "@/sanity/lib/client"

export function PodcastSection() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(`
          *[_type == "podcast"][0]{
            title,
            description,
            spotifyUrl,
            youtubeUrl,
            episodes[]{
              title,
              guest,
              duration,
              url,
              "imageUrl": cover.asset->url
            }
          }
        `)
        setData(result)
      } catch (error) {
        console.error("Gagal ambil data podcast:", error)
      }
    }
    fetchData()
  }, [])

  if (!data) return null

  const episodes = data.episodes || []

  return (
    <section id="podcast" className="py-20 md:py-28 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* BAGIAN KIRI: INFO SEKSI */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-medium">
              <Mic2 className="h-4 w-4" />
              Podcast Komunitas
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              {data.title || "Suara Warga"}
            </h2>
            <p className="text-muted-foreground">
              {data.description || "Deskripsi podcast belum diisi."}
            </p>
            
            {/* 👇👇 LOGO FULL VERSION (IMAGE) 👇👇 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-6">
              
              {/* Logo Spotify Full */}
              {data.spotifyUrl && (
                <Link href={data.spotifyUrl} target="_blank" className="hover:opacity-80 transition-opacity">
                  <div className="relative h-10 w-32"> {/* Atur ukuran di sini */}
                    <Image 
                      src="/spotify-logo.png" // Pastikan nama file di folder public sama
                      alt="Spotify"
                      fill
                      className="object-contain object-left" // Agar gambar tidak gepeng
                    />
                  </div>
                </Link>
              )}
              
              {/* Logo YouTube Full */}
              {data.youtubeUrl && (
                <Link href={data.youtubeUrl} target="_blank" className="hover:opacity-80 transition-opacity">
                  <div className="relative h-8 w-32"> {/* YouTube biasanya lebih pipih, tinggi dikurangi dikit */}
                    <Image 
                      src="/youtube-logo.png" // Pastikan nama file di folder public sama
                      alt="YouTube"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                </Link>
              )}
            </div>
            {/* 👆👆 ----------------------- 👆👆 */}

          </div>

          {/* BAGIAN KANAN: LIST EPISODE */}
          <div className="w-full md:w-2/3">
            <ScrollArea className="w-full whitespace-nowrap rounded-md border bg-background p-4 shadow-sm">
              <div className="flex space-x-4 pb-4">
                {episodes.map((ep: any, i: number) => {
                   const linkUrl = ep.url ? ep.url : "#";
                   
                   return (
                    <Link 
                      key={i} 
                      href={linkUrl} 
                      target="_blank"
                      className="group block"
                    >
                      <div className="w-[250px] shrink-0 space-y-3 p-4 rounded-xl border bg-card hover:shadow-md transition-shadow cursor-pointer">
                        <div className="aspect-square w-full rounded-md bg-slate-100 relative overflow-hidden">
                          {ep.imageUrl ? (
                            <Image
                              src={ep.imageUrl}
                              alt={ep.title}
                              width={250}
                              height={250}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                              No Cover
                            </div>
                          )}
                          
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center pl-1 cursor-pointer transform group-hover:scale-110 transition-transform">
                              <Play className="h-6 w-6 text-black fill-black" />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-sm truncate text-foreground group-hover:text-orange-500 transition-colors" title={ep.title}>
                            {ep.title}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">{ep.guest}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">{ep.duration}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          
        </div>
      </div>
    </section>
  )
}