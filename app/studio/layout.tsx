// FILE: app/studio/layout.tsx
import type React from "react"

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="font-sans min-h-screen">
        {/* Tidak ada SiteHeader di sini */}
        {children}
      </body>
    </html>
  )
}