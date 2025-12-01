// FILE: app/page.tsx
"use client"

import { useState } from "react"
import HeroSection from "@/components/sections/hero"

export default function Page() {
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  return (
    <main>
      <HeroSection
        onToggleAbout={() => setIsAboutOpen(!isAboutOpen)}
        isAboutOpen={isAboutOpen}
      />
    </main>
  )
}