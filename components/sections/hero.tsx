// file: components/HeroSection.tsx
"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center py-16 bg-gray-50">
      {/* Gambar Logo dari folder public */}
      <div className="mb-6">
        <Image
          src="/logo.png" // pastikan logo.png ada di folder public/
          alt="Logo Rumah Negara"
          width={150}
          height={150}
          priority // agar gambar dimuat lebih cepat
        />
      </div>

      {/* Jika ingin efek shimmer, bisa diterapkan di elemen lain atau border gambar */}
      {/* Contoh shimmer di border */}
      <div className="w-40 h-40 rounded-full border-4 border-gradient-to-r from-yellow-400 via-red-500 to-purple-500 animate-pulse"></div>
    </section>
  );
}
