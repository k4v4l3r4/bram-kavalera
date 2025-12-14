"use client"

import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"
import imageUrlBuilder from "@sanity/image-url"
import { PortableTextRenderer } from "@/components/PortableTextRenderer"

const builder = imageUrlBuilder(client)
function urlFor(source: any) {
  return builder.image(source)
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

  return (
    <section className="mx-auto max-w-7xl px-4 pb-32">

      {/* ================= HERO ================= */}
      <header className="mb-32 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          {data.title || "Tentang Kami"}
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
          Sejarah, tujuan, dan peran PPRNP sebagai wadah intelektual
          para purnabakti riset dan teknologi nasional.
        </p>
      </header>

      {/* ================= PENJELASAN PUSPIPTEK ================= */}
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
      <section className="mb-32">
        <h2 className="text-3xl font-bold text-center mb-16">
          Visi, Misi & Nilai
        </h2>

        <div className="max-w-4xl mx-auto space-y-12">

          {data.visi && (
            <div className="rounded-2xl border bg-card p-8">
              <h3 className="text-xl font-semibold mb-4">Visi</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {data.visi}
              </p>
            </div>
          )}

          {data.misi?.length > 0 && (
            <div className="rounded-2xl border bg-card p-8">
              <h3 className="text-xl font-semibold mb-4">Misi</h3>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                {data.misi.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {data.nilai?.length > 0 && (
            <div className="rounded-2xl border bg-card p-8">
              <h3 className="text-xl font-semibold mb-4">Nilai</h3>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                {data.nilai.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </section>

      {/* ================= STRUKTUR PENGURUS (ORG CHART SVG) ================= */}
      {data.pengurus?.length > 0 && (
        <section className="mb-40">
          <h2 className="text-3xl font-bold text-center mb-20">
            Struktur Pengurus PPRNP
          </h2>

          <div className="relative mx-auto max-w-6xl h-[820px]">

            {/* SVG GARIS */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 820"
              fill="none"
            >
              <line x1="500" y1="80" x2="500" y2="140" stroke="#CBD5E1" strokeWidth="2" />
              <line x1="250" y1="140" x2="750" y2="140" stroke="#CBD5E1" strokeWidth="2" />
              <line x1="250" y1="140" x2="250" y2="220" stroke="#CBD5E1" strokeWidth="2" />
              <line x1="750" y1="140" x2="750" y2="220" stroke="#CBD5E1" strokeWidth="2" />

              <line x1="500" y1="300" x2="500" y2="360" stroke="#CBD5E1" strokeWidth="2" />

              <line x1="200" y1="440" x2="800" y2="440" stroke="#CBD5E1" strokeWidth="2" />
              <line x1="200" y1="440" x2="200" y2="520" stroke="#CBD5E1" strokeWidth="2" />
              <line x1="400" y1="440" x2="400" y2="520" stroke="#CBD5E1" strokeWidth="2" />
              <line x1="600" y1="440" x2="600" y2="520" stroke="#CBD5E1" strokeWidth="2" />
              <line x1="800" y1="440" x2="800" y2="520" stroke="#CBD5E1" strokeWidth="2" />
            </svg>

            <OrgBox x="50%" y="30px" nama="AKHIAR OEMRY" jabatan="KETUA" primary />
            <OrgBox x="25%" y="220px" nama="GUNANDJHAR" jabatan="WAKIL KETUA" />
            <OrgBox x="75%" y="220px" nama="EDDI MISTAM SETIAWAN" jabatan="SEKRETARIS" />
            <OrgBox x="50%" y="360px" nama="MARLI DAHIARIDI" jabatan="BENDAHARA" />

            <OrgBox x="20%" y="520px" nama="ANGGA" jabatan="KOOR. BIDANG HUKUM" small />
            <OrgBox x="40%" y="520px" nama="BRAMANTYO" jabatan="KOOR. WEB & DATABASE" small />
            <OrgBox x="60%" y="520px" nama="SYAHRIZA SHIDDIQ" jabatan="KOOR. MULTIMEDIA" small />
            <OrgBox x="80%" y="520px" nama="KRISNAYADI MOEJIDIN" jabatan="BIDANG UMUM" small />

          </div>
        </section>
      )}

    </section>
  )
}

/* ================= ORG BOX ================= */
function OrgBox({
  x,
  y,
  nama,
  jabatan,
  primary = false,
  small = false,
}: {
  x: string
  y: string
  nama: string
  jabatan: string
  primary?: boolean
  small?: boolean
}) {
  return (
    <div
      className={`
        absolute -translate-x-1/2
        rounded-xl border bg-white
        text-center shadow-sm
        ${primary ? "px-8 py-5 text-lg font-semibold shadow-md" : "px-6 py-4"}
        ${small ? "text-sm px-4 py-3" : ""}
      `}
      style={{ left: x, top: y }}
    >
      <div className="font-semibold">{nama}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
        {jabatan}
      </div>
    </div>
  )
}
