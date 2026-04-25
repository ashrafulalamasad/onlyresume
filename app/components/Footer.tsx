import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/templates', label: 'Templates' },
  { href: '/guide', label: 'Guide' },
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
        <div className="space-y-6 sm:grid sm:grid-cols-3 sm:gap-8 sm:space-y-0">
          <div>
            <h3 className="text-2xl font-bold text-white">Only<span className="text-accent">Resume</span></h3>
            <p className="mt-2 text-sm text-slate-400">
              Build professional, ATS-friendly resumes in minutes. Free, no signup required.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:col-span-2 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Navigation</h4>
              <ul className="mt-2 space-y-1.5 sm:mt-3 sm:space-y-2">
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
              <ul className="mt-2 space-y-1.5 sm:mt-3 sm:space-y-2">
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

        <div className="mt-6 border-t border-slate-700 pt-5 text-center text-sm text-slate-400 sm:mt-8 sm:pt-6">
          &copy; {new Date().getFullYear()} OnlyResume. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
