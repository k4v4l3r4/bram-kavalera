"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  X,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Zap,
  Sun,
  Cog,
  Wrench,
  Briefcase,
  TrendingUp,
  HeartPulse,
  ShieldCheck,
  Lightbulb,
  Microscope,
  Droplets,
  Globe,
  Layers,
  Users,
  Mail,
  Linkedin
} from "lucide-react"
import { client } from "@/sanity/lib/client"
import { PortableTextRenderer } from "@/components/PortableTextRenderer"

/* ================= ICON MAP ================= */
const iconMap: Record<string, any> = {
  Leaf, Sprout: Leaf, Zap, Sun, Droplets, Globe, Cog, Wrench, 
  Layers, Briefcase, TrendingUp, HeartPulse, Users, ShieldCheck, 
  Lightbulb, Microscope
}

const WA_NUMBER = "628984936895"
const AUTO_SPEED = 0.5 
const CARD_STEP = 326 

export default function ExpertClustersSection() {
  const [data, setData] = useState<any>(null)
  const [selectedCluster, setSelectedCluster] = useState<any>(null)
  const [showAdminContact, setShowAdminContact] = useState(false)
  const [paused, setPaused] = useState(false)

  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    client
      .fetch(`*[_type=="expertClusters"][0]{ title, clusters[]{ title, description, icon, experts[]{ name, role, linkedin, "photoUrl": photo.asset->url } } }`)
      .then(setData)
      .catch(console.error)
  }, [])

  const clusters = data?.clusters || []
  const items = useMemo(() => (!clusters.length ? [] : [...clusters, ...clusters]), [clusters])

  /* ================= GERAK OTOMATIS (MARQUEE) ================= */
  useEffect(() => {
    const animate = () => {
      if (!paused && trackRef.current) {
        offsetRef.current += AUTO_SPEED
        const halfWidth = trackRef.current.scrollWidth / 2
        if (offsetRef.current >= halfWidth) offsetRef.current = 0
        trackRef.current.style.transform = `translate3d(-${offsetRef.current}px,0,0)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [paused, items])

  /* ================= NAVIGASI MANUAL ================= */
  const nudge = (dir: "left" | "right") => {
    const track = trackRef.current
    if (!track) return
    const halfWidth = track.scrollWidth / 2
    
    setPaused(true) // Menghentikan animasi otomatis

    if (dir === "left") {
      offsetRef.current = offsetRef.current - CARD_STEP < 0 ? halfWidth - CARD_STEP : offsetRef.current - CARD_STEP
    } else {
      offsetRef.current = offsetRef.current + CARD_STEP >= halfWidth ? 0 : offsetRef.current + CARD_STEP
    }

    // Terapkan transisi halus untuk perpindahan manual
    track.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
    track.style.transform = `translate3d(-${offsetRef.current}px,0,0)`

    // Bersihkan timeout sebelumnya jika pengguna mengklik cepat
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    
    // Resume gerak otomatis setelah 3 detik
    resumeTimeoutRef.current = setTimeout(() => {
      if (track) track.style.transition = "none" // Hapus transisi agar marquee lancar kembali
      setPaused(false)
    }, 3000)
  }

  const hour = new Date().getHours()
  const isOnline = hour >= 9 && hour <= 17
  
  const waLink = useMemo(() => {
    const cleanNumber = WA_NUMBER.replace(/\D/g, '') 
    return `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(`Halo Admin PPRNP, saya ingin konsultasi mengenai expertise: ${selectedCluster?.title || "-"}`)}`
  }, [selectedCluster])

  if (!data) return null

  return (
    <section id="expert-clusters" className="pt-16 pb-24 bg-slate-50/50 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-16 text-center text-slate-800 tracking-tight italic">
          {data.title || "Expertise Profile"}
        </h3>

        <div className="relative group px-4">
          {/* TOMBOL NAVIGASI KIRI */}
          <button 
            onClick={() => nudge("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/90 backdrop-blur shadow-xl rounded-full text-slate-800 hover:bg-blue-600 hover:text-white transition-all cursor-pointer hidden md:flex active:scale-90"
          >
            <ChevronLeft size={24} />
          </button>

          {/* AREA TRACKER DENGAN HOVER PAUSE */}
          <div 
            className="overflow-hidden cursor-pointer"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div 
              ref={trackRef} 
              className="flex gap-6 w-max will-change-transform"
              style={{ transition: paused ? 'transform 0.4s ease-out' : 'none' }}
            >
              {items.map((item: any, index: number) => {
                const Icon = iconMap[item.icon] || Lightbulb
                return (
                  <div key={index} className="w-[300px] rounded-[2rem] p-8 min-h-[400px] flex flex-col items-center text-center bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 select-none">
                    <div className="mb-6 p-5 rounded-2xl bg-blue-50 text-blue-600 shadow-inner">
                      <Icon className="h-10 w-10" />
                    </div>
                    <h4 className="font-bold text-xl mb-4 text-slate-800 leading-tight">{item.title}</h4>
                    <div className="text-sm text-slate-500 mb-8 line-clamp-4 leading-relaxed">
                      <PortableTextRenderer blocks={item.description} />
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCluster(item);
                      }} 
                      className="mt-auto flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-blue-600 transition-all shadow-lg cursor-pointer active:scale-95"
                    >
                      Show Expertise <ChevronRight size={16} />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* TOMBOL NAVIGASI KANAN */}
          <button 
            onClick={() => nudge("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/90 backdrop-blur shadow-xl rounded-full text-slate-800 hover:bg-blue-600 hover:text-white transition-all cursor-pointer hidden md:flex active:scale-90"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* ================= MODAL 1: DAFTAR EXPERT ================= */}
      <AnimatePresence>
        {selectedCluster && !showAdminContact && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col">
              <div className="p-8 pb-4 flex justify-between items-center border-b">
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">{selectedCluster.title}</h3>
                <button onClick={() => setSelectedCluster(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 cursor-pointer"><X size={24}/></button>
              </div>
              
              <div className="p-6 overflow-y-auto space-y-5">
                {selectedCluster.experts?.map((expert: any, i: number) => (
                  <div key={i} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-slate-100 transition-all">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-white flex-shrink-0">
                      {expert.photoUrl ? <Image src={expert.photoUrl} alt={expert.name} width={96} height={96} className="object-cover w-full h-full" /> : <Users className="w-full h-full p-4 text-slate-300" />}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h5 className="font-bold text-slate-800 text-base">{expert.name}</h5>
                      <p className="text-[10px] text-blue-600 font-bold uppercase mb-4 tracking-tighter">{expert.role || "Specialist"}</p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {expert.linkedin && (
                          <a href={expert.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[#0077b5] text-white rounded-xl text-[10px] font-bold hover:bg-[#005a87] transition-all cursor-pointer shadow-sm">
                            <Linkedin size={14} fill="currentColor" /> LinkedIn
                          </a>
                        )}
                        <button onClick={() => setShowAdminContact(true)} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-bold hover:bg-blue-600 transition-all cursor-pointer shadow-md">
                          <MessageCircle size={14} /> Contact Us
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t bg-white">
                <button onClick={() => setSelectedCluster(null)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs hover:bg-slate-800 uppercase tracking-widest transition-all cursor-pointer active:scale-95 shadow-lg">Tutup</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MODAL 2: ADMIN ================= */}
      <AnimatePresence>
        {showAdminContact && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-white rounded-[2.5rem] shadow-2xl max-w-sm w-full overflow-hidden p-8 border border-slate-100">
              <div className="flex justify-between items-start mb-6 text-left w-full">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">Admin PPRNP</h3>
                  <div className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${isOnline ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                    <span className={`h-2 w-2 rounded-full ${isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"}`} /> {isOnline ? "Online" : "Offline"}
                  </div>
                </div>
                <button onClick={() => setShowAdminContact(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 cursor-pointer transition-colors"><X size={20} /></button>
              </div>

              <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold mb-8 cursor-pointer hover:bg-[#1fb355] transition-all shadow-lg active:scale-95 shadow-green-100">
                <MessageCircle className="h-5 w-5 fill-current" /> WhatsApp Admin
              </a>

              <div className="space-y-3 mb-8 text-left">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Contact</p>
                {["achiar.oemry@gmail.com", "mdahyaridi@gmail.com"].map(email => (
                  <a key={email} href={`mailto:${email}`} className="flex items-center p-3.5 bg-slate-50 border border-transparent hover:border-blue-200 rounded-2xl transition-all cursor-pointer group">
                    <div className="p-2 bg-white shadow-sm rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span className="ml-3 text-[12px] text-slate-600 group-hover:text-blue-700 transition-colors font-medium">{email}</span>
                  </a>
                ))}
              </div>

              <button onClick={() => setShowAdminContact(false)} className="w-full py-4 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-2xl cursor-pointer hover:bg-slate-800 transition-all shadow-xl active:scale-95">Tutup</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}