import type { Metadata } from 'next'
import Link from 'next/link'

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

const templates = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple. Lets your content speak for itself with elegant whitespace and subtle accent lines.',
    color: '#2563EB',
    preview: (
      <div className="flex h-full flex-col bg-white p-4">
        <div className="border-b-2 border-[#2563EB] pb-2">
          <div className="h-4 w-32 rounded bg-[#0F172A]" />
          <div className="mt-1.5 h-2 w-48 rounded bg-slate-300" />
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-2.5 w-20 rounded bg-[#2563EB]" />
          <div className="h-2 w-full rounded bg-slate-200" />
          <div className="h-2 w-5/6 rounded bg-slate-200" />
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-2.5 w-24 rounded bg-[#2563EB]" />
          <div className="h-2 w-full rounded bg-slate-200" />
          <div className="h-2 w-4/6 rounded bg-slate-200" />
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-2.5 w-16 rounded bg-[#2563EB]" />
          <div className="flex flex-wrap gap-1">
            <div className="h-4 w-12 rounded bg-slate-100" />
            <div className="h-4 w-16 rounded bg-slate-100" />
            <div className="h-4 w-10 rounded bg-slate-100" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Bold sidebar layout with a dark panel for contact details. Perfect for corporate and executive roles.',
    color: '#0F172A',
    preview: (
      <div className="flex h-full bg-white">
        <div className="w-2/5 bg-[#0F172A] p-3">
          <div className="h-4 w-20 rounded bg-white" />
          <div className="mt-1.5 h-2 w-24 rounded bg-slate-400" />
          <div className="mt-4 space-y-1.5">
            <div className="h-2 w-full rounded bg-slate-500" />
            <div className="h-2 w-5/6 rounded bg-slate-500" />
            <div className="h-2 w-4/6 rounded bg-slate-500" />
          </div>
          <div className="mt-4 space-y-1">
            <div className="h-3 w-12 rounded bg-[#2563EB]" />
            <div className="flex flex-wrap gap-1">
              <div className="h-3 w-10 rounded bg-slate-600" />
              <div className="h-3 w-14 rounded bg-slate-600" />
            </div>
          </div>
        </div>
        <div className="flex-1 p-3 space-y-2">
          <div className="h-2.5 w-24 rounded bg-[#0F172A]" />
          <div className="h-2 w-full rounded bg-slate-200" />
          <div className="h-2 w-5/6 rounded bg-slate-200" />
          <div className="mt-3 h-2.5 w-20 rounded bg-[#0F172A]" />
          <div className="h-2 w-full rounded bg-slate-200" />
          <div className="h-2 w-4/6 rounded bg-slate-200" />
        </div>
      </div>
    ),
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Full-width colored header with bold section dividers. Ideal for creative and tech professionals.',
    color: '#0F172A',
    preview: (
      <div className="flex h-full flex-col bg-white">
        <div className="bg-[#0F172A] p-3">
          <div className="h-4 w-28 rounded bg-white" />
          <div className="mt-1 h-2 w-40 rounded bg-slate-400" />
        </div>
        <div className="flex-1 p-3 space-y-2">
          <div className="h-3 w-24 rounded bg-[#2563EB]" />
          <div className="h-2 w-full rounded bg-slate-200" />
          <div className="h-2 w-5/6 rounded bg-slate-200" />
          <div className="mt-2 h-0.5 w-full bg-border" />
          <div className="h-3 w-20 rounded bg-[#2563EB]" />
          <div className="h-2 w-full rounded bg-slate-200" />
          <div className="h-2 w-3/6 rounded bg-slate-200" />
          <div className="mt-2 h-0.5 w-full bg-border" />
          <div className="h-3 w-16 rounded bg-[#2563EB]" />
          <div className="flex flex-wrap gap-1">
            <div className="h-4 w-14 rounded bg-accent/10" />
            <div className="h-4 w-10 rounded bg-accent/10" />
            <div className="h-4 w-16 rounded bg-accent/10" />
          </div>
        </div>
      </div>
    ),
  },
]

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">Resume Templates</h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-foreground sm:mt-4 sm:text-lg">
          Three professionally designed, ATS-friendly layouts. Pick the one that fits your style,
          then customize it in the builder.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {templates.map((t) => (
          <div key={t.id} className="overflow-hidden rounded-xl border border-border bg-surface">
            <div className="aspect-[210/297] overflow-hidden border-b border-border">
              {t.preview}
            </div>
            <div className="p-5">
              <h2 className="text-lg font-bold text-primary">{t.name}</h2>
              <p className="mt-1 text-sm text-foreground">{t.description}</p>
              <Link
                href={`/builder?template=${t.id}`}
                className="mt-4 inline-flex h-10 items-center rounded-lg bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
              >
                Use This Template
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
