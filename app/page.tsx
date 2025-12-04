// FILE: app/page.tsx

// Import Komponen
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import ProgramsSection from "@/components/sections/programs";
import ExpertForumSection from "@/components/sections/expert-forum";
import PodcastSection from "@/components/sections/podcast";
import AnnouncementsSection from "@/components/sections/announcements";
import HousingInfoSection from "@/components/sections/housing-info";
import ContactSection from "@/components/sections/contact";
// Perbaikan: import default (sesuai export di site-footer.tsx)
import SiteFooter from "@/components/site-footer";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <ExpertForumSection />
      <PodcastSection />
      <AnnouncementsSection />
      <HousingInfoSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
