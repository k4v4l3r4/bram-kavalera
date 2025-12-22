"use client"

import { NextStudio } from "next-sanity/studio"
import dynamic from "next/dynamic"
import config from "../../../sanity.config"

// Menggunakan dynamic import untuk memastikan Studio 
// tidak dimuat selama proses SSR atau rendering awal yang berat
const StudioComponent = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false }
)

export default function StudioPage() {
  return (
    <div className="h-screen w-full">
      <NextStudio config={config} />
    </div>
  )
}