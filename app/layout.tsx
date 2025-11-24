import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

// 👇 IMPORT KOMPONEN BARU (Pastikan file-nya sudah dibuat)
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { BackToTop } from "@/components/ui/back-to-top"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "PPRNP - Perkumpulan Pioner Penghuni Rumah Negara Puspiptek",
  description: "Pusat informasi dan komunitas warga Puspiptek.",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn(inter.variable, "font-sans min-h-screen flex flex-col relative")}>
        
        {/* 1. Garis Progress di Atas */}
        <ScrollProgress />
        
        {/* 2. Background Pola Bintik (Diambil dari globals.css) */}
        <div className="bg-grid-pattern" />

        {/* Konten Utama Website */}
        {children}

        {/* 3. Tombol Kembali ke Atas */}
        <BackToTop />
        
      </body>
    </html>
  )
}