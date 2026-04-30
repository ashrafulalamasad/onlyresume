"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import type {
  ResumeData,
  FormStep,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  LanguageItem,
  CertificationItem,
} from "./types";
import { defaultResumeData } from "./types";
import { generateResumePdf, downloadPdf } from "./pdfGenerator";
import { getUrlDisplayText, getUrlHref } from "./urlUtils";

const STORAGE_KEY = "onlyresume-data";

const SECTION_NAV: { key: FormStep; label: string }[] = [
  { key: "personal", label: "Personal" },
  { key: "experience", label: "Experience" },
  { key: "education", label: "Education" },
  { key: "skills", label: "Skills" },
  { key: "projects", label: "Projects" },
  { key: "languages", label: "Languages" },
  { key: "certifications", label: "Certifications" },
];

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

function migrateResumeData(raw: Record<string, unknown>): ResumeData {
  const d = raw as Record<string, unknown>;
  const personal = (d.personal ?? {}) as Record<string, unknown>;
  const experience = (d.experience ?? []) as Record<string, unknown>[];
  const education = (d.education ?? []) as Record<string, unknown>[];
  const projects = (d.projects ?? []) as Record<string, unknown>[];
  const languages = (d.languages ?? []) as Record<string, unknown>[];
  const certifications = (d.certifications ?? []) as Record<string, unknown>[];
  const skillCategories = (d.skillCategories ?? []) as Record<
    string,
    unknown
  >[];
  const oldSkills = (d.skills as string[]) ?? [];

  return {
    personal: {
      fullName: (personal.fullName as string) ?? "",
      email: (personal.email as string) ?? "",
      phone: (personal.phone as string) ?? "",
      location: (personal.location as string) ?? "",
      summary: (personal.summary as string) ?? "",
      professionTitle: (personal.professionTitle as string) ?? "",
      linkedinUrl: (personal.linkedinUrl as string) ?? "",
      githubUrl: (personal.githubUrl as string) ?? "",
      portfolioUrl: (personal.portfolioUrl as string) ?? "",
    },
    experience: experience.map((exp) => ({
      id: (exp.id as string) ?? generateId(),
      company: (exp.company as string) ?? "",
      city: (exp.city as string) ?? "",
      state: (exp.state as string) ?? "",
      title: (exp.title as string) ?? "",
      startDate: (exp.startDate as string) ?? "",
      endDate: (exp.endDate as string) ?? "",
      description: (exp.description as string) ?? "",
    })),
    education: education.map((edu) => ({
      id: (edu.id as string) ?? generateId(),
      school: (edu.school as string) ?? "",
      degree: (edu.degree as string) ?? "",
      startDate: (edu.startDate as string) ?? "",
      endDate: (edu.endDate as string) ?? "",
      gpa: (edu.gpa as string) ?? "",
      location: (edu.location as string) ?? "",
    })),
    skillCategories:
      skillCategories.length > 0
        ? skillCategories.map((sc) => ({
            id: (sc.id as string) ?? generateId(),
            category: (sc.category as string) ?? "",
            skills: (sc.skills as string[]) ?? [],
          }))
        : oldSkills.length > 0
          ? [{ id: generateId(), category: "Skills", skills: oldSkills }]
          : [],
    projects: projects.map((p) => ({
      id: (p.id as string) ?? generateId(),
      title: (p.title as string) ?? "",
      techStack: (p.techStack as string) ?? "",
      description: (p.description as string) ?? "",
      liveLink: (p.liveLink as string) ?? "",
    })),
    languages: languages.map((l) => ({
      id: (l.id as string) ?? generateId(),
      language: (l.language as string) ?? "",
      proficiency: ["Native", "Fluent", "Intermediate", "Basic"].includes(
        l.proficiency as string,
      )
        ? (l.proficiency as LanguageItem["proficiency"])
        : "Intermediate",
    })),
    certifications: certifications.map((c) => ({
      id: (c.id as string) ?? generateId(),
      name: (c.name as string) ?? "",
      issuer: (c.issuer as string) ?? "",
      date: (c.date as string) ?? "",
    })),
    template: ["minimal", "corporate", "modern"].includes(d.template as string)
      ? (d.template as ResumeData["template"])
      : "minimal",
  };
}

// ─── Modals ──────────────────────────────────────────────────

function DownloadModal({
  onClose,
  onDownload,
}: {
  onClose: () => void;
  onDownload: () => void;
}) {
  const [phase, setPhase] = useState<"scanning" | "ready">("scanning");

  useEffect(() => {
    const timer = setTimeout(() => setPhase("ready"), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {phase === "scanning" ? (
          <>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <svg
                className="h-8 w-8 text-accent animate-scan-pulse"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary">
              Generating PDF...
            </h3>
            <p className="mt-2 text-sm text-foreground">
              Formatting your resume
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full w-full origin-left rounded-full bg-accent"
                style={{ animation: "scan-bar 1.5s ease-in-out forwards" }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary">
              Ready to Download!
            </h3>
            <p className="mt-2 text-sm text-foreground">
              Your resume is formatted and ready
            </p>
            <button
              onClick={onDownload}
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-green-600 text-base font-semibold text-white transition-colors hover:bg-green-700"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="mt-3 text-sm text-foreground hover:text-primary"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      <style>{`
        @keyframes scan-bar {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}

function ConfirmResetModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <svg
            className="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-primary">Clear All Data?</h3>
        <p className="mt-2 text-sm text-foreground">
          Are you sure you want to clear all your saved data? This cannot be
          undone.
        </p>
        <button
          onClick={onConfirm}
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg bg-red-600 text-base font-semibold text-white transition-colors hover:bg-red-700"
        >
          Yes, Clear
        </button>
        <button
          onClick={onClose}
          className="mt-3 text-sm text-foreground hover:text-primary"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Template Selection Screen ───────────────────────────────

const sampleResumeData: ResumeData = {
  personal: {
    fullName: "John A. Smith",
    professionTitle: "Senior Software Engineer",
    email: "john.smith@example.com",
    phone: "+1 (555) 555-0143",
    location: "San Francisco, CA, USA",
    summary:
      "Product-focused software engineer with 7+ years building scalable web platforms. Experienced in React, Node.js, and cloud infrastructure. Led teams to ship customer-facing features used by millions.",
    linkedinUrl: "linkedin.com/in/johnasmith",
    githubUrl: "github.com/johnasmith",
    portfolioUrl: "johnasmith.dev",
  },
  experience: [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "Innovatech Solutions",
      city: "San Francisco",
      state: "CA",
      startDate: "Jan 2022",
      endDate: "Present",
      description:
        "• Architected microservices and APIs serving high‑traffic web applications on AWS\n• Mentored engineers and led cross‑functional initiatives to improve delivery cadence",
    },
    {
      id: "2",
      title: "Software Engineer",
      company: "Acme Tech Co.",
      city: "San Jose",
      state: "CA",
      startDate: "Jun 2017",
      endDate: "Dec 2021",
      description:
        "• Built RESTful APIs and integrated third‑party payment systems\n• Implemented CI/CD pipelines and performance tuning for production services",
    },
  ],
  education: [
    {
      id: "1",
      school: "University of California, Berkeley",
      degree: "B.S. in Computer Science",
      startDate: "Aug 2013",
      endDate: "May 2017",
      gpa: "3.8 / 4.0",
      location: "Berkeley, CA, USA",
    },
    {
      id: "2",
      school: "Jefferson High School",
      degree: "High School Diploma",
      startDate: "Sep 2009",
      endDate: "Jun 2013",
      gpa: "",
      location: "San Francisco, CA, USA",
    },
  ],
  skillCategories: [
    {
      id: "1",
      category: "Frontend",
      skills: ["JavaScript", "TypeScript", "React", "Next.js"],
    },
    {
      id: "2",
      category: "Backend",
      skills: ["Node.js", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
    },
    { id: "3", category: "DevOps", skills: ["Docker", "AWS", "Git"] },
  ],
  projects: [
    {
      id: "1",
      title: "E-Commerce Platform",
      techStack: "Next.js, Stripe, PostgreSQL, Redis",
      description:
        "• Full‑stack marketplace with real‑time inventory tracking and payment processing\n• Handles tens of thousands of monthly transactions with automated order management",
      liveLink: "https://shopapp.example.com",
    },
    {
      id: "2",
      title: "Task Management App",
      techStack: "React, Node.js, Socket.io, MongoDB",
      description:
        "• Real‑time collaborative task board with drag‑and‑drop interface\n• Supports team workspaces, file attachments, and activity logging",
      liveLink: "https://taskflow.example.com",
    },
  ],
  languages: [
    { id: "1", language: "English", proficiency: "Native" },
    { id: "2", language: "Spanish", proficiency: "Fluent" },
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "Mar 2023",
    },
    {
      id: "2",
      name: "Front-End Developer",
      issuer: "Coursera / Meta",
      date: "Aug 2021",
    },
  ],
  template: "minimal",
};

function TemplatePreviewCard({
  templateId,
}: {
  templateId: ResumeData["template"];
}) {
  const previewData = { ...sampleResumeData, template: templateId };
  const Template =
    templateId === "corporate"
      ? CorporateTemplate
      : templateId === "modern"
        ? ModernTemplate
        : MinimalTemplate;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function updateScale() {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const pageWidth = 794;
      const pageHeight = 1123;
      const scaleX = containerWidth / pageWidth;
      const scaleY = containerHeight / pageHeight;
      setScale(Math.min(scaleX, scaleY, 1));
    }

    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center bg-gray-50"
    >
      <div
        className="origin-center shadow-sm"
        style={{ transform: `scale(${scale})`, width: 794, height: 1123 }}
      >
        <Template data={previewData} />
      </div>
    </div>
  );
}

function TemplateSelectionScreen({
  data,
  onChange,
  onContinue,
}: {
  data: ResumeData;
  onChange: (d: ResumeData) => void;
  onContinue: () => void;
}) {
  const templates = [
    {
      id: "minimal" as const,
      name: "Classic",
      description:
        "Clean and simple. Lets your content speak for itself with elegant whitespace and subtle accent lines.",
    },
    {
      id: "corporate" as const,
      name: "Modern Sidebar",
      description:
        "Bold sidebar layout with a dark panel for contact details. Perfect for corporate and executive roles.",
    },
    {
      id: "modern" as const,
      name: "Corporate Header",
      description:
        "Full-width colored header with bold section dividers. Ideal for creative and tech professionals.",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary sm:text-3xl">
          Select Your Template
        </h2>
        <p className="mt-2 text-sm text-foreground sm:text-base">
          Choose a design that best represents your professional brand.
        </p>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange({ ...data, template: t.id })}
            className={`group overflow-hidden rounded-xl border-2 bg-surface text-left transition-all ${
              data.template === t.id
                ? "border-accent ring-2 ring-accent/20 shadow-lg"
                : "border-border hover:border-accent/50 hover:shadow-md"
            }`}
          >
            <div
              className="aspect-210/297 overflow-hidden border-b border-border"
              data-nosnippet
              aria-hidden="true"
            >
              <TemplatePreviewCard templateId={t.id} />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-primary">{t.name}</h3>
                {data.template === t.id && (
                  <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                    Selected
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-foreground">{t.description}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={onContinue}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-8 text-base font-semibold text-white transition-colors hover:bg-accent/90"
        >
          Continue to Resume Data
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Resume Preview Templates ────────────────────────────────

function MinimalTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data;

  const classicPrimaryItems: Array<{ key: string; node: ReactNode }> = [];
  const classicSecondaryItems: Array<{ key: string; node: ReactNode }> = [];

  if (personal.email) {
    classicPrimaryItems.push({
      key: "email",
      node: (
        <a href={`mailto:${personal.email}`} className="text-[#2563EB]">
          {personal.email}
        </a>
      ),
    });
  }

  if (personal.phone) {
    classicPrimaryItems.push({
      key: "phone",
      node: (
        <a href={`tel:${personal.phone}`} className="text-[#2563EB]">
          {personal.phone}
        </a>
      ),
    });
  }

  if (personal.location) {
    classicPrimaryItems.push({
      key: "location",
      node: <span className="text-[#303030]">{personal.location}</span>,
    });
  }

  if (personal.linkedinUrl) {
    classicSecondaryItems.push({
      key: "linkedin",
      node: (
        <a
          href={getUrlHref(personal.linkedinUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#2563EB]"
        >
          {getUrlDisplayText(personal.linkedinUrl)}
        </a>
      ),
    });
  }

  if (personal.githubUrl) {
    classicSecondaryItems.push({
      key: "github",
      node: (
        <a
          href={getUrlHref(personal.githubUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#2563EB]"
        >
          {getUrlDisplayText(personal.githubUrl)}
        </a>
      ),
    });
  }

  if (personal.portfolioUrl) {
    classicSecondaryItems.push({
      key: "portfolio",
      node: (
        <a
          href={getUrlHref(personal.portfolioUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#2563EB]"
        >
          {getUrlDisplayText(personal.portfolioUrl)}
        </a>
      ),
    });
  }

  const hasClassicContact =
    classicPrimaryItems.length > 0 || classicSecondaryItems.length > 0;

  const renderClassicRow = (items: Array<{ key: string; node: ReactNode }>) =>
    items.map((item, index) => (
      <span key={item.key} className="inline-flex items-center">
        {index > 0 && <span className="mx-2 text-[#94A3B8]">|</span>}
        {item.node}
      </span>
    ));

  return (
    <div className="resume-page">
      <div className="border-b-2 border-[#2563EB] pb-4 text-center">
        <h1 className="text-2xl font-bold text-[#0F172A]">
          {personal.fullName || "Your Name"}
        </h1>
        {personal.professionTitle && (
          <p className="mt-0.5 text-sm text-[#303030]">
            {personal.professionTitle}
          </p>
        )}
        {hasClassicContact && (
          <div className="mt-1 flex flex-col items-center gap-0.5 text-xs text-[#64748B]">
            <div className="flex items-center justify-center flex-nowrap min-h-3.5">
              {renderClassicRow(classicPrimaryItems)}
            </div>
            <div className="flex items-center justify-center flex-nowrap min-h-3.5">
              {renderClassicRow(classicSecondaryItems)}
            </div>
          </div>
        )}
      </div>

      {personal.summary && (
        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
            Summary
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-[#334155] max-w-3xl">
            {personal.summary}
          </p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
            Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mt-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#0F172A]">
                    {exp.title || "Job Title"}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {exp.company || "Company"}
                  </p>
                </div>
                <div className="text-right">
                  {(exp.city || exp.state) && (
                    <p className="text-xs text-[#64748B]">
                      {[exp.city, exp.state].filter(Boolean).join(", ")}
                    </p>
                  )}
                  <span className="shrink-0 text-xs text-[#94A3B8]">
                    {exp.startDate}
                    {exp.endDate ? ` — ${exp.endDate}` : ""}
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
        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mt-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#0F172A]">
                    {edu.degree || "Degree"}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {edu.school || "School"}
                    {edu.gpa && ` · GPA: ${edu.gpa}`}
                  </p>
                </div>
                <div className="text-right">
                  {edu.location && (
                    <p className="text-xs text-[#64748B]">{edu.location}</p>
                  )}
                  <span className="shrink-0 text-xs text-[#94A3B8]">
                    {edu.startDate}
                    {edu.endDate ? ` — ${edu.endDate}` : ""}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {skillCategories.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
            Skills
          </h2>
          <div className="mt-2 space-y-1">
            {skillCategories.map((cat) => (
              <div key={cat.id}>
                <span className="text-xs font-semibold text-[#0F172A]">
                  {cat.category}:
                </span>
                <span className="text-xs text-[#334155] ml-1">
                  {cat.skills.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
            Projects
          </h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mt-3">
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-semibold text-[#0F172A]">
                  {proj.title || "Project Title"}
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
        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
            Languages
          </h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {languages.map((lang) => (
              <span
                key={lang.id}
                className="rounded bg-[#F1F5F9] px-2 py-0.5 text-xs text-[#334155]"
              >
                {lang.language || "Language"} · {lang.proficiency}
              </span>
            ))}
          </div>
        </div>
      )}

      {certifications.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
            Certifications
          </h2>
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="mt-2 flex items-start justify-between"
            >
              <div className="flex items-center flex-wrap gap-1.5">
                <h3 className="text-sm font-semibold text-[#0F172A]">
                  {cert.name || "Certification"}
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
  );
}

function CorporateTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data;
  return (
    <div className="resume-page flex">
      <div className="w-60 shrink-0 bg-[#0F172A] p-3 text-white">
        <div className="text-center">
          <h1 className="text-xl font-bold">
            {personal.fullName || "Your Name"}
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
                    {cat.skills.join(", ")}
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
                    {lang.language || "Language"}
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
                    {cert.name || "Certification"}
                  </p>
                  {(cert.issuer || cert.date) && (
                    <div className="mt-0.5 flex items-center justify-between gap-2">
                      <p className="text-slate-300">{cert.issuer || ""}</p>
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
                      {exp.title || "Job Title"}
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      {exp.company || "Company"}
                    </p>
                  </div>
                  <div className="text-right">
                    {(exp.city || exp.state) && (
                      <p className="text-xs text-[#64748B]">
                        {[exp.city, exp.state].filter(Boolean).join(", ")}
                      </p>
                    )}
                    <span className="shrink-0 text-xs text-[#94A3B8]">
                      {exp.startDate}
                      {exp.endDate ? ` — ${exp.endDate}` : ""}
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
          <div className={experience.length > 0 ? "mt-3" : ""}>
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
                    {proj.title || "Project Title"}
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
              experience.length > 0 || projects.length > 0 ? "mt-3" : ""
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
                      {edu.degree || "Degree"}
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      {edu.school || "School"}
                      {edu.gpa && ` · GPA: ${edu.gpa}`}
                    </p>
                  </div>
                  <div className="text-right">
                    {edu.location && (
                      <p className="text-xs text-[#64748B]">{edu.location}</p>
                    )}
                    <span className="shrink-0 text-xs text-[#94A3B8]">
                      {edu.startDate}
                      {edu.endDate ? ` — ${edu.endDate}` : ""}
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
  );
}

function ModernTemplate({ data }: { data: ResumeData }) {
  const {
    personal,
    experience,
    education,
    skillCategories,
    projects,
    languages,
    certifications,
  } = data;
  return (
    <div className="resume-page">
      <div className="bg-[#0F172A] px-9 py-6 text-center">
        <h1 className="text-2xl font-bold text-white">
          {personal.fullName || "Your Name"}
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
                      {exp.title || "Job Title"}
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      {exp.company || "Company"}
                    </p>
                  </div>
                  <div className="text-right">
                    {(exp.city || exp.state) && (
                      <p className="text-xs text-[#64748B]">
                        {[exp.city, exp.state].filter(Boolean).join(", ")}
                      </p>
                    )}
                    <span className="shrink-0 text-xs text-[#94A3B8]">
                      {exp.startDate}
                      {exp.endDate ? ` — ${exp.endDate}` : ""}
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
                      {edu.degree || "Degree"}
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      {edu.school || "School"}
                      {edu.gpa && ` · GPA: ${edu.gpa}`}
                    </p>
                  </div>
                  <div className="text-right">
                    {edu.location && (
                      <p className="text-xs text-[#64748B]">{edu.location}</p>
                    )}
                    <span className="shrink-0 text-xs text-[#94A3B8]">
                      {edu.startDate}
                      {edu.endDate ? ` — ${edu.endDate}` : ""}
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
                    {cat.skills.join(", ")}
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
                    {proj.title || "Project Title"}
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
                  {lang.language || "Language"} · {lang.proficiency}
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
                    {cert.name || "Certification"}
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
  );
}

function ResumePreview({ data }: { data: ResumeData }) {
  const pageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const Template =
    data.template === "corporate"
      ? CorporateTemplate
      : data.template === "modern"
        ? ModernTemplate
        : MinimalTemplate;

  useEffect(() => {
    function updateScale() {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      const pageWidth = 794;
      const pageHeight = 1123;
      const scaleX = (containerWidth - 16) / pageWidth;
      const scaleY = (containerHeight - 32) / pageHeight;
      setScale(Math.min(scaleX, scaleY, 1));
    }

    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-auto flex flex-col items-center justify-start py-4 bg-slate-300 px-2"
    >
      <div
        ref={pageRef}
        className="origin-top"
        style={{
          transform: `scale(${scale})`,
          width: 794,
          minHeight: 1123,
          backgroundImage:
            "linear-gradient(to bottom, white 0px, white 1123px, transparent 1123px, transparent 1143px)",
          backgroundSize: "100% 1143px",
          filter:
            "drop-shadow(0 10px 15px rgba(0,0,0,0.1)) drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
          paddingBottom: 20,
        }}
      >
        <Template data={data} />
      </div>
    </div>
  );
}

function PrintableResume({ data }: { data: ResumeData }) {
  const Template =
    data.template === "corporate"
      ? CorporateTemplate
      : data.template === "modern"
        ? ModernTemplate
        : MinimalTemplate;

  return (
    <div className="print-only" id="resume-capture">
      <Template data={data} />
    </div>
  );
}

// ─── Form Steps ──────────────────────────────────────────────

const INPUT_CLASS =
  "mt-1 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent";

function PersonalForm({
  data,
  onChange,
}: {
  data: ResumeData;
  onChange: (d: ResumeData) => void;
}) {
  const update = (field: keyof ResumeData["personal"], value: string) =>
    onChange({ ...data, personal: { ...data.personal, [field]: value } });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-primary">
          Full Name
        </label>
        <input
          type="text"
          value={data.personal.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          placeholder="John Smith"
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-primary">
          Profession Title
        </label>
        <input
          type="text"
          value={data.personal.professionTitle}
          onChange={(e) => update("professionTitle", e.target.value)}
          placeholder="Software Engineer"
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-primary">Email</label>
        <input
          type="email"
          value={data.personal.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="john@example.com"
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-primary">Phone</label>
        <input
          type="tel"
          value={data.personal.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="(555) 123-4567"
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-primary">
          Location
        </label>
        <input
          type="text"
          value={data.personal.location}
          onChange={(e) => update("location", e.target.value)}
          placeholder="New York, NY"
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-primary">
          Professional Summary
        </label>
        <textarea
          value={data.personal.summary}
          onChange={(e) => update("summary", e.target.value)}
          placeholder="Experienced professional with a proven track record..."
          rows={6}
          className={`${INPUT_CLASS} resize-none`}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-primary">
          LinkedIn URL
        </label>
        <input
          type="url"
          value={data.personal.linkedinUrl}
          onChange={(e) => update("linkedinUrl", e.target.value)}
          placeholder="linkedin.com/in/johnsmith"
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-primary">
          GitHub URL
        </label>
        <input
          type="url"
          value={data.personal.githubUrl}
          onChange={(e) => update("githubUrl", e.target.value)}
          placeholder="github.com/johnsmith"
          className={INPUT_CLASS}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-primary">
          Portfolio URL
        </label>
        <input
          type="url"
          value={data.personal.portfolioUrl}
          onChange={(e) => update("portfolioUrl", e.target.value)}
          placeholder="yourportfolio.com"
          className={INPUT_CLASS}
        />
      </div>
    </div>
  );
}

function ExperienceForm({
  data,
  onChange,
}: {
  data: ResumeData;
  onChange: (d: ResumeData) => void;
}) {
  const addItem = () =>
    onChange({
      ...data,
      experience: [
        ...data.experience,
        {
          id: generateId(),
          company: "",
          city: "",
          state: "",
          title: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });

  const updateItem = (id: string, field: keyof ExperienceItem, value: string) =>
    onChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    });

  const removeItem = (id: string) =>
    onChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    });

  return (
    <div className="space-y-4">
      {data.experience.map((exp, idx) => (
        <div
          key={exp.id}
          className="rounded-lg border border-border bg-white p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-primary">
              Position {idx + 1}
            </h3>
            <button
              onClick={() => removeItem(exp.id)}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          <div className="mt-3 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <label className="block text-xs font-medium text-primary">
                  Job Title
                </label>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => updateItem(exp.id, "title", e.target.value)}
                  placeholder="Software Engineer"
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-primary">
                  Company
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) =>
                    updateItem(exp.id, "company", e.target.value)
                  }
                  placeholder="Acme Corp"
                  className={INPUT_CLASS}
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-primary">
                  City
                </label>
                <input
                  type="text"
                  value={exp.city}
                  onChange={(e) => updateItem(exp.id, "city", e.target.value)}
                  placeholder="San Francisco"
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-primary">
                  State
                </label>
                <input
                  type="text"
                  value={exp.state}
                  onChange={(e) => updateItem(exp.id, "state", e.target.value)}
                  placeholder="CA"
                  className={INPUT_CLASS}
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-primary">
                  Start Date
                </label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateItem(exp.id, "startDate", e.target.value)
                  }
                  placeholder="Jan 2020"
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-primary">
                  End Date
                </label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) =>
                    updateItem(exp.id, "endDate", e.target.value)
                  }
                  placeholder="Present"
                  className={INPUT_CLASS}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-primary">
                Description
              </label>
              <textarea
                value={exp.description}
                onChange={(e) =>
                  updateItem(exp.id, "description", e.target.value)
                }
                placeholder="• Led a team of 5 engineers to deliver key features on time..."
                rows={3}
                className={`${INPUT_CLASS} resize-none`}
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full rounded-lg border-2 border-dashed border-border py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        + Add Experience
      </button>
    </div>
  );
}

function EducationForm({
  data,
  onChange,
}: {
  data: ResumeData;
  onChange: (d: ResumeData) => void;
}) {
  const addItem = () =>
    onChange({
      ...data,
      education: [
        ...data.education,
        {
          id: generateId(),
          school: "",
          degree: "",
          startDate: "",
          endDate: "",
          gpa: "",
          location: "",
        },
      ],
    });

  const updateItem = (id: string, field: keyof EducationItem, value: string) =>
    onChange({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    });

  const removeItem = (id: string) =>
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });

  return (
    <div className="space-y-4">
      {data.education.map((edu, idx) => (
        <div
          key={edu.id}
          className="rounded-lg border border-border bg-white p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-primary">
              Education {idx + 1}
            </h3>
            <button
              onClick={() => removeItem(edu.id)}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          <div className="mt-3 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              <div>
                <label className="block text-xs font-medium text-primary">
                  Degree
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateItem(edu.id, "degree", e.target.value)}
                  placeholder="Bachelor of Science"
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-primary">
                  School
                </label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => updateItem(edu.id, "school", e.target.value)}
                  placeholder="MIT"
                  className={INPUT_CLASS}
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-primary">
                  Start Date
                </label>
                <input
                  type="text"
                  value={edu.startDate}
                  onChange={(e) =>
                    updateItem(edu.id, "startDate", e.target.value)
                  }
                  placeholder="Sep 2016"
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-primary">
                  End Date
                </label>
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) =>
                    updateItem(edu.id, "endDate", e.target.value)
                  }
                  placeholder="May 2020"
                  className={INPUT_CLASS}
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <label className="block text-xs font-medium text-primary">
                  GPA (optional)
                </label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => updateItem(edu.id, "gpa", e.target.value)}
                  placeholder="3.8 / 4.0"
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-primary">
                  Location
                </label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) =>
                    updateItem(edu.id, "location", e.target.value)
                  }
                  placeholder="New York, NY"
                  className={INPUT_CLASS}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full rounded-lg border-2 border-dashed border-border py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        + Add Education
      </button>
    </div>
  );
}

function SkillsForm({
  data,
  onChange,
}: {
  data: ResumeData;
  onChange: (d: ResumeData) => void;
}) {
  const [categoryName, setCategoryName] = useState("");
  const [skillInput, setSkillInput] = useState("");

  const addCategory = () => {
    const cat = categoryName.trim();
    if (
      cat &&
      !data.skillCategories.some(
        (s) => s.category.toLowerCase() === cat.toLowerCase(),
      )
    ) {
      onChange({
        ...data,
        skillCategories: [
          ...data.skillCategories,
          { id: generateId(), category: cat, skills: [] },
        ],
      });
      setCategoryName("");
    }
  };

  const addSkillToCategory = (categoryId: string) => {
    const skill = skillInput.trim();
    if (skill) {
      onChange({
        ...data,
        skillCategories: data.skillCategories.map((cat) =>
          cat.id === categoryId && !cat.skills.includes(skill)
            ? { ...cat, skills: [...cat.skills, skill] }
            : cat,
        ),
      });
      setSkillInput("");
    }
  };

  const removeCategory = (categoryId: string) =>
    onChange({
      ...data,
      skillCategories: data.skillCategories.filter(
        (cat) => cat.id !== categoryId,
      ),
    });

  const removeSkill = (categoryId: string, skill: string) =>
    onChange({
      ...data,
      skillCategories: data.skillCategories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, skills: cat.skills.filter((s) => s !== skill) }
          : cat,
      ),
    });

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-white p-4">
        <h3 className="text-sm font-semibold text-primary mb-3">
          Add Category
        </h3>
        <div className="flex max-[500px]:flex-col lg:flex-col xl:flex-row gap-2">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addCategory())
            }
            placeholder="e.g. Frontend, Backend, DevOps"
            className={`flex-1 ${INPUT_CLASS}`}
          />
          <button
            onClick={addCategory}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
          >
            Add Category
          </button>
        </div>
      </div>

      {data.skillCategories.map((category) => (
        <div
          key={category.id}
          className="rounded-lg border border-border bg-white p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-primary">
              {category.category}
              <button
                onClick={() => removeCategory(category.id)}
                className="ml-2 text-xs text-red-500 hover:text-red-700"
              >
                Remove Category
              </button>
            </h3>
          </div>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                (e.preventDefault(), addSkillToCategory(category.id))
              }
              placeholder="Add a skill"
              className={`flex-1 ${INPUT_CLASS}`}
            />
            <button
              onClick={() => addSkillToCategory(category.id)}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
            >
              Add
            </button>
          </div>
          {category.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-sm text-primary border border-border"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(category.id, skill)}
                    className="ml-1 text-slate-400 hover:text-red-500"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-foreground">
              Add skills to this category
            </p>
          )}
        </div>
      ))}

      {data.skillCategories.length === 0 && (
        <p className="text-sm text-foreground">
          Create a category to get started
        </p>
      )}
    </div>
  );
}

function ProjectsForm({
  data,
  onChange,
}: {
  data: ResumeData;
  onChange: (d: ResumeData) => void;
}) {
  const addItem = () =>
    onChange({
      ...data,
      projects: [
        ...data.projects,
        {
          id: generateId(),
          title: "",
          techStack: "",
          description: "",
          liveLink: "",
        },
      ],
    });

  const updateItem = (id: string, field: keyof ProjectItem, value: string) =>
    onChange({
      ...data,
      projects: data.projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p,
      ),
    });

  const removeItem = (id: string) =>
    onChange({ ...data, projects: data.projects.filter((p) => p.id !== id) });

  return (
    <div className="space-y-4">
      {data.projects.map((proj, idx) => (
        <div
          key={proj.id}
          className="rounded-lg border border-border bg-white p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-primary">
              Project {idx + 1}
            </h3>
            <button
              onClick={() => removeItem(proj.id)}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          <div className="mt-3 space-y-3">
            <div>
              <label className="block text-xs font-medium text-primary">
                Project Title
              </label>
              <input
                type="text"
                value={proj.title}
                onChange={(e) => updateItem(proj.id, "title", e.target.value)}
                placeholder="E-Commerce Platform"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-primary">
                Tech Stack
              </label>
              <input
                type="text"
                value={proj.techStack}
                onChange={(e) =>
                  updateItem(proj.id, "techStack", e.target.value)
                }
                placeholder="React, Node.js, PostgreSQL"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-primary">
                Description
              </label>
              <textarea
                value={proj.description}
                onChange={(e) =>
                  updateItem(proj.id, "description", e.target.value)
                }
                placeholder="• Built a full-stack e-commerce platform with payment integration..."
                rows={3}
                className={`${INPUT_CLASS} resize-none`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-primary">
                Live Link
              </label>
              <input
                type="url"
                value={proj.liveLink}
                onChange={(e) =>
                  updateItem(proj.id, "liveLink", e.target.value)
                }
                placeholder="https://myproject.com"
                className={INPUT_CLASS}
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full rounded-lg border-2 border-dashed border-border py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        + Add Project
      </button>
    </div>
  );
}

function LanguagesForm({
  data,
  onChange,
}: {
  data: ResumeData;
  onChange: (d: ResumeData) => void;
}) {
  const addItem = () =>
    onChange({
      ...data,
      languages: [
        ...data.languages,
        {
          id: generateId(),
          language: "",
          proficiency: "Intermediate" as const,
        },
      ],
    });

  const updateItem = (id: string, field: keyof LanguageItem, value: string) =>
    onChange({
      ...data,
      languages: data.languages.map((l) =>
        l.id === id ? { ...l, [field]: value } : l,
      ),
    });

  const removeItem = (id: string) =>
    onChange({ ...data, languages: data.languages.filter((l) => l.id !== id) });

  return (
    <div className="space-y-4">
      {data.languages.map((lang, idx) => (
        <div
          key={lang.id}
          className="rounded-lg border border-border bg-white p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-primary">
              Language {idx + 1}
            </h3>
            <button
              onClick={() => removeItem(lang.id)}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          <div className="mt-3 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-primary">
                  Language
                </label>
                <input
                  type="text"
                  value={lang.language}
                  onChange={(e) =>
                    updateItem(lang.id, "language", e.target.value)
                  }
                  placeholder="English"
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-primary">
                  Proficiency
                </label>
                <select
                  value={lang.proficiency}
                  onChange={(e) =>
                    updateItem(lang.id, "proficiency", e.target.value)
                  }
                  className={INPUT_CLASS}
                >
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full rounded-lg border-2 border-dashed border-border py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        + Add Language
      </button>
    </div>
  );
}

function CertificationsForm({
  data,
  onChange,
}: {
  data: ResumeData;
  onChange: (d: ResumeData) => void;
}) {
  const addItem = () =>
    onChange({
      ...data,
      certifications: [
        ...data.certifications,
        { id: generateId(), name: "", issuer: "", date: "" },
      ],
    });

  const updateItem = (
    id: string,
    field: keyof CertificationItem,
    value: string,
  ) =>
    onChange({
      ...data,
      certifications: data.certifications.map((c) =>
        c.id === id ? { ...c, [field]: value } : c,
      ),
    });

  const removeItem = (id: string) =>
    onChange({
      ...data,
      certifications: data.certifications.filter((c) => c.id !== id),
    });

  return (
    <div className="space-y-4">
      {data.certifications.map((cert, idx) => (
        <div
          key={cert.id}
          className="rounded-lg border border-border bg-white p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-primary">
              Certification {idx + 1}
            </h3>
            <button
              onClick={() => removeItem(cert.id)}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          <div className="mt-3 space-y-3">
            <div>
              <label className="block text-xs font-medium text-primary">
                Certification Name
              </label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateItem(cert.id, "name", e.target.value)}
                placeholder="AWS Certified Solutions Architect"
                className={INPUT_CLASS}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-primary">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) =>
                    updateItem(cert.id, "issuer", e.target.value)
                  }
                  placeholder="Amazon Web Services"
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-primary">
                  Date
                </label>
                <input
                  type="text"
                  value={cert.date}
                  onChange={(e) => updateItem(cert.id, "date", e.target.value)}
                  placeholder="Mar 2023"
                  className={INPUT_CLASS}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addItem}
        className="w-full rounded-lg border-2 border-dashed border-border py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        + Add Certification
      </button>
    </div>
  );
}

// ─── Main Builder ────────────────────────────────────────────

export default function BuilderClient() {
  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const [step, setStep] = useState<FormStep>("template");
  const [showModal, setShowModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const migrated = migrateResumeData(JSON.parse(saved));
        setData(migrated);
        setStep("personal");
      }
    } catch {}
    const params = new URLSearchParams(window.location.search);
    const t = params.get("template");
    if (t === "minimal" || t === "corporate" || t === "modern") {
      setData((d) => ({ ...d, template: t }));
      setStep("personal");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, mounted]);

  const handleDownload = useCallback(async () => {
    try {
      const pdfBlob = await generateResumePdf(data);
      downloadPdf(
        pdfBlob,
        `resume-${new Date().toISOString().split("T")[0].replace(/-/g, "")}.pdf`,
      );
      setShowModal(false);
    } catch (error) {
      console.error("PDF download failed:", error);
      setShowModal(false);
      window.print();
    }
  }, [data]);

  const handleReset = useCallback(() => {
    setData(defaultResumeData);
    setStep("template");
    setShowResetModal(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (step === "template") {
    return (
      <>
        <div className="no-print min-h-[calc(100vh-52px)]">
          <TemplateSelectionScreen
            data={data}
            onChange={setData}
            onContinue={() => setStep("personal")}
          />
        </div>
        {/* Print-only resume: rendered outside no-print so it's visible during print */}
        <div className="hidden print:block">
          <PrintableResume data={data} />
        </div>
      </>
    );
  }

  const currentSectionIndex = SECTION_NAV.findIndex((s) => s.key === step);
  const canGoPrevious = currentSectionIndex > 0;
  const canGoNext = currentSectionIndex < SECTION_NAV.length - 1;

  return (
    <>
      <div className="no-print flex min-h-[calc(100vh-52px)] flex-col lg:flex-row">
        {/* Form Panel */}
        <div className="flex w-full flex-col border-r border-border bg-background lg:max-w-2/5">
          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <h2 className="mb-4 text-lg font-bold text-primary">
              {SECTION_NAV.find((s) => s.key === step)?.label}
            </h2>
            {step === "personal" && (
              <PersonalForm data={data} onChange={setData} />
            )}
            {step === "experience" && (
              <ExperienceForm data={data} onChange={setData} />
            )}
            {step === "education" && (
              <EducationForm data={data} onChange={setData} />
            )}
            {step === "skills" && <SkillsForm data={data} onChange={setData} />}
            {step === "projects" && (
              <ProjectsForm data={data} onChange={setData} />
            )}
            {step === "languages" && (
              <LanguagesForm data={data} onChange={setData} />
            )}
            {step === "certifications" && (
              <CertificationsForm data={data} onChange={setData} />
            )}
          </div>

          {/* Footer Action Bar */}
          <div className="shrink-0 border-t border-border bg-surface p-3 sm:p-4">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 justify-between">
                <button
                  onClick={() =>
                    setStep(SECTION_NAV[currentSectionIndex - 1].key)
                  }
                  disabled={!canGoPrevious}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-200 px-4 py-2 text-sm max-[400px]:text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                  Previous
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm max-[400px]:text-xs font-semibold text-white transition-colors hover:bg-accent/90"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                  Download PDF
                </button>
                <button
                  onClick={() =>
                    setStep(SECTION_NAV[currentSectionIndex + 1].key)
                  }
                  disabled={!canGoNext}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm max-[400px]:text-xs font-semibold text-white transition-colors hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5L15.75 12l-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setShowResetModal(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-400 bg-red-50 px-3 py-2 text-sm max-[400px]:text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182"
                    />
                  </svg>
                  Reset Data
                </button>
                <button
                  onClick={() => setStep("template")}
                  className="rounded-lg border border-border bg-white px-3 py-2 text-sm max-[400px]:text-xs font-medium text-foreground transition-colors hover:text-accent hover:border-accent"
                >
                  Change Template
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Preview Panel - Hidden on mobile */}
        <div className="hidden lg:flex flex-1 overflow-auto bg-slate-300 flex-col lg:p-2">
          <div className="mx-auto w-full flex-1">
            <ResumePreview data={data} />
          </div>
        </div>
      </div>

      {/* Mobile Preview - Below form on small screens */}
      <div className="lg:hidden no-print bg-slate-300 flex flex-col items-center p-2">
        <div className="mx-auto w-full max-w-200">
          <ResumePreview data={data} />
        </div>
      </div>

      {/* Print-only resume: rendered outside no-print so it's visible during print */}
      <div className="hidden print:block">
        <PrintableResume data={data} />
      </div>

      {showModal && (
        <DownloadModal
          onClose={() => setShowModal(false)}
          onDownload={handleDownload}
        />
      )}
      {showResetModal && (
        <ConfirmResetModal
          onClose={() => setShowResetModal(false)}
          onConfirm={handleReset}
        />
      )}
    </>
  );
}

export { MinimalTemplate, CorporateTemplate, ModernTemplate, sampleResumeData };
