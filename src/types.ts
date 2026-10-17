export interface Guest {
  id: string
  name: string
  attending: boolean
  partner?: {
    hasPartner: boolean
    name: string
  }
  children?: number
  menu?: string
  alcohol?: string[]
  wineTypes?: string[]
  otherAlcohol?: string
  allergies?: string
  transport?: boolean
  accommodation?: boolean
  song?: string
  message: string
  submittedAt?: string
}

export interface PhotoItem {
  id: string
  filename: string
  url: string
  table?: number | null
  title?: string
  category?: string
  dateAdded?: string
}

export interface TimelineEvent {
  time: string
  title: string
  subtitle: string
  description: string
  tag: string
  highlight?: boolean
}

export const APP_NAME = 'bojilovi'
