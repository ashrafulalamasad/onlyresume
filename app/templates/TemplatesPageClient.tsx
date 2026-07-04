'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { TEMPLATE_MAP, sampleResumeData } from '@/app/builder/sharedData'
import { TEMPLATES } from '@/app/builder/templateConfig'
import type { TemplateId } from '@/app/builder/types'

function TemplatePreview({ templateId }: { templateId: TemplateId }) {
  const previewData = { ...sampleResumeData, template: templateId }
  const Template = TEMPLATE_MAP[templateId]
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

export default function TemplatesPageClient() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20" suppressHydrationWarning>
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">Resume Templates</h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-foreground sm:mt-4 sm:text-lg">
          Twenty professionally designed, ATS-friendly layouts. Pick the one that fits your style,
          then customize it in the builder.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {TEMPLATES.map((t) => (
          <div key={t.id} className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface">
            <div className="aspect-210/297 overflow-hidden border-b border-border bg-gray-50" data-nosnippet aria-label={`${t.name} template preview`}>
              <TemplatePreview templateId={t.id} />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-lg font-bold text-primary">{t.name}</h2>
              <p className="mt-1 pb-4 sm:pb-6 text-sm text-foreground">{t.description}</p>
              <Link
                href={`/builder?template=${t.id}`}
                className="mt-auto inline-flex h-10 items-center rounded-lg bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
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
