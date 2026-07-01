import type { ResumeData } from '../types'
import { getContactItems, dateRange, joinLocation, toRoman } from './contacts'

/**
 * Academic — serif, centered, numbered sections, classic CV style.
 */
export function AcademicTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data
  const { all } = getContactItems(personal)
  const ink = '#111827'

  const sections: Array<{ label: string; node: React.ReactNode }> = []
  if (personal.summary) {
    sections.push({
      label: 'Profile',
      node: (
        <p className="mt-1 whitespace-pre-line text-[11.5px] leading-relaxed text-justify">
          {personal.summary}
        </p>
      ),
    })
  }
  if (experience.length > 0) {
    sections.push({
      label: 'Appointments',
      node: experience.map((exp) => (
        <div key={exp.id} className="mt-2 flex justify-between gap-4">
          <div className="flex-1">
            <span className="font-semibold text-[#111827]">{exp.title || 'Job Title'}</span>
            <span className="text-[#4B5563]"> · {exp.company || 'Company'}
              {joinLocation(exp.city, exp.state) ? `, ${joinLocation(exp.city, exp.state)}` : ''}</span>
            {exp.description && (
              <p className="mt-0.5 whitespace-pre-line text-[11.5px] leading-relaxed">{exp.description}</p>
            )}
          </div>
          <span className="shrink-0 text-[10px] text-[#6B7280]">{dateRange(exp.startDate, exp.endDate)}</span>
        </div>
      )),
    })
  }
  if (education.length > 0) {
    sections.push({
      label: 'Education',
      node: education.map((edu) => (
        <div key={edu.id} className="mt-2 flex justify-between gap-4">
          <div className="flex-1">
            <span className="font-semibold text-[#111827]">{edu.degree || 'Degree'}</span>
            <span className="text-[#4B5563]"> · {edu.school || 'School'}
              {edu.location ? `, ${edu.location}` : ''}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</span>
          </div>
          <span className="shrink-0 text-[10px] text-[#6B7280]">{dateRange(edu.startDate, edu.endDate)}</span>
        </div>
      )),
    })
  }
  if (projects.length > 0) {
    sections.push({
      label: 'Projects',
      node: projects.map((proj) => (
        <div key={proj.id} className="mt-2">
          <span className="font-semibold text-[#111827]">{proj.title || 'Project Title'}</span>
          {proj.techStack && <span className="text-[#4B5563]"> · {proj.techStack}</span>}
          {proj.description && (
            <p className="mt-0.5 whitespace-pre-line text-[11.5px] leading-relaxed">{proj.description}</p>
          )}
        </div>
      )),
    })
  }
  if (skillCategories.length > 0) {
    sections.push({
      label: 'Skills',
      node: skillCategories.map((cat) => (
        <div key={cat.id} className="mt-1.5 text-[11.5px]">
          <span className="font-semibold text-[#111827]">{cat.category}:</span>{' '}
          <span className="text-[#374151]">{cat.skills.join(', ')}</span>
        </div>
      )),
    })
  }
  if (languages.length > 0) {
    sections.push({
      label: 'Languages',
      node: (
        <p className="mt-1 text-[11.5px]">
          {languages.map((l, i) => (
            <span key={l.id}>
              {i > 0 && <span> · </span>}
              <span className="font-semibold text-[#111827]">{l.language || 'Language'}</span>
              <span className="text-[#6B7280]"> ({l.proficiency})</span>
            </span>
          ))}
        </p>
      ),
    })
  }
  if (certifications.length > 0) {
    sections.push({
      label: 'Certifications',
      node: certifications.map((c) => (
        <div key={c.id} className="mt-1 text-[11.5px]">
          <span className="font-semibold text-[#111827]">{c.name || 'Certification'}</span>
          <span className="text-[#6B7280]"> — {c.issuer}{c.date ? `, ${c.date}` : ''}</span>
        </div>
      )),
    })
  }

  return (
    <div
      className="resume-page"
      style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: '#374151' }}
    >
      <div className="text-center">
        <h1 className="text-[24px] font-bold tracking-tight" style={{ color: ink }}>
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.professionTitle && (
          <p className="mt-1 text-[13px]" style={{ color: ink }}>
            {personal.professionTitle}
          </p>
        )}
        {all.length > 0 && (
          <p className="mt-1 text-[10.5px] text-[#4B5563]">
            {all.map((c, i) => (
              <span key={c.key}>
                {i > 0 && <span className="text-[#9CA3AF]"> | </span>}
                {c.href ? <a href={c.href} style={{ color: '#4B5563' }} className="hover:underline">{c.value}</a> : c.value}
              </span>
            ))}
          </p>
        )}
      </div>
      <div className="mt-3 border-t border-[#9CA3AF]" />
      <div className="mt-3 space-y-3">
        {sections.map((s, i) => (
          <section key={s.label}>
            <div className="flex items-baseline gap-2">
              <span className="text-[11px] font-bold tracking-widest text-[#6B7280]">{toRoman(i + 1)}.</span>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ink }}>
                {s.label}
              </h2>
            </div>
            <div className="ml-5 border-l border-[#E5E7EB] pl-3">{s.node}</div>
          </section>
        ))}
      </div>
    </div>
  )
}
