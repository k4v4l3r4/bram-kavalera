/**
 * Konfigurasi utama Sanity Studio.
 * File ini hanya berisi konfigurasi, bukan komponen React.
 */

import { defineConfig } from "sanity"
import { visionTool } from "@sanity/vision"
import { structureTool } from "sanity/structure"

import { apiVersion, dataset, projectId } from "./sanity/env"
import { schema } from "./sanity/schemaTypes"
import { structure } from "./sanity/structure"

export default defineConfig({
  name: "default",
  title: "My Sanity Studio",

  basePath: "/studio",
  projectId,
  dataset,

  schema,

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})