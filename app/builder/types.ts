export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  summary: string
}

export interface ExperienceItem {
  id: string
  company: string
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
}

export interface ResumeData {
  personal: PersonalInfo
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: string[]
  template: 'minimal' | 'corporate' | 'modern'
}

export type FormStep = 'personal' | 'experience' | 'education' | 'skills'

export const defaultResumeData: ResumeData = {
  personal: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  template: 'minimal',
}
