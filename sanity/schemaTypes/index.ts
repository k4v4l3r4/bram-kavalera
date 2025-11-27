import { type SchemaTypeDefinition } from 'sanity'

// Import semua schema yang sudah dibuat
import { heroType } from './hero'
import { aboutType } from './about'
import { programsType } from './programs'
import { expertForumType } from './expertForum'
import { podcastType } from './podcast'
import { announcementsType } from './announcements'
import { housingInfoType } from './housingInfo'
import { contactType } from './contact'
import { footerType } from './footer'
import { blockContentType } from './blockContent' // Editor Teks Canggih
import { expertClustersType } from './expertClusters' // Klaster Kepakaran (Menu Baru)

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroType, 
    aboutType, 
    programsType, 
    expertForumType, 
    podcastType, 
    announcementsType, 
    housingInfoType,
    contactType,
    footerType,
    blockContentType, // <-- Wajib untuk Visi (Rich Text)
    expertClustersType, // <-- Wajib untuk Klaster Kepakaran
  ],
}