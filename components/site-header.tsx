"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Mail, ChevronRight } from "lucide-react" // Icon User dihapus sementara
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button" // Button tidak dipakai sementara

const navigation = [
  { name: "Beranda", href: "/" },
  { name: "Tentang Kami", href: "/#about" },
  { name: "Program", href: "/#programs" },
  { name: "Forum Ahli", href: "/#expert-forum" },
  { name: "Podcast", href: "/#podcast" },
  { name: "Berita", href: "/#news" },
  { name: "Info Warga", href: "/#info" },
  { name: "Kontak", href: "/#contact" },
]

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-border/50 py-3" : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group z-50">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-105">
              <span className="font-bold text-lg">P</span>
            </div>
            <div className="flex flex-col justify-center">
              <span
                className={cn(
                  "text-xl font-bold leading-none tracking-tight transition-colors",
                  isScrolled ? "text-foreground" : "text-foreground/90",
                )}
              >
                PPRNP
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-full border border-white/20 shadow-sm">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-full hover:bg-muted/50",
                  pathname === item.href ? "text-primary" : "text-foreground/80 hover:text-primary",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions (TOMBOL MEMBER DIHILANGKAN SEMENTARA) */}
          <div className="hidden lg:flex items-center gap-4">
             {/* Nanti tombol Member ditaruh sini lagi kalau sistem login sudah siap */}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden z-50 p-2 text-foreground/80 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 min-h-screen bg-background/95 backdrop-blur-xl pt-24 px-6 lg:hidden border-b"
          >
            <div className="flex flex-col gap-6">
              <nav className="flex flex-col gap-2">
                {navigation.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between py-4 text-lg font-medium border-b border-border/50 hover:text-primary transition-colors"
                    >
                      {item.name}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 space-y-4">
                {/* Tombol Member Mobile juga disembunyikan */}
                <div className="flex justify-center gap-6 py-6 text-muted-foreground">
                  <a href="#" className="hover:text-primary">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}