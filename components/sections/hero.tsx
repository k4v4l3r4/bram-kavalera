// FILE: components/sections/hero.tsx (OPTIMASI MAX)

// FIX: Buat builder image untuk kompres otomatis
function img(url: any, w: number = 1600, q: number = 70) {
  return urlFor(url).width(w).quality(q).auto("format").url()
}

export async function HeroSection() {
  const data = await getHeroData()

  if (!data) {
    return (
      <section className="py-32 text-center container">
        <h2 className="text-2xl font-bold">Data Hero Belum Diisi</h2>
        <p className="text-muted-foreground">Silakan input data di Sanity Studio.</p>
      </section>
    )
  }

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* TEKS */}
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
            {data.institutions?.length > 0 && (
              <div className="pt-8 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-4 font-medium">Didukung oleh:</p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 grayscale opacity-70 hover:opacity-100 transition-opacity">

                  {data.institutions.map((inst, index) => (
                    <div key={index} className="relative h-10 w-24 shrink-0">

                      <Image
                        src={img(inst.logo, 300, 60)}
                        alt={inst.alt || inst.label}
                        fill
                        className="object-contain"
                        sizes="100px"
                        placeholder="blur"
                        blurDataURL={img(inst.logo, 20, 20)}
                      />

                    </div>
                  ))}

                </div>
              </div>
            )}

          </div>

          {/* GAMBAR HERO */}
          <div className="flex-1 w-full max-w-[600px] lg:max-w-none">
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border">
              <Image
                src={img(data.images[0], 1800, 65)}
                alt={data.images[0]?.alt || "Hero Image"}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={img(data.images[0], 30, 20)}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
