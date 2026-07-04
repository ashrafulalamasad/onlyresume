import type { ResumeData } from '../types'
import { getUrlHref, getUrlDisplayText } from '../urlUtils'

export function ModernTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data
  return (
    <div className="resume-page">
      <div className="bg-[#0F172A] px-9 py-6 text-center">
        <h1 className="text-2xl font-bold text-white">
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.professionTitle && (
          <p className="mt-0.5 text-sm text-[#2563EB]">
            {personal.professionTitle}
          </p>
        )}
        <div className="mt-1 flex flex-col items-center gap-0.5 text-xs text-slate-300 justify-center">
          <div className="flex gap-x-4 gap-y-0.5 text-xs text-slate-300 justify-center flex-nowrap">
            {personal.email && (
              <a href={`mailto:${personal.email}`} className="text-[#2563EB]">
                {personal.email}
              </a>
            )}
            {personal.phone && (
              <a href={`tel:${personal.phone}`} className="text-[#2563EB]">
                {personal.phone}
              </a>
            )}
            {personal.location && <span>{personal.location}</span>}
          </div>
          <div className="flex gap-x-4 gap-y-0.5 text-xs text-slate-300 justify-center flex-nowrap">
            {personal.linkedinUrl && (
              <a
                href={getUrlHref(personal.linkedinUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563EB]"
              >
                {getUrlDisplayText(personal.linkedinUrl)}
              </a>
            )}
            {personal.githubUrl && (
              <a
                href={getUrlHref(personal.githubUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563EB]"
              >
                {getUrlDisplayText(personal.githubUrl)}
              </a>
            )}
            {personal.portfolioUrl && (
              <a
                href={getUrlHref(personal.portfolioUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563EB]"
              >
                {getUrlDisplayText(personal.portfolioUrl)}
              </a>
            )}
          </div>
        </div>
        {personal.summary && (
          <p className="mt-3 text-xs leading-relaxed text-slate-300">
            {personal.summary}
          </p>
        )}
      </div>

      <div className="px-0 py-0 space-y-4">
        {experience.length > 0 && (
          <div>
            <h2 className="border-b-2 border-[#2563EB] pb-1 text-sm font-bold uppercase tracking-widest text-[#2563EB]">
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[#0F172A]">
                      {exp.title || 'Job Title'}
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      {exp.company || 'Company'}
                    </p>
                  </div>
                  <div className="text-right">
                    {(exp.city || exp.state) && (
                      <p className="text-xs text-[#64748B]">
                        {[exp.city, exp.state].filter(Boolean).join(', ')}
                      </p>
                    )}
                    <span className="shrink-0 text-xs text-[#94A3B8]">
                      {exp.startDate}
                      {exp.endDate ? ` — ${exp.endDate}` : ''}
                    </span>
                  </div>
                </div>
                {exp.description && (
                  <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-[#334155]">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 className="border-b-2 border-[#2563EB] pb-1 text-sm font-bold uppercase tracking-widest text-[#2563EB]">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[#0F172A]">
                      {edu.degree || 'Degree'}
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      {edu.school || 'School'}
                      {edu.gpa && ` · GPA: ${edu.gpa}`}
                    </p>
                  </div>
                  <div className="text-right">
                    {edu.location && (
                      <p className="text-xs text-[#64748B]">{edu.location}</p>
                    )}
                    <span className="shrink-0 text-xs text-[#94A3B8]">
                      {edu.startDate}
                      {edu.endDate ? ` — ${edu.endDate}` : ''}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {skillCategories.length > 0 && (
          <div>
            <h2 className="border-b-2 border-[#2563EB] pb-1 text-sm font-bold uppercase tracking-widest text-[#2563EB]">
              Skills
            </h2>
            <div className="mt-3 space-y-2">
              {skillCategories.map((cat) => (
                <div key={cat.id}>
                  <span className="text-xs font-semibold text-[#0F172A]">
                    {cat.category}:
                  </span>
                  <span className="text-xs text-[#334155] ml-1">
                    {cat.skills.join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h2 className="border-b-2 border-[#2563EB] pb-1 text-sm font-bold uppercase tracking-widest text-[#2563EB]">
              Projects
            </h2>
            {projects.map((proj) => (
              <div key={proj.id} className="mt-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-semibold text-[#0F172A]">
                    {proj.title || 'Project Title'}
                  </h3>
                  {proj.liveLink && (
                    <span className="shrink-0 text-xs text-[#2563EB]">
                      {proj.liveLink}
                    </span>
                  )}
                </div>
                {proj.techStack && (
                  <p className="text-xs text-[#64748B]">{proj.techStack}</p>
                )}
                {proj.description && (
                  <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-[#334155]">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div>
            <h2 className="border-b-2 border-[#2563EB] pb-1 text-sm font-bold uppercase tracking-widest text-[#2563EB]">
              Languages
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {languages.map((lang) => (
                <span
                  key={lang.id}
                  className="rounded bg-[#2563EB]/10 px-3 py-1 text-xs font-medium text-[#2563EB]"
                >
                  {lang.language || 'Language'} · {lang.proficiency}
                </span>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 className="border-b-2 border-[#2563EB] pb-1 text-sm font-bold uppercase tracking-widest text-[#2563EB]">
              Certifications
            </h2>
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="mt-3 flex items-start justify-between"
              >
                <div className="flex items-center flex-wrap gap-1.5">
                  <h3 className="text-sm font-semibold text-[#0F172A]">
                    {cert.name || 'Certification'}
                  </h3>
                  {cert.issuer && (
                    <>
                      <span className="text-[#94A3B8]">|</span>
                      <p className="text-sm text-[#0F172A]">{cert.issuer}</p>
                    </>
                  )}
                </div>
                {cert.date && (
                  <span className="shrink-0 text-xs text-[#94A3B8]">
                    {cert.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}