import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHeader } from "../components/PageHero";
import AnimatedSection from "../components/AnimatedSection";
import {
  Shield,
  Lock,
  Zap,
  Award,
  Users,
  Globe,
  Download,
  Check,
  Heart,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About OnlyResume — Our Mission & Story",
  description:
    "Learn about OnlyResume: a free, privacy-first resume builder with no login required. Discover why we built it and our commitment to accessibility.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About OnlyResume — Our Mission & Story",
    description:
      "Learn about our mission to make professional resume building free and accessible to everyone.",
    url: "https://onlyresume.vercel.app/about",
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

const values = [
  {
    icon: <Award className="h-6 w-6" />,
    title: "Accessibility",
    description:
      "Everyone deserves a professional resume. Cost should never be a barrier.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Privacy",
    description:
      "Your data is yours. We won't track, sell, or exploit your information.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Simplicity",
    description:
      "Resume building should be straightforward, not overwhelming.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Quality",
    description:
      "Professional templates and ATS-friendly design matter for real career outcomes.",
  },
];

const differentiators = [
  {
    icon: <Download className="h-6 w-6" />,
    title: "Completely Free",
    description:
      "No hidden charges. No premium tiers. No watermarks on your PDF. Build unlimited resumes and download as many PDFs as you want.",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Privacy First",
    description:
      "All resume information is stored exclusively in your browser's localStorage. Nothing is sent to our servers. No tracking. No data sharing.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "No Login Required",
    description:
      "Start building immediately. No account creation. No password management. No email verification.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "ATS-Friendly Templates",
    description:
      "Our 20 professionally designed templates are engineered to pass Applicant Tracking Systems. Your resume will reach human recruiters.",
  },
];

const timeline = [
  {
    step: "01",
    title: "Your data stays on your device",
    desc: "No server storage. Your resume information never leaves your browser.",
  },
  {
    step: "02",
    title: "Works offline",
    desc: "Build your resume anywhere, anytime. No internet connection required after first load.",
  },
  {
    step: "03",
    title: "Fast and responsive",
    desc: "Optimized for all devices. No delays waiting for server responses.",
  },
  {
    step: "04",
    title: "Zero server dependencies",
    desc: "Everything happens client-side. No accounts, no databases, no tracking.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        id="json-ld-article-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "About OnlyResume — Our Mission & Story",
            description:
              "Learn about OnlyResume: a free, privacy-first resume builder with no login required. Discover why we built it and our commitment to accessibility.",
            url: "https://onlyresume.vercel.app/about",
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
          }).replace(/</g, "\u003c"),
        }}
      />

      <PageHero
        eyebrow="Our Story"
        title={
          <>
            We believe everyone deserves a{" "}
            <span className="text-accent">professional resume</span>
          </>
        }
        description="OnlyResume was built with a single mission: to make professional resume building completely free and accessible to everyone."
      />

      {/* Mission Manifesto */}
      <section className="border-y border-border bg-surface py-12 sm:py-16">
        <AnimatedSection animation="fade-up" as="div">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="text-lg font-medium leading-relaxed text-foreground sm:text-xl">
              Too many resume builders hide behind paywalls, require
              subscriptions, or collect your personal data. We thought that was
              wrong. So we built OnlyResume — a tool that puts you first.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* The Problem */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <AnimatedSection animation="fade-up" as="div">
          <SectionHeader
            align="left"
            eyebrow="The Problem"
            title="Why we needed something better"
            description="Traditional resume builders come with strings attached. Here is what we kept hearing from job seekers just like you."
          />
        </AnimatedSection>

        <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2">
          {[
            {
              title: "Hidden costs",
              text: "Premium features locked behind paywalls when job searching is already expensive enough.",
            },
            {
              title: "Privacy concerns",
              text: "Your personal information sold to third parties or used for marketing without consent.",
            },
            {
              title: "Complicated workflows",
              text: "Signing up for accounts just to build a simple resume. Unnecessary friction.",
            },
            {
              title: "Poor design",
              text: "Resume templates that look pretty but fail Applicant Tracking Systems, hurting your chances.",
            },
          ].map((item, i) => (
            <AnimatedSection
              key={item.title}
              animation="fade-up"
              delay={i * 100}
              as="div"
            >
              <div className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-primary">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground sm:text-base">
                    {item.text}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="bg-surface py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatedSection animation="fade-up" as="div">
            <SectionHeader
              eyebrow="What Makes Us Different"
              title="Built different from the ground up"
              description="We created OnlyResume to solve every problem with traditional resume builders. Here is what sets us apart."
            />
          </AnimatedSection>

          <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item, i) => (
              <AnimatedSection
                key={item.title}
                animation="fade-up"
                delay={i * 100}
                as="div"
              >
                <div className="h-full rounded-2xl border border-border bg-background p-6 transition-all hover:border-accent/30 hover:shadow-lg sm:p-8">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform hover:scale-110">
                    {item.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <AnimatedSection animation="fade-up" as="div">
          <SectionHeader
            eyebrow="Our Values"
            title="The principles that guide everything we do"
          />
        </AnimatedSection>

        <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2">
          {values.map((value, i) => (
            <AnimatedSection
              key={value.title}
              animation="slide-left"
              delay={i * 100}
              as="div"
            >
              <div className="flex gap-4 rounded-xl border border-border bg-surface p-5 sm:p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground sm:text-base">
                    {value.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Timeline: Our Principles */}
      <section className="bg-surface py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <AnimatedSection animation="fade-up" as="div">
            <SectionHeader
              eyebrow="How It Works"
              title="Built for privacy, speed, and simplicity"
              description="OnlyResume is a progressive web application built with modern technologies. It runs entirely in your browser."
            />
          </AnimatedSection>

          <div className="relative mt-10 sm:mt-12">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 h-full w-px bg-border sm:left-6" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <AnimatedSection
                  key={item.step}
                  animation="slide-right"
                  delay={i * 150}
                  as="div"
                >
                  <div className="relative flex items-start gap-4 pl-12 sm:gap-6 sm:pl-16">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-sm sm:h-12 sm:w-12 sm:text-base">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-primary sm:text-lg">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-foreground sm:text-base">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 20 Templates Promo */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <AnimatedSection animation="scale-in" as="div">
          <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-8 text-center sm:p-12 lg:p-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Download className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              20 Professional Templates
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground sm:text-base">
              From Minimal and Corporate to Creative and Technical — explore 20
              carefully crafted, ATS-friendly resume templates. Switch between
              them instantly without losing your data.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/templates"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-8 text-sm font-semibold text-white transition-colors hover:bg-accent/90 sm:text-base"
              >
                Browse All Templates
              </Link>
              <Link
                href="/builder"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-surface px-8 text-sm font-semibold text-primary transition-colors hover:bg-background sm:text-base"
              >
                Start Building Now
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* CTA */}
      <section className="bg-surface py-12 sm:py-16 lg:py-20">
        <AnimatedSection animation="fade-up" as="div">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              Ready to Build Your Resume?
            </h2>
            <p className="mt-4 text-base text-foreground sm:text-lg">
              Experience the easiest, most private way to create a professional
              resume. No signup. No payment. Just results.
            </p>
            <Link
              href="/builder"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-accent px-8 text-sm font-semibold text-white transition-colors hover:bg-accent/90 sm:text-base"
            >
              Start Building Your Resume
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
