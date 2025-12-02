"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { client } from "@/sanity/lib/client"

export default function SiteFooter() {
  const [data, setData] = useState<any>(null)
  const [contactData, setContactData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(`{ "footer": *[_type == "footer"][0], "contact": *[_type == "contact"][0] }`)
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
      {/* top */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto py-12 md:py-16 px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{data?.newsletterTitle || "Tetap Terhubung Bersama Kami"}</h2>
              <p className="text-slate-400">{data?.newsletterDesc || "Dapatkan informasi terbaru seputar kegiatan kawasan Puspiptek."}</p>
            </div>
            <div className="flex gap-2 max-w-md md:ml-auto w-full">
              <Input type="email" placeholder="Masukkan email anda" className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-primary" />
              <Button size="icon" className="shrink-0 bg-primary hover:bg-primary/90"><ArrowRight className="h-4 w-4" /><span className="sr-only">Subscribe</span></Button>
            </div>
          </div>
        </div>
      </div>

      {/* main */}
      <div className="container mx-auto py-12 md:py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="relative">
              <Image src="/logo-pprnp.png" alt="Logo PPRNP" width={0} height={0} sizes="100vw" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{data?.brandDescription || "Wadah silaturahmi..."}</p>
            <div className="flex gap-4 pt-2">
              {data?.socialInstagram && (<Link href={data.socialInstagram} target="_blank" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Instagram className="h-4 w-4" /></Link>)}
              {data?.socialFacebook && (<Link href={data.socialFacebook} target="_blank" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Facebook className="h-4 w-4" /></Link>)}
              {data?.socialYoutube && (<Link href={data.socialYoutube} target="_blank" className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Youtube className="h-4 w-4" /></Link>)}
            </div>
          </div>

          {/* other columns (tautan cepat, layanan warga, kontak) */}
          <div>/* ... sama seperti yang sebelumnya kamu kirim ... */</div>
          <div>/* ... */</div>
          <div>/* ... */</div>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-slate-950">
        <div className="container mx-auto py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 px-4">
          <p>&copy; {new Date().getFullYear()} PPRNP. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
            <Link href="#" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
