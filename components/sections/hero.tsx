import { serverClient } from "@/sanity/lib/client.server"
import HeroMotion from "./HeroMotion.client"

export const revalidate = 60 // ISR, aman & cepat

export default async function HeroSection() {
  const query = `*[_type == "hero"][0]{
    title,
    subtitle,
    images,
    institutions
  }`

  const data = await serverClient.fetch(query)

  if (!data) return null

  return <HeroMotion data={data} />
}
