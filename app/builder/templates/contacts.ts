import type { PersonalInfo } from '../types'
import { getUrlHref, getUrlDisplayText } from '../urlUtils'

// Pure helpers shared by the web (Tailwind) and PDF (react-pdf) template
// components. Keeping this logic in one place means the contact rows,
// date ranges, and location strings stay consistent across all 20 templates.

export type ContactKey =
  | 'email'
  | 'phone'
  | 'location'
  | 'linkedin'
  | 'github'
  | 'portfolio'

export interface ContactItem {
  key: ContactKey
  value: string
  href: string
}

/** "Jan 2022 — Present", or just "Jan 2022" when no end date. */
export function dateRange(start?: string, end?: string): string {
  if (!start && !end) return ''
  if (!end) return start || ''
  if (!start) return end
  return `${start} — ${end}`
}

/** "San Francisco, CA" */
export function joinLocation(city?: string, state?: string): string {
  return [city, state].filter(Boolean).join(', ')
}

const PRIMARY_KEYS: ContactKey[] = ['email', 'phone', 'location']

/**
 * Build structured contact entries from personal info.
 * `primary` = email, phone, location. `secondary` = linkedin, github, portfolio.
 * `all` preserves the natural input order.
 */
export function getContactItems(personal: PersonalInfo): {
  primary: ContactItem[]
  secondary: ContactItem[]
  all: ContactItem[]
} {
  const all: ContactItem[] = []

  if (personal.email) {
    all.push({ key: 'email', value: personal.email, href: `mailto:${personal.email}` })
  }
  if (personal.phone) {
    all.push({ key: 'phone', value: personal.phone, href: `tel:${personal.phone}` })
  }
  if (personal.location) {
    all.push({ key: 'location', value: personal.location, href: '' })
  }
  if (personal.linkedinUrl) {
    all.push({
      key: 'linkedin',
      value: getUrlDisplayText(personal.linkedinUrl),
      href: getUrlHref(personal.linkedinUrl),
    })
  }
  if (personal.githubUrl) {
    all.push({
      key: 'github',
      value: getUrlDisplayText(personal.githubUrl),
      href: getUrlHref(personal.githubUrl),
    })
  }
  if (personal.portfolioUrl) {
    all.push({
      key: 'portfolio',
      value: getUrlDisplayText(personal.portfolioUrl),
      href: getUrlHref(personal.portfolioUrl),
    })
  }

  return {
    all,
    primary: all.filter((c) => PRIMARY_KEYS.includes(c.key)),
    secondary: all.filter((c) => !PRIMARY_KEYS.includes(c.key)),
  }
}

/** Roman numerals for the academic template's numbered sections. */
export function toRoman(n: number): string {
  const map: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ]
  let result = ''
  let remaining = n
  for (const [value, symbol] of map) {
    while (remaining >= value) {
      result += symbol
      remaining -= value
    }
  }
  return result
}
