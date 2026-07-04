import type { Metadata } from "next";
import { PageHero } from "../components/PageHero";
import AnimatedSection from "../components/AnimatedSection";
import { FaqAccordion } from "./FaqAccordion";
import type { FaqGroup } from "./FaqAccordion";
import { HelpCircle, MessageCircle, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ — Common Questions About Free Resume Building & ATS Templates",
  description:
    "Answers to frequently asked questions: Is OnlyResume free? Do I need an account? How does the PDF download work? Privacy, the 20 templates, ATS compatibility, and more.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ — Your Questions About OnlyResume Answered",
    description:
      "Get answers about pricing, privacy, account requirements, ATS compatibility, templates, and how to use our resume builder.",
    url: "https://onlyresume.vercel.app/faq",
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

const groups: FaqGroup[] = [
  {
    category: "Getting started",
    items: [
      {
        question: "Is OnlyResume truly 100% free with no hidden costs?",
        answer:
          "Yes — OnlyResume is completely free from start to finish. There are no hidden fees, no premium tiers, no subscription plans, and no watermarks on your downloaded resume. You can build unlimited resumes, download as many PDFs as you need, and make unlimited edits, all at zero cost.",
      },
      {
        question: "Why is there no signup or login required?",
        answer:
          "We built OnlyResume to prioritize your privacy and reduce friction. No account means no password management, no data collection on external servers, and no tracking.",
      },
      {
        question: "Is OnlyResume mobile-friendly and does it work on phones?",
        answer:
          "Yes — OnlyResume is fully responsive and works across all devices: phones, tablets, and desktops.",
      },
    ],
  },
  {
    category: "Templates & design",
    items: [
      {
        question: "How many resume templates are available?",
        answer:
          "OnlyResume ships with 20 professionally designed resume templates covering every major style: Minimal, Corporate, Modern, Academic, ATS, Bold, Compact, Creative, Elegant, Emerald, Executive, Geometric, Grid, Sidebar Right, Slate, Split, Technical, Timeline, Two Column, and Warm.",
      },
      {
        question: "Are the templates ATS-friendly?",
        answer:
          "Absolutely. All 20 templates are engineered with Applicant Tracking Systems in mind. They use clean single-column or simple two-column layouts, standard section headings, plain fonts, and proper document structure.",
      },
      {
        question: "Can I switch templates after starting my resume?",
        answer:
          "Yes. Your data is decoupled from the template, so you can browse the 20 templates, try each one, and settle on the one you like.",
      },
      {
        question: "Which template should I choose for my industry?",
        answer:
          "For most job seekers, the Minimal, ATS, or Corporate templates are safe choices. Tech professionals tend to prefer Modern, Technical, Slate, or Geometric. Creative fields suit Bold, Creative, Warm, or Elegant. Executive-level candidates get the most from Sidebar Right, Executive, or Two Column.",
      },
    ],
  },
  {
    category: "PDF export & printing",
    items: [
      {
        question: "How does OnlyResume generate and download PDFs?",
        answer:
          "OnlyResume leverages your browser's built-in print functionality to generate pixel-perfect A4 PDFs. When you click 'Download PDF,' the resume preview opens in print mode.",
      },
      {
        question: "Can I update and re-download my resume later?",
        answer:
          "Yes, absolutely. Your resume data persists in your browser's localStorage between sessions. You can update any information and download a new PDF as many times as needed.",
      },
      {
        question: "Will there be a watermark on the PDF?",
        answer:
          "Never. OnlyResume does not add a watermark, footer, branding, or any other mark to your exported PDF.",
      },
    ],
  },
  {
    category: "Privacy & data",
    items: [
      {
        question: "How secure is my personal resume data?",
        answer:
          "Your data security is paramount. All resume information is stored exclusively in your browser's localStorage — nothing is transmitted to any server, ever.",
      },
      {
        question: "What happens if I clear my browser data?",
        answer:
          "Clearing site data (including localStorage) permanently removes your resume from your device. Because your data is never stored on our servers, we cannot recover it.",
      },
      {
        question: "Do you collect analytics on what I write?",
        answer:
          "No. We use Vercel Analytics and Speed Insights only for anonymous, aggregate page performance metrics.",
      },
    ],
  },
  {
    category: "Resume writing help",
    items: [
      {
        question: "How do I handle employment gaps on my resume?",
        answer:
          "Employment gaps are common and don't need to be hidden. Use the dates honestly in your work experience section.",
      },
      {
        question: "Can I include a photo on my resume?",
        answer:
          "While OnlyResume templates don't include a dedicated photo section, including a professional headshot is generally not recommended for most industries in the US.",
      },
      {
        question: "Where can I learn how to write a stronger resume?",
        answer:
          "Read our free /guide for a comprehensive walkthrough of resume formats, ATS optimization, power verbs, and more.",
      },
    ],
  },
];

export default function FAQPage() {
  const totalQuestions = groups.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: groups.flatMap((g) =>
              g.items.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              }))
            ),
          }),
        }}
      />

      <PageHero
        eyebrow="Frequently Asked Questions"
        title={
          <>
            Everything you need to know about{" "}
            <span className="text-accent">OnlyResume</span>
          </>
        }
        description="Pricing, privacy, the 20 templates, ATS formatting, PDF export — quick answers to the questions we hear most often from job seekers."
      />

      {/* Stats Bar */}
      <section className="border-y border-border bg-surface py-6 sm:py-8">
        <AnimatedSection animation="scale-in">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-accent" />
                <span className="text-sm font-semibold text-foreground">
                  {totalQuestions} Questions Answered
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-accent" />
                <span className="text-sm font-semibold text-foreground">
                  {groups.length} Categories
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-accent" />
                <span className="text-sm font-semibold text-foreground">
                  20 Templates
                </span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Accordion */}
      <section className="mx-auto max-w-4xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:pb-24">
        <AnimatedSection animation="fade-up">
          <FaqAccordion groups={groups} />
        </AnimatedSection>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 sm:pb-24">
        <AnimatedSection animation="scale-in" delay={150}>
          <div className="overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-8 text-center sm:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Didn&apos;t find your answer?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-foreground sm:mt-4 sm:text-base">
              Read our comprehensive resume writing guide for in-depth advice on
              formatting, ATS optimization, and section strategy.
            </p>
            <a
              href="/guide"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-accent px-7 text-sm font-semibold text-white shadow-sm shadow-accent/20 transition-colors hover:bg-accent/90 sm:text-base"
            >
              Read the resume guide
            </a>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
