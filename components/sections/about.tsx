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

/* ================= UI STYLE (PPRNP IDENTITY) ================= */
const cardPPRNP = `
  rounded-2xl bg-white p-8
  border border-blue-100
  shadow-[0_10px_30px_rgba(0,30,80,0.08)]
  hover:shadow-[0_20px_40px_rgba(0,30,80,0.12)]
  transition-all duration-300
  relative overflow-hidden
  before:absolute before:top-0 before:left-0
  before:h-[4px] before:w-full
  before:bg-gradient-to-r
  before:from-blue-700 before:via-blue-500 before:to-yellow-400
`

/* ================= HELPERS ================= */
const normalizeToString = (item: any): string => {
  if (typeof item === "string") return item
  if (item?.judul) return item.judul
  if (item?.deskripsi) return item.deskripsi
  return ""
}

/* ================= SECTION TITLE ================= */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold">{children}</h2>
      <div
        className="
          mx-auto mt-3 h-[3px] w-24 rounded-full
          bg-gradient-to-r from-blue-700 via-blue-500 to-yellow-400
        "
      />
    </div>
  )
}

/* ================= COMPONENT ================= */
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
        tujuanStrategis,
        strategi,

        pengurus[]{
          nama,
          jabatan,
          level,
          bidang
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

  const pengurus: Pengurus[] = Array.isArray(data.pengurus)
    ? data.pengurus
    : []

  const byJabatan = (jabatan: string) =>
    pengurus.find((p) => p.jabatan === jabatan)

  const byLevel = (level: Pengurus["level"]) =>
    pengurus.filter((p) => p.level === level)

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
              <div className="prose prose-slate max-w-none">
                <PortableTextRenderer
                  blocks={data.penjelasanPusiptekContent}
                />
              </div>
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
              <div className="prose prose-slate max-w-none">
                <PortableTextRenderer
                  blocks={data.tentangPPRNPContent}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= VISI ================= */}
      {data.visi && (
        <section className="mb-24 max-w-4xl mx-auto">
          <SectionTitle>Visi</SectionTitle>
          <div className={cardPPRNP}>
            <p className="text-slate-700 leading-relaxed">{data.visi}</p>
          </div>
        </section>
      )}

      {/* ================= MISI ================= */}
      {Array.isArray(data.misi) && data.misi.length > 0 && (
        <section className="mb-24 max-w-4xl mx-auto">
          <SectionTitle>Misi</SectionTitle>
          <div className={cardPPRNP}>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
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
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              {data.nilai.map((n: string, i: number) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ================= TUJUAN STRATEGIS ================= */}
      {Array.isArray(data.tujuanStrategis) && data.tujuanStrategis.length > 0 && (
        <section className="mb-24 max-w-4xl mx-auto">
          <SectionTitle>Tujuan Strategis</SectionTitle>
          <div className={cardPPRNP}>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              {data.tujuanStrategis
                .map(normalizeToString)
                .filter(Boolean)
                .map((t: string, i: number) => (
                  <li key={i}>{t}</li>
                ))}
            </ul>
          </div>
        </section>
      )}

      {/* ================= STRATEGI ================= */}
      {Array.isArray(data.strategi) && data.strategi.length > 0 && (
        <section className="mb-32 max-w-4xl mx-auto">
          <SectionTitle>Strategi</SectionTitle>
          <div className={cardPPRNP}>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              {data.strategi
                .map(normalizeToString)
                .filter(Boolean)
                .map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
            </ul>
          </div>
        </section>
      )}

      {/* ================= ORG CHART ================= */}
      {pengurus.length > 0 && (
        <section className="mb-40">
          <SectionTitle>Struktur Pengurus PPRNP</SectionTitle>

          <OrgChart
            penasehat={byLevel("penasehat")}
            ketua={byJabatan("ketua")}
            wakilKetua={byJabatan("wakil_ketua")}
            sekretaris={byJabatan("sekretaris")}
            wakilSekretaris={byJabatan("wakil_sekretaris")}
            bendahara={byJabatan("bendahara")}
            wakilBendahara={byJabatan("wakil_bendahara")}
            bidang={byLevel("bidang")}
          />
        </section>
      )}

    </section>
  )
}
