'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { MinimalTemplate, CorporateTemplate, ModernTemplate, sampleResumeData } from '@/app/builder/BuilderClient'

const templates = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple. Lets your content speak for itself with elegant whitespace and subtle accent lines.',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Bold sidebar layout with a dark panel for contact details. Perfect for corporate and executive roles.',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Full-width colored header with bold section dividers. Ideal for creative and tech professionals.',
  },
]

function TemplatePreview({ templateId }: { templateId: 'minimal' | 'corporate' | 'modern' }) {
  const previewData = { ...sampleResumeData, template: templateId }
  const Template = templateId === 'corporate' ? CorporateTemplate
    : templateId === 'modern' ? ModernTemplate
    : MinimalTemplate
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    function updateScale() {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.clientWidth
      const containerHeight = containerRef.current.clientHeight
      const pageWidth = 794
      const pageHeight = 1123
      const scaleX = containerWidth / pageWidth
      const scaleY = containerHeight / pageHeight
      setScale(Math.min(scaleX, scaleY, 1))
    }

    updateScale()
    const observer = new ResizeObserver(updateScale)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-gray-50 overflow-hidden" suppressHydrationWarning>
      {mounted && (
        <div
          className="origin-center"
          style={{ transform: `scale(${scale})`, width: 794, height: 1123 }}
        >
          <Template data={previewData} />
        </div>
      )}
    </div>
  )
}

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20" suppressHydrationWarning>
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
            <div className="aspect-[210/297] overflow-hidden border-b border-border bg-gray-50" data-nosnippet aria-hidden="true">
              <TemplatePreview templateId={t.id as 'minimal' | 'corporate' | 'modern'} />
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
