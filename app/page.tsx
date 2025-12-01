// FILE: app/page.tsx

// Import Komponen
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import ProgramsSection from "@/components/sections/programs";

// 👇 PERUBAHAN: Disesuaikan dengan nama file Anda (expert-forum.tsx)
import ExpertForumSection from "@/components/sections/expert-forum"; 

import PodcastSection from "@/components/sections/podcast";
import AnnouncementsSection from "@/components/sections/announcements";

// 👇 PERUBAHAN: Disesuaikan dengan nama file Anda (housing-info.tsx)
import HousingInfoSection from "@/components/sections/housing-info"; 

import ContactSection from "@/components/sections/contact";

// Catatan: Pastikan Anda telah membuat file footer.tsx!
import FooterSection from "@/components/sections/footer"; 


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
      <FooterSection />
    </main>
  );
}

// Catatan Penting: Pastikan SEMUA komponen ini diekspor sebagai 'export default' 
// di file masing-masing (misalnya, about.tsx, programs.tsx, dll.)