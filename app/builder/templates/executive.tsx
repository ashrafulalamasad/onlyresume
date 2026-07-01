import type { ResumeData } from '../types'
import { getContactItems, dateRange, joinLocation } from './contacts'

/**
 * Executive — bold heading bar on top, right light sidebar with gold accents.
 */
export function ExecutiveTemplate({ data }: { data: ResumeData }) {
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
  const gold = '#B45309'
  const ink = '#111827'
  const panel = '#FAF5E6'

  const SideHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: gold }}>{children}</h3>
  )
  const MainHeading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: ink, borderBottom: '1px solid #E5E7EB', paddingBottom: '3px' }}>{children}</h2>
  )

  return (
    <div className="resume-page" style={{ color: '#374151' }}>
      <div className="px-5 py-4" style={{ background: ink }}>
        <h1 className="text-[24px] font-bold tracking-tight text-white">
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.professionTitle && (
          <p className="mt-0.5 text-[12px] font-semibold uppercase tracking-[0.2em]" style={{ color: gold }}>
            {personal.professionTitle}
          </p>
        )}
      </div>

      <div className="mt-4 flex gap-5">
        <div className="flex-1 min-w-0">
          {personal.summary && (
            <section>
              <MainHeading>Profile</MainHeading>
              <p className="mt-1.5 text-[12px] leading-relaxed text-[#374151]">{personal.summary}</p>
            </section>
          )}
          {experience.length > 0 && (
            <section className="mt-4">
              <MainHeading>Experience</MainHeading>
              {experience.map((exp) => (
                <div key={exp.id} className="mt-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-[13px] font-bold" style={{ color: ink }}>{exp.title || 'Job Title'}</h3>
                      <p className="text-[11px] font-semibold" style={{ color: gold }}>
                        {exp.company || 'Company'}
                        {joinLocation(exp.city, exp.state) ? ` · ${joinLocation(exp.city, exp.state)}` : ''}
                      </p>
                    </div>
                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-[#6B7280]">
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
            <section className="mt-4">
              <MainHeading>Education</MainHeading>
              {education.map((edu) => (
                <div key={edu.id} className="mt-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-[13px] font-bold" style={{ color: ink }}>{edu.degree || 'Degree'}</h3>
                      <p className="text-[11px]" style={{ color: '#6B7280' }}>{edu.school || 'School'}{edu.gpa && ` · GPA: ${edu.gpa}`}</p>
                    </div>
                    <span className="shrink-0 text-[10px] text-[#9CA3AF]">{dateRange(edu.startDate, edu.endDate)}</span>
                  </div>
                </div>
              ))}
            </section>
          )}
          {projects.length > 0 && (
            <section className="mt-4">
              <MainHeading>Projects</MainHeading>
              {projects.map((proj) => (
                <div key={proj.id} className="mt-2">
                  <div className="flex items-start justify-between">
                    <h3 className="text-[13px] font-bold" style={{ color: ink }}>{proj.title || 'Project Title'}</h3>
                    {proj.liveLink && <span className="shrink-0 text-[11px]" style={{ color: gold }}>{proj.liveLink}</span>}
                  </div>
                  {proj.techStack && <p className="text-[11px]" style={{ color: '#6B7280' }}>{proj.techStack}</p>}
                  {proj.description && (
                    <p className="mt-1 whitespace-pre-line text-[12px] leading-relaxed text-[#374151]">{proj.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="w-52 shrink-0 rounded-lg p-4" style={{ background: panel }}>
          <SideHeading>Contact</SideHeading>
          <div className="mt-1.5 space-y-1 text-[10.5px]" style={{ color: ink }}>
            {all.map((c) => (
              <p key={c.key} className="break-words">
                {c.href ? <a href={c.href} style={{ color: ink }}>{c.value}</a> : c.value}
              </p>
            ))}
            {all.length === 0 && <p className="text-[#9CA3AF]">—</p>}
          </div>

          {skillCategories.length > 0 && (
            <div className="mt-4">
              <SideHeading>Skills</SideHeading>
              <div className="mt-1.5 space-y-1.5">
                {skillCategories.map((cat) => (
                  <div key={cat.id}>
                    <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: ink }}>{cat.category}</p>
                    <p className="text-[10.5px]" style={{ color: '#6B7280' }}>{cat.skills.join(', ')}</p>
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
                    <span style={{ color: gold }}>{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div className="mt-4">
              <SideHeading>Certifications</SideHeading>
              <div className="mt-1.5 space-y-1.5">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <p className="text-[10.5px] font-semibold" style={{ color: ink }}>{c.name || 'Certification'}</p>
                    <p className="text-[10px]" style={{ color: '#6B7280' }}>{c.issuer}{c.date ? ` · ${c.date}` : ''}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
