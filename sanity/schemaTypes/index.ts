import { type SchemaTypeDefinition } from 'sanity'

// Import semua schema
import { heroType } from './hero'
import { aboutType } from './about'
import { programsType } from './programs'
import { expertForumType } from './expertForum'
import { podcastType } from './podcast'
import { announcementsType } from './announcements'
import { housingInfoType } from './housingInfo'
import { contactType } from './contact'
import { footerType } from './footer'
import { blockContentType } from './blockContent'
import { expertClustersType } from './expertClusters'
import { productInnovation } from "./productInnovation"

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
    blockContentType,
    expertClustersType,
	productInnovation,
  ],
}
