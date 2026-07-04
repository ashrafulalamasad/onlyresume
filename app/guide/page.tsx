import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHeader } from "../components/PageHero";
import AnimatedSection from "../components/AnimatedSection";
import {
  BookOpen,
  Check,
  FileText,
  Lightbulb,
  Shield,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "Resume Writing Guide — Master ATS, Keywords & Professional Formatting for 2025",
  description:
    "Comprehensive guide to writing resumes that pass ATS systems and impress recruiters. Learn formatting, keyword optimization, power verbs, common mistakes, and industry-specific tips.",
  alternates: { canonical: "/guide" },
  openGraph: {
    title: "The Complete Resume Writing Guide — Beat ATS & Land Interviews",
    description:
      "Expert strategies for writing ATS-friendly resumes that get past applicant tracking systems and land interviews.",
    url: "https://onlyresume.vercel.app/guide",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "OnlyResume - Free Resume Builder",
      },
    ],
  },
};

const quickNav = [
  { label: "Resume Formats", href: "#formats", icon: <FileText className="h-5 w-5" /> },
  { label: "Section by Section", href: "#sections", icon: <BookOpen className="h-5 w-5" /> },
  { label: "ATS Checklist", href: "#ats", icon: <Check className="h-5 w-5" /> },
  { label: "Power Words", href: "#power-words", icon: <Sparkles className="h-5 w-5" /> },
  { label: "Common Mistakes", href: "#mistakes", icon: <Lightbulb className="h-5 w-5" /> },
  { label: "Final Checklist", href: "#checklist", icon: <Shield className="h-5 w-5" /> },
];

const powerWords = [
  "Achieved", "Spearheaded", "Optimized", "Launched", "Negotiated",
  "Streamlined", "Mentored", "Transformed", "Orchestrated", "Delivered",
  "Pioneered", "Exceeded", "Accelerated", "Revolutionized", "Elevated",
  "Architected", "Simplified", "Unified", "Amplified", "Maximized",
];

