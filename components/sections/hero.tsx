// Hero.tsx - Final Fix Version (Server Component, Sanity Data, Animasi Ringan)

import Image from "next/image"
import { client } from "@/lib/sanity/client"
import { motion } from "framer-motion"

export const revalidate = 0 // selalu fetch data terbaru

export default async function Hero() {
  const data = await client.fetch(`*[_type == "hero"][0]{
    title,
    subtitle,
    description,
    ctaText,
    image{ asset->{ url } }
  }`)

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-black text-white px-6">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          <span className="px-4 py-1 rounded-xl bg-white/10 backdrop-blur-sm animate-pulse">
            {data?.title}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-4 text-lg md:text-xl text-gray-300"
        >
          {data?.subtitle}
        </motion.p>

        {/* Description */}
        {data?.description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.75 }}
            className="mt-4 text-base text-gray-400 max-w-2xl mx-auto"
          >
            {data.description}
          </motion.p>
        )}

        {/* CTA Button */}
        {data?.ctaText && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-8 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700"
          >
            {data.ctaText}
          </motion.button>
        )}
      </div>

      {/* Background Image (Super Light) */}
      {data?.image?.asset?.url && (
        <Image
          src={data.image.asset.url}
          fill
          alt="Hero Background"
          className="object-cover opacity-40 z-0"
          priority
        />
      )}
    </section>
  )
}
