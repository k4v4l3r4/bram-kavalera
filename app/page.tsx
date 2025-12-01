"use client"

import { useState } from "react"
import HeroSection from "@/components/sections/hero"
import AboutSection from "@/components/sections/about"
import ProgramsSection from "@/components/sections/programs"
import ExpertForumSection from "@/components/sections/expertForum"
import PodcastSection from "@/components/sections/podcast"
import AnnouncementsSection from "@/components/sections/announcements"
import HousingInfoSection from "@/components/sections/housingInfo"
import ContactSection from "@/components/sections/contact"
import FooterSection from "@/components/sections/footer"

export default function Page() {
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  return (
    <main>
      <HeroSection
        onToggleAbout={() => setIsAboutOpen(!isAboutOpen)}
        isAboutOpen={isAboutOpen}
      />
      <AboutSection />
      <ProgramsSection />
      <ExpertForumSection />
      <PodcastSection />
      <AnnouncementsSection />
      <HousingInfoSection />
      <ContactSection />
      <FooterSection />
    </main>
  )
}