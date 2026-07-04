import type { ResumeData } from './types'
import {
  MinimalTemplate,
  CorporateTemplate,
  ModernTemplate,
  AcademicTemplate,
  AtsTemplate,
  BoldTemplate,
  CompactTemplate,
  CreativeTemplate,
  ElegantTemplate,
  EmeraldTemplate,
  ExecutiveTemplate,
  GeometricTemplate,
  GridTemplate,
  SidebarRightTemplate,
  SlateTemplate,
  SplitTemplate,
  TechnicalTemplate,
  TimelineTemplate,
  TwoColumnTemplate,
  WarmTemplate,
} from './templates'

export const sampleResumeData: ResumeData = {
  personal: {
    fullName: 'John A. Smith',
    professionTitle: 'Senior Software Engineer',
    email: 'john.smith@example.com',
    phone: '+1 (555) 555-0143',
    location: 'San Francisco, CA, USA',
    summary:
      'Product-focused software engineer with 7+ years building scalable web platforms. Experienced in React, Node.js, and cloud infrastructure. Led teams to ship customer-facing features used by millions.',
    linkedinUrl: 'linkedin.com/in/johnasmith',
    githubUrl: 'github.com/johnasmith',
    portfolioUrl: 'johnasmith.dev',
  },
  experience: [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Innovatech Solutions',
      city: 'San Francisco',
      state: 'CA',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description:
        '• Architected microservices and APIs serving high‑traffic web applications on AWS\n• Mentored engineers and led cross‑functional initiatives to improve delivery cadence',
    },
    {
      id: '2',
      title: 'Software Engineer',
      company: 'Acme Tech Co.',
      city: 'San Jose',
      state: 'CA',
      startDate: 'Jun 2017',
      endDate: 'Dec 2021',
      description:
        '• Built RESTful APIs and integrated third‑party payment systems\n• Implemented CI/CD pipelines and performance tuning for production services',
    },
  ],
  education: [
    {
      id: '1',
      school: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      startDate: 'Aug 2013',
      endDate: 'May 2017',
      gpa: '3.8 / 4.0',
      location: 'Berkeley, CA, USA',
    },
    {
      id: '2',
      school: 'Jefferson High School',
      degree: 'High School Diploma',
      startDate: 'Sep 2009',
      endDate: 'Jun 2013',
      gpa: '',
      location: 'San Francisco, CA, USA',
    },
  ],
  skillCategories: [
    {
      id: '1',
      category: 'Frontend',
      skills: ['JavaScript', 'TypeScript', 'React', 'Next.js'],
    },
    {
      id: '2',
      category: 'Backend',
      skills: ['Node.js', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL'],
    },
    { id: '3', category: 'DevOps', skills: ['Docker', 'AWS', 'Git'] },
  ],
  projects: [
    {
      id: '1',
      title: 'E-Commerce Platform',
      techStack: 'Next.js, Stripe, PostgreSQL, Redis',
      description:
        '• Full‑stack marketplace with real‑time inventory tracking and payment processing\n• Handles tens of thousands of monthly transactions with automated order management',
      liveLink: 'https://shopapp.example.com',
    },
    {
      id: '2',
      title: 'Task Management App',
      techStack: 'React, Node.js, Socket.io, MongoDB',
      description:
        '• Real‑time collaborative task board with drag‑and‑drop interface\n• Supports team workspaces, file attachments, and activity logging',
      liveLink: 'https://taskflow.example.com',
    },
  ],
  languages: [
    { id: '1', language: 'English', proficiency: 'Native' },
    { id: '2', language: 'Spanish', proficiency: 'Fluent' },
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: 'Mar 2023',
    },
    {
      id: '2',
      name: 'Front-End Developer',
      issuer: 'Coursera / Meta',
      date: 'Aug 2021',
    },
  ],
  template: 'minimal',
}

export { MinimalTemplate, CorporateTemplate, ModernTemplate }

export const TEMPLATE_MAP = {
  minimal: MinimalTemplate,
  corporate: CorporateTemplate,
  modern: ModernTemplate,
  academic: AcademicTemplate,
  ats: AtsTemplate,
  bold: BoldTemplate,
  compact: CompactTemplate,
  creative: CreativeTemplate,
  elegant: ElegantTemplate,
  emerald: EmeraldTemplate,
  executive: ExecutiveTemplate,
  geometric: GeometricTemplate,
  grid: GridTemplate,
  'sidebar-right': SidebarRightTemplate,
  slate: SlateTemplate,
  split: SplitTemplate,
  technical: TechnicalTemplate,
  timeline: TimelineTemplate,
  'two-column': TwoColumnTemplate,
  warm: WarmTemplate,
} as const