"use client"

import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"
import imageUrlBuilder from "@sanity/image-url"
import { PortableTextRenderer } from "@/components/PortableTextRenderer"
import { OrgChart } from "@/components/sections/OrgChart"

const builder = imageUrlBuilder(client)
const urlFor = (source: any) => builder.image(source)

/* ================= TYPES ================= */
type Pengurus = {
  nama: string
  jabatan: string
  level: "penasehat" | "inti" | "bidang"
  bidang?: string
}

/* ================= UI STYLE (PPRNP) ================= */
const cardPPRNP =
  "rounded-2xl bg-white p-8 border border-blue-100 " +
  "shadow-[0_10px_30px_rgba(0,30,80,0.08)] " +
  "hover:shadow-[0_20px_40px_rgba(0,30,80,0.12)] " +
  "transition-all duration-300 relative overflow-hidden " +
  "before:absolute before:top-0 before:left-0 before:h-[4px] before:w-full " +
  "before:bg-gradient-to-r before:from-blue-700 before:via-blue-500 before:to-yellow-400"

/* ================= SECTION TITLE ================= */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold">{children}</h2>
      <div className="mx-auto mt-3 h-[3px] w-24 rounded-full bg-gradient-to-r from-blue-700 via-blue-500 to-yellow-400" />
    </div>
  )
}

/* ================= COMPONENT ================= */
export default function AboutSection() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    client.fetch(`*[_type=="about"][0]`).then(setData)
  }, [])

  if (!data) {
    return (
      <div className="py-32 text-center text-muted-foreground">
        Memuat konten…
      </div>
    )
  }

  const pengurus: Pengurus[] = Array.isArray(data.pengurus)
    ? data.pengurus
    : []

  /* ================= ORG MAPPING (FINAL – EXACT) ================= */
  const byJabatan = (jabatan: string) =>
    pengurus.find((p) => p.jabatan === jabatan)

  const penasehat = pengurus.filter(
    (p) => p.jabatan === "penasehat"
  )

  const ketua = byJabatan("ketua")
  const wakilKetua = byJabatan("wakil_ketua")

  const sekretaris = byJabatan("sekretaris")
  const wakilSekretaris = byJabatan("wakil_sekretaris")

  const bendahara = byJabatan("bendahara")
  const wakilBendahara = byJabatan("wakil_bendahara")

  const bidang = pengurus
    .filter((p) => p.jabatan === "koordinator")
    .map((p) => ({
      nama: p.nama,
      jabatan: "Koordinator",
      level: "bidang" as const,
      bidang: p.bidang || "Bidang",
    }))

  return (
    <section className="mx-auto max-w-7xl px-4 pb-32">

      {/* ================= PUSPIPTEK ================= */}
      {data.penjelasanPusiptekContent && (
        <section className="mb-28">
          <SectionTitle>{data.penjelasanPusiptekTitle}</SectionTitle>

          {data.penjelasanPusiptekImage && (
            <img
              src={urlFor(data.penjelasanPusiptekImage)
                .width(1000)
                .quality(90)
                .url()}
              alt="PUSPIPTEK"
              className="mx-auto mb-10 rounded-2xl max-w-4xl w-full"
            />
          )}

          <div className="max-w-4xl mx-auto">
            <div className={cardPPRNP}>
              <PortableTextRenderer blocks={data.penjelasanPusiptekContent} />
            </div>
          </div>
        </section>
      )}

      {/* ================= PPRNP ================= */}
      {data.tentangPPRNPContent && (
        <section className="mb-28">
          <SectionTitle>{data.tentangPPRNPTitle}</SectionTitle>

          {data.tentangPPRNPImage && (
            <img
              src={urlFor(data.tentangPPRNPImage)
                .width(1000)
                .quality(90)
                .url()}
              alt="PPRNP"
              className="mx-auto mb-10 rounded-2xl max-w-4xl w-full"
            />
          )}

          <div className="max-w-4xl mx-auto">
            <div className={cardPPRNP}>
              <PortableTextRenderer blocks={data.tentangPPRNPContent} />
            </div>
          </div>
        </section>
      )}

      {/* ================= VISI ================= */}
      {data.visi && (
        <section className="mb-24 max-w-4xl mx-auto">
          <SectionTitle>Visi</SectionTitle>
          <div className={cardPPRNP}>{data.visi}</div>
        </section>
      )}

      {/* ================= MISI ================= */}
      {Array.isArray(data.misi) && data.misi.length > 0 && (
        <section className="mb-24 max-w-4xl mx-auto">
          <SectionTitle>Misi</SectionTitle>
          <div className={cardPPRNP}>
            <ul className="list-disc pl-6 space-y-2">
              {data.misi.map((m: string, i: number) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ================= NILAI ================= */}
      {Array.isArray(data.nilai) && data.nilai.length > 0 && (
        <section className="mb-24 max-w-4xl mx-auto">
          <SectionTitle>Nilai</SectionTitle>
          <div className={cardPPRNP}>
            <ul className="list-disc pl-6 space-y-2">
              {data.nilai.map((n: string, i: number) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ================= ORG CHART ================= */}
      {pengurus.length > 0 && (
        <section className="mb-40">
          <SectionTitle>Struktur Pengurus PPRNP</SectionTitle>

          <div className="mx-auto max-w-6xl rounded-3xl bg-white p-10 border border-blue-100 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 h-[5px] w-full bg-gradient-to-r from-blue-700 via-blue-500 to-yellow-400" />

            <OrgChart
              penasehat={penasehat}
              ketua={ketua}
              wakilKetua={wakilKetua}
              sekretaris={sekretaris}
              wakilSekretaris={wakilSekretaris}
              bendahara={bendahara}
              wakilBendahara={wakilBendahara}
              bidang={bidang}
            />
          </div>
        </section>
      )}

    </section>
  )
}
