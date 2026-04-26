import type { Metadata } from 'next'
import TemplatesPageClient from './TemplatesPageClient'

export const metadata: Metadata = {
  title: 'Resume Templates — Choose Your Professional Design',
  description:
    'Choose from 3 ATS-friendly resume templates: Minimal, Corporate, and Modern. Each template is fully customizable and optimized for applicant tracking systems. Preview all designs and start building your resume.',
  openGraph: {
    title: 'Resume Templates — 3 Professional Designs',
    description: 'Pick from 3 professionally designed, ATS-friendly resume templates and start building your perfect resume today.',
    url: 'https://onlyresume.vercel.app/templates',
  },
}

export default function TemplatesPage() {
  return <TemplatesPageClient />
}
