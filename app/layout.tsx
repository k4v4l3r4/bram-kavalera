// FILE: app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

// Komponen efek visual & audio
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { BackToTop } from "@/components/ui/back-to-top"
import { BackgroundMusic } from "@/components/ui/background-music"

// Header utama website
import { SiteHeader } from "@/components/site-header"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "PPRNP - Pioner Penghuni Rumah Negara Puspiptek",
  description: "Pusat informasi dan komunitas warga Puspiptek.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          "font-sans min-h-screen flex flex-col relative"
        )}
        suppressHydrationWarning
      >
        {/* Garis progress scroll */}
        <ScrollProgress />

        {/* Background grid */}
        <div className="absolute inset-0 -z-10 bg-grid-pattern" />

        {/* Header global */}
        <SiteHeader />

        {/* Konten utama */}
        <main className="flex-1">{children}</main>

        {/* Audio & tombol kembali ke atas */}
        <BackgroundMusic />
        <BackToTop />
      </body>
    </html>
  )
}
