"use client"

type Pengurus = {
  nama: string
  jabatan: string
  level: "penasehat" | "inti" | "bidang"
  bidang?: string
}

/* ================= ORG CHART ================= */

export function OrgChart({
  penasehat,
  ketua,
  wakilKetua,
  sekretaris,
  wakilSekretaris,
  bendahara,
  wakilBendahara,
  bidang,
}: {
  penasehat: Pengurus[]
  ketua?: Pengurus
  wakilKetua?: Pengurus
  sekretaris?: Pengurus
  wakilSekretaris?: Pengurus
  bendahara?: Pengurus
  wakilBendahara?: Pengurus
  bidang: Pengurus[]
}) {
  return (
    <div className="mx-auto max-w-6xl space-y-14">

      {/* ================= PENASEHAT ================= */}
      {penasehat.length > 0 && (
        <section className="text-center">
          <h3 className="mb-6 text-xl font-semibold">Dewan Penasehat</h3>
          <div className="flex flex-col items-center gap-4">
            {penasehat.map((p, i) => (
              <OrgBox
                key={i}
                nama={p.nama}
                jabatan="PENASEHAT"
                variant="primary"
              />
            ))}
          </div>
        </section>
      )}

      {/* ================= KETUA ================= */}
      {ketua && (
        <section className="flex justify-center">
          <OrgBox
            nama={ketua.nama}
            jabatan="KETUA"
            variant="primary"
          />
        </section>
      )}

      {/* ================= WAKIL + INTI ================= */}
      <section className="space-y-10">

        {wakilKetua && (
          <div className="flex justify-center">
            <OrgBox
              nama={wakilKetua.nama}
              jabatan="WAKIL KETUA"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* SEKRETARIAT */}
          <div className="space-y-6 text-center">
            {sekretaris && (
              <OrgBox
                nama={sekretaris.nama}
                jabatan="SEKRETARIS"
              />
            )}

            {wakilSekretaris && (
              <OrgBox
                nama={wakilSekretaris.nama}
                jabatan="WAKIL SEKRETARIS"
                variant="small"
              />
            )}
          </div>

          {/* KEUANGAN */}
          <div className="space-y-6 text-center">
            {bendahara && (
              <OrgBox
                nama={bendahara.nama}
                jabatan="BENDAHARA"
              />
            )}

            {wakilBendahara && (
              <OrgBox
                nama={wakilBendahara.nama}
                jabatan="WAKIL BENDAHARA"
                variant="small"
              />
            )}
          </div>

        </div>
      </section>

      {/* ================= BIDANG ================= */}
      {bidang.length > 0 && (
        <section>
          <h3 className="mb-8 text-center text-xl font-semibold">
            Koordinator Bidang
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
            {bidang.map((b, i) => (
              <OrgBox
                key={i}
                nama={b.nama}
                jabatan={
                  b.bidang
                    ? `KOORDINATOR ${b.bidang.toUpperCase()}`
                    : "KOORDINATOR"
                }
                variant="small"
              />
            ))}
          </div>
        </section>
      )}

    </div>
  )
}

/* ================= ORG BOX ================= */

function OrgBox({
  nama,
  jabatan,
  variant = "default",
}: {
  nama: string
  jabatan: string
  variant?: "default" | "primary" | "small"
}) {
  return (
    <div
      className={`
        mx-auto w-full max-w-xs rounded-xl border bg-white text-center shadow-sm
        transition-shadow hover:shadow-md
        ${variant === "primary" ? "px-8 py-5 text-lg font-semibold" : ""}
        ${variant === "small" ? "px-4 py-3 text-sm" : "px-6 py-4"}
      `}
    >
      <div className="font-semibold">{nama}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
        {jabatan}
      </div>
    </div>
  )
}
