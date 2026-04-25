import type { Metadata } from 'next'
import BuilderClient from './BuilderClient'

export const metadata: Metadata = {
  title: 'Resume Builder — Create Your Professional Resume',
  description:
    'Build your professional resume with our free online builder. Choose from premium templates, fill in your details, and download a pixel-perfect A4 PDF instantly.',
  openGraph: {
    title: 'Resume Builder — Create Your Professional Resume',
    description: 'Build your professional resume for free. No signup required.',
    url: 'https://onlyresume.vercel.app/builder',
  },
}

export default function BuilderPage() {
  return <BuilderClient />
}
