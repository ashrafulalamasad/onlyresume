'use client'

import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/builder', label: 'Builder' },
  { href: '/templates', label: 'Templates' },
  { href: '/guide', label: 'Guide' },
  { href: '/faq', label: 'FAQ' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface no-print">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-xl font-bold tracking-tight text-primary">
          OnlyResume
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/builder"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
          >
            Build Resume
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-primary transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-primary transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-primary transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-surface px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-foreground active:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/builder"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-accent px-4 py-3 text-center text-sm font-semibold text-white active:bg-accent/80"
          >
            Build Resume
          </Link>
        </div>
      )}
    </header>
  )
}
