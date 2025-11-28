"use client" // <--- WAJIB ADA KARENA KITA PAKAI STATE

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { ExpertForumSection } from "@/components/sections/expert-forum" 
import { ExpertClustersSection } from "@/components/sections/expert-clusters"
import { ProgramsSection } from "@/components/sections/programs"
import { PodcastSection } from "@/components/sections/podcast"
import { AnnouncementsSection } from "@/components/sections/announcements"
import { HousingInfoSection } from "@/components/sections/housing-info"
import { ContactSection } from "@/components/sections/contact"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  // 1. State untuk mengontrol visibilitas AboutSection
  // false = tersembunyi, true = muncul
  const [showAbout, setShowAbout] = useState(false)

  // 2. Fungsi yang akan dipanggil saat tombol di Hero diklik
  const handleShowAbout = () => {
    setShowAbout(true) // Munculkan section
    
    // Beri jeda 100ms agar React sempat merender section tersebut
    // sebelum kita perintahkan browser untuk scroll ke sana
    setTimeout(() => {
      const element = document.getElementById("about")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        
        {/* 3. Oper fungsi handleShowAbout ke HeroSection */}
        <HeroSection onShowAbout={handleShowAbout} />
        
        {/* 4. Render Kondisional: AboutSection hanya muncul jika showAbout == true */}
        {showAbout && <AboutSection />}
        
        <ExpertClustersSection /> 
        <ExpertForumSection />

        {/* Urutan Sesuai Request: Podcast -> Program -> Berita */}
        <PodcastSection />         
        <ProgramsSection />        
        <AnnouncementsSection />   
        
        <HousingInfoSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}