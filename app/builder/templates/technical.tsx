import type { ResumeData } from '../types'
import { getContactItems, dateRange, joinLocation } from './contacts'

/**
 * Technical — left light bordered sidebar for skills/tools/languages, content
 * at right; indigo accent with mono-tracked uppercase headings.
 */
export function TechnicalTemplate({ data }: { data: ResumeData }) {
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
  const accent = '#4F46E5'
  const ink = '#0F172A'

  const SideHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>{children}</h3>
  )
  const MainHeading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="font-mono text-[12px] font-bold uppercase tracking-wider" style={{ color: accent, borderBottom: '1px solid #C7D2FE', paddingBottom: '3px' }}>{children}</h2>
  )

  return (
    <div className="resume-page" style={{ color: '#334155' }}>
      <div className="flex items-end justify-between gap-4 border-b-2 pb-3" style={{ borderColor: accent }}>
        <div>
          <h1 className="font-mono text-[24px] font-bold tracking-tight" style={{ color: ink }}>
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.professionTitle && (
            <p className="font-mono text-[12px] font-semibold uppercase tracking-wider mt-1" style={{ color: accent }}>
              {personal.professionTitle}
            </p>
          )}
        </div>
        {all.length > 0 && (
          <div className="flex flex-col items-end gap-0.5 font-mono text-[10px]" style={{ color: '#475569' }}>
            {all.map((c) => (
              <span key={c.key}>
                {c.href ? <a href={c.href} style={{ color: ink }}>{c.value}</a> : <span style={{ color: ink }}>{c.value}</span>}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-5">
        <div className="w-52 shrink-0 rounded-lg border p-4" style={{ borderColor: '#E2E8F0', background: '#F8FAFC' }}>
          {personal.summary && (
            <div>
              <SideHeading>About</SideHeading>
              <p className="mt-1.5 text-[10.5px] leading-relaxed text-[#475569]">{personal.summary}</p>
            </div>
          )}
          {skillCategories.length > 0 && (
            <div className="mt-4">
              <SideHeading>Stack</SideHeading>
              <div className="mt-1.5 space-y-1.5">
                {skillCategories.map((cat) => (
                  <div key={cat.id}>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wide" style={{ color: ink }}>{cat.category}</p>
                    <p className="text-[10.5px]" style={{ color: '#475569' }}>{cat.skills.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {languages.length > 0 && (
            <div className="mt-4">
              <SideHeading>Languages</SideHeading>
              <div className="mt-1.5 space-y-0.5 text-[10.5px]" style={{ color: ink }}>
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span>{l.language || 'Language'}</span>
                    <span style={{ color: accent }}>{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {certifications.length > 0 && (
            <div className="mt-4">
              <SideHeading>Certs</SideHeading>
              <div className="mt-1.5 space-y-1">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <p className="text-[10.5px] font-semibold" style={{ color: ink }}>{c.name || 'Certification'}</p>
                    <p className="text-[10px]" style={{ color: '#475569' }}>{c.issuer}{c.date ? ` · ${c.date}` : ''}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {experience.length > 0 && (
            <section>
              <MainHeading>Experience</MainHeading>
              {experience.map((exp) => (
                <div key={exp.id} className="mt-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-[13px] font-bold" style={{ color: ink }}>{exp.title || 'Job Title'}</h3>
                      <p className="font-mono text-[11px]" style={{ color: accent }}>
                        {exp.company || 'Company'}
                        {joinLocation(exp.city, exp.state) ? ` · ${joinLocation(exp.city, exp.state)}` : ''}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[10px]" style={{ color: '#94A3B8' }}>{dateRange(exp.startDate, exp.endDate)}</span>
                  </div>
                  {exp.description && (
                    <p className="mt-1 whitespace-pre-line text-[12px] leading-relaxed text-[#374151]">{exp.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}
          {projects.length > 0 && (
            <section className="mt-4">
              <MainHeading>Projects</MainHeading>
              {projects.map((proj) => (
                <div key={proj.id} className="mt-2.5">
                  <div className="flex items-start justify-between">
                    <h3 className="font-mono text-[13px] font-bold" style={{ color: ink }}>{proj.title || 'Project Title'}</h3>
                    {proj.liveLink && <span className="shrink-0 font-mono text-[11px]" style={{ color: accent }}>{proj.liveLink}</span>}
                  </div>
                  {proj.techStack && <p className="font-mono text-[10.5px]" style={{ color: '#475569' }}>{proj.techStack}</p>}
                  {proj.description && (
                    <p className="mt-1 whitespace-pre-line text-[12px] leading-relaxed text-[#374151]">{proj.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}
          {education.length > 0 && (
            <section className="mt-4">
              <MainHeading>Education</MainHeading>
              {education.map((edu) => (
                <div key={edu.id} className="mt-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-[13px] font-bold" style={{ color: ink }}>{edu.degree || 'Degree'}</h3>
                      <p className="font-mono text-[11px]" style={{ color: '#475569' }}>{edu.school || 'School'}{edu.gpa && ` · GPA: ${edu.gpa}`}</p>
                    </div>
                    <span className="shrink-0 font-mono text-[10px]" style={{ color: '#94A3B8' }}>{dateRange(edu.startDate, edu.endDate)}</span>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
