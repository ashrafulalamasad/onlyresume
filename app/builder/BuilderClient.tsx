'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { ResumeData, FormStep, ExperienceItem, EducationItem } from './types'
import { defaultResumeData } from './types'

const STORAGE_KEY = 'onlyresume-data'

const STEPS: { key: FormStep; label: string }[] = [
  { key: 'personal', label: 'Personal' },
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
  { key: 'skills', label: 'Skills' },
]

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

// ─── Download Modal ───────────────────────────────────────────

function DownloadModal({ onClose, onDownload }: { onClose: () => void; onDownload: () => void }) {
  const [phase, setPhase] = useState<'scanning' | 'ready'>('scanning')

  useEffect(() => {
    const timer = setTimeout(() => setPhase('ready'), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-white p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {phase === 'scanning' ? (
          <>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <svg className="h-8 w-8 text-accent animate-scan-pulse" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary">Scanning for errors...</h3>
            <p className="mt-2 text-sm text-foreground">Checking formatting and structure</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-full origin-left animate-[scan-bar_2s_ease-in-out] rounded-full bg-accent" style={{ animation: 'scan-bar 2s ease-in-out forwards' }} />
            </div>
          </>
        ) : (
          <>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary">Resume Ready!</h3>
            <p className="mt-2 text-sm text-foreground">Your resume looks great. No issues found.</p>
            <button
              onClick={onDownload}
              className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg bg-accent text-base font-semibold text-white transition-colors hover:bg-accent/90"
            >
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="mt-3 text-sm text-foreground hover:text-primary"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      <style>{`
        @keyframes scan-bar {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  )
}

// ─── Resume Preview Templates ────────────────────────────────

function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personal, experience, education, skills } = data
  return (
    <div className="resume-page p-[48px]">
      <div className="border-b-2 border-[#2563EB] pb-4">
        <h1 className="text-2xl font-bold text-[#0F172A]">{personal.fullName || 'Your Name'}</h1>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-[#64748B]">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>

      {personal.summary && (
        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">Summary</h2>
          <p className="mt-1 text-xs leading-relaxed text-[#334155]">{personal.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mt-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#0F172A]">{exp.title || 'Job Title'}</h3>
                  <p className="text-xs text-[#64748B]">{exp.company || 'Company'}</p>
                </div>
                <span className="shrink-0 text-xs text-[#94A3B8]">
                  {exp.startDate}{exp.endDate ? ` — ${exp.endDate}` : ''}
                </span>
              </div>
              {exp.description && (
                <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-[#334155]">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mt-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#0F172A]">{edu.degree || 'Degree'}</h3>
                  <p className="text-xs text-[#64748B]">{edu.school || 'School'}</p>
                </div>
                <span className="shrink-0 text-xs text-[#94A3B8]">
                  {edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">Skills</h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {skills.map((skill, i) => (
              <span key={i} className="rounded bg-[#F1F5F9] px-2 py-0.5 text-xs text-[#334155]">{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function CorporateTemplate({ data }: { data: ResumeData }) {
  const { personal, experience, education, skills } = data
  return (
    <div className="resume-page flex">
      <div className="w-[260px] shrink-0 bg-[#0F172A] p-[36px] text-white">
        <h1 className="text-xl font-bold">{personal.fullName || 'Your Name'}</h1>
        <div className="mt-3 space-y-1 text-xs text-slate-300">
          {personal.email && <p>{personal.email}</p>}
          {personal.phone && <p>{personal.phone}</p>}
          {personal.location && <p>{personal.location}</p>}
        </div>

        {personal.summary && (
          <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">About</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">{personal.summary}</p>
          </div>
        )}

        {skills.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">Skills</h2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {skills.map((skill, i) => (
                <span key={i} className="rounded bg-white/10 px-2 py-0.5 text-xs text-slate-200">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mt-3">
                <h3 className="text-sm font-semibold">{edu.degree || 'Degree'}</h3>
                <p className="text-xs text-slate-300">{edu.school || 'School'}</p>
                <p className="text-xs text-slate-400">
                  {edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ''}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 p-[36px]">
        {experience.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#0F172A]">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mt-4 border-b border-[#E2E8F0] pb-4 last:border-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[#0F172A]">{exp.title || 'Job Title'}</h3>
                    <p className="text-xs text-[#64748B]">{exp.company || 'Company'}</p>
                  </div>
                  <span className="shrink-0 text-xs text-[#94A3B8]">
                    {exp.startDate}{exp.endDate ? ` — ${exp.endDate}` : ''}
                  </span>
                </div>
                {exp.description && (
                  <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-[#334155]">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {experience.length === 0 && education.length === 0 && (
          <div className="flex h-full items-center justify-center text-sm text-[#94A3B8]">
            Add your experience to see it here
          </div>
        )}
      </div>
    </div>
  )
}

function ModernTemplate({ data }: { data: ResumeData }) {
  const { personal, experience, education, skills } = data
  return (
    <div className="resume-page">
      <div className="bg-[#0F172A] px-[48px] py-[36px]">
        <h1 className="text-2xl font-bold text-white">{personal.fullName || 'Your Name'}</h1>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-300">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
        {personal.summary && (
          <p className="mt-3 text-xs leading-relaxed text-slate-300">{personal.summary}</p>
        )}
      </div>

      <div className="px-[48px] py-[28px] space-y-5">
        {experience.length > 0 && (
          <div>
            <h2 className="border-b-2 border-[#2563EB] pb-1 text-sm font-bold uppercase tracking-widest text-[#2563EB]">
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[#0F172A]">{exp.title || 'Job Title'}</h3>
                    <p className="text-xs text-[#64748B]">{exp.company || 'Company'}</p>
                  </div>
                  <span className="shrink-0 text-xs text-[#94A3B8]">
                    {exp.startDate}{exp.endDate ? ` — ${exp.endDate}` : ''}
                  </span>
                </div>
                {exp.description && (
                  <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-[#334155]">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 className="border-b-2 border-[#2563EB] pb-1 text-sm font-bold uppercase tracking-widest text-[#2563EB]">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[#0F172A]">{edu.degree || 'Degree'}</h3>
                    <p className="text-xs text-[#64748B]">{edu.school || 'School'}</p>
                  </div>
                  <span className="shrink-0 text-xs text-[#94A3B8]">
                    {edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h2 className="border-b-2 border-[#2563EB] pb-1 text-sm font-bold uppercase tracking-widest text-[#2563EB]">
              Skills
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="rounded bg-[#2563EB]/10 px-3 py-1 text-xs font-medium text-[#2563EB]">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ResumePreview({ data }: { data: ResumeData }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    function updateScale() {
      if (!containerRef.current || !pageRef.current) return
      const containerWidth = containerRef.current.clientWidth
      const pageWidth = 794
      setScale(Math.min(containerWidth / pageWidth, 1))
    }

    updateScale()
    const observer = new ResizeObserver(updateScale)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const Template = data.template === 'corporate' ? CorporateTemplate
    : data.template === 'modern' ? ModernTemplate
    : MinimalTemplate

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div
        ref={pageRef}
        className="origin-top-left shadow-lg print-only"
        style={{ transform: `scale(${scale})`, width: 794, minHeight: 1123 }}
      >
        <Template data={data} />
      </div>
    </div>
  )
}

// ─── Form Steps ──────────────────────────────────────────────

function PersonalForm({ data, onChange }: { data: ResumeData; onChange: (d: ResumeData) => void }) {
  const update = (field: keyof ResumeData['personal'], value: string) =>
    onChange({ ...data, personal: { ...data.personal, [field]: value } })

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-primary">Full Name</label>
        <input
          type="text"
          value={data.personal.fullName}
          onChange={(e) => update('fullName', e.target.value)}
          placeholder="John Smith"
          className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-primary">Email</label>
          <input
            type="email"
            value={data.personal.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="john@example.com"
            className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary">Phone</label>
          <input
            type="tel"
            value={data.personal.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="(555) 123-4567"
            className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-primary">Location</label>
        <input
          type="text"
          value={data.personal.location}
          onChange={(e) => update('location', e.target.value)}
          placeholder="New York, NY"
          className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-primary">Professional Summary</label>
        <textarea
          value={data.personal.summary}
          onChange={(e) => update('summary', e.target.value)}
          placeholder="Experienced professional with a proven track record..."
          rows={4}
          className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none"
        />
      </div>
    </div>
  )
}

function ExperienceForm({ data, onChange }: { data: ResumeData; onChange: (d: ResumeData) => void }) {
  const addItem = () =>
    onChange({
      ...data,
      experience: [...data.experience, { id: generateId(), company: '', title: '', startDate: '', endDate: '', description: '' }],
    })

  const updateItem = (id: string, field: keyof ExperienceItem, value: string) =>
    onChange({
      ...data,
      experience: data.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })

  const removeItem = (id: string) =>
    onChange({ ...data, experience: data.experience.filter((exp) => exp.id !== id) })

  return (
    <div className="space-y-4">
      {data.experience.map((exp, idx) => (
        <div key={exp.id} className="rounded-lg border border-border bg-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-primary">Position {idx + 1}</h3>
            <button onClick={() => removeItem(exp.id)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
          </div>
          <div className="mt-3 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-primary">Job Title</label>
                <input
                  type="text" value={exp.title} onChange={(e) => updateItem(exp.id, 'title', e.target.value)}
                  placeholder="Software Engineer"
                  className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-primary">Company</label>
                <input
                  type="text" value={exp.company} onChange={(e) => updateItem(exp.id, 'company', e.target.value)}
                  placeholder="Acme Corp"
                  className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-primary">Start Date</label>
                <input
                  type="text" value={exp.startDate} onChange={(e) => updateItem(exp.id, 'startDate', e.target.value)}
                  placeholder="Jan 2020"
                  className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-primary">End Date</label>
                <input
                  type="text" value={exp.endDate} onChange={(e) => updateItem(exp.id, 'endDate', e.target.value)}
                  placeholder="Present"
                  className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-primary">Description</label>
              <textarea
                value={exp.description} onChange={(e) => updateItem(exp.id, 'description', e.target.value)}
                placeholder="• Led a team of 5 engineers to deliver key features on time..."
                rows={3}
                className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full rounded-lg border-2 border-dashed border-border py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        + Add Experience
      </button>
    </div>
  )
}

function EducationForm({ data, onChange }: { data: ResumeData; onChange: (d: ResumeData) => void }) {
  const addItem = () =>
    onChange({
      ...data,
      education: [...data.education, { id: generateId(), school: '', degree: '', startDate: '', endDate: '' }],
    })

  const updateItem = (id: string, field: keyof EducationItem, value: string) =>
    onChange({
      ...data,
      education: data.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })

  const removeItem = (id: string) =>
    onChange({ ...data, education: data.education.filter((edu) => edu.id !== id) })

  return (
    <div className="space-y-4">
      {data.education.map((edu, idx) => (
        <div key={edu.id} className="rounded-lg border border-border bg-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-primary">Education {idx + 1}</h3>
            <button onClick={() => removeItem(edu.id)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
          </div>
          <div className="mt-3 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-primary">Degree</label>
                <input
                  type="text" value={edu.degree} onChange={(e) => updateItem(edu.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science"
                  className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-primary">School</label>
                <input
                  type="text" value={edu.school} onChange={(e) => updateItem(edu.id, 'school', e.target.value)}
                  placeholder="MIT"
                  className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-primary">Start Date</label>
                <input
                  type="text" value={edu.startDate} onChange={(e) => updateItem(edu.id, 'startDate', e.target.value)}
                  placeholder="Sep 2016"
                  className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-primary">End Date</label>
                <input
                  type="text" value={edu.endDate} onChange={(e) => updateItem(edu.id, 'endDate', e.target.value)}
                  placeholder="May 2020"
                  className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full rounded-lg border-2 border-dashed border-border py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        + Add Education
      </button>
    </div>
  )
}

function SkillsForm({ data, onChange }: { data: ResumeData; onChange: (d: ResumeData) => void }) {
  const [input, setInput] = useState('')

  const addSkill = () => {
    const skill = input.trim()
    if (skill && !data.skills.includes(skill)) {
      onChange({ ...data, skills: [...data.skills, skill] })
      setInput('')
    }
  }

  const removeSkill = (skill: string) =>
    onChange({ ...data, skills: data.skills.filter((s) => s !== skill) })

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
          placeholder="e.g. JavaScript, Project Management, Excel"
          className="flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <button
          onClick={addSkill}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
        >
          Add
        </button>
      </div>
      {data.skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-sm text-primary border border-border"
            >
              {skill}
              <button onClick={() => removeSkill(skill)} className="ml-1 text-slate-400 hover:text-red-500">&times;</button>
            </span>
          ))}
        </div>
      )}
      {data.skills.length === 0 && (
        <p className="text-sm text-foreground">Type a skill and press Enter or click Add.</p>
      )}
    </div>
  )
}

// ─── Main Builder ────────────────────────────────────────────

export default function BuilderClient() {
  const [data, setData] = useState<ResumeData>(defaultResumeData)
  const [step, setStep] = useState<FormStep>('personal')
  const [showModal, setShowModal] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setData(JSON.parse(saved))
    } catch {}
    const params = new URLSearchParams(window.location.search)
    const t = params.get('template')
    if (t === 'minimal' || t === 'corporate' || t === 'modern') {
      setData((d) => ({ ...d, template: t }))
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data, mounted])

  const handleDownload = useCallback(() => {
    setShowModal(false)
    setTimeout(() => window.print(), 100)
  }, [])

  const stepIndex = STEPS.findIndex((s) => s.key === step)

  if (!mounted) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    )
  }

  return (
    <>
      <div className="no-print flex min-h-[calc(100vh-65px)] flex-col lg:flex-row">
        {/* Form Panel */}
        <div className="w-full border-r border-border bg-background p-3 sm:p-6 lg:w-[480px] lg:overflow-y-auto">
          {/* Step Indicator */}
          <div className="mb-4 flex items-center gap-1 sm:mb-6">
            {STEPS.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setStep(s.key)}
                className={`flex-1 rounded-lg py-2.5 text-center text-xs font-medium transition-colors ${
                  step === s.key ? 'bg-accent text-white' : 'bg-white text-foreground border border-border hover:border-accent'
                }`}
              >
                <span className="sm:hidden">{i + 1}. </span>{s.label}
              </button>
            ))}
          </div>

          {/* Template Selector */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm font-medium text-primary">Template</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {(['minimal', 'corporate', 'modern'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setData({ ...data, template: t })}
                  className={`rounded-lg border py-2.5 text-center text-xs font-medium capitalize transition-colors ${
                    data.template === t ? 'border-accent bg-accent/10 text-accent' : 'border-border bg-white text-foreground hover:border-accent'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          {step === 'personal' && <PersonalForm data={data} onChange={setData} />}
          {step === 'experience' && <ExperienceForm data={data} onChange={setData} />}
          {step === 'education' && <EducationForm data={data} onChange={setData} />}
          {step === 'skills' && <SkillsForm data={data} onChange={setData} />}

          {/* Navigation */}
          <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <button
              onClick={() => setStep(STEPS[stepIndex - 1]?.key ?? step)}
              disabled={stepIndex === 0}
              className="order-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed sm:order-1"
            >
              Previous
            </button>

            {stepIndex < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(STEPS[stepIndex + 1].key)}
                className="order-1 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent/90 sm:order-2"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="order-1 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent/90 sm:order-2"
              >
                Download PDF
              </button>
            )}
          </div>

          {/* Mobile preview toggle */}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="mt-3 w-full rounded-lg border border-accent bg-accent/5 py-2.5 text-sm font-medium text-accent lg:hidden"
          >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>

        {/* Preview Panel */}
        <div className={`flex-1 overflow-y-auto bg-slate-200 p-4 sm:p-6 ${showPreview ? '' : 'hidden lg:block'}`}>
          <div className="mx-auto max-w-[794px]">
            <ResumePreview data={data} />
          </div>
        </div>
      </div>

      {showModal && <DownloadModal onClose={() => setShowModal(false)} onDownload={handleDownload} />}
    </>
  )
}
