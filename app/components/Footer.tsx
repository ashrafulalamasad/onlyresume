import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/templates', label: 'Templates' },
  { href: '/guide', label: 'Resume Guide' },
]

const mobileLargeNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/templates', label: 'Templates' },
  { href: '/guide', label: 'Resume Guide' },
  { href: '/faq', label: 'FAQ' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-primary no-print">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
        {/* Mobile Layout: Logo at top */}
        <div className="sm:hidden">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white">Only<span className="text-accent">Resume</span></h3>
            <p className="mt-2 text-sm text-slate-400">
              Build professional, ATS-friendly resumes in minutes. Free, no signup required, always private.
            </p>
          </div>

          {/* Sub-480: 2 columns, vertical stacks */}
          <div className="grid grid-cols-2 gap-3 max-[479px]:grid min-[480px]:hidden">
            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-400">Navigation</h4>
              <ul className="space-y-1.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-300 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Legal & Support</h4>
              <ul className="mt-2 space-y-1.5">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-300 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/faq" className="text-sm text-slate-300 transition-colors hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* 480-639: 3-column outer grid, Navigation 2/3 with 2x2 nav (incl. FAQ), Legal 1/3 without FAQ */}
          <div className="grid grid-cols-3 gap-2 min-[480px]:grid max-[479px]:hidden">
            <div className="col-span-2">
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-400">Navigation</h4>
              <ul className="grid grid-cols-2 gap-1">
                {mobileLargeNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-300 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Legal & Support</h4>
              <ul className="mt-2 space-y-1.5">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-300 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop/Tablet Layout: brand 3/7, link columns 4/7 (split equally inside) */}
        <div className="hidden sm:grid sm:grid-cols-7 sm:items-start sm:gap-6">
          <div className="sm:col-span-3">
            <h3 className="text-2xl font-bold text-white">Only<span className="text-accent">Resume</span></h3>
            <p className="mt-2 max-w-xs text-sm text-slate-400">
              Build professional, ATS-friendly resumes in minutes. Free, no signup required, always private.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:col-span-4 sm:gap-6">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Navigation</h4>
              <ul className="mt-3 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-300 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Legal & Support</h4>
              <ul className="mt-3 space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-300 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/faq" className="text-sm text-slate-300 transition-colors hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-700 pt-5 text-center text-sm text-slate-400 sm:mt-8 sm:pt-6">
          &copy; {new Date().getFullYear()} OnlyResume. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
