"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { client } from "@/sanity/lib/client"

export function SiteFooter() {
  const [data, setData] = useState<any>(null)
  const [contactData, setContactData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // FETCH GABUNGAN: Mengambil data Footer DAN Contact sekaligus
        const result = await client.fetch(`
          {
            "footer": *[_type == "footer"][0],
            "contact": *[_type == "contact"][0]
          }
        `)
        setData(result.footer)
        setContactData(result.contact)
      } catch (error) {
        console.error("Gagal ambil data footer:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <footer className="bg-slate-900 text-slate-200">
      {/* Top Section with Newsletter */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto py-12 md:py-16 px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {data?.newsletterTitle || "Tetap Terhubung Bersama Kami"}
              </h2>
              <p className="text-slate-400">
                {data?.newsletterDesc || "Dapatkan informasi terbaru seputar kegiatan kawasan Puspiptek."}
              </p>
            </div>
            <div className="flex gap-2 max-w-md md:ml-auto w-full">
              <Input
                type="email"
                placeholder="Masukkan email anda"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-primary"
              />
              <Button size="icon" className="shrink-0 bg-primary hover:bg-primary/90">
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto py-12 md:py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* 1. Brand Column */}
          <div className="space-y-4">
            {/* LOGO FOOTER (PROPORSIONAL) */}
            <div className="relative">
             <Image 
  src="/logo-pprnp.png"
  alt="Logo PPRNP"
  width={0}
  height={0}
  sizes="100vw"
  className="h-16 w-auto object-contain"
              />
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              {data?.brandDescription || "Wadah silaturahmi, informasi, dan kolaborasi untuk mewujudkan komunitas Puspiptek yang sehat, aman, dan produktif.."}
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {data?.socialInstagram && (
                <Link
                  href={data.socialInstagram}
                  target="_blank"
                  className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
              )}
              {data?.socialFacebook && (
                <Link
                  href={data.socialFacebook}
                  target="_blank"
                  className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </Link>
              )}
              {data?.socialYoutube && (
                <Link
                  href={data.socialYoutube}
                  target="_blank"
                  className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Youtube className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>

          {/* 2. Links Column: TAUTAN CEPAT (UPDATED) */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Tautan Cepat</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-slate-600"></span>
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-slate-600"></span>
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/#expert-clusters" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-slate-600"></span>
                  Expertise Profile
                </Link>
              </li>
              <li>
                <Link href="/#expert-forum" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-slate-600"></span>
                  Seminar
                </Link>
              </li>
              <li>
                <Link href="/#podcast" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-slate-600"></span>
                  Podcast
                </Link>
              </li>
              <li>
                <Link href="/#programs" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-slate-600"></span>
                  Program & Kegiatan
                </Link>
              </li>
              <li>
                <Link href="/#news" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-slate-600"></span>
                  Berita
                </Link>
              </li>
              <li>
                <Link href="/#info" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-slate-600"></span>
                  Info Warga
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-slate-600"></span>
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Services Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Layanan Warga</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-slate-600"></span>
                  Panduan Warga Baru
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-slate-600"></span>
                  Jadwal Keamanan
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-slate-600"></span>
                  Lapor Kerusakan
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-slate-600"></span>
                  Booking Fasilitas
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Kontak</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  {contactData?.address || "Alamat Sekretariat belum diisi."}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href={`mailto:${contactData?.email}`} className="hover:text-primary transition-colors">
                  {contactData?.email || "email@contoh.com"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href={`https://wa.me/${contactData?.phone}`} target="_blank" className="hover:text-primary transition-colors">
                  +{contactData?.phone || "62..."} (WA)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="container mx-auto py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 px-4">
          <p>&copy; {new Date().getFullYear()} PPRNP. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}