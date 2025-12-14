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
  Microscope
} from "lucide-react"
import { client } from "@/sanity/lib/client"
import { PortableTextRenderer } from "@/components/PortableTextRenderer"

/* ================= ICON MAP ================= */
const iconMap: Record<string, any> = {
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
  Microscope
}

/* ================= KONFIGURASI ================= */
const AUTO_SPEED = 0.35          // kecepatan auto marquee
const CARD_STEP = 320            // jarak geser tombol
const CLUSTER_BG = "from-blue-500/10 to-cyan-500/5"

export default function ExpertClustersSection() {
  const [data, setData] = useState<any>(null)
  const [selectedCard, setSelectedCard] = useState<any>(null)
  const [paused, setPaused] = useState(false)

  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    client
      .fetch(
        `*[_type=="expertClusters"][0]{
          title,
          clusters[]{
            title,
            description,
            icon,
            experts[]{
              name,
              role,
              whatsapp,
              "photoUrl": photo.asset->url
            }
          }
        }`
      )
      .then(setData)
      .catch(err => console.error("Fetch error:", err))
  }, [])

  const clusters = data?.clusters || []

  /* ================= DUPLIKASI UNTUK LOOP ================= */
  const items = useMemo(() => {
    if (clusters.length === 0) return []
    return [...clusters, ...clusters]
  }, [clusters])

  /* ================= AUTO MARQUEE ================= */
  useEffect(() => {
    const track = trackRef.current
    if (!track || items.length === 0) return

    const halfWidth = track.scrollWidth / 2

    const animate = () => {
      if (!paused) {
        offsetRef.current += AUTO_SPEED
        if (offsetRef.current >= halfWidth) {
          offsetRef.current = 0
        }
        track.style.transform = `translate3d(-${offsetRef.current}px,0,0)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [paused, items.length])

  if (!data) return null

  /* ================= NAV BUTTON HANDLER ================= */
  const nudge = (dir: "left" | "right") => {
    const track = trackRef.current
    if (!track) return

    const halfWidth = track.scrollWidth / 2

    setPaused(true)
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)

    if (dir === "left") {
      offsetRef.current -= CARD_STEP
      if (offsetRef.current < 0) {
        offsetRef.current = halfWidth - CARD_STEP
      }
    } else {
      offsetRef.current += CARD_STEP
      if (offsetRef.current >= halfWidth) {
        offsetRef.current = 0
      }
    }

    track.style.transform = `translate3d(-${offsetRef.current}px,0,0)`

    // resume auto-scroll setelah 1.5 detik
    resumeTimeoutRef.current = setTimeout(() => {
      setPaused(false)
    }, 1500)
  }

  /* ================= RENDER ================= */
  return (
    <section
      id="expert-clusters"
      className="
        pt-4  sm:pt-6  lg:pt-8
        pb-12 sm:pb-16 lg:pb-20
        -mt-6 sm:-mt-10 lg:-mt-14
        bg-muted/30 overflow-hidden
      "
    >
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="text-3xl font-bold mb-12 text-center text-slate-800">
          {data.title || "Klaster Kepakaran"}
        </h3>

        {/* ================= VIEWPORT ================= */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* ================= TRACK ================= */}
          <div
            ref={trackRef}
            className="flex gap-6 w-max will-change-transform"
          >
            {items.map((item: any, index: number) => {
              const Icon = iconMap[item.icon] || Lightbulb
              const hasExperts = item?.experts?.length > 0

              return (
                <div
                  key={`${item.title}-${index}`}
                  onClick={() => hasExperts && setSelectedCard(item)}
                  className={`flex-shrink-0 w-[280px] md:w-[300px] lg:w-[320px]
                    rounded-[2rem] p-6 min-h-[360px]
                    flex flex-col items-center text-center
                    bg-gradient-to-br ${CLUSTER_BG} shadow
                    transition-transform duration-300
                    ${
                      hasExperts
                        ? "cursor-pointer hover:-translate-y-3 hover:scale-[1.03] hover:shadow-xl"
                        : ""
                    }`}
                >
                  <div className="mb-6 p-5 rounded-2xl bg-white/80 shadow">
                    <Icon className="h-12 w-12 text-primary" strokeWidth={1.5} />
                  </div>

                  <h4 className="font-bold text-2xl mb-4 text-slate-800">
                    {item.title}
                  </h4>

                  {item.description ? (
                    <PortableTextRenderer blocks={item.description} />
                  ) : (
                    <p className="text-muted-foreground">
                      Deskripsi belum tersedia.
                    </p>
                  )}

                  {hasExperts && (
                    <div className="mt-auto pt-4">
                      <span className="text-sm font-bold text-white bg-primary px-6 py-3 rounded-full shadow">
                        Show Expertise →
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* ================= NAV BUTTONS ================= */}
          <button
            onClick={() => nudge("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                       bg-white/90 backdrop-blur p-2 rounded-full shadow
                       hover:bg-white transition"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>

          <button
            onClick={() => nudge("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                       bg-white/90 backdrop-blur p-2 rounded-full shadow
                       hover:bg-white transition"
          >
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>

      {/* ================= MODAL DETAIL EXPERT ================= */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              <div className="p-6 border-b flex justify-between items-center bg-muted/30">
                <div>
                  <h3 className="text-2xl font-bold text-primary">
                    {selectedCard.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Tim Pakar & Ahli Terpercaya
                  </p>
                </div>
                <button onClick={() => setSelectedCard(null)}>
                  <X className="h-7 w-7 text-slate-500" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto bg-slate-50/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {selectedCard.experts.map((expert: any, idx: number) => {
                    const roles = expert.role
                      ?.split(",")
                      .map((r: string) => r.trim())

                    return (
                      <div
                        key={idx}
                        className="p-6 bg-white rounded-2xl border shadow text-center"
                      >
                        <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow">
                          {expert.photoUrl ? (
                            <Image
                              src={expert.photoUrl}
                              alt={expert.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                              No Foto
                            </div>
                          )}
                        </div>

                        <h4 className="font-bold">{expert.name}</h4>

                        <div className="flex flex-wrap justify-center gap-2 mt-2">
                          {roles?.map((r: string, i: number) => (
                            <span
                              key={i}
                              className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-md border"
                            >
                              {r}
                            </span>
                          ))}
                        </div>

                        {expert.whatsapp && (
                          <a
                            href={`https://wa.me/${expert.whatsapp}?text=Halo Bapak/Ibu ${expert.name}, saya ingin berkonsultasi terkait bidang ${selectedCard.title}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-bold text-white bg-green-600 rounded-xl hover:bg-green-700"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
