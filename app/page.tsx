import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { ProgramsSection } from "@/components/sections/programs"
import { ExpertForumSection } from "@/components/sections/expert-forum"
import { AnnouncementsSection } from "@/components/sections/announcements"
import { PodcastSection } from "@/components/sections/podcast"
import { HousingInfoSection } from "@/components/sections/housing-info"
import { ContactSection } from "@/components/sections/contact"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <ExpertForumSection />
        
        {/* 👇 URUTAN DIPERBAIKI: Podcast dulu, baru Berita 👇 */}
        <PodcastSection />
        <AnnouncementsSection />
        
        <HousingInfoSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}