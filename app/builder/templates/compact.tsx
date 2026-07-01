import type { ResumeData } from '../types'
import { getContactItems, dateRange, joinLocation } from './contacts'

/**
 * Compact — dense single column, inline name | contact header, tight leading.
 */
export function CompactTemplate({ data }: { data: ResumeData }) {
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
  const ink = '#0F172A'
  const accent = '#2563EB'
  const head = ink

  const Heading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="mt-3 text-[10.5px] font-bold uppercase tracking-wider" style={{ color: head, borderBottom: '1px solid #E2E8F0', paddingBottom: '2px' }}>
      {children}
    </h2>
  )

  return (
    <div className="resume-page" style={{ color: '#334155' }}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold leading-none" style={{ color: ink }}>
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.professionTitle && (
            <p className="mt-1 text-[11px] font-medium" style={{ color: accent }}>
              {personal.professionTitle}
            </p>
          )}
        </div>
        {all.length > 0 && (
          <div className="flex flex-col items-end gap-0.5 text-[9.5px]" style={{ color: '#475569' }}>
            {all.map((c) => (
              <span key={c.key}>
                {c.href ? <a href={c.href} style={{ color: '#2563EB' }}>{c.value}</a> : c.value}
              </span>
            ))}
          </div>
        )}
      </div>

      {personal.summary && (
        <section>
          <Heading>Summary</Heading>
          <p className="mt-1 text-[11px] leading-snug text-[#374151]">{personal.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <Heading>Experience</Heading>
          {experience.map((exp) => (
            <div key={exp.id} className="mt-1.5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[11.5px] font-semibold" style={{ color: ink }}>
                  {exp.title || 'Job Title'}
                  <span className="font-normal text-[#64748B]"> · {exp.company || 'Company'}
                    {joinLocation(exp.city, exp.state) ? `, ${joinLocation(exp.city, exp.state)}` : ''}</span>
                </h3>
                <span className="shrink-0 text-[9.5px] text-[#94A3B8]">{dateRange(exp.startDate, exp.endDate)}</span>
              </div>
              {exp.description && (
                <p className="mt-0.5 whitespace-pre-line text-[11px] leading-snug text-[#374151]">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section>
          <Heading>Education</Heading>
          {education.map((edu) => (
            <div key={edu.id} className="mt-1.5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[11.5px] font-semibold" style={{ color: ink }}>
                  {edu.degree || 'Degree'}
                  <span className="font-normal text-[#64748B]"> · {edu.school || 'School'}
                    {edu.location ? `, ${edu.location}` : ''}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</span>
                </h3>
                <span className="shrink-0 text-[9.5px] text-[#94A3B8]">{dateRange(edu.startDate, edu.endDate)}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {skillCategories.length > 0 && (
        <section>
          <Heading>Skills</Heading>
          <div className="mt-1.5 space-y-0.5">
            {skillCategories.map((cat) => (
              <p key={cat.id} className="text-[11px] text-[#374151]">
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
            <div key={proj.id} className="mt-1.5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[11.5px] font-semibold" style={{ color: ink }}>
                  {proj.title || 'Project Title'}
                  {proj.techStack && <span className="font-normal text-[#64748B]"> · {proj.techStack}</span>}
                </h3>
                {proj.liveLink && <span className="shrink-0 text-[10px]" style={{ color: accent }}>{proj.liveLink}</span>}
              </div>
              {proj.description && (
                <p className="mt-0.5 whitespace-pre-line text-[11px] leading-snug text-[#374151]">
                  {proj.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {(languages.length > 0 || certifications.length > 0) && (
          <section>
            <Heading>Additional</Heading>
            {languages.length > 0 && (
              <p className="mt-1 text-[11px] text-[#374151]">
                <span className="font-semibold" style={{ color: ink }}>Languages:</span>{' '}
                {languages.map((l, i) => (
                  <span key={l.id}>{i > 0 && ', '}{l.language || 'Language'} ({l.proficiency})</span>
                ))}
              </p>
            )}
            {certifications.length > 0 && (
              <div className="mt-1 space-y-0.5">
                {certifications.map((c) => (
                  <p key={c.id} className="text-[11px] text-[#374151]">
                    <span className="font-semibold" style={{ color: ink }}>{c.name || 'Certification'}</span>
                    {c.issuer && <span>, {c.issuer}</span>}
                    {c.date && <span className="text-[#94A3B8]"> · {c.date}</span>}
                  </p>
                ))}
              </div>
            )}
          </section>
        )}
    </div>
  )
}
