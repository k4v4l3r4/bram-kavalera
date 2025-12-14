// app/studio/layout.tsx
import type React from "react"

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen font-sans">
      {children}
    </div>
  )
}
