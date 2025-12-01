// FILE: app/page.tsx
"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
// Menggunakan Default Import
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

  const handleToggleAbout = () => {
    setShowAbout((prev) => {
      const newState = !prev
      
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
        
        <HeroSection 
            onToggleAbout={handleToggleAbout} 
            isAboutOpen={showAbout} 
        />
        
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