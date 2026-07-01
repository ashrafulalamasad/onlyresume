import type { ResumeData } from '../types'
import { getContactItems, dateRange, joinLocation } from './contacts'

/**
 * Geometric — corner accent bars and block-marked section headings; purple.
 */
export function GeometricTemplate({ data }: { data: ResumeData }) {
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
  const accent = '#7C3AED'
  const ink = '#0F172A'

  const Heading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="mt-5 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: ink }}>
      <span className="inline-block h-3.5 w-3.5" style={{ background: accent }} />
      {children}
    </h2>
  )

  return (
    <div className="resume-page relative" style={{ color: '#334155' }}>
      {/* Corner accent bars */}
      <span className="absolute right-0 top-0 h-1.5 w-28" style={{ background: accent }} />
      <span className="absolute right-0 top-1.5 h-0.5 w-16" style={{ background: '#C4B5FD' }} />
      <span className="absolute left-0 top-0 h-1.5 w-28" style={{ background: accent }} />

      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-extrabold tracking-tight" style={{ color: ink }}>
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.professionTitle && (
            <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
              {personal.professionTitle}
            </p>
          )}
        </div>
        {all.length > 0 && (
          <div className="flex flex-col items-end gap-0.5 text-[10.5px]" style={{ color: '#475569' }}>
            {all.map((c) => (
              <span key={c.key}>
                {c.href ? <a href={c.href} style={{ color: ink }}>{c.value}</a> : <span style={{ color: ink }}>{c.value}</span>}
              </span>
            ))}
          </div>
        )}
      </div>

      {personal.summary && (
        <section>
          <Heading>Summary</Heading>
          <p className="mt-1.5 border-l-2 pl-3 text-[12px] leading-relaxed text-[#374151]" style={{ borderColor: accent }}>
            {personal.summary}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <Heading>Experience</Heading>
          {experience.map((exp) => (
            <div key={exp.id} className="mt-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[13px] font-bold" style={{ color: ink }}>{exp.title || 'Job Title'}</h3>
                  <p className="text-[11px] font-semibold" style={{ color: accent }}>
                    {exp.company || 'Company'}
                    {joinLocation(exp.city, exp.state) ? ` · ${joinLocation(exp.city, exp.state)}` : ''}
                  </p>
                </div>
                <span className="shrink-0 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide" style={{ background: '#7C3AED12', color: accent }}>
                  {dateRange(exp.startDate, exp.endDate)}
                </span>
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
                  <h3 className="text-[13px] font-bold" style={{ color: ink }}>{edu.degree || 'Degree'}</h3>
                  <p className="text-[11px] font-semibold" style={{ color: accent }}>
                    {edu.school || 'School'}{edu.gpa && ` · GPA: ${edu.gpa}`}
                  </p>
                </div>
                <span className="shrink-0 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide" style={{ background: '#7C3AED12', color: accent }}>
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
          <div className="mt-1.5 space-y-1">
            {skillCategories.map((cat) => (
              <p key={cat.id} className="text-[12px] text-[#374151]">
                <span className="font-bold" style={{ color: ink }}>{cat.category}:</span> {cat.skills.join(', ')}
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
                <h3 className="text-[13px] font-bold" style={{ color: ink }}>{proj.title || 'Project Title'}</h3>
                {proj.liveLink && <span className="shrink-0 text-[11px] font-semibold" style={{ color: accent }}>{proj.liveLink}</span>}
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
                  <span key={l.id} className="rounded px-2 py-0.5 text-[11px] font-bold" style={{ background: '#7C3AED12', color: accent }}>
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
                      <span className="font-bold" style={{ color: ink }}>{c.name || 'Certification'}</span>
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
