import type { ReactNode } from "react"
import { SiteHeader } from "@/components/site-header"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { BackToTop } from "@/components/ui/back-to-top"
import { BackgroundMusic } from "@/components/ui/background-music"

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main>{children}</main>
      <BackgroundMusic />
      <BackToTop />
    </>
  )
}
