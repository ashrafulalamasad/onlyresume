import type { ResumeData } from '../types'
import { getContactItems, dateRange, joinLocation } from './contacts'

/**
 * Bold — oversized name, thick deep-blue full-width rules, all-caps section
 * titles, high typographic contrast.
 */
export function BoldTemplate({ data }: { data: ResumeData }) {
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
  const ink = '#0B1220'
  const accent = '#1D4ED8'

  const Heading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="mt-5 text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: ink, borderBottom: '3px solid #1D4ED8', paddingBottom: '3px', marginBottom: '6px' }}>
      {children}
    </h2>
  )

  return (
    <div className="resume-page" style={{ color: '#1F2937' }}>
      <h1 className="text-[36px] font-extrabold leading-none tracking-tight" style={{ color: ink }}>
        {personal.fullName || 'YOUR NAME'}
      </h1>
      <div className="mt-2 border-t-[6px]" style={{ borderColor: accent }} />
      <div className="mt-3 flex flex-wrap items-end justify-between gap-y-1">
        {personal.professionTitle && (
          <p className="text-[13px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
            {personal.professionTitle}
          </p>
        )}
        {all.length > 0 && (
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium" style={{ color: ink }}>
            {all.map((c) => (
              <span key={c.key}>
                {c.href ? <a href={c.href} style={{ color: ink }} className="hover:underline">{c.value}</a> : c.value}
              </span>
            ))}
          </div>
        )}
      </div>

      {personal.summary && (
        <section>
          <Heading>Profile</Heading>
          <p className="text-[12px] font-medium leading-relaxed text-[#374151]">{personal.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <Heading>Experience</Heading>
          {experience.map((exp) => (
            <div key={exp.id} className="mt-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[14px] font-extrabold uppercase tracking-wide" style={{ color: ink }}>
                    {exp.title || 'Job Title'}
                  </h3>
                  <p className="text-[12px] font-bold" style={{ color: accent }}>
                    {exp.company || 'Company'}
                    {joinLocation(exp.city, exp.state) ? ` · ${joinLocation(exp.city, exp.state)}` : ''}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] font-bold uppercase tracking-wide" style={{ color: ink }}>
                  {dateRange(exp.startDate, exp.endDate)}
                </span>
              </div>
              {exp.description && (
                <p className="mt-1.5 whitespace-pre-line text-[12px] font-medium leading-relaxed text-[#374151]">
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
            <div key={edu.id} className="mt-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[13px] font-extrabold uppercase tracking-wide" style={{ color: ink }}>
                    {edu.degree || 'Degree'}
                  </h3>
                  <p className="text-[12px] font-bold" style={{ color: accent }}>
                    {edu.school || 'School'}
                    {edu.gpa && ` · GPA: ${edu.gpa}`}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] font-bold uppercase tracking-wide" style={{ color: ink }}>
                  {dateRange(edu.startDate, edu.endDate)}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {skillCategories.length > 0 && (
        <section>
          <Heading>Skills</Heading>
          <div className="mt-1 space-y-1">
            {skillCategories.map((cat) => (
              <p key={cat.id} className="text-[12px] text-[#374151]">
                <span className="font-extrabold uppercase tracking-wide" style={{ color: ink }}>{cat.category}</span>
                <span className="mx-1.5" style={{ color: accent }}>|</span>
                {cat.skills.join(' · ')}
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
                <h3 className="text-[13px] font-extrabold uppercase tracking-wide" style={{ color: ink }}>
                  {proj.title || 'Project Title'}
                </h3>
                {proj.liveLink && <span className="shrink-0 text-[11px] font-bold" style={{ color: accent }}>{proj.liveLink}</span>}
              </div>
              {proj.techStack && <p className="text-[11px] font-bold text-[#64748B]">{proj.techStack}</p>}
              {proj.description && (
                <p className="mt-1 whitespace-pre-line text-[12px] font-medium leading-relaxed text-[#374151]">
                  {proj.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {(languages.length > 0 || certifications.length > 0) && (
          <section>
            <Heading>Credentials</Heading>
            {languages.length > 0 && (
              <p className="mt-1 text-[12px] text-[#374151]">
                <span className="font-extrabold uppercase tracking-wide" style={{ color: ink }}>Languages</span>
                <span className="mx-1.5" style={{ color: accent }}>|</span>
                {languages.map((l, i) => (
                  <span key={l.id}>{i > 0 && ' · '}{l.language || 'Language'} ({l.proficiency})</span>
                ))}
              </p>
            )}
            {certifications.length > 0 && (
              <div className="mt-1.5 space-y-1">
                {certifications.map((c) => (
                  <div key={c.id} className="flex items-start justify-between">
                    <p className="text-[12px] text-[#374151]">
                      <span className="font-extrabold" style={{ color: ink }}>{c.name || 'Certification'}</span>
                      {c.issuer && <span className="font-bold" style={{ color: accent }}> — {c.issuer}</span>}
                    </p>
                    {c.date && <span className="shrink-0 text-[11px] font-bold" style={{ color: ink }}>{c.date}</span>}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
    </div>
  )
}
