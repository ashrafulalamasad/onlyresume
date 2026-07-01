import type { ResumeData } from '../types'
import { getContactItems, dateRange, joinLocation } from './contacts'

/**
 * Timeline — vertical timeline rail with dots for dated entries; teal accent.
 */
export function TimelineTemplate({ data }: { data: ResumeData }) {
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
  const accent = '#0D9488'
  const ink = '#0F172A'

  const Heading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="mt-5 text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>
      {children}
    </h2>
  )

  const Rail = ({ children }: { children: React.ReactNode }) => (
    <div className="relative mt-2 border-l-2 pl-5" style={{ borderColor: accent }}>
      {children}
    </div>
  )

  const Dot = () => (
    <span
      className="absolute -left-[27px] top-[3px] h-2.5 w-2.5 rounded-full"
      style={{ background: accent, boxShadow: '0 0 0 3px #ffffff, 0 0 0 5px #0D948840' }}
    />
  )

  return (
    <div className="resume-page" style={{ color: '#334155' }}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight" style={{ color: ink }}>
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.professionTitle && (
            <p className="mt-0.5 text-[13px] font-medium" style={{ color: accent }}>
              {personal.professionTitle}
            </p>
          )}
        </div>
        {all.length > 0 && (
          <div className="flex flex-col items-end gap-0.5 text-[10.5px]" style={{ color: '#475569' }}>
            {all.map((c) => (
              <span key={c.key}>
                {c.href ? <a href={c.href} style={{ color: accent }}>{c.value}</a> : c.value}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="mt-3 border-t-2" style={{ borderColor: accent }} />

      {personal.summary && (
        <section className="mt-4">
          <Heading>Profile</Heading>
          <p className="mt-1 text-[12px] leading-relaxed text-[#374151]">{personal.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <Heading>Experience</Heading>
          <Rail>
            {experience.map((exp) => (
              <div key={exp.id} className="relative mb-4 last:mb-0">
                <Dot />
                <div className="text-[10px] font-bold uppercase tracking-wide" style={{ color: accent }}>
                  {dateRange(exp.startDate, exp.endDate)}
                </div>
                <h3 className="text-[13px] font-semibold" style={{ color: ink }}>
                  {exp.title || 'Job Title'}
                </h3>
                <p className="text-[11px]" style={{ color: '#64748B' }}>
                  {exp.company || 'Company'}
                  {joinLocation(exp.city, exp.state) ? ` · ${joinLocation(exp.city, exp.state)}` : ''}
                </p>
                {exp.description && (
                  <p className="mt-1 whitespace-pre-line text-[12px] leading-relaxed text-[#374151]">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </Rail>
        </section>
      )}

      {education.length > 0 && (
        <section>
          <Heading>Education</Heading>
          <Rail>
            {education.map((edu) => (
              <div key={edu.id} className="relative mb-3 last:mb-0">
                <Dot />
                <div className="text-[10px] font-bold uppercase tracking-wide" style={{ color: accent }}>
                  {dateRange(edu.startDate, edu.endDate)}
                </div>
                <h3 className="text-[13px] font-semibold" style={{ color: ink }}>
                  {edu.degree || 'Degree'}
                </h3>
                <p className="text-[11px]" style={{ color: '#64748B' }}>
                  {edu.school || 'School'}
                  {edu.location ? ` · ${edu.location}` : ''}
                  {edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
                </p>
              </div>
            ))}
          </Rail>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <Heading>Projects</Heading>
          {projects.map((proj) => (
            <div key={proj.id} className="mt-2.5">
              <div className="flex items-start justify-between">
                <h3 className="text-[13px] font-semibold" style={{ color: ink }}>
                  {proj.title || 'Project Title'}
                </h3>
                {proj.liveLink && <span className="shrink-0 text-[11px]" style={{ color: accent }}>{proj.liveLink}</span>}
              </div>
              {proj.techStack && <p className="text-[11px]" style={{ color: '#64748B' }}>{proj.techStack}</p>}
              {proj.description && (
                <p className="mt-1 whitespace-pre-line text-[12px] leading-relaxed text-[#374151]">
                  {proj.description}
                </p>
              )}
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
                <span className="font-semibold" style={{ color: ink }}>{cat.category}:</span> {cat.skills.join(', ')}
              </p>
            ))}
          </div>
        </section>
      )}

      {(languages.length > 0 || certifications.length > 0) && (
          <section>
            <Heading>Credentials</Heading>
            {languages.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {languages.map((l) => (
                  <span key={l.id} className="rounded-full px-2.5 py-0.5 text-[11px] font-medium" style={{ background: '#0D948815', color: accent }}>
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
