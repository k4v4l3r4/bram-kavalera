"use client"

import { useState, useEffect } from "react"
import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { client } from "@/sanity/lib/client"

export default function ContactSection() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(`
          *[_type == "contact"][0]
        `)
        setData(result)
      } catch (error) {
        console.error("Gagal ambil data kontak:", error)
      }
    }
    fetchData()
  }, [])

  if (!data) return null

  return (
    <section id="contact" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* INFO KONTAK */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
                {data.title || "Hubungi Kami"}
              </h2>
              <p className="text-muted-foreground">
                {data.description || "Silakan hubungi kami untuk informasi lebih lanjut."}
              </p>
            </div>

            <div className="space-y-6">
              
              {/* ALAMAT */}
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Sekretariat PPRNP</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {data.address || "Alamat belum diisi di Admin."}
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a 
                    href={`mailto:${data.email}`} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {data.email || "email@contoh.com"}
                  </a>
                </div>
              </div>

              {/* WHATSAPP */}
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">WhatsApp Center</h3>
                  <a 
                    href={`https://wa.me/${data.phone}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +{data.phone || "62..."}
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* FORM KONTAK */}
          <div className="bg-background rounded-xl p-8 shadow-sm border">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Nama Lengkap</label>
                  <Input id="name" placeholder="Nama Anda" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="email@contoh.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subjek</label>
                <Input id="subject" placeholder="Perihal pesan" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Pesan</label>
                <Textarea 
                  id="message"
                  placeholder="Tulis pesan Anda di sini..."
                  className="min-h-[120px]"
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Kirim Pesan
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
