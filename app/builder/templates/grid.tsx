import type { ResumeData } from '../types'
import { getContactItems, dateRange, joinLocation } from './contacts'

/**
 * Grid — each section sits in its own bordered card; neutral gray accents.
 */
export function GridTemplate({ data }: { data: ResumeData }) {
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
  const accent = '#374151'
  const ink = '#111827'
  const border = '#E5E7EB'

  const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="rounded-lg border p-3" style={{ borderColor: border }}>{children}</div>
  )
  const CardHeading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: ink }}>
      <span className="inline-block h-3 w-1" style={{ background: accent }} />
      {children}
    </h2>
  )

  return (
    <div className="resume-page" style={{ color: '#374151' }}>
      <div className="rounded-lg border p-4 text-center" style={{ borderColor: border }}>
        <h1 className="text-[24px] font-bold tracking-tight" style={{ color: ink }}>
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.professionTitle && (
          <p className="mt-0.5 text-[12px] font-semibold uppercase tracking-wide" style={{ color: accent }}>
            {personal.professionTitle}
          </p>
        )}
        {all.length > 0 && (
          <p className="mt-1.5 text-[10.5px]" style={{ color: '#4B5563' }}>
            {all.map((c, i) => (
              <span key={c.key}>
                {i > 0 && <span className="text-[#CBD5E1]"> | </span>}
                {c.href ? <a href={c.href} style={{ color: '#4B5563' }}>{c.value}</a> : c.value}
              </span>
            ))}
          </p>
        )}
      </div>

      <div className="mt-3 space-y-3">
        {personal.summary && (
          <Card>
            <CardHeading>Summary</CardHeading>
            <p className="mt-1.5 text-[12px] leading-relaxed text-[#374151]">{personal.summary}</p>
          </Card>
        )}

        {experience.length > 0 && (
          <Card>
            <CardHeading>Experience</CardHeading>
            <div className="mt-2 space-y-2.5">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-[13px] font-bold" style={{ color: ink }}>{exp.title || 'Job Title'}</h3>
                      <p className="text-[11px] font-medium" style={{ color: accent }}>
                        {exp.company || 'Company'}
                        {joinLocation(exp.city, exp.state) ? ` · ${joinLocation(exp.city, exp.state)}` : ''}
                      </p>
                    </div>
                    <span className="shrink-0 rounded border px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wide" style={{ borderColor: border, color: '#6B7280' }}>
                      {dateRange(exp.startDate, exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="mt-1 whitespace-pre-line text-[12px] leading-relaxed text-[#374151]">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="grid grid-cols-2 gap-3">
          {education.length > 0 && (
            <Card>
              <CardHeading>Education</CardHeading>
              <div className="mt-2 space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-[12.5px] font-bold" style={{ color: ink }}>{edu.degree || 'Degree'}</h3>
                    <p className="text-[10.5px]" style={{ color: '#6B7280' }}>{edu.school || 'School'}{edu.gpa && ` · GPA: ${edu.gpa}`}</p>
                    <p className="text-[9.5px]" style={{ color: '#9CA3AF' }}>{dateRange(edu.startDate, edu.endDate)}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
          {skillCategories.length > 0 && (
            <Card>
              <CardHeading>Skills</CardHeading>
              <div className="mt-1.5 space-y-1">
                {skillCategories.map((cat) => (
                  <p key={cat.id} className="text-[11px] text-[#374151]">
                    <span className="font-bold" style={{ color: ink }}>{cat.category}:</span> {cat.skills.join(', ')}
                  </p>
                ))}
              </div>
            </Card>
          )}
        </div>

        {projects.length > 0 && (
          <Card>
            <CardHeading>Projects</CardHeading>
            <div className="mt-2 space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-start justify-between">
                    <h3 className="text-[13px] font-bold" style={{ color: ink }}>{proj.title || 'Project Title'}</h3>
                    {proj.liveLink && <span className="shrink-0 text-[11px]" style={{ color: accent }}>{proj.liveLink}</span>}
                  </div>
                  {proj.techStack && <p className="text-[10.5px]" style={{ color: '#6B7280' }}>{proj.techStack}</p>}
                  {proj.description && (
                    <p className="mt-1 whitespace-pre-line text-[12px] leading-relaxed text-[#374151]">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {(languages.length > 0 || certifications.length > 0) && (
          <div className="grid grid-cols-2 gap-3">
            {languages.length > 0 && (
              <Card>
                <CardHeading>Languages</CardHeading>
                <div className="mt-1.5 space-y-0.5">
                  {languages.map((l) => (
                    <p key={l.id} className="text-[11px] text-[#374151]">
                      <span className="font-bold" style={{ color: ink }}>{l.language || 'Language'}</span>
                      <span style={{ color: '#6B7280' }}> — {l.proficiency}</span>
                    </p>
                  ))}
                </div>
              </Card>
            )}
            {certifications.length > 0 && (
              <Card>
                <CardHeading>Certifications</CardHeading>
                <div className="mt-1.5 space-y-1">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <p className="text-[11px] font-bold" style={{ color: ink }}>{c.name || 'Certification'}</p>
                      <p className="text-[10px]" style={{ color: '#6B7280' }}>{c.issuer}{c.date ? ` · ${c.date}` : ''}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
