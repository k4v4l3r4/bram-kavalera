// FILE: sanity/lib/client.ts

import { createClient } from "next-sanity"
import { apiVersion, dataset, projectId } from "@/sanity/env"

// ===============================
//  SANITY CLIENT FINAL & AMAN
// ===============================

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,                 // gunakan data langsung
  token: process.env.SANITY_API_READ_TOKEN,  // WAJIB untuk production
  perspective: "published",      // hanya ambil data publish, aman di frontend
})
