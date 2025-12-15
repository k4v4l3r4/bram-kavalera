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
    <div className="mx-auto max-w-6xl space-y-20">

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
        <section className="text-center">
          <OrgBox
            nama={ketua.nama}
            jabatan="KETUA"
            variant="primary"
          />
        </section>
      )}

      {/* ================= PENGURUS INTI ================= */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {wakil && (
          <OrgBox
            nama={wakil.nama}
            jabatan="WAKIL KETUA"
          />
        )}

        {sekretaris && (
          <OrgBox
            nama={sekretaris.nama}
            jabatan="SEKRETARIS"
          />
        )}

        {bendahara && (
          <OrgBox
            nama={bendahara.nama}
            jabatan="BENDAHARA"
          />
        )}
      </section>

      {/* ================= BIDANG ================= */}
      {bidang.length > 0 && (
        <section>
          <h3 className="mb-8 text-center text-xl font-semibold">
            Koordinator Bidang
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {bidang.map((b, i) => (
              <OrgBox
                key={i}
                nama={b.nama}
                jabatan={b.bidang ? `KOORDINATOR ${b.bidang}` : "KOORDINATOR"}
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
