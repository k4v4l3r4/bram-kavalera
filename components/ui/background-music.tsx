"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
      setHasInteracted(true)
    }
    setIsPlaying(!isPlaying)
  }

  // Efek visual notifikasi musik (hanya muncul di awal jika belum di-play)
  useEffect(() => {
    const timer = setTimeout(() => setHasInteracted(true), 10000) // Hilang otomatis setelah 10 detik
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      {/* Audio Element (Tersembunyi) */}
      <audio ref={audioRef} src="/backsound.mp3" loop />

      {/* Tombol Kontrol */}
      <Button
        onClick={togglePlay}
        size="icon"
        className={`rounded-full h-12 w-12 shadow-xl transition-all duration-500 ${
          isPlaying 
            ? "bg-green-500 hover:bg-green-600 text-white animate-pulse-slow" 
            : "bg-white hover:bg-gray-100 text-slate-800 border border-slate-200"
        }`}
      >
        {isPlaying ? (
          <Volume2 className="h-6 w-6" />
        ) : (
          <VolumeX className="h-6 w-6" />
        )}
        <span className="sr-only">Toggle Music</span>
      </Button>

      {/* Teks Ajakan (Muncul jika belum diputar) */}
      <AnimatePresence>
        {!isPlaying && !hasInteracted && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border text-sm font-medium text-slate-700 flex items-center gap-2"
          >
            <Music className="h-4 w-4 text-primary animate-bounce" />
            <span>Putar Musik</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}