import type { TemplateId } from './types'

// Single source of truth for the order, IDs, and display metadata of every
// template. Consumed by the builder selection screen, the public /templates
// page, and the URL/migration validators.
export const TEMPLATE_IDS: readonly TemplateId[] = [
  'minimal',
  'corporate',
  'modern',
  'elegant',
  'executive',
  'technical',
  'academic',
  'timeline',
  'creative',
  'ats',
  'compact',
  'bold',
  'emerald',
  'slate',
  'geometric',
  'split',
  'grid',
  'sidebar-right',
  'warm',
  'two-column',
] as const

export function isTemplateId(value: string): value is TemplateId {
  return (TEMPLATE_IDS as readonly string[]).includes(value)
}

export interface TemplateMeta {
  id: TemplateId
  name: string
  description: string
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: 'minimal',
    name: 'Classic',
    description:
      'Clean and simple. Lets your content speak for itself with elegant whitespace and subtle accent lines.',
  },
  {
    id: 'corporate',
    name: 'Modern Sidebar',
    description:
      'Bold sidebar layout with a dark panel for contact details. Perfect for corporate and executive roles.',
  },
  {
    id: 'modern',
    name: 'Corporate Header',
    description:
      'Full-width colored header with bold section dividers. Ideal for creative and tech professionals.',
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description:
      'Serif typography, centered name, and refined hairline rules. A timeless editorial look for senior professionals.',
  },
  {
    id: 'executive',
    name: 'Executive',
    description:
      'Right light sidebar beneath a bold heading bar with gold accents. Refined and authoritative.',
  },
  {
    id: 'technical',
    name: 'Technical',
    description:
      'Left light bordered sidebar for skills and tools with content at right. Built for developer and engineering resumes.',
  },
  {
    id: 'academic',
    name: 'Academic',
    description:
      'Serif, centered, numbered sections in a classic CV style. Ideal for research, teaching, and academic roles.',
  },
  {
    id: 'timeline',
    name: 'Timeline',
    description:
      'Vertical timeline rail anchors each role. Great for showing career progression while staying ATS-friendly.',
  },
  {
    id: 'creative',
    name: 'Creative',
    description:
      'Asymmetric header with accent marks and a coral palette. Expressive yet structured for design-forward roles.',
  },
  {
    id: 'ats',
    name: 'Minimalist ATS',
    description:
      'Ultra-plain single column with no rules or color. Maximum parse-safety for applicant tracking systems.',
  },
  {
    id: 'compact',
    name: 'Compact',
    description:
      'Dense single-column layout with an inline header. Fits more content on the page without crowding.',
  },
  {
    id: 'bold',
    name: 'Bold',
    description:
      'Oversized name, thick accent rules, and all-caps section titles. Confident typographic hierarchy.',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    description:
      'Green-tinted left sidebar with content at right. A fresh, modern take on the two-column layout.',
  },
  {
    id: 'slate',
    name: 'Slate',
    description:
      'Light slate band header with cool slate-blue accents. Subtle and professional.',
  },
  {
    id: 'geometric',
    name: 'Geometric',
    description:
      'Corner accent bars and block-marked section headings in purple. Structured and modern.',
  },
  {
    id: 'split',
    name: 'Split Header',
    description:
      'Header split between name and contact with a vertical divider, then a clean single-column body.',
  },
  {
    id: 'grid',
    name: 'Grid',
    description:
      'Each section sits in its own bordered card for a clear, scannable modular layout.',
  },
  {
    id: 'sidebar-right',
    name: 'Sidebar Right',
    description:
      'Content at left with a dark teal sidebar at right for skills and contact details.',
  },
  {
    id: 'warm',
    name: 'Warm',
    description:
      'Terracotta and amber palette with a tinted header band and a two-column body. Approachable and warm.',
  },
  {
    id: 'two-column',
    name: 'Two Column',
    description:
      'Equal two-column light layout split by a thin rule. A balanced, traditional two-column resume.',
  },
]
