import type { ResumeData } from '../types'
import { getContactItems, dateRange, joinLocation } from './contacts'

/**
 * Elegant — serif typography, centered name, charcoal + burgundy hairline rules.
 */
export function ElegantTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data
  const { primary, secondary } = getContactItems(personal)
  const ink = '#1F2937'
  const accent = '#7C2D12'
  const allContacts = [...primary, ...secondary]

  return (
    <div className="resume-page font-serif text-[#374151]" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
      <div className="text-center">
        <h1 className="text-[28px] font-bold tracking-tight" style={{ color: ink }}>
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.professionTitle && (
          <p className="mt-1 text-[13px] italic" style={{ color: accent }}>
            {personal.professionTitle}
          </p>
        )}
        {allContacts.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px]" style={{ color: ink }}>
            {allContacts.map((c, i) => (
              <span key={c.key} className="inline-flex items-center">
                {i > 0 && <span className="mx-2" style={{ color: accent }}>·</span>}
                {c.href ? (
                  <a href={c.href} style={{ color: ink }} className="hover:underline">
                    {c.value}
                  </a>
                ) : (
                  <span>{c.value}</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="mt-3 border-b-[3px] border-double" style={{ borderColor: accent }} />

      {personal.summary && (
        <section className="mt-5">
          <h2 className="text-center text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
            Summary
          </h2>
          <p className="mt-2 text-[12px] leading-relaxed text-justify">{personal.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mt-5">
          <h2 className="text-center text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
            Experience
          </h2>
          <div className="mt-2 border-t" style={{ borderColor: '#7C2D1240' }} />
          {experience.map((exp) => (
            <div key={exp.id} className="mt-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[13px] font-semibold" style={{ color: ink }}>
                    {exp.title || 'Job Title'}
                  </h3>
                  <p className="text-[11px] italic" style={{ color: accent }}>
                    {exp.company || 'Company'}
                    {joinLocation(exp.city, exp.state) ? ` · ${joinLocation(exp.city, exp.state)}` : ''}
                  </p>
                </div>
                <span className="shrink-0 text-[10px] uppercase tracking-wide" style={{ color: '#6B7280' }}>
                  {dateRange(exp.startDate, exp.endDate)}
                </span>
              </div>
              {exp.description && (
                <p className="mt-1 whitespace-pre-line text-[12px] leading-relaxed">{exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="mt-5">
          <h2 className="text-center text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
            Education
          </h2>
          <div className="mt-2 border-t" style={{ borderColor: '#7C2D1240' }} />
          {education.map((edu) => (
            <div key={edu.id} className="mt-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[13px] font-semibold" style={{ color: ink }}>
                    {edu.degree || 'Degree'}
                  </h3>
                  <p className="text-[11px] italic" style={{ color: accent }}>
                    {edu.school || 'School'}
                    {edu.gpa && ` · GPA: ${edu.gpa}`}
                  </p>
                </div>
                <span className="shrink-0 text-[10px] uppercase tracking-wide" style={{ color: '#6B7280' }}>
                  {dateRange(edu.startDate, edu.endDate)}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {skillCategories.length > 0 && (
        <section className="mt-5">
          <h2 className="text-center text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
            Skills
          </h2>
          <div className="mt-2 border-t" style={{ borderColor: '#7C2D1240' }} />
          <div className="mt-3 space-y-1">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="text-[12px]">
                <span className="font-semibold" style={{ color: ink }}>{cat.category}:</span>{' '}
                <span>{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mt-5">
          <h2 className="text-center text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
            Projects
          </h2>
          <div className="mt-2 border-t" style={{ borderColor: '#7C2D1240' }} />
          {projects.map((proj) => (
            <div key={proj.id} className="mt-3">
              <div className="flex items-start justify-between">
                <h3 className="text-[13px] font-semibold" style={{ color: ink }}>
                  {proj.title || 'Project Title'}
                </h3>
                {proj.liveLink && <span className="shrink-0 text-[11px]" style={{ color: accent }}>{proj.liveLink}</span>}
              </div>
              {proj.techStack && <p className="text-[11px] italic" style={{ color: accent }}>{proj.techStack}</p>}
              {proj.description && (
                <p className="mt-1 whitespace-pre-line text-[12px] leading-relaxed">{proj.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {(languages.length > 0 || certifications.length > 0) && (
          <section className="mt-5">
            <h2 className="text-center text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
              Credentials
            </h2>
            <div className="mt-2 border-t" style={{ borderColor: '#7C2D1240' }} />
            {languages.length > 0 && (
              <div className="mt-3 text-[12px]">
                <span className="font-semibold" style={{ color: ink }}>Languages:</span>{' '}
                {languages.map((l, i) => (
                  <span key={l.id}>
                    {i > 0 && <span style={{ color: accent }}> · </span>}
                    {l.language || 'Language'} ({l.proficiency})
                  </span>
                ))}
              </div>
            )}
            {certifications.length > 0 && (
              <div className="mt-2 space-y-1">
                {certifications.map((c) => (
                  <div key={c.id} className="text-[12px]">
                    <span className="font-semibold" style={{ color: ink }}>{c.name || 'Certification'}</span>
                    {c.issuer && <span style={{ color: '#6B7280' }}> — {c.issuer}</span>}
                    {c.date && <span style={{ color: '#6B7280' }}> · {c.date}</span>}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
    </div>
  )
}
