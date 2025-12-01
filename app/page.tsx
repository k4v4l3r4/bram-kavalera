// FILE: app/page.tsx
"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
// ✅ Import HeroSection sebagai DEFAULT (tanpa kurung kurawal)
import HeroSection from "@/components/sections/hero" 
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
  const [showAbout, setShowAbout] = useState(false)

  // LOGIKA TOGGLE (SAKLAR)
  const handleToggleAbout = () => {
    // 1. Ambil nilai kebalikan dari sekarang (!prev)
    setShowAbout((prev) => {
      const newState = !prev
      
      // 2. Jika newState == true (Artinya baru saja dibuka), maka scroll ke bawah
      if (newState) {
        setTimeout(() => {
          const element = document.getElementById("about")
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }, 100)
      }
      
      return newState
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        
        {/* Pass fungsi toggle DAN status (isAboutOpen) ke Hero */}
        <HeroSection 
            onToggleAbout={handleToggleAbout} 
            isAboutOpen={showAbout} 
        />
        
        {/* Render About jika showAbout = True */}
        {showAbout && <AboutSection />}
        
        <ExpertClustersSection /> 
        <ExpertForumSection />

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