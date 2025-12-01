// FILE: app/page.tsx

// Import Komponen
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import ProgramsSection from "@/components/sections/programs";

// ✅ Jalur Kebab-Case sudah benar
import ExpertForumSection from "@/components/sections/expert-forum"; 

import PodcastSection from "@/components/sections/podcast";
import AnnouncementsSection from "@/components/sections/announcements";

// ✅ Jalur Kebab-Case sudah benar
import HousingInfoSection from "@/components/sections/housing-info"; 

import ContactSection from "@/components/sections/contact";

// ❌ PERUBAHAN: Import SiteFooter sebagai Named Export ({ SiteFooter })
// Karena komponen aslinya (site-footer.tsx) menggunakan 'export function SiteFooter()'
import { SiteFooter } from "@/components/site-footer";


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
      
      {/* ❌ PERUBAHAN: Menggunakan nama komponen yang diimpor, yaitu SiteFooter */}
      <SiteFooter /> 
    </main>
  );
}

// Hapus komentar lama: Pastikan SEMUA komponen lain (Hero, Programs, dll.) menggunakan 'export default' 
// di file masing-masing untuk menghindari kesalahan 'Element type is invalid' di masa mendatang.