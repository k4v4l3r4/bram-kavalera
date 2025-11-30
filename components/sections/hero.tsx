"use client"

import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Purnabakti <span className="text-primary">Produktif & Nyata</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Wadah kolaborasi para ahli purnabakti untuk terus berkarya, berbagi ilmu, dan memberikan dampak nyata bagi masyarakat Indonesia.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/#expert-clusters"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Jelajahi Expertise
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/#about"
              className="inline-flex h-12 items-center justify-center rounded-full border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Play className="mr-2 h-4 w-4 fill-current" />
              Tentang Kami
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}