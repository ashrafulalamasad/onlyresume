// A4 dimensions and constants for PDF rendering
export const A4 = {
  width: 595,   // 210mm in points
  height: 842,  // 297mm in points
  margin: 36,   // 48px at 96 DPI = 0.5in = 36pt
} as const

export const COLORS = {
  primary: '#0F172A',
  accent: '#2563EB',
  text: '#334155',
  secondary: '#64748B',
  lightText: '#94A3B8',
  light: '#F1F5F9',
  white: '#FFFFFF',
  border: '#E2E8F0',
  accentLight: '#EBF0FF',
} as const

export const SPACING = {
  xs: 2,
  sm: 4,
  md: 6,
  lg: 9,
  xl: 12,
  _2xl: 15,
} as const

export const FONT_SIZES = {
  xs: 9,       // text-xs (12px) = 9pt
  sm: 10.5,    // text-sm (14px) = 10.5pt
  base: 9.5,   // body text — 9pt web + slight bump for PDF legibility
  lg: 9,       // section headers (text-xs uppercase tracking-widest)
  xl: 13.5,    // text-lg (18px) = 13.5pt
  _2xl: 18,    // text-2xl (24px) = 18pt
  _3xl: 22.5,
  _4xl: 27,
} as const

export const FONT_WEIGHTS = {
  normal: 400,
  semibold: 600,
  bold: 700,
} as const

export const CONTENT_WIDTH = A4.width - A4.margin * 2

