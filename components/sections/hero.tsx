"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="w-full relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-32 text-center relative">

        {/* Highlight bergerak */}
        <motion.div
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{ backgroundPosition: "200% 50%" }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="inline-block px-4 py-2 text-4xl font-extrabold
          bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300
          bg-[length:200%_200%] text-transparent bg-clip-text"
        >
          Rumah Negara
        </motion.div>

        <h1 className="text-3xl md:text-5xl font-bold mt-6 text-gray-900 leading-snug">
          Pioner Penghuni Rumah Negara Puspiptek
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Menghubungkan para penghuni, pakar, dan komunitas untuk membangun
          masa depan yang lebih baik melalui kolaborasi.
        </p>

        <div className="mt-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/hero-image.png"
              width={900}
              height={600}
              alt="Hero Image"
              className="rounded-2xl shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
