"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play } from "lucide-react"
import { motion } from "framer-motion"
import { client } from "@/sanity/lib/client" 
import { urlFor } from "@/sanity/lib/image" // <-- PERBAIKAN: Menggunakan urlFor

// 1. Definisikan Tipe Data
interface HeroData {
  title: string
  subtitle: string
  images: any[]
  institutions: {
    label: string
    logo: any
    alt: string
  }[]
}

// 2. Fungsi Fetch Data
async function getHeroData(): Promise<HeroData | null> {
  const query = `
    *[_type == "hero"][0] {
      title,
      subtitle,
      images,
      institutions
    }
  `
  // Tambahkan try-catch agar build tidak gagal jika fetch error
  try {
    const data = await client.fetch(query)
    return data
  } catch (error) {
    console.error("Gagal mengambil data hero:", error)
    return null
  }
}

export async function HeroSection() {
  const data = await getHeroData()

  // Fallback jika data kosong
  if (!data) {
    return (
      <section className="py-32 text-center container">
        <h2 className="text-2xl font-bold">Data Hero Belum Diisi</h2>
        <p className="text-muted-foreground">Silakan input data di Sanity Studio (Desk > Hero).</p>
      </section>
    )
  }

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* BAGIAN KIRI: Teks */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                {data.title}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                {data.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/#expert-clusters"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Jelajahi Expertise
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/#about"
                className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Play className="mr-2 h-4 w-4 fill-current" />
                Tentang Kami
              </Link>
            </div>

            {/* LOGO INSTITUSI */}
            {data.institutions && data.institutions.length > 0 && (
              <div className="pt-8 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-4 font-medium">Didukung oleh:</p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 grayscale opacity-70 hover:opacity-100 transition-opacity">
                  {data.institutions.map((inst, index) => (
                    <div key={index} className="relative h-10 w-auto min-w-[80px]">
                      {inst.logo && (
                         // PERBAIKAN: Menggunakan urlFor
                         <img 
                           src={urlFor(inst.logo).url()} 
                           alt={inst.alt || inst.label} 
                           className="h-10 w-auto object-contain"
                         />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* BAGIAN KANAN: Gambar */}
          <div className="flex-1 w-full max-w-[600px] lg:max-w-none">
            {data.images && data.images.length > 0 ? (
              <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border">
                {/* PERBAIKAN: Menggunakan urlFor */}
                <Image
                  src={urlFor(data.images[0]).url()}
                  alt={data.images[0].alt || "Hero Image"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-video bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
                No Image Uploaded
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}