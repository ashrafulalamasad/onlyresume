import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../components/PageHero";
import AnimatedSection from "../components/AnimatedSection";
import { FileText, UserCheck, Info, Brain, Shield, AlertTriangle, Phone, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the terms and conditions for using OnlyResume, the free online resume builder.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service — OnlyResume",
    description: "Read the terms and conditions for using OnlyResume.",
    url: "https://onlyresume.vercel.app/terms",
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

const terms = [
  {
    id: "1",
    title: "Acceptance of Terms",
    icon: <FileText className="h-5 w-5" />,
    content:
      "By accessing and using OnlyResume (onlyresume.vercel.app), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our service.",
  },
  {
    id: "2",
    title: "Description of Service",
    icon: <Info className="h-5 w-5" />,
    content:
      "OnlyResume provides a free, browser-based resume builder that allows users to create, customize, and download professional resumes. The service operates entirely client-side, with all data stored in your browser's localStorage.",
  },
  {
    id: "3",
    title: "User Responsibilities",
    icon: <UserCheck className="h-5 w-5" />,
    content:
      "You are solely responsible for the accuracy of the information you enter into your resume. OnlyResume does not verify, validate, or endorse any content you create using our service. You agree not to use the service for any unlawful purpose.",
  },
  {
    id: "4",
    title: "Intellectual Property",
    icon: <Brain className="h-5 w-5" />,
    content:
      "The OnlyResume website, including its design, code, and content (excluding user-generated resume content), is the intellectual property of OnlyResume. You retain full ownership of all content you create using our service.",
  },
  {
    id: "5",
    title: "No Warranty",
    icon: <AlertTriangle className="h-5 w-5" />,
    content:
      "OnlyResume is provided 'as is' and 'as available' without any warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, error-free, or that it will meet your specific requirements.",
  },
  {
    id: "6",
    title: "Limitation of Liability",
    icon: <Shield className="h-5 w-5" />,
    content:
      "In no event shall OnlyResume be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the service. This includes loss of data or any damages resulting from reliance on the service.",
  },
  {
    id: "7",
    title: "Third-Party Content",
    icon: <Globe className="h-5 w-5" />,
    content:
      "OnlyResume may display third-party advertisements. We are not responsible for the content, accuracy, or practices of any third-party websites or services linked through advertisements.",
  },
  {
    id: "8",
    title: "Modifications",
    icon: <FileText className="h-5 w-5" />,
    content:
      "We reserve the right to modify or discontinue the service at any time, with or without notice. We may also update these Terms of Service from time to time. Continued use of the service constitutes acceptance of any changes.",
  },
  {
    id: "9",
    title: "Governing Law",
    icon: <Phone className="h-5 w-5" />,
    content:
      "These Terms of Service shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms or the use of OnlyResume shall be resolved through appropriate legal channels.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Terms of <span className="text-accent">Service</span>
          </>
        }
        description="By using OnlyResume, you agree to the following terms. We've kept them simple, clear, and easy to understand."
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <AnimatedSection animation="fade-up">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-foreground">
              Last updated: <span className="font-semibold text-primary">April 25, 2026</span>
            </p>
            <span className="w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
              20 Templates Available
            </span>
          </div>
        </AnimatedSection>

        <div className="space-y-6">
          {terms.map((term, i) => (
            <AnimatedSection
              key={term.id}
              animation="fade-up"
              delay={i * 80}
            >
              <div className="group rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/20 hover:shadow-md sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
                    {term.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-primary sm:text-xl">
                      {term.id}. {term.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
                      {term.content}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="scale-in" delay={200}>
          <div className="mt-12 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-6 sm:p-10">
            <h3 className="text-xl font-bold text-primary sm:text-2xl">
              Summary
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground sm:text-base">
              OnlyResume is completely free to use. You own your resume content.
              Your data stays in your browser. We don't collect, store, or share
              your personal information. If you have questions about these terms,
              feel free to reach out.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/privacy"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-surface px-6 text-sm font-semibold text-primary transition-colors hover:bg-background"
              >
                View Privacy Policy
              </Link>
              <Link
                href="/builder"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
              >
                Start Building
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </>
  );
}
