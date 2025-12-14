"use client"

import { useEffect, useState, useMemo } from "react"
import { client } from "@/sanity/lib/client"
import imageUrlBuilder from "@sanity/image-url"
import { PortableTextRenderer } from "@/components/PortableTextRenderer"

const builder = imageUrlBuilder(client)
const urlFor = (source: any) => builder.image(source)

type Pengurus = {
  nama: string
  jabatan: string
}

export default function AboutSection() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "about"][0]{
        title,

        penjelasanPusiptekTitle,
        penjelasanPusiptekImage,
        penjelasanPusiptekContent,

        tentangPPRNPTitle,
        tentangPPRNPImage,
        tentangPPRNPContent,

        visi,
        misi,
        nilai,

        pengurus[]{
          nama,
          jabatan
        }
      }`

      const result = await client.fetch(query)
      setData(result)
    }

    fetchData()
  }, [])

  if (!data) {
    return (
      <div className="py-32 text-center text-muted-foreground">
        Memuat konten…
      </div>
    )
  }

  /* ================= DATA PROCESSING (AMAN) ================= */

  const pengurus: Pengurus[] = data.pengurus || []

  const penasihat = pengurus.filter(p =>
    p.jabatan?.toLowerCase().includes("penasehat")
  )

  const ketua = pengurus.find(p =>
    p.jabatan?.toLowerCase().includes("ketua")
  )

  const intiLain = pengurus.filter(
    p =>
      !p.jabatan?.toLowerCase().includes("penasehat") &&
      !p.jabatan?.toLowerCase().includes("ketua")
  )

  return (
    <section className="mx-auto max-w-7xl px-4 pb-40">

      {/* ================= HERO ================= */}
      <header className="mb-40 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          {data.title || "About Us"}
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
          Sejarah, peran, dan arah strategis PPRNP sebagai wadah intelektual
          purnabakti riset dan teknologi nasional.
        </p>
      </header>

      {/* ================= PUSPIPTEK ================= */}
      <section className="mb-32">
        <h2 className="text-3xl font-bold text-center mb-12">
          {data.penjelasanPusiptekTitle}
        </h2>

        {data.penjelasanPusiptekImage && (
          <img
            src={urlFor(data.penjelasanPusiptekImage).width(900).quality(85).url()}
            alt="PUSPIPTEK"
            className="mx-auto mb-12 rounded-xl max-w-4xl w-full"
          />
        )}

        <div className="prose prose-slate max-w-4xl mx-auto">
          <PortableTextRenderer blocks={data.penjelasanPusiptekContent} />
        </div>
      </section>

      {/* ================= TENTANG PPRNP ================= */}
      <section className="mb-32">
        <h2 className="text-3xl font-bold text-center mb-12">
          {data.tentangPPRNPTitle}
        </h2>

        {data.tentangPPRNPImage && (
          <img
            src={urlFor(data.tentangPPRNPImage).width(900).quality(85).url()}
            alt="PPRNP"
            className="mx-auto mb-12 rounded-xl max-w-4xl w-full"
          />
        )}

        <div className="prose prose-slate max-w-4xl mx-auto">
          <PortableTextRenderer blocks={data.tentangPPRNPContent} />
        </div>
      </section>

      {/* ================= VISI MISI NILAI ================= */}
      <section className="mb-40">
        <h2 className="text-3xl font-bold text-center mb-20">
          Visi, Misi & Nilai
        </h2>

        <div className="max-w-4xl mx-auto space-y-16">

          {data.visi && (
            <Block title="Visi">
              <p className="text-lg leading-relaxed">{data.visi}</p>
            </Block>
          )}

          {data.misi?.length > 0 && (
            <Block title="Misi">
              <ul className="list-disc pl-6 space-y-3">
                {data.misi.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Block>
          )}

          {data.nilai?.length > 0 && (
            <Block title="Nilai">
              <ul className="list-disc pl-6 space-y-3">
                {data.nilai.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Block>
          )}

        </div>
      </section>

      {/* ================= STRUKTUR PENGURUS (AMAN & MUNCUL) ================= */}
      <section className="mb-40">
        <h2 className="text-3xl font-bold text-center mb-20">
          Struktur Pengurus PPRNP
        </h2>

        {/* PENASEHAT */}
        {penasihat.length > 0 && (
          <Group title="Dewan Penasehat">
            {penasihat.map((p, i) => (
              <Card key={i} {...p} />
            ))}
          </Group>
        )}

        {/* KETUA */}
        {ketua && (
          <div className="flex justify-center mb-20">
            <HighlightCard {...ketua} />
          </div>
        )}

        {/* INTI / BIDANG */}
        {intiLain.length > 0 && (
          <Group title="Pengurus & Koordinator">
            {intiLain.map((p, i) => (
              <Card key={i} {...p} />
            ))}
          </Group>
        )}
      </section>

    </section>
  )
}

/* ================= KOMPONEN ================= */

function Block({ title, children }: any) {
  return (
    <div className="rounded-2xl border bg-card p-10">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="text-muted-foreground">{children}</div>
    </div>
  )
}

function Group({ title, children }: any) {
  return (
    <div className="mb-24">
      <h3 className="text-xl font-semibold text-center mb-10">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {children}
      </div>
    </div>
  )
}

function Card({ nama, jabatan }: Pengurus) {
  return (
    <div className="rounded-xl border bg-white p-6 text-center shadow-sm">
      <div className="font-semibold">{nama}</div>
      <div className="text-sm text-muted-foreground mt-1 uppercase">
        {jabatan}
      </div>
    </div>
  )
}

function HighlightCard({ nama, jabatan }: Pengurus) {
  return (
    <div className="rounded-2xl border bg-white px-10 py-6 text-center shadow-md">
      <div className="text-lg font-semibold">{nama}</div>
      <div className="text-sm uppercase text-muted-foreground mt-1">
        {jabatan}
      </div>
    </div>
  )
}
