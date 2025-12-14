<section className="mb-40">
  <h2 className="text-3xl font-bold text-center mb-20">
    Struktur Pengurus PPRNP
  </h2>

  <div className="relative mx-auto max-w-6xl h-[820px]">

    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 820">
      <line x1="500" y1="80" x2="500" y2="140" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="250" y1="140" x2="750" y2="140" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="250" y1="140" x2="250" y2="220" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="750" y1="140" x2="750" y2="220" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="500" y1="300" x2="500" y2="360" stroke="#CBD5E1" strokeWidth="2" />
    </svg>

    {getByJabatan("Ketua") && (
      <OrgBox x="50%" y="30px" {...getByJabatan("Ketua")} primary />
    )}

    {getByJabatan("Wakil Ketua") && (
      <OrgBox x="25%" y="220px" {...getByJabatan("Wakil Ketua")} />
    )}

    {getByJabatan("Sekretaris") && (
      <OrgBox x="75%" y="220px" {...getByJabatan("Sekretaris")} />
    )}

    {getByJabatan("Bendahara") && (
      <OrgBox x="50%" y="360px" {...getByJabatan("Bendahara")} />
    )}

  </div>
</section>
