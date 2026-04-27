import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About OnlyResume — Our Mission & Story",
  description:
    "Learn about OnlyResume: a free, privacy-first resume builder with no login required. Discover why we built it and our commitment to accessibility.",
  alternates: {
    canonical: "/about",
  },
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
            author: {
              "@type": "Organization",
              name: "OnlyResume",
            },
            publisher: {
              "@type": "Organization",
              name: "OnlyResume",
              logo: {
                "@type": "ImageObject",
                url: "https://onlyresume.vercel.app/icon.png",
              },
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            About OnlyResume
          </h1>
          <p className="mt-3 text-base text-foreground sm:mt-4 sm:text-lg">
            Free, Private, and Accessible Resume Building for Everyone
          </p>
        </header>

        <div className="prose-custom mt-8 space-y-8 text-foreground sm:mt-12 sm:space-y-10">
          <section>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">
              Our Mission
            </h2>
            <p>
              OnlyResume was built with a single mission: to make professional
              resume building completely free and accessible to everyone. We
              believe that creating a polished, ATS-friendly resume should never
              cost money or require you to surrender your privacy.
            </p>
            <p>
              Too many resume builders hide behind paywalls, require
              subscriptions, or collect your personal data. We thought that was
              wrong. So we built OnlyResume—a tool designed for job seekers,
              students, and career changers who deserve better.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">
              Why We Started
            </h2>
            <p>
              Job hunting is already stressful enough. The last thing you need
              is to worry about:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Hidden costs:</strong> Premium features locked behind
                paywalls when job searching is expensive
              </li>
              <li>
                <strong>Privacy concerns:</strong> Your personal information
                sold to third parties or used for marketing
              </li>
              <li>
                <strong>Complicated workflows:</strong> Signing up for accounts
                just to build a resume
              </li>
              <li>
                <strong>Poor design:</strong> Resume templates that don't pass
                Applicant Tracking Systems (ATS)
              </li>
            </ul>
            <p className="mt-4">
              We created OnlyResume to solve every one of these problems.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">
              What Makes Us Different
            </h2>

            <h3 className="mt-4 text-lg font-semibold text-primary">
              ✓ Completely Free
            </h3>
            <p>
              No hidden charges. No premium tiers. No watermarks on your PDF.
              Build unlimited resumes and download as many PDFs as you
              want—always at zero cost.
            </p>

            <h3 className="mt-4 text-lg font-semibold text-primary">
              ✓ Privacy First
            </h3>
            <p>
              Your data belongs to you. All resume information is stored
              exclusively in your browser's localStorage. Nothing is sent to our
              servers. No tracking. No data sharing. Your information stays
              completely private.
            </p>

            <h3 className="mt-4 text-lg font-semibold text-primary">
              ✓ No Login Required
            </h3>
            <p>
              Start building immediately. No account creation. No password
              management. No email verification. Just open the site and start
              building your resume.
            </p>

            <h3 className="mt-4 text-lg font-semibold text-primary">
              ✓ ATS-Friendly Templates
            </h3>
            <p>
              Our three professionally designed templates—Minimal, Corporate,
              and Modern—are engineered to pass Applicant Tracking Systems. Your
              resume will reach human recruiters, not get filtered out by
              robots.
            </p>

            <h3 className="mt-4 text-lg font-semibold text-primary">
              ✓ Instant PDF Download
            </h3>
            <p>
              Export a pixel-perfect A4 PDF with a single click. No external
              services. No delays. Your PDF is ready to email to employers
              immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">
              Our Values
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <strong>Accessibility:</strong> Everyone deserves a professional
                resume. Cost should never be a barrier.
              </li>
              <li>
                <strong>Privacy:</strong> Your data is yours. We won't track,
                sell, or exploit your information.
              </li>
              <li>
                <strong>Simplicity:</strong> Resume building should be
                straightforward, not overwhelming with unnecessary features.
              </li>
              <li>
                <strong>Quality:</strong> Professional templates and
                ATS-friendly design matter for real career outcomes.
              </li>
              <li>
                <strong>Transparency:</strong> We're clear about what we do, how
                we work, and what happens to your data.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">
              How OnlyResume Works
            </h2>
            <p>
              OnlyResume is a progressive web application built with modern
              technologies. It runs entirely in your browser, which means:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Your data stays on your device (no server storage)</li>
              <li>It works offline (build your resume anywhere)</li>
              <li>It's fast and responsive on all devices</li>
              <li>No delays waiting for server responses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">
              Who Built This?
            </h2>
            <p>
              OnlyResume was built by a team of developers and designers who
              believe in accessible technology. We're passionate about helping
              people advance their careers without unnecessary friction or cost.
            </p>
          </section>

          <section className="rounded-xl border border-border bg-surface p-5 text-center sm:p-6">
            <h2 className="text-xl font-bold text-primary sm:text-2xl">
              Ready to Build Your Resume?
            </h2>
            <p className="mt-2">
              Experience the easiest, most private way to create a professional
              resume. No signup. No payment. Just results.
            </p>
            <Link
              href="/builder"
              className="mt-4 inline-flex h-10 items-center rounded-lg bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
            >
              Start Building Your Resume
            </Link>
          </section>
        </div>
      </article>
    </>
  );
}
