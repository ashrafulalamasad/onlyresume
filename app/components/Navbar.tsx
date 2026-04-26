'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/builder', label: 'Builder' },
  { href: '/templates', label: 'Templates' },
  { href: '/about', label: 'About' },
  { href: '/guide', label: 'Guide' },
  { href: '/faq', label: 'FAQ' },
]

const scrollToTopInstant = () => {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Auto-scroll to top on page change
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }, 50)

    return () => clearTimeout(timer)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const closeMobileMenu = () => setMobileMenuOpen(false)

  const handleLogoClick = () => {
    scrollToTopInstant()
  }

  const handleLinkClick = (href: string) => {
    closeMobileMenu()
    // If clicking the same page link, scroll to top
    if (isActive(href)) {
      scrollToTopInstant()
    }
  }

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-border bg-surface no-print">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="text-3xl font-bold tracking-tight text-primary" onClick={handleLogoClick}>
            Only<span className="text-accent">Resume</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`group relative text-base font-medium transition-colors ${
                  isActive(link.href) ? 'text-primary' : 'text-foreground'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform rounded-full bg-accent transition-transform duration-300 group-hover:scale-x-100 ${
                    isActive(link.href) ? 'scale-x-100' : ''
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`block h-0.5 w-6 bg-primary transition-all duration-300 ${
                mobileMenuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-primary transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-primary transition-all duration-300 ${
                mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[65px] z-40 bg-black/20 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Menu - Slides from Right */}
      <div
        className={`fixed right-0 top-[65px] z-40 w-64 border-l border-border bg-surface shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col p-4">
          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-accent text-white'
                    : 'text-foreground hover:bg-background'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
