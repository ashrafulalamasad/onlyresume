import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHeader } from "./components/PageHero";
import AnimatedSection from "./components/AnimatedSection";
import {
  Check,
  ChevronRight,
  Download,
  FileText,
  Lock,
  Shield,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "OnlyResume | 100% Free Resume Builder - No Login Required",
  description:
    "Build a professional, ATS-friendly resume in minutes. No sign-up, no credit card, always free. Instant PDF download with 20+ modern templates. Privacy-focused CV maker.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "OnlyResume | 100% Free Resume Builder - No Login Required",
    description:
      "Build a professional, ATS-friendly resume in minutes. No sign-up, no credit card, always free. Instant PDF download with modern templates.",
    url: "https://onlyresume.vercel.app",
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

const stats = [
  { value: "20+", label: "Templates" },
  { value: "100%", label: "Free" },
  { value: "No", label: "Signup" },
  { value: "ATS", label: "Optimized" },
];

const features = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Completely Free",
    description:
      "No hidden fees, no premium tiers. Build and download your resume at zero cost. Always free, forever.",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "No Signup Required",
    description:
      "Start building immediately. Your data stays in your browser — private and secure. No login, no account.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "ATS-Friendly Templates",
    description:
      "20 clean, structured layouts that pass Applicant Tracking Systems with ease. Engineered for recruiters.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Instant PDF Download",
    description: "Export a pixel-perfect A4 PDF with a single click. No watermarks, no delays, no extra software.",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "20+ Templates",
    description:
      "From Minimal and Corporate to Creative and Technical. Every style for every industry and career level.",
  },
  {
    icon: <Download className="h-6 w-6" />,
    title: "No Watermarks",
    description:
      "Your PDF is completely clean and unbranded. Just a professional resume ready to send to employers.",
  },
];

const steps = [
  {
    step: "01",
    title: "Fill in Your Details",
    description:
      "Enter your personal info, experience, education, and skills using our guided form. Your data stays private.",
  },
  {
    step: "02",
    title: "Pick from 20 Templates",
    description:
      "Choose a design that fits your industry and personality. Switch anytime without losing data.",
  },
  {
    step: "03",
    title: "Download as PDF",
    description:
      "Export a pixel-perfect A4 PDF with a single click. No watermarks, no third-party services.",
  },
];

const templateCategories = [
  "Minimal",
  "Corporate",
  "Modern",
  "Creative",
  "Technical",
  "Executive",
  "Academic",
  "ATS",
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  return (
    <div
      className="stagger-item rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/20 hover:shadow-lg sm:p-8"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
        {feature.icon}
      </div>
      <h3 className="mt-5 text-lg font-bold text-primary">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
        {feature.description}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Free Resume Builder"
        title={
          <>
            Build Your Professional Resume{" "}
            <span className="text-accent">In Minutes, Not Hours</span>
          </>
        }
        description="Create a polished, ATS-friendly resume with our free online builder. No signup required, no downloads needed, no watermarks. Just a beautiful resume ready to land your next job."
        ctas={[
          {
            label: "Start Building — It's Free",
            href: "/builder",
            variant: undefined,
          },
          { label: "Browse 20 Templates", href: "/templates", variant: "ghost" },
        ]}
      />

      {/* Stats Bar */}
      <section className="border-y border-border bg-surface py-8 sm:py-10">
        <AnimatedSection animation="scale-in" as="div">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-extrabold text-accent sm:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-foreground sm:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatedSection animation="fade-up" as="div">
            <SectionHeader
              eyebrow="Why Choose OnlyResume"
              title="Everything you need in a resume builder"
              description="No compromises. No hidden costs. Just a powerful, private, and completely free resume-building experience."
            />
          </AnimatedSection>

          <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <AnimatedSection
                key={f.title}
                animation="fade-up"
                delay={i * 80}
                as="div"
              >
                <FeatureCard feature={f} index={i} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section className="bg-surface py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatedSection animation="fade-up" as="div">
            <SectionHeader
              eyebrow="20+ Templates"
              title="A template for every career and personality"
              description="From minimal and corporate to creative and technical — explore a diverse collection of ATS-friendly resume templates designed for every industry."
            />
          </AnimatedSection>

          <div className="mt-10 flex flex-wrap justify-center gap-3 sm:mt-12">
            {templateCategories.map((cat, i) => (
              <AnimatedSection
                key={cat}
                animation="scale-in"
                delay={i * 50}
                as="span"
              >
                <span className="inline-block rounded-full border border-border bg-background px-5 py-2 text-sm font-semibold text-primary transition-all hover:border-accent/30 hover:shadow-sm">
                  {cat}
                </span>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-10 text-center">
            <AnimatedSection animation="fade-up" delay={200} as="div">
              <Link
                href="/templates"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-8 text-sm font-semibold text-white transition-colors hover:bg-accent/90 sm:text-base"
              >
                Browse All 20+ Templates
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatedSection animation="fade-up" as="div">
            <SectionHeader
              eyebrow="How It Works"
              title="Three simple steps to your perfect resume"
            />
          </AnimatedSection>

          <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-3 sm:gap-8">
            {steps.map((s, i) => (
              <AnimatedSection
                key={s.step}
                animation="fade-up"
                delay={i * 150}
                as="div"
              >
                <div className="relative rounded-2xl border border-border bg-surface p-6 text-center transition-all hover:border-accent/20 hover:shadow-lg sm:p-8">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-base font-bold text-white sm:h-16 sm:w-16 sm:text-lg">
                    {s.step}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
                    {s.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Social Proof */}
      <section className="bg-surface py-12 sm:py-16 lg:py-20">
        <AnimatedSection animation="fade-up" as="div">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              <Star className="h-3.5 w-3.5" />
              Trusted by Job Seekers Worldwide
            </div>
            <h2 className="mt-4 text-2xl font-bold text-primary sm:text-3xl">
              Built for privacy. Designed for results.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-foreground sm:text-lg">
              OnlyResume has helped thousands of job seekers create
              professional resumes — no cost, no signup, no compromise.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {[
                "No Credit Card",
                "No Watermarks",
                "No Data Collection",
                "No Account Needed",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-primary">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* SEO Content */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="space-y-10">
          <AnimatedSection animation="fade-up" as="div">
            <div>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                The Instant Resume Builder for Job Seekers
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground">
                OnlyResume is your complete instant CV maker and professional
                resume builder, designed to help job seekers create compelling
                applications in minutes. Whether you are a recent graduate
                building your first student resume, an experienced software
                developer crafting a technical CV, or a career-changer looking
                for a fresh start, our free online resume builder provides
                everything you need.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" as="div">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <h3 className="text-lg font-bold text-primary">
                  Why You Need an ATS-Friendly Resume
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground sm:text-base">
                  In today&apos;s competitive job market, your resume is often
                  your first impression. Modern recruiting relies heavily on
                  Applicant Tracking Systems. Our 20 professionally designed
                  ATS-friendly resume templates ensure your qualifications
                  reach human recruiters.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <h3 className="text-lg font-bold text-primary">
                  Free with Zero Hidden Costs
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground sm:text-base">
                  Unlike competing resume makers that charge premium fees,
                  OnlyResume is completely free. No credit card required, no
                  premium tiers, no hidden charges. Build unlimited resumes and
                  download unlimited PDFs at zero cost.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" as="div">
            <div>
              <h3 className="text-xl font-bold text-primary">
                20 Premium Resume Templates for Every Career Path
              </h3>
              <p className="mt-3 text-base leading-relaxed text-foreground">
                Our versatile resume maker works for every profession. Choose
                from Minimal, Corporate, Modern, Academic, ATS, Bold, Compact,
                Creative, Elegant, Emerald, Executive, Geometric, Grid, Sidebar
                Right, Slate, Split, Technical, Timeline, Two Column, and Warm
                templates. Each template adapts perfectly to highlight your
                unique qualifications.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-surface py-12 sm:py-16 lg:py-20">
        <AnimatedSection animation="scale-in" as="div">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              Ready to Land Your Dream Job?
            </h2>
            <p className="mt-4 text-base text-foreground sm:text-lg">
              Join thousands of job seekers who built their winning resume with
              OnlyResume. Create your professional CV today, completely free, no
              signup required.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/builder"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-8 text-sm font-semibold text-white transition-colors hover:bg-accent/90 sm:text-base"
              >
                Create Your Resume Now
              </Link>
              <Link
                href="/templates"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-surface px-8 text-sm font-semibold text-primary transition-colors hover:bg-background sm:text-base"
              >
                View Templates
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
