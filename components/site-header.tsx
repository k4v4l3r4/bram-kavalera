"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Mail, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Beranda", href: "/" },
  // { name: "Tentang Kami", href: "/#about" },  <-- tetap dikomentar seperti semula
  { name: "Expertise Profile", href: "/#expert-clusters" },
  { name: "Workshop", href: "/#expert-forum" },
  { name: "Podcast", href: "/#podcast" },
  { name: "Program", href: "/#programs" },
  { name: "Berita", href: "/#news" },
  { name: "Info Warga", href: "/#info" },
  { name: "Kontak", href: "/#contact" },
]

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("/")

  React.useEffect(() => {
    // handler dipisah agar mudah di-remove
    const handleScroll = () => {
      try {
        setIsScrolled(window.scrollY > 20)

        const scrollPosition = window.scrollY + 150

        // default to home if near top
        if (window.scrollY < 300) {
          setActiveSection("/")
        }

        for (const item of navigation) {
          if (item.href === "/") continue

          // item.href format: "/#section-id"
          const sectionId = item.href.replace("/#", "")
          const element = document.getElementById(sectionId)
          if (!element) continue

          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(item.href)
            break
          }
        }
      } catch (err) {
        // defensive: jangan crash kalau DOM belum siap
        // console.debug("header scroll handler error", err)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    // call once to set initial state
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // close mobile menu on route change (optional improvement)
  React.useEffect(() => {
    const handleRouteChange = () => setIsMobileMenuOpen(false)
    // next/link doesn't expose router here; use popstate fallback
    window.addEventListener("popstate", handleRouteChange)
    return () => window.removeEventListener("popstate", handleRouteChange)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-border/50 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3 group z-50"
            onClick={() => setActiveSection("/")}
            aria-label="Beranda"
          >
            <Image
              src="/logo-pprnp.png"
              alt="Logo PPRNP"
              width={64}
              height={64}
              className="h-16 w-auto object-contain animate-[spin_12s_linear_infinite]"
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/40 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/30 shadow-sm absolute left-1/2 -translate-x-1/2">
            {navigation.map((item) => {
              const isActive = activeSection === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveSection(item.href)}
                  className={cn(
                    "relative px-4 py-1.5 text-sm font-medium transition-colors rounded-full whitespace-nowrap z-10",
                    isActive ? "text-primary font-semibold" : "text-foreground/70 hover:text-primary"
                  )}
                >
                  {item.name}

                  {isActive && (
                    <motion.span
                      layoutId="active-nav-bg"
                      className="absolute inset-0 bg-white rounded-full shadow-sm -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      aria-hidden
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Placeholder kanan (desktop) */}
          <div className="hidden lg:block w-16" />

          {/* Mobile Toggle */}
          <div className="lg:hidden z-50">
            <button
              className="p-2 text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 min-h-screen bg-background/95 backdrop-blur-xl pt-24 px-6 lg:hidden border-b"
            role="dialog"
            aria-modal="true"
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
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        setActiveSection(item.href)
                        // scroll behavior handled by browser anchor
                      }}
                      className={cn(
                        "flex items-center justify-between py-4 text-lg font-medium border-b border-border/50 transition-colors",
                        activeSection === item.href ? "text-primary font-bold" : "hover:text-primary"
                      )}
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 space-y-4">
                <div className="flex justify-center gap-6 py-6 text-muted-foreground">
                  <a href="#" className="hover:text-primary" aria-label="Email">
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
