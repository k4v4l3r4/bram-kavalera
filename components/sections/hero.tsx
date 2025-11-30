"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image" // <-- Import Image Wajib Ada
import { usePathname } from "next/navigation"
import { Menu, X, Mail, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

const navigation = [
  { name: "Beranda", href: "/" },
  { name: "Tentang Kami", href: "/#about" },
  { name: "Expertise", href: "/#expert-clusters" },
  { name: "Seminar", href: "/#expert-forum" },
  { name: "Podcast", href: "/#podcast" },
  { name: "Program", href: "/#programs" },
  { name: "Berita", href: "/#news" },
  { name: "Info Warga", href: "/#info" },
  { name: "Kontak", href: "/#contact" },
]

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()
  const [activeSection, setActiveSection] = React.useState(navigation[0].href)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Logika SCROLL SPY
      const scrollPosition = window.scrollY + 150 
      for (const item of navigation) {
        if (item.href === "/") {
           if (window.scrollY < 300) {
             setActiveSection("/")
           }
           continue
        }

        const sectionId = item.href.replace("/#", "")
        const element = document.getElementById(sectionId)

        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(item.href)
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() 
    
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
          
          {/* LOGO SECTION (SUDAH DIGANTI DARI 'P' KE GAMBAR) */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group z-50"
            onClick={() => setActiveSection("/")} 
          >
            {/* Pastikan file logo-pprnp.png ada di folder public */}
            <div className="relative h-16 w-auto aspect-[3/1] min-w-[120px]">
                <Image 
                  src="/logo-pprnp.png" 
                  alt="Logo PPRNP"
                  fill
                  className="object-contain object-left"
                  priority
                />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 bg-white/40 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/30 shadow-sm absolute left-1/2 -translate-x-1/2">
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
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden z-50">
             <button
                className="p-2 text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
             </button>
          </div>
          
          {/* Placeholder kanan */}
          <div className="hidden lg:block w-32"></div> 

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
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        setActiveSection(item.href)
                      }}
                      className="flex items-center justify-between py-4 text-lg font-medium border-b border-border/50 hover:text-primary transition-colors"
                    >
                      {item.name}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 space-y-4">
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