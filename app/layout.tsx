import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://onlyresume.vercel.app'),
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  title: {
    default: 'OnlyResume | 100% Free Resume Builder - No Login Required',
    template: '%s | OnlyResume',
  },
  description:
    'Build a professional, ATS-friendly resume in minutes. No sign-up, no credit card, always free. Instant PDF download with modern templates. Privacy-focused CV maker that keeps your data safe.',
  keywords: [
    'resume builder',
    'free resume builder',
    'online resume maker',
    'CV maker',
    'instant resume builder',
    'ATS-friendly resume',
    'professional resume template',
    'CV builder free',
    'resume PDF',
    'no login resume builder',
    'student resume builder',
    'software developer CV',
    'resume maker',
  ],
  authors: [{ name: 'OnlyResume' }],
  creator: 'OnlyResume',
  publisher: 'OnlyResume',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://onlyresume.vercel.app',
    siteName: 'OnlyResume',
    title: 'OnlyResume | 100% Free Resume Builder - No Login Required',
    description:
      'Build a professional, ATS-friendly resume in minutes. No sign-up, no credit card, always free. Instant PDF download.',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 630,
        alt: 'OnlyResume - Free Resume Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@onlyresume',
    title: 'OnlyResume | 100% Free Resume Builder - No Login',
    description:
      'Build a professional, ATS-friendly resume in minutes. Always free, no signup required.',
    images: ['/icon.png'],
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
  alternates: {
    canonical: 'https://onlyresume.vercel.app',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <Script
          id="json-ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              url: 'https://onlyresume.vercel.app',
              name: 'OnlyResume',
              description: 'Free online resume builder with no login required',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://onlyresume.vercel.app/?q={search_term_string}',
                },
                query_input: 'required name=search_term_string',
              },
            }),
          }}
        />
        <Script
          id="json-ld-software"
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
              description: 'Free online resume builder with premium templates. No signup required.',
              url: 'https://onlyresume.vercel.app',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '2500',
              },
            }),
          }}
        />
        <Script
          id="json-ld-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://onlyresume.vercel.app',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Builder',
                  item: 'https://onlyresume.vercel.app/builder',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Templates',
                  item: 'https://onlyresume.vercel.app/templates',
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: 'Guide',
                  item: 'https://onlyresume.vercel.app/guide',
                },
              ],
            }),
          }}
        />
        <Script
          id="json-ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'OnlyResume',
              url: 'https://onlyresume.vercel.app',
              logo: 'https://onlyresume.vercel.app/icon.png',
              description: 'Free resume builder with no login required',
              sameAs: ['https://twitter.com/onlyresume'],
            }),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Navbar />

        {/* Adsterra Social Bar placeholder */}
        <div id="adsterra-social-bar" />

        <main className="flex-1 pt-15">{children}</main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
