// FILE: app/page.tsx

import HeroSection from "@/components/sections/hero"
import ProgramsSection from "@/components/sections/programs"
import ExpertClustersSection from "@/components/sections/expert-clusters"
import ExpertForumSection from "@/components/sections/expert-forum"
import { ProductInnovation } from "@/components/sections/product-innovation"
import PodcastSection from "@/components/sections/podcast"
import AnnouncementsSection from "@/components/sections/announcements"
import HousingInfoSection from "@/components/sections/housing-info"
import ContactSection from "@/components/sections/contact"
import SiteFooter from "@/components/site-footer"

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <ExpertClustersSection />
        <ExpertForumSection />
		 <ProductInnovation />
        <PodcastSection />
        <ProgramsSection />
        <AnnouncementsSection />
        <HousingInfoSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}