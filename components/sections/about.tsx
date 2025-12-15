"use client"

import { useEffect, useState } from "react"
import { client } from "@/sanity/lib/client"
import imageUrlBuilder from "@sanity/image-url"
import { PortableTextRenderer } from "@/components/PortableTextRenderer"

const builder = imageUrlBuilder(client)
const urlFor = (source: any) => builder.image(source)

/* ================= TYPES ================= */
type Pengurus = {
  nama: string
  jabatan: string
  level: "penasehat" | "inti" | "bidang"
  bidang?: string
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

  /* ================= HELPERS ================= */
  const byJabatan = (jabatan: string) =>
    pengurus.find((p) => p.jabatan === jabatan)

  const byLevel = (level: Pengurus["level"]) =>
    pengurus.filter((p) => p.level === level)

  /* ================= RENDER ================= */
  return (
    <section className="mx-auto max-w-7xl px-4 pb-32">

      {/* ================= HERO ================= */}
      <header className="mb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          {data.title}
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
          Sejarah, peran, dan arah strategis PPRNP sebagai wadah intelektual
          purnabakti riset dan teknologi nasional.
        </p>
      </header>

      {/* ================= PUSPIPTEK ================= */}
      {data.penjelasanPusiptekContent && (
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">
            {data.penjelasanPusiptekTitle}
          </h2>

          {data.penjelasanPusiptekImage && (
            <img
              src={urlFor(data.penjelasanPusiptekImage)
                .width(1000)
                .quality(85)
                .url()}
              alt="PUSPIPTEK"
              className="mx-auto mb-8 rounded-xl max-w-4xl w-full"
            />
          )}

          <div className="prose prose-slate max-w-4xl mx-auto">
            <PortableTextRenderer blocks={data.penjelasanPusiptekContent} />
          </div>
        </section>
      )}

      {/* ================= PPRNP ================= */}
      {data.tentangPPRNPContent && (
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">
            {data.tentangPPRNPTitle}
          </h2>

          {data.tentangPPRNPImage && (
            <img
              src={urlFor(data.tentangPPRNPImage)
                .width(1000)
                .quality(85)
                .url()}
              alt="PPRNP"
              className="mx-auto mb-8 rounded-xl max-w-4xl w-full"
            />
          )}

          <div className="prose prose-slate max-w-4xl mx-auto">
            <PortableTextRenderer blocks={data.tentangPPRNPContent} />
          </div>
        </section>
      )}

      {/* ================= VISI MISI NILAI ================= */}
      {(data.visi || data.misi || data.nilai) && (
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Visi, Misi & Nilai
          </h2>

          <div className="max-w-4xl mx-auto space-y-10">
            {data.visi && (
              <div className="rounded-2xl border bg-card p-8">
                <h3 className="text-xl font-semibold mb-3">Visi</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {data.visi}
                </p>
              </div>
            )}

            {Array.isArray(data.misi) && data.misi.length > 0 && (
              <div className="rounded-2xl border bg-card p-8">
                <h3 className="text-xl font-semibold mb-4">Misi</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  {data.misi.map((m: string, i: number) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(data.nilai) && data.nilai.length > 0 && (
              <div className="rounded-2xl border bg-card p-8">
                <h3 className="text-xl font-semibold mb-4">Nilai</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  {data.nilai.map((n: string, i: number) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ================= ORG CHART ================= */}
      {pengurus.length > 0 && (
        <section className="mb-40">
          <h2 className="text-3xl font-bold text-center mb-20">
            Struktur Pengurus PPRNP
          </h2>

          <OrgChart
            penasehat={byLevel("penasehat")}
            ketua={byJabatan("ketua")}
            wakil={byJabatan("wakil_ketua")}
            sekretaris={byJabatan("sekretaris")}
            bendahara={byJabatan("bendahara")}
            bidang={byLevel("bidang")}
          />
        </section>
      )}

    </section>
  )
}

/* ================= ORG CHART ================= */

function OrgChart({
  penasehat,
  ketua,
  wakil,
  sekretaris,
  bendahara,
  bidang,
}: {
  penasehat: Pengurus[]
  ketua?: Pengurus
  wakil?: Pengurus
  sekretaris?: Pengurus
  bendahara?: Pengurus
  bidang: Pengurus[]
}) {
  return (
    <div className="relative mx-auto max-w-6xl h-[900px]">

      {/* SVG LINES */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 900">
        {penasehat.length > 0 && (
          <line x1="500" y1="60" x2="500" y2="120" stroke="#CBD5E1" strokeWidth="2" />
        )}

        <line x1="500" y1="200" x2="500" y2="260" stroke="#CBD5E1" strokeWidth="2" />
        <line x1="200" y1="260" x2="800" y2="260" stroke="#CBD5E1" strokeWidth="2" />
        <line x1="200" y1="260" x2="200" y2="340" stroke="#CBD5E1" strokeWidth="2" />
        <line x1="500" y1="260" x2="500" y2="340" stroke="#CBD5E1" strokeWidth="2" />
        <line x1="800" y1="260" x2="800" y2="340" stroke="#CBD5E1" strokeWidth="2" />

        {bidang.length > 0 && (
          <line x1="500" y1="420" x2="500" y2="480" stroke="#CBD5E1" strokeWidth="2" />
        )}
      </svg>

      {/* PENASEHAT */}
      {penasehat.map((p, i) => (
        <OrgBox
          key={i}
          x="50%"
          y={`${20 + i * 70}px`}
          nama={p.nama}
          jabatan="PENASEHAT"
          primary
        />
      ))}

      {/* INTI */}
      {ketua && <OrgBox x="50%" y="120px" nama={ketua.nama} jabatan="KETUA" primary />}
      {wakil && <OrgBox x="20%" y="340px" nama={wakil.nama} jabatan="WAKIL KETUA" />}
      {sekretaris && <OrgBox x="50%" y="340px" nama={sekretaris.nama} jabatan="SEKRETARIS" />}
      {bendahara && <OrgBox x="80%" y="340px" nama={bendahara.nama} jabatan="BENDAHARA" />}

      {/* BIDANG */}
      {bidang.length > 0 && (
        <div className="absolute left-1/2 top-[520px] -translate-x-1/2 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full">
          {bidang.map((b, i) => (
            <OrgBox
              key={i}
              nama={b.nama}
              jabatan={b.bidang ? `KOOR. ${b.bidang}` : "KOORDINATOR"}
              small
              staticBox
            />
          ))}
        </div>
      )}
    </div>
  )
}

function OrgBox({
  x,
  y,
  nama,
  jabatan,
  primary,
  small,
  staticBox,
}: {
  x?: string
  y?: string
  nama: string
  jabatan: string
  primary?: boolean
  small?: boolean
  staticBox?: boolean
}) {
  return (
    <div
      className={`
        ${staticBox ? "" : "absolute -translate-x-1/2"}
        rounded-xl border bg-white text-center shadow-sm
        ${primary ? "px-8 py-5 text-lg font-semibold" : ""}
        ${small ? "px-4 py-3 text-sm" : "px-6 py-4"}
      `}
      style={staticBox ? {} : { left: x, top: y }}
    >
      <div className="font-semibold">{nama}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
        {jabatan}
      </div>
    </div>
  )
}
