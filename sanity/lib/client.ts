// lib/sanity/client.ts
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,   // FIX: jangan pakai CDN supaya data pasti muncul
  perspective: "published", // FIX: hanya ambil data publish
})
