import Link from 'next/link'

const navLinks = [
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
        {/* Mobile Layout: Logo at top, links in 3-column grid below */}
        <div className="sm:hidden">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white">Only<span className="text-accent">Resume</span></h3>
            <p className="mt-2 text-sm text-slate-400">
              Build professional, ATS-friendly resumes in minutes. Free, no signup required, always private.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {/* Navigation - 2/3 width */}
            <div className="col-span-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">Navigation</h4>
              <ul className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-300 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Legal - 1/3 width */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Legal</h4>
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

        {/* Desktop/Tablet Layout: Logo + text and both link columns in one row */}
        <div className="hidden sm:flex sm:items-start sm:justify-around">
          <div className="flex-shrink-0">
            <h3 className="text-2xl font-bold text-white">Only<span className="text-accent">Resume</span></h3>
            <p className="mt-2 max-w-xs text-sm text-slate-400">
              Build professional, ATS-friendly resumes in minutes. Free, no signup required, always private.
            </p>
          </div>
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
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Legal</h4>
            <ul className="mt-3 space-y-2">
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

        <div className="mt-6 border-t border-slate-700 pt-5 text-center text-sm text-slate-400 sm:mt-8 sm:pt-6">
          &copy; {new Date().getFullYear()} OnlyResume. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
