/**
 * Route untuk Sanity Studio di Next.js App Router.
 * Semua path di bawah /studio akan di-handle oleh file ini.
 */

import { NextStudio } from "next-sanity/studio"
import config from "../../../sanity.config"

export const dynamic = "force-static"
export { metadata, viewport } from "next-sanity/studio"

export default function StudioPage() {
  return <NextStudio config={config} />
}