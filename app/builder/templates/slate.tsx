import type { ResumeData } from '../types'
import { getContactItems, dateRange, joinLocation } from './contacts'

/**
 * Slate — light slate band header with cool slate-blue accents; single column.
 */
export function SlateTemplate({ data }: { data: ResumeData }) {
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
  const band = '#F1F5F9'
  const accent = '#334155'
  const ink = '#0F172A'

  const Heading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="mt-5 text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: accent, borderBottom: '2px solid #CBD5E1', paddingBottom: '3px' }}>
      {children}
    </h2>
  )

  return (
    <div className="resume-page" style={{ color: '#334155' }}>
      <div className="rounded-lg px-6 py-5" style={{ background: band, borderLeft: '4px solid #334155' }}>
        <h1 className="text-[25px] font-bold tracking-tight" style={{ color: ink }}>
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.professionTitle && (
          <p className="mt-1 text-[13px] font-medium" style={{ color: accent }}>
            {personal.professionTitle}
          </p>
        )}
        {all.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px]" style={{ color: '#475569' }}>
            {all.map((c) => (
              <span key={c.key}>
                {c.href ? <a href={c.href} style={{ color: '#1D4ED8' }} className="hover:underline">{c.value}</a> : c.value}
              </span>
            ))}
          </div>
        )}
      </div>

      {personal.summary && (
        <section>
          <Heading>Summary</Heading>
          <p className="mt-1.5 text-[12px] leading-relaxed text-[#374151]">{personal.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <Heading>Experience</Heading>
          {experience.map((exp) => (
            <div key={exp.id} className="mt-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[13px] font-semibold" style={{ color: ink }}>{exp.title || 'Job Title'}</h3>
                  <p className="text-[11px]" style={{ color: '#64748B' }}>
                    {exp.company || 'Company'}
                    {joinLocation(exp.city, exp.state) ? ` · ${joinLocation(exp.city, exp.state)}` : ''}
                  </p>
                </div>
                <span className="shrink-0 text-[10.5px]" style={{ color: '#94A3B8' }}>{dateRange(exp.startDate, exp.endDate)}</span>
              </div>
              {exp.description && (
                <p className="mt-1 whitespace-pre-line text-[12px] leading-relaxed text-[#374151]">{exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section>
          <Heading>Education</Heading>
          {education.map((edu) => (
            <div key={edu.id} className="mt-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[13px] font-semibold" style={{ color: ink }}>{edu.degree || 'Degree'}</h3>
                  <p className="text-[11px]" style={{ color: '#64748B' }}>
                    {edu.school || 'School'}{edu.gpa && ` · GPA: ${edu.gpa}`}
                  </p>
                </div>
                <span className="shrink-0 text-[10.5px]" style={{ color: '#94A3B8' }}>{dateRange(edu.startDate, edu.endDate)}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {skillCategories.length > 0 && (
        <section>
          <Heading>Skills</Heading>
          <div className="mt-1.5 grid grid-cols-2 gap-x-6 gap-y-1">
            {skillCategories.map((cat) => (
              <p key={cat.id} className="text-[12px] text-[#374151]">
                <span className="font-semibold" style={{ color: ink }}>{cat.category}:</span>{' '}
                {cat.skills.join(', ')}
              </p>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <Heading>Projects</Heading>
          {projects.map((proj) => (
            <div key={proj.id} className="mt-2.5">
              <div className="flex items-start justify-between">
                <h3 className="text-[13px] font-semibold" style={{ color: ink }}>{proj.title || 'Project Title'}</h3>
                {proj.liveLink && <span className="shrink-0 text-[11px] text-[#1D4ED8]">{proj.liveLink}</span>}
              </div>
              {proj.techStack && <p className="text-[11px]" style={{ color: '#64748B' }}>{proj.techStack}</p>}
              {proj.description && (
                <p className="mt-1 whitespace-pre-line text-[12px] leading-relaxed text-[#374151]">{proj.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {(languages.length > 0 || certifications.length > 0) && (
          <section>
            <Heading>Credentials</Heading>
            {languages.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {languages.map((l) => (
                  <span key={l.id} className="rounded px-2 py-0.5 text-[11px] font-medium" style={{ background: '#E2E8F0', color: '#334155' }}>
                    {l.language || 'Language'} · {l.proficiency}
                  </span>
                ))}
              </div>
            )}
            {certifications.length > 0 && (
              <div className="mt-2 space-y-1">
                {certifications.map((c) => (
                  <div key={c.id} className="flex items-start justify-between">
                    <p className="text-[12px] text-[#374151]">
                      <span className="font-semibold" style={{ color: ink }}>{c.name || 'Certification'}</span>
                      {c.issuer && <span style={{ color: '#64748B' }}> — {c.issuer}</span>}
                    </p>
                    {c.date && <span className="shrink-0 text-[11px]" style={{ color: '#94A3B8' }}>{c.date}</span>}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
    </div>
  )
}
