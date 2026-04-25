import Link from 'next/link'

const features = [
  {
    title: 'Completely Free',
    description: 'No hidden fees, no premium tiers. Build and download your resume at zero cost. Always free, forever.',
    icon: (
      <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: 'No Signup Required',
    description: 'Start building immediately. Your data stays in your browser — private and secure. No login, no account creation.',
    icon: (
      <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
  {
    title: 'ATS-Friendly Templates',
    description: 'Clean, structured layouts that pass Applicant Tracking Systems with ease. Designed for recruiters and employers.',
    icon: (
      <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
]

const steps = [
  { step: '01', title: 'Fill in Your Details', description: 'Enter your personal info, experience, education, and skills using our guided form.' },
  { step: '02', title: 'Choose a Template', description: 'Pick from three premium, professional layouts designed to impress recruiters.' },
  { step: '03', title: 'Download as PDF', description: 'Export a pixel-perfect A4 PDF ready to send to employers. No watermarks.' },
]

export default function Home() {
  return (
    <>
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 sm:py-20 lg:py-28">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl md:text-5xl lg:text-6xl">
            Build Your Professional Resume
            <span className="block text-accent">In Minutes, Not Hours</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground sm:mt-6 sm:text-lg">
            Create a polished, ATS-friendly resume with our free online builder. No signup required, no downloads needed,
            no watermarks. Just a beautiful resume ready to land your next job.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/builder"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-8 text-base font-semibold text-white transition-colors hover:bg-accent/90"
            >
              Start Building — It&apos;s Free
            </Link>
            <Link
              href="/templates"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-surface px-8 text-base font-semibold text-primary transition-colors hover:bg-background"
            >
              View Templates
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-primary sm:text-3xl">Why Choose OnlyResume?</h2>
          <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-surface p-5 text-center sm:p-6">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 sm:mb-4 sm:h-14 sm:w-14">
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold text-primary sm:text-lg">{f.title}</h3>
                <p className="mt-1.5 text-sm text-foreground sm:mt-2">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-primary sm:text-3xl">How It Works</h2>
          <div className="mt-8 grid gap-6 sm:mt-12 sm:grid-cols-3 sm:gap-8">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-accent text-base font-bold text-white sm:h-12 sm:w-12 sm:text-lg">
                  {s.step}
                </div>
                <h3 className="mt-3 text-base font-semibold text-primary sm:mt-4 sm:text-lg">{s.title}</h3>
                <p className="mt-1.5 text-sm text-foreground sm:mt-2">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="space-y-6 text-foreground">
            <div>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">The Instant Resume Builder for Job Seekers</h2>
              <p className="mt-4 text-base leading-relaxed">
                OnlyResume is your complete instant CV maker and professional resume builder, designed to help job seekers create compelling applications in minutes. Whether you're a recent graduate building your first student resume, an experienced software developer crafting a technical CV, or a career-changer looking for a fresh start, our free online resume builder provides everything you need.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary">Why You Need a Professional ATS-Friendly Resume</h3>
              <p className="mt-3 text-base leading-relaxed">
                In today's competitive job market, your resume is often your first impression with potential employers. Modern recruiting relies heavily on Applicant Tracking Systems (ATS) that scan and filter resumes before a human ever sees them. Our professionally designed ATS-friendly resume templates ensure your qualifications aren't lost in the system, giving you the best chance to land interviews and secure your dream job.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary">Free Resume Builder with No Hidden Costs</h3>
              <p className="mt-3 text-base leading-relaxed">
                Unlike competing resume makers that charge premium fees or require subscriptions, OnlyResume is completely free. No credit card required, no premium tiers, no hidden charges. Build unlimited resumes, download as many PDFs as you need, and make changes anytime—all at zero cost. We believe everyone deserves access to professional resume-building tools without financial barriers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary">Privacy-First: No Login Required</h3>
              <p className="mt-3 text-base leading-relaxed">
                Your privacy matters. Our online CV maker keeps all your data completely private and secure on your device. No login required, no account creation needed, no tracking, and no data shared with third parties. Your resume information stays exactly where you want it—with you. Start building your professional resume immediately without any account setup.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary">Three Premium Resume Templates</h3>
              <ul className="mt-3 space-y-2 text-base">
                <li><strong>Classic Template:</strong> Clean, minimalist design perfect for all industries. Emphasizes content with elegant whitespace.</li>
                <li><strong>Modern Sidebar Template:</strong> Professional dark sidebar layout ideal for corporate roles and executive positions.</li>
                <li><strong>Bold Header Template:</strong> Contemporary full-width design perfect for creative professionals and tech developers.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary">Build Resumes for Every Career Path</h3>
              <p className="mt-3 text-base leading-relaxed">
                Our versatile resume maker works for every profession. Create a student resume for your first internship, develop a software developer CV showcasing technical skills, build a corporate executive resume, or craft a creative professional's portfolio piece. Each template adapts perfectly to highlight your unique qualifications and experience.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary">Instant PDF Download</h3>
              <p className="mt-3 text-base leading-relaxed">
                Export your completed resume as a pixel-perfect A4 PDF with a single click. No watermarks, no delays, no additional software needed. Your PDF is ready to email to employers, upload to job boards, or print immediately. Create unlimited PDFs and download them whenever you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">Ready to Land Your Dream Job?</h2>
          <p className="mt-3 text-base text-foreground sm:mt-4 sm:text-lg">
            Join thousands of job seekers who built their winning resume with OnlyResume. Create your professional CV today, completely free, no signup required.
          </p>
          <Link
            href="/builder"
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg bg-accent px-8 text-base font-semibold text-white transition-colors hover:bg-accent/90 sm:mt-8 sm:w-auto"
          >
            Create Your Resume Now
          </Link>
        </div>
      </section>
    </>
  )
}
