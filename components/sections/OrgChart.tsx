{/* ================= ORG CHART ================= */}
{pengurus.length > 0 && (
  <section className="mb-40">
    <h2 className="text-3xl font-bold text-center mb-20">
      Struktur Pengurus PPRNP
    </h2>

    <div className="relative mx-auto max-w-6xl h-[780px]">

      {/* ================= SVG GARIS ================= */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 780">
        {penasehat.length > 0 && inti.length > 0 && (
          <>
            <line x1="500" y1="120" x2="500" y2="180" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="200" y1="180" x2="800" y2="180" stroke="#CBD5E1" strokeWidth="2" />
          </>
        )}

        {inti.length > 0 && bidang.length > 0 && (
          <>
            <line x1="500" y1="360" x2="500" y2="420" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="150" y1="420" x2="850" y2="420" stroke="#CBD5E1" strokeWidth="2" />
          </>
        )}
      </svg>

      {/* ================= PENASEHAT ================= */}
      {penasehat.map((p, i) => (
        <OrgBox
          key={`penasehat-${i}`}
          x="50%"
          y={`${30 + i * 72}px`}
          nama={p.nama}
          jabatan={p.jabatan?.toUpperCase() || ""}
          primary
        />
      ))}

      {/* ================= INTI ================= */}
      {inti.map((p, i) => (
        <OrgBox
          key={`inti-${i}`}
          x={`${20 + i * (60 / Math.max(inti.length - 1, 1))}%`}
          y="260px"
          nama={p.nama}
          jabatan={p.jabatan?.toUpperCase() || ""}
        />
      ))}

      {/* ================= BIDANG ================= */}
      {bidang.map((p, i) => (
        <OrgBox
          key={`bidang-${i}`}
          x={`${15 + i * (70 / Math.max(bidang.length - 1, 1))}%`}
          y="460px"
          nama={p.nama}
          jabatan={p.jabatan?.toUpperCase() || ""}
          small
        />
      ))}

    </div>
  </section>
)}
