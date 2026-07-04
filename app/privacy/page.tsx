import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../components/PageHero";
import AnimatedSection from "../components/AnimatedSection";
import { Shield, Lock, Server, Trash2, Users, FileText, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how OnlyResume handles your data. All resume data is stored locally in your browser — nothing is sent to any server.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy — OnlyResume",
    description: "Learn how OnlyResume handles your data.",
    url: "https://onlyresume.vercel.app/privacy",
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

const policies = [
  {
    id: "1",
    title: "Overview",
    icon: <FileText className="h-5 w-5" />,
    content:
      "OnlyResume (we, our, or us) operates the website at onlyresume.vercel.app. We are committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use our service.",
  },
  {
    id: "2",
    title: "Data We Collect",
    icon: <Shield className="h-5 w-5" />,
    content:
      "OnlyResume is designed with privacy as a core principle. All resume data you enter — including personal information, work experience, education, and skills — is stored exclusively in your browser's localStorage. We do not collect, transmit, or store any of your resume data on our servers.",
  },
  {
    id: "3",
    title: "Cookies and Tracking",
    icon: <Lock className="h-5 w-5" />,
    content:
      "OnlyResume does not use cookies for tracking purposes. We may use essential cookies required for the website to function properly. Third-party advertising partners may use cookies and similar technologies to serve relevant advertisements.",
  },
  {
    id: "4",
    title: "Third-Party Services",
    icon: <Server className="h-5 w-5" />,
    content:
      "We may display advertisements through third-party advertising networks. These services may collect anonymous usage data in accordance with their own privacy policies. We encourage you to review the privacy policies of any third-party services you interact with.",
  },
  {
    id: "5",
    title: "Data Security",
    icon: <Lock className="h-5 w-5" />,
    content:
      "Since all resume data is stored locally on your device, you have full control over your information. You can clear your data at any time by clearing your browser's localStorage or using the clear function within the application.",
  },
  {
    id: "6",
    title: "Children's Privacy",
    icon: <Users className="h-5 w-5" />,
    content:
      "OnlyResume is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately.",
  },
  {
    id: "7",
    title: "Changes to This Policy",
    icon: <FileText className="h-5 w-5" />,
    content:
      "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Your continued use of OnlyResume after any changes constitutes acceptance of the updated policy.",
  },
  {
    id: "8",
    title: "Contact Us",
    icon: <Mail className="h-5 w-5" />,
    content:
      "If you have questions or concerns about this Privacy Policy, please reach out to us through our website.",
  },
];

const badges = [
  { label: "No Data Collection", icon: <Shield className="h-5 w-5" /> },
  { label: "Local Storage Only", icon: <Lock className="h-5 w-5" /> },
  { label: "Your Data, Your Device", icon: <Server className="h-5 w-5" /> },
  { label: "Clear Anytime", icon: <Trash2 className="h-5 w-5" /> },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Your Data, Your Control"
        title={
          <>
            Privacy <span className="text-accent">Policy</span>
          </>
        }
        description="OnlyResume is built with privacy as a core principle. Learn how we handle your data — and why we never collect it in the first place."
      />

      {/* Trust Badges */}
      <section className="border-y border-border bg-surface py-8 sm:py-10">
        <AnimatedSection animation="fade-in">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {badges.map((badge, i) => (
                <AnimatedSection
                  key={badge.label}
                  animation="scale-in"
                  delay={i * 100}
                >
                  <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                      {badge.icon}
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      {badge.label}
                    </span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

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
          {policies.map((policy, i) => (
            <AnimatedSection
              key={policy.id}
              animation="fade-up"
              delay={i * 80}
            >
              <div className="group rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/20 hover:shadow-md sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
                    {policy.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-primary sm:text-xl">
                      {policy.id}. {policy.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
                      {policy.content}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </>
  );
}
