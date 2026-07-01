import type { ResumeData } from '../types'
import { getContactItems, dateRange, joinLocation } from './contacts'

/**
 * Emerald — left green-tinted sidebar with content at right; emerald accent.
 */
export function EmeraldTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data
  const { secondary } = getContactItems(personal)
  const accent = '#059669'
  const ink = '#064E3B'
  const panel = '#ECFDF5'

  const SideHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>{children}</h3>
  )
  const MainHeading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: ink, borderBottom: '2px solid #A7F3D0', paddingBottom: '3px' }}>{children}</h2>
  )

  return (
    <div className="resume-page flex gap-5" style={{ color: '#374151' }}>
      <div className="w-56 shrink-0 rounded-lg p-4" style={{ background: panel }}>
        <h1 className="text-[20px] font-bold leading-tight" style={{ color: ink }}>
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.professionTitle && (
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide" style={{ color: accent }}>
            {personal.professionTitle}
          </p>
        )}

        {personal.email && <a href={`mailto:${personal.email}`} className="block mt-3 text-[10.5px] break-words" style={{ color: accent }}>{personal.email}</a>}
        {personal.phone && <a href={`tel:${personal.phone}`} className="block mt-1 text-[10.5px]" style={{ color: accent }}>{personal.phone}</a>}
        {personal.location && <p className="mt-1 text-[10.5px]" style={{ color: ink }}>{personal.location}</p>}
        {secondary.map((c) => (
          <a key={c.key} href={c.href} className="block mt-1 text-[10.5px] break-words" style={{ color: accent }}>{c.value}</a>
        ))}

        {personal.summary && (
          <div className="mt-4">
            <SideHeading>About</SideHeading>
            <p className="mt-1.5 text-[10.5px] leading-relaxed" style={{ color: ink }}>{personal.summary}</p>
          </div>
        )}

        {skillCategories.length > 0 && (
          <div className="mt-4">
            <SideHeading>Skills</SideHeading>
            <div className="mt-1.5 space-y-1.5">
              {skillCategories.map((cat) => (
                <div key={cat.id}>
                  <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: ink }}>{cat.category}</p>
                  <p className="text-[10.5px]" style={{ color: '#047857' }}>{cat.skills.join(', ')}</p>
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
            <SideHeading>Certifications</SideHeading>
            <div className="mt-1.5 space-y-1.5">
              {certifications.map((c) => (
                <div key={c.id}>
                  <p className="text-[10.5px] font-semibold" style={{ color: ink }}>{c.name || 'Certification'}</p>
                  <p className="text-[10px]" style={{ color: '#047857' }}>{c.issuer}{c.date ? ` · ${c.date}` : ''}</p>
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
                    <h3 className="text-[13px] font-semibold" style={{ color: ink }}>{exp.title || 'Job Title'}</h3>
                    <p className="text-[11px] font-medium" style={{ color: accent }}>
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
          <section className="mt-4">
            <MainHeading>Projects</MainHeading>
            {projects.map((proj) => (
              <div key={proj.id} className="mt-2.5">
                <div className="flex items-start justify-between">
                  <h3 className="text-[13px] font-semibold" style={{ color: ink }}>{proj.title || 'Project Title'}</h3>
                  {proj.liveLink && <span className="shrink-0 text-[11px]" style={{ color: accent }}>{proj.liveLink}</span>}
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
          <section className="mt-4">
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
    </div>
  )
}
