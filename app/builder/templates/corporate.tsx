import type { ResumeData } from '../types'
import { getUrlHref, getUrlDisplayText } from '../urlUtils'

export function CorporateTemplate({ data }: { data: ResumeData }) {
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
    <div className="resume-page flex">
      <div className="w-60 shrink-0 bg-[#0F172A] p-3 text-white">
        <div className="text-center">
          <h1 className="text-xl font-bold">
            {personal.fullName || 'Your Name'}
          </h1>
          {personal.professionTitle && (
            <p className="mt-1 text-xs text-[#2563EB]">
              {personal.professionTitle}
            </p>
          )}
        </div>
        <div className="mt-4 flex flex-col gap-1.5 text-xs text-slate-300 text-left w-full wrap-break-word">
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
          {personal.location && <p>{personal.location}</p>}
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

        {personal.summary && (
          <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
              About
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              {personal.summary}
            </p>
          </div>
        )}

        {skillCategories.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
              Skills
            </h2>
            <div className="mt-2 space-y-1.5">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="w-full wrap-break-word">
                  <span className="text-xs font-semibold text-slate-200">
                    {cat.category}:
                  </span>
                  <span className="text-xs text-slate-300 ml-1">
                    {cat.skills.join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
              Languages
            </h2>
            <div className="mt-2 space-y-1">
              {languages.map((lang) => (
                <div
                  key={lang.id}
                  className="flex items-center justify-between text-xs w-full wrap-break-word"
                >
                  <span className="text-slate-200">
                    {lang.language || 'Language'}
                  </span>
                  <span className="text-slate-400">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
              Certifications
            </h2>
            <div className="mt-2 space-y-1.5">
              {certifications.map((cert) => (
                <div key={cert.id} className="w-full wrap-break-word text-xs">
                  <p className="font-semibold text-slate-200">
                    {cert.name || 'Certification'}
                  </p>
                  {(cert.issuer || cert.date) && (
                    <div className="mt-0.5 flex items-center justify-between gap-2">
                      <p className="text-slate-300">{cert.issuer || ''}</p>
                      {cert.date && (
                        <p className="shrink-0 text-slate-400">{cert.date}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 pt-2 pb-2 pl-4">
        {experience.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#0F172A]">
              Experience
            </h2>
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="mt-2 border-b border-[#E2E8F0] pb-2 last:border-0"
              >
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
                  <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-[#334155]">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div className={experience.length > 0 ? 'mt-3' : ''}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#0F172A]">
              Projects
            </h2>
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="mt-2 border-b border-[#E2E8F0] pb-2 last:border-0"
              >
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

        {education.length > 0 && (
          <div
            className={
              experience.length > 0 || projects.length > 0 ? 'mt-3' : ''
            }
          >
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#0F172A]">
              Education
            </h2>
            {education.map((edu) => (
              <div
                key={edu.id}
                className="mt-2 border-b border-[#E2E8F0] pb-2 last:border-0"
              >
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

        {experience.length === 0 &&
          projects.length === 0 &&
          education.length === 0 && (
            <div className="flex h-full items-center justify-center text-sm text-[#94A3B8]">
              Add your experience to see it here
            </div>
          )}
      </div>
    </div>
  )
}