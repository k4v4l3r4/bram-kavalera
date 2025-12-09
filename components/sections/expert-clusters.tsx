// FILE: components/ExpertClustersSection.tsx
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  X, MessageCircle,
  Leaf, Zap, Sun, Cog, Wrench, Briefcase, TrendingUp,
  HeartPulse, ShieldCheck, Lightbulb, Microscope
} from "lucide-react"
import { client } from "@/sanity/lib/client"
import { PortableTextRenderer } from "@/components/PortableTextRenderer"

const iconMap: Record<string, any> = {
  Leaf, Zap, Sun, Cog, Wrench, Briefcase, TrendingUp,
  HeartPulse, ShieldCheck, Lightbulb, Microscope
}
const clusterColors: Record<string, string> = {
  agriculture: "from-green-500/20 to-emerald-500/5",
  energy: "from-yellow-500/20 to-orange-500/5",
  engineering: "from-blue-500/20 to-cyan-500/5",
  management: "from-purple-500/20 to-pink-500/5",
  default: "from-slate-100 to-white",
}

export default function ExpertClustersSection() {
  const [data, setData] = useState<any>(null)
  const [selectedCard, setSelectedCard] = useState<any>(null)

  useEffect(() => {
    client.fetch(
      `*[_type == "expertClusters"][0]{
        title,
        clusters[]{
          title,
          description,
          icon,
          experts[]{ name, role, whatsapp, "photoUrl": photo.asset->url }
        }
      }`,
      {},
      { next: { revalidate: 3600 } }
    ).then(setData).catch(err => console.error("Error fetch:", err))
  }, [])

  if (!data) return null

  const clusters = data?.clusters || []
  const clustersTitle = data?.title || "Klaster Kepakaran"

  return (
    <section id="expert-clusters" className="py-10 md:py-16 bg-muted/30 overflow-hidden -mt-8">
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="text-3xl font-bold mb-10 md:mb-12 text-center text-slate-800">{clustersTitle}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
          {clusters.map((item: any, i: number) => {
            const IconComponent = iconMap[item.icon] || Lightbulb
            const hasExperts = item?.experts?.length > 0
            const nameLower = item.title?.toLowerCase() || ""
            const colorTheme =
              nameLower.includes("agri") ? clusterColors.agriculture :
              nameLower.includes("energy") ? clusterColors.energy :
              nameLower.includes("engineer") ? clusterColors.engineering :
              nameLower.includes("manage") ? clusterColors.management :
              clusterColors.default

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.1 }}
                onClick={() => hasExperts && setSelectedCard(item)}
                className={`relative group p-10 rounded-[2.5rem] min-h-[360px] flex flex-col items-center text-center bg-gradient-to-br ${colorTheme} shadow transition-all duration-500 ${hasExperts ? "cursor-pointer hover:-translate-y-4 hover:scale-[1.03] hover:shadow-xl" : ""}`}
              >
                <div className="mb-6 p-5 rounded-2xl bg-white/80 backdrop-blur-sm shadow-md group-hover:scale-110 transition-transform">
                  <IconComponent className="h-12 w-12 text-primary" strokeWidth={1.5} />
                </div>

                <h4 className="font-bold text-2xl mb-4 text-slate-800 group-hover:text-primary transition-colors">{item.title}</h4>

                {item.description ? (
                  <PortableTextRenderer blocks={item.description} />
                ) : (
                  <p className="text-muted-foreground text-base leading-relaxed mb-6">
                    Deskripsi belum tersedia.
                  </p>
                )}

                {hasExperts && (
                  <div className="mt-auto pt-4">
                    <span className="text-sm font-bold text-white bg-primary px-6 py-3 rounded-full shadow-lg">
                      Show Expertise →
                    </span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-background rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-white/20"
            >
              <div className="p-6 sm:p-8 border-b flex justify-between items-center bg-muted/30 sticky top-0 z-10">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-primary">{selectedCard.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Tim Pakar & Ahli Terpercaya</p>
                </div>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="p-2 rounded-full hover:bg-black/10 transition-colors"
                >
                  <X className="h-8 w-8 text-slate-500" />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto bg-slate-50/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {selectedCard?.experts?.map((expert: any, idx: number) => {
                    const roles = expert.role ? expert.role.split(",").map((r: string) => r.trim()) : []
                    return (
                      <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border shadow">
                        <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
                          {expert.photoUrl ? (
                            <Image src={expert.photoUrl} alt={expert.name} fill className="object-cover object-top" />
                          ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                              No Foto
                            </div>
                          )}
                        </div>

                        <h4 className="font-bold text-lg text-slate-800">{expert.name}</h4>
                        <div className="flex flex-wrap justify-center gap-2 mt-2">
                          {roles.map((r: string, i: number) => (
                            <span
                              key={i}
                              className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-md border border-blue-100"
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
                            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-bold text-white bg-green-600 rounded-xl hover:bg-green-700 transition-all mt-3"
                          >
                            <MessageCircle className="h-4 w-4" />Chat Us
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