import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume Templates — Premium Professional Layouts',
  description:
    'Choose from three premium, ATS-friendly resume templates: Minimal, Corporate, and Modern. All free to use with OnlyResume.',
  openGraph: {
    title: 'Resume Templates — Premium Professional Layouts',
    description: 'Choose from three premium, ATS-friendly resume templates. All free to use.',
    url: 'https://onlyresume.vercel.app/templates',
  },
}

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
