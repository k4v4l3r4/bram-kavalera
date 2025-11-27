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
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ExpertClustersSection /> 
        <ExpertForumSection />

        {/* 👇 PERUBAHAN URUTAN: Podcast -> Program -> Berita 👇 */}
        <PodcastSection />         {/* 1. Podcast */}
        <ProgramsSection />        {/* 2. Program */}
        <AnnouncementsSection />   {/* 3. Berita */}
        {/* 👆 -------------------------------------------------- 👆 */}
        
        <HousingInfoSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}