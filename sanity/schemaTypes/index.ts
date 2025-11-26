import { type SchemaTypeDefinition } from 'sanity'
import { heroType } from './hero'
import { aboutType } from './about'
import { programsType } from './programs'
import { expertForumType } from './expertForum'
import { podcastType } from './podcast'
import { announcementsType } from './announcements'
import { housingInfoType } from './housingInfo'
import { contactType } from './contact'
import { footerType } from './footer'
import { blockContentType } from './blockContent' // <-- IMPORT WAJIB UNTUK TEXT EDITOR

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
    blockContentType // <-- TAMBAHKAN BLOCK CONTENT DI SINI
  ],
}