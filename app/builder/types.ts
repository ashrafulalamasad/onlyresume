export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  summary: string
  professionTitle: string
  linkedinUrl: string
  githubUrl: string
  portfolioUrl: string
}

export interface ExperienceItem {
  id: string
  company: string
  city: string
  state: string
  title: string
  startDate: string
  endDate: string
  description: string
}

export interface EducationItem {
  id: string
  school: string
  degree: string
  startDate: string
  endDate: string
  gpa: string
}

export interface ProjectItem {
  id: string
  title: string
  techStack: string
  description: string
  liveLink: string
}

export interface LanguageItem {
  id: string
  language: string
  proficiency: 'Native' | 'Fluent' | 'Intermediate' | 'Basic'
}

export interface CertificationItem {
  id: string
  name: string
  issuer: string
  date: string
}

export interface ResumeData {
  personal: PersonalInfo
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: string[]
  projects: ProjectItem[]
  languages: LanguageItem[]
  certifications: CertificationItem[]
  template: 'minimal' | 'corporate' | 'modern'
}

export type FormStep = 'template' | 'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'languages' | 'certifications'

export const defaultResumeData: ResumeData = {
  personal: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    professionTitle: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
  certifications: [],
  template: 'minimal',
}
