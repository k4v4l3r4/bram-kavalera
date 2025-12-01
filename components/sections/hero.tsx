// file: components/HeroSection.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png"; // pastikan path gambar sesuai

export default function HeroSection() {
  const [shimmer, setShimmer] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShimmer(prev => !prev);
    }, 1000); // ganti warna setiap 1 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center py-16 bg-gray-50">
      {/* Gambar Logo */}
      <div className="mb-6">
        <Image src={logo} alt="Logo Rumah Negara" width={150} height={150} />
      </div>

      {/* Teks Highlight Shimmer */}
      <h1 className="text-5xl font-bold text-center relative overflow-hidden">
        <motion.span
          className={`relative z-10`}
          animate={{ backgroundPositionX: shimmer ? "200%" : "0%" }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "mirror" }}
        >
          <span
            className="bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500 bg-clip-text text-transparent"
          >
            Rumah Negara
          </span>
        </motion.span>
      </h1>
    </section>
  );
}
