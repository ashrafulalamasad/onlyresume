import type { ResumeData } from '../types'
import { getContactItems, dateRange, joinLocation } from './contacts'

/**
 * Minimalist ATS — ultra-plain single column, no rules or color, gray uppercase
 * headings. Optimized for parse-safety.
 */
export function AtsTemplate({ data }: { data: ResumeData }) {
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
  const head = '#475569'
  const ink = '#1F2937'

  const Heading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="mt-4 text-[11px] font-bold uppercase tracking-wider" style={{ color: head }}>
      {children}
    </h2>
  )

  return (
    <div className="resume-page" style={{ color: ink }}>
      <h1 className="text-[22px] font-bold" style={{ color: ink }}>
        {personal.fullName || 'Your Name'}
      </h1>
      {personal.professionTitle && (
        <p className="text-[12px] text-[#374151]">{personal.professionTitle}</p>
      )}
      {all.length > 0 && (
        <p className="mt-1 text-[11px] text-[#374151]">
          {all.map((c, i) => (
            <span key={c.key}>
              {i > 0 && <span> | </span>}
              {c.href ? <a href={c.href} style={{ color: '#374151' }}>{c.value}</a> : c.value}
            </span>
          ))}
        </p>
      )}

      {personal.summary && (
        <section>
          <Heading>Summary</Heading>
          <p className="mt-1 whitespace-pre-line text-[12px] leading-relaxed text-[#374151]">
            {personal.summary}
          </p>
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <Heading>Experience</Heading>
          {experience.map((exp) => (
            <div key={exp.id} className="mt-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[12px] font-bold" style={{ color: ink }}>{exp.title || 'Job Title'}</h3>
                  <p className="text-[11px] text-[#374151]">
                    {exp.company || 'Company'}
                    {joinLocation(exp.city, exp.state) ? `, ${joinLocation(exp.city, exp.state)}` : ''}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] text-[#374151]">{dateRange(exp.startDate, exp.endDate)}</span>
              </div>
              {exp.description && (
                <p className="mt-1 whitespace-pre-line text-[12px] leading-relaxed text-[#374151]">
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
                  <h3 className="text-[12px] font-bold" style={{ color: ink }}>{edu.degree || 'Degree'}</h3>
                  <p className="text-[11px] text-[#374151]">
                    {edu.school || 'School'}
                    {edu.location ? `, ${edu.location}` : ''}
                    {edu.gpa ? ` · GPA: ${edu.gpa}` : ''}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] text-[#374151]">{dateRange(edu.startDate, edu.endDate)}</span>
              </div>
            </div>
          ))}
        </section>
      )}

      {skillCategories.length > 0 && (
        <section>
          <Heading>Skills</Heading>
          <div className="mt-1 space-y-0.5">
            {skillCategories.map((cat) => (
              <p key={cat.id} className="text-[12px] text-[#374151]">
                <span className="font-bold" style={{ color: ink }}>{cat.category}:</span>{' '}
                {cat.skills.join(', ')}
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
              <div className="flex items-start justify-between">
                <h3 className="text-[12px] font-bold" style={{ color: ink }}>{proj.title || 'Project Title'}</h3>
                {proj.liveLink && <span className="shrink-0 text-[11px] text-[#374151]">{proj.liveLink}</span>}
              </div>
              {proj.techStack && <p className="text-[11px] text-[#374151]">{proj.techStack}</p>}
              {proj.description && (
                <p className="mt-1 whitespace-pre-line text-[12px] leading-relaxed text-[#374151]">
                  {proj.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {languages.length > 0 && (
        <section>
          <Heading>Languages</Heading>
          <p className="mt-1 text-[12px] text-[#374151]">
            {languages.map((l, i) => (
              <span key={l.id}>
                {i > 0 && <span>, </span>}
                {l.language || 'Language'} ({l.proficiency})
              </span>
            ))}
          </p>
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          <Heading>Certifications</Heading>
          {certifications.map((c) => (
            <div key={c.id} className="mt-1 flex items-start justify-between">
              <p className="text-[12px] text-[#374151]">
                <span className="font-bold" style={{ color: ink }}>{c.name || 'Certification'}</span>
                {c.issuer && <span>, {c.issuer}</span>}
              </p>
              {c.date && <span className="shrink-0 text-[11px] text-[#374151]">{c.date}</span>}
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