export default function GuidePage() {
  return (
    <>
      <script
        id="json-ld-article-guide"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Master Resume Writing: The Complete 2025 Guide to Getting Past ATS & Landing Interviews",
            description:
              "Comprehensive guide to writing resumes that pass ATS systems and impress recruiters.",
            url: "https://onlyresume.vercel.app/guide",
            image: "https://onlyresume.vercel.app/opengraph-image.png",
            datePublished: "2026-04-25",
            dateModified: "2026-04-25",
            author: { "@type": "Organization", name: "OnlyResume" },
            publisher: {
              "@type": "Organization",
              name: "OnlyResume",
              logo: {
                "@type": "ImageObject",
                url: "https://onlyresume.vercel.app/icon.png",
              },
            },
          }),
        }}
      />

      <PageHero
        eyebrow="Resume Mastery"
        title={
          <>
            The complete guide to{" "}
            <span className="text-accent">ATS-winning resumes</span>
          </>
        }
        description="Learn proven strategies to craft a resume that defeats Applicant Tracking Systems, impresses human recruiters, and wins you job interviews."
      />

      {/* Quick Nav */}
      <section className="border-y border-border bg-surface py-8 sm:py-10">
        <AnimatedSection animation="fade-up" as="div">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-accent">
              Jump to section
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {quickNav.map((item, i) => (
                <AnimatedSection
                  key={item.href}
                  animation="scale-in"
                  delay={i * 60}
                  as="div"
                  className="inline-block"
                >
                  <Link
                    href={item.href}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-background p-3 transition-all hover:border-accent/30 hover:shadow-md sm:p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center vinegarred-lg bg-accent/10 text-accent">
                      {item.icon}
                    </div>
                    <span className="text-xs font-semibold text-primary sm:text-sm">
                      {item.label}
                    </span>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        {/* Why Your Resume Matters */}
        <AnimatedSection animation="fade-up" as="div">
          <section id="intro" className="scroll-mt-24">
            <SectionHeader
              align="left"
              title="Why your resume is your career breakthrough tool"
            />
            <div className="mt-6 space-y-4 text-foreground">
              <p className="leading-relaxed">
                Your resume is the gateway to your next opportunity. In a competitive job market where recruiters often receive hundreds of applications per opening, your resume must accomplish two critical tasks: first, it must pass through an Applicant Tracking System (ATS); second, it must compel a human recruiter to pick up the phone.
              </p>
              <p className="leading-relaxed">
                Research shows that recruiters spend an average of just 6-7 seconds on an initial resume scan. This is not enough time to read your entire document — it is barely enough to get a first impression. This is why resume strategy matters more than ever.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { label: "ATS reject rate", value: "75%" },
                { label: "Avg scan time", value: "6-7 sec" },
                { label: "Pages for mid-career", value: "2 max" },
                { label: "Templates available", value: "20" },
              ].map((stat) => (
                <AnimatedSection
                  key={stat.label}
                  animation="scale-in"
                  delay={100}
                  as="div"
                >
                  <div className="rounded-xl border border-border bg-surface p-4 text-center">
                    <div className="text-2xl font-extrabold text-accent">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-foreground">
                      {stat.label}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Resume Formats */}
        <AnimatedSection animation="fade-up" as="div">
          <section id="formats" className="scroll-mt-24 pt-12 sm:pt-16">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                Resume Formats
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Reverse-Chronological Format: The Recruiter's Favorite",
                  desc: "The most widely used and most highly recommended format. It lists your most recent position first and works backward through your career history.",
                  bestFor: "Ideal if you have consistent employment with a clear career trajectory.",
                  tag: "Recommended",
                },
                {
                  title: "Functional Format: Highlighting Skills Over Timeline",
                  desc: "Organizes your experience by skill categories rather than chronologically. Emphasizes what you can do rather than when you did it.",
                  bestFor: "Career changers, those with employment gaps, or people with diverse experiences.",
                  tag: null,
                },
                {
                  title: "Combination Format: Blending the Best of Both",
                  desc: "Leads with a skills summary, then follows with reverse-chronological work history.",
                  bestFor: "Mid-career professionals looking to emphasize specific skill sets.",
                  tag: null,
                },
              ].map((format, i) => (
                <AnimatedSection
                  key={format.title}
                  animation="fade-up"
                  delay={i * 100}
                  as="div"
                >
                  <div className="relative rounded-2xl border border-border bg-surface p-6 sm:p-8">
                    {format.tag && (
                      <span className="absolute right-4 top-4 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                        {format.tag}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-primary sm:text-xl">
                      {format.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-foreground">
                      {format.desc}
                    </p>
                    <p className="mt-3 text-sm font-medium italic text-foreground/80">
                      {format.bestFor}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Section by Section */}
        <AnimatedSection animation="fade-up" as="div">
          <section id="sections" className="scroll-mt-24 pt-12 sm:pt-16">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <BookOpen className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                Building Your Resume Section by Section
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Contact Information: Make It Findable",
                  desc: "Your contact section sits at the top and should include your full name, professional email, phone number, city/state, and LinkedIn URL.",
                },
                {
                  title: "Professional Summary: Your Value Proposition",
                  desc: "A professional summary replaces the outdated 'Objective' statement. This 2-3 sentence section articulates your unique value.",
                },
                {
                  title: "Work Experience: Quantify, Quantify, Quantify",
                  desc: "Your work experience section is the heart of your resume. For each position, include your job title, company name, dates, and 3-5 bullet points.",
                },
                {
                  title: "Education: Degree, School, Dates",
                  desc: "List your degrees in reverse chronological order. Include the degree type, institution name, and graduation date.",
                },
                {
                  title: "Skills: Tailor to the Job",
                  desc: "Include 10-15 relevant skills. This is where you incorporate keywords from the job description.",
                },
              ].map((section, i) => (
                <AnimatedSection
                  key={section.title}
                  animation="fade-up"
                  delay={i * 80}
                  as="div"
                >
                  <div className="rounded-xl border border-border bg-surface p-5 transition-all hover:border-accent/20 sm:p-6">
                    <h3 className="text-base font-bold text-primary sm:text-lg">
                      {section.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
                      {section.desc}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* ATS Checklist */}
        <AnimatedSection animation="fade-up" as="div">
          <section id="ats" className="scroll-mt-24 pt-12 sm:pt-16">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Check className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                Defeating ATS Systems
              </h2>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <p className="leading-relaxed text-foreground">
                Applicant Tracking Systems have become gatekeepers in modern recruiting. Here is the technical checklist to ensure your resume passes through:
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  "Use standard section headings like 'Work Experience' and 'Education'",
                  "Avoid tables, columns, and text boxes — they confuse ATS",
                  "Mirror job posting language exactly for keyword matching",
                  "Save as PDF — universally accepted and preserves formatting",
                  "Use standard fonts: Arial, Calibri, Helvetica, Times New Roman",
                  "Place critical info in body text — headers/footers may be skipped",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check className="h-3 w-3" />
                    </div>
                    <p className="text-sm text-foreground sm:text-base">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Power Words */}
        <AnimatedSection animation="fade-up" as="div">
          <section id="power-words" className="scroll-mt-24 pt-12 sm:pt-16">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                Power Words That Command Attention
              </h2>
            </div>

            <p className="leading-relaxed text-foreground">
              The language you choose shapes how recruiters perceive your accomplishments. Replace weak passive verbs with powerful action verbs that demonstrate impact and ownership.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
              {powerWords.map((word) => (
                <span
                  key={word}
                  className="rounded-lg bg-accent/10 px-3 py-2 text-center text-sm font-semibold text-accent transition-colors hover:bg-accent/20"
                >
                  {word}
                </span>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Mistakes */}
        <AnimatedSection animation="fade-up" as="div">
          <section id="mistakes" className="scroll-mt-24 pt-12 sm:pt-16">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Lightbulb className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                Mistakes That Cost Opportunities
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { title: "Spelling and grammar errors", desc: "Even one typo signals carelessness. Proofread multiple times." },
                { title: "Unprofessional email address", desc: "If your email raises eyebrows, create a new professional one immediately." },
                { title: "Including irrelevant experience", desc: "For senior roles, cut the high school summer job. Every line should add value." },
                { title: "Excessive length", desc: "One page for entry-level, two pages maximum for anyone else." },
                { title: "Vague descriptions", desc: "'Hard worker' and 'team player' are cliches without evidence." },
                { title: "Inconsistent formatting", desc: "If one job title is bold, they all should be." },
              ].map((mistake, i) => (
                <AnimatedSection
                  key={mistake.title}
                  animation="slide-left"
                  delay={i * 80}
                  as="div"
                >
                  <div className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5 transition-all hover:border-accent/20 sm:p-6">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                      <span className="text-sm font-bold">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary">
                        {mistake.title}
                      </h3>
                      <p className="mt-1 text-sm text-foreground sm:text-base">
                        {mistake.desc}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Final Checklist */}
        <AnimatedSection animation="fade-up" as="div">
          <section id="checklist" className="scroll-mt-24 pt-12 sm:pt-16">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Shield className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                Your Pre-Submit Checklist
              </h2>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Included relevant keywords from the job posting",
                  "All dates, titles, and company names 100% accurate",
                  "Quantified at least two achievements per position",
                  "Formatting consistent throughout the entire document",
                  "Proofread thoroughly for spelling and grammar",
                  "File saved as PDF with a professional filename",
                  "Core value identifiable in the first 6 seconds",
                  "All personal pronouns (I, me, we) removed",
                  "Every bullet point shows measurable impact",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-accent/30 text-accent">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-sm text-foreground sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* 20 Templates Note */}
        <AnimatedSection animation="scale-in" as="div">
          <div className="mt-12 rounded-2xl border border-accent/20 bg-accent/5 p-6 text-center sm:p-8">
            <p className="text-base font-semibold text-primary sm:text-lg">
              Put this guide into practice with any of our 20 ATS-friendly resume templates
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/templates"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
              >
                Browse Templates
              </Link>
              <Link
                href="/builder"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-surface px-6 text-sm font-semibold text-primary transition-colors hover:bg-background"
              >
                Open Builder
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </>
  );
}
