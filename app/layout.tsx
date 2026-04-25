import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://onlyresume.vercel.app'),
  title: {
    default: 'OnlyResume — Free Online Resume Builder | No Signup Required',
    template: '%s | OnlyResume',
  },
  description:
    'Build professional, ATS-friendly resumes for free. No signup, no downloads, no watermarks. Choose from premium templates and export pixel-perfect PDFs instantly.',
  keywords: [
    'resume builder',
    'free resume builder',
    'online resume maker',
    'ATS-friendly resume',
    'professional resume template',
    'CV builder',
    'resume PDF',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://onlyresume.vercel.app',
    siteName: 'OnlyResume',
    title: 'OnlyResume — Free Online Resume Builder',
    description:
      'Build professional, ATS-friendly resumes for free. No signup, no downloads, no watermarks.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OnlyResume — Free Online Resume Builder',
    description:
      'Build professional, ATS-friendly resumes for free. No signup required.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'OnlyResume',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              description:
                'Free online resume builder with premium templates. No signup required.',
              url: 'https://onlyresume.vercel.app',
            }),
          }}
        />
        <Navbar />

        {/* Adsterra Social Bar placeholder */}
        <div id="adsterra-social-bar" />

        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
