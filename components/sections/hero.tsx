import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play } from "lucide-react"
import { client } from "@/sanity/lib/client" // Pastikan path ini sesuai dengan setup Sanity Anda
import { urlForImage } from "@/sanity/lib/image" // Helper untuk url gambar (jika ada)

// 1. Definisikan Tipe Data sesuai hero.ts
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

// 2. Fungsi untuk mengambil data dari Sanity
async function getHeroData(): Promise<HeroData | null> {
  const query = `
    *[_type == "hero"][0] {
      title,
      subtitle,
      images,
      institutions
    }
  `
  const data = await client.fetch(query)
  return data
}

// 3. Ubah komponen menjadi ASYNC
export async function HeroSection() {
  const data = await getHeroData()

  // Fallback jika data di Sanity belum diisi (agar tidak error)
  if (!data) {
    return (
      <section className="py-20 text-center">
        <p className="text-muted-foreground">Data Hero belum diisi di Sanity Studio.</p>
      </section>
    )
  }

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* BAGIAN KIRI: Teks & Tombol */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              {/* Mengambil Title dari Sanity */}
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                {data.title || "Judul Belum Diisi"}
              </h1>
              
              {/* Mengambil Subtitle dari Sanity */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                {data.subtitle || "Deskripsi belum diisi."}
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

            {/* LOGO INSTITUSI (Diambil dari array 'institutions' di Sanity) */}
            {data.institutions && data.institutions.length > 0 && (
              <div className="pt-8 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-4 font-medium">Didukung oleh:</p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 grayscale opacity-70 hover:opacity-100 transition-opacity">
                  {data.institutions.map((inst, index) => (
                    <div key={index} className="relative h-8 w-auto min-w-[80px]">
                      {/* Pastikan urlForImage sudah disetup, atau gunakan codingan di bawah jika pakai url builder manual */}
                      {inst.logo && (
                         <img 
                           src={urlForImage(inst.logo).url()} 
                           alt={inst.alt || inst.label} 
                           className="h-8 w-auto object-contain"
                         />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* BAGIAN KANAN: Gambar Utama */}
          <div className="flex-1 w-full max-w-[600px] lg:max-w-none">
            {data.images && data.images.length > 0 ? (
              <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border">
                {/* Mengambil gambar PERTAMA dari array images */}
                <Image
                  src={urlForImage(data.images[0]).url()}
                  alt={data.images[0].alt || "Hero Image"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              // Placeholder jika gambar belum diupload
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