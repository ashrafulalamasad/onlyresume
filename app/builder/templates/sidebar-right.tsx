import type { ResumeData } from '../types'
import { getContactItems, dateRange, joinLocation } from './contacts'

/**
 * Sidebar Right — content at left, dark teal sidebar at right with contact,
 * skills, languages, and certifications. Follows the corporate dark-sidebar
 * precedent but mirrored and recolored.
 */
export function SidebarRightTemplate({ data }: { data: ResumeData }) {
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
  const panel = '#134E4A'
  const accent = '#5EEAD4'
  const ink = '#0F172A'

  const SideHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>{children}</h3>
  )
  const MainHeading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: ink, borderBottom: '2px solid #14B8A6', paddingBottom: '3px' }}>{children}</h2>
  )

  return (
    <div className="resume-page flex gap-5" style={{ color: '#334155' }}>
      <div className="flex-1 min-w-0">
        <h1 className="text-[24px] font-bold tracking-tight" style={{ color: ink }}>
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.professionTitle && (
          <p className="mt-0.5 text-[12px] font-semibold uppercase tracking-wide" style={{ color: '#0D9488' }}>
            {personal.professionTitle}
          </p>
        )}
        <div className="mt-2 border-t-2" style={{ borderColor: '#14B8A6' }} />

        {personal.summary && (
          <section className="mt-3">
            <MainHeading>Profile</MainHeading>
            <p className="mt-1.5 text-[12px] leading-relaxed text-[#374151]">{personal.summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mt-3">
            <MainHeading>Experience</MainHeading>
            {experience.map((exp) => (
              <div key={exp.id} className="mt-2.5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[13px] font-semibold" style={{ color: ink }}>{exp.title || 'Job Title'}</h3>
                    <p className="text-[11px]" style={{ color: '#0D9488' }}>
                      {exp.company || 'Company'}
                      {joinLocation(exp.city, exp.state) ? ` · ${joinLocation(exp.city, exp.state)}` : ''}
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px]" style={{ color: '#94A3B8' }}>{dateRange(exp.startDate, exp.endDate)}</span>
                </div>
                {exp.description && (
                  <p className="mt-1 whitespace-pre-line text-[12px] leading-relaxed text-[#374151]">{exp.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section className="mt-3">
            <MainHeading>Projects</MainHeading>
            {projects.map((proj) => (
              <div key={proj.id} className="mt-2.5">
                <div className="flex items-start justify-between">
                  <h3 className="text-[13px] font-semibold" style={{ color: ink }}>{proj.title || 'Project Title'}</h3>
                  {proj.liveLink && <span className="shrink-0 text-[11px]" style={{ color: '#0D9488' }}>{proj.liveLink}</span>}
                </div>
                {proj.techStack && <p className="text-[11px]" style={{ color: '#64748B' }}>{proj.techStack}</p>}
                {proj.description && (
                  <p className="mt-1 whitespace-pre-line text-[12px] leading-relaxed text-[#374151]">{proj.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section className="mt-3">
            <MainHeading>Education</MainHeading>
            {education.map((edu) => (
              <div key={edu.id} className="mt-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[13px] font-semibold" style={{ color: ink }}>{edu.degree || 'Degree'}</h3>
                    <p className="text-[11px]" style={{ color: '#64748B' }}>{edu.school || 'School'}{edu.gpa && ` · GPA: ${edu.gpa}`}</p>
                  </div>
                  <span className="shrink-0 text-[10px]" style={{ color: '#94A3B8' }}>{dateRange(edu.startDate, edu.endDate)}</span>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>

      <div className="w-52 shrink-0 rounded-lg p-4" style={{ background: panel, color: '#E6FFFA' }}>
        {all.length > 0 && (
          <div>
            <SideHeading>Contact</SideHeading>
            <div className="mt-1.5 space-y-1 text-[10.5px]">
              {all.map((c) => (
                <p key={c.key} className="break-words">
                  {c.href ? <a href={c.href} style={{ color: accent }}>{c.value}</a> : <span style={{ color: '#CCFBF1' }}>{c.value}</span>}
                </p>
              ))}
            </div>
          </div>
        )}
        {skillCategories.length > 0 && (
          <div className="mt-4">
            <SideHeading>Skills</SideHeading>
            <div className="mt-1.5 space-y-1.5">
              {skillCategories.map((cat) => (
                <div key={cat.id}>
                  <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: '#CCFBF1' }}>{cat.category}</p>
                  <p className="text-[10.5px]" style={{ color: accent }}>{cat.skills.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {languages.length > 0 && (
          <div className="mt-4">
            <SideHeading>Languages</SideHeading>
            <div className="mt-1.5 space-y-0.5 text-[10.5px]" style={{ color: '#CCFBF1' }}>
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
            <SideHeading>Certifications</SideHeading>
            <div className="mt-1.5 space-y-1.5">
              {certifications.map((c) => (
                <div key={c.id}>
                  <p className="text-[10.5px] font-semibold" style={{ color: '#CCFBF1' }}>{c.name || 'Certification'}</p>
                  <p className="text-[10px]" style={{ color: accent }}>{c.issuer}{c.date ? ` · ${c.date}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
