import type { ResumeData } from '../types'
import { getContactItems, dateRange, joinLocation } from './contacts'

/**
 * Two Column — equal two-column light layout split by a thin rule; slate accent.
 */
export function TwoColumnTemplate({ data }: { data: ResumeData }) {
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
  const accent = '#334155'
  const ink = '#0F172A'

  const Heading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="mt-3 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: accent, borderBottom: '1px solid #CBD5E1', paddingBottom: '2px' }}>{children}</h2>
  )

  return (
    <div className="resume-page" style={{ color: '#334155' }}>
      <div className="text-center">
        <h1 className="text-[24px] font-bold tracking-tight" style={{ color: ink }}>
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.professionTitle && (
          <p className="mt-0.5 text-[12px] font-semibold uppercase tracking-wide" style={{ color: accent }}>
            {personal.professionTitle}
          </p>
        )}
        {all.length > 0 && (
          <p className="mt-1 text-[10.5px]" style={{ color: '#475569' }}>
            {all.map((c, i) => (
              <span key={c.key}>
                {i > 0 && <span className="text-[#CBD5E1]"> | </span>}
                {c.href ? <a href={c.href} style={{ color: '#334155' }}>{c.value}</a> : c.value}
              </span>
            ))}
          </p>
        )}
        <div className="mt-2 border-t-2" style={{ borderColor: accent }} />
      </div>

      {personal.summary && (
        <section>
          <Heading>Summary</Heading>
          <p className="mt-1 text-[11.5px] leading-relaxed text-[#374151]">{personal.summary}</p>
        </section>
      )}

      <div className="mt-1 flex gap-5">
        <div className="w-1/2 border-r pr-5" style={{ borderColor: '#CBD5E1' }}>
          {experience.length > 0 && (
            <section>
              <Heading>Experience</Heading>
              {experience.map((exp) => (
                <div key={exp.id} className="mt-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-[12px] font-semibold" style={{ color: ink }}>{exp.title || 'Job Title'}</h3>
                      <p className="text-[10.5px]" style={{ color: '#64748B' }}>
                        {exp.company || 'Company'}
                        {joinLocation(exp.city, exp.state) ? ` · ${joinLocation(exp.city, exp.state)}` : ''}
                      </p>
                    </div>
                    <span className="shrink-0 text-[9.5px]" style={{ color: '#94A3B8' }}>{dateRange(exp.startDate, exp.endDate)}</span>
                  </div>
                  {exp.description && (
                    <p className="mt-0.5 whitespace-pre-line text-[11px] leading-snug text-[#374151]">{exp.description}</p>
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
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-[12px] font-semibold" style={{ color: ink }}>{edu.degree || 'Degree'}</h3>
                      <p className="text-[10.5px]" style={{ color: '#64748B' }}>{edu.school || 'School'}{edu.gpa && ` · GPA: ${edu.gpa}`}</p>
                    </div>
                    <span className="shrink-0 text-[9.5px]" style={{ color: '#94A3B8' }}>{dateRange(edu.startDate, edu.endDate)}</span>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="w-1/2 pl-1">
          {skillCategories.length > 0 && (
            <section>
              <Heading>Skills</Heading>
              <div className="mt-1.5 space-y-1">
                {skillCategories.map((cat) => (
                  <p key={cat.id} className="text-[11px] text-[#374151]">
                    <span className="font-semibold" style={{ color: ink }}>{cat.category}:</span> {cat.skills.join(', ')}
                  </p>
                ))}
              </div>
            </section>
          )}
          {projects.length > 0 && (
            <section>
              <Heading>Projects</Heading>
              {projects.map((proj) => (
                <div key={proj.id} className="mt-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[12px] font-semibold" style={{ color: ink }}>{proj.title || 'Project Title'}</h3>
                    {proj.liveLink && <span className="shrink-0 text-[10px]" style={{ color: '#1D4ED8' }}>{proj.liveLink}</span>}
                  </div>
                  {proj.techStack && <p className="text-[10px]" style={{ color: '#64748B' }}>{proj.techStack}</p>}
                  {proj.description && (
                    <p className="mt-0.5 whitespace-pre-line text-[11px] leading-snug text-[#374151]">{proj.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}
          {languages.length > 0 && (
            <section>
              <Heading>Languages</Heading>
              <p className="mt-1.5 text-[11px] text-[#374151]">
                {languages.map((l, i) => (
                  <span key={l.id}>{i > 0 && ', '}{l.language || 'Language'} ({l.proficiency})</span>
                ))}
              </p>
            </section>
          )}
          {certifications.length > 0 && (
            <section>
              <Heading>Certifications</Heading>
              <div className="mt-1.5 space-y-1">
                {certifications.map((c) => (
                  <p key={c.id} className="text-[11px] text-[#374151]">
                    <span className="font-semibold" style={{ color: ink }}>{c.name || 'Certification'}</span>
                    {c.issuer && <span style={{ color: '#64748B' }}> — {c.issuer}</span>}
                    {c.date && <span style={{ color: '#94A3B8' }}> · {c.date}</span>}
                  </p>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
