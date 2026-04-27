import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Resume Writing Guide — Master ATS, Keywords & Professional Formatting for 2025",
  description:
    "Comprehensive guide to writing resumes that pass ATS systems and impress recruiters. Learn formatting, keyword optimization, power verbs, common mistakes, and industry-specific tips.",
  alternates: {
    canonical: "/guide",
  },
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
              "Comprehensive guide to writing resumes that pass ATS systems and impress recruiters. Learn formatting, keyword optimization, power verbs, common mistakes, and industry-specific tips.",
            url: "https://onlyresume.vercel.app/guide",
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
            Master Resume Writing: The Complete 2025 Guide to Getting Past ATS &
            Landing Interviews
          </h1>
          <p className="mt-3 text-base text-foreground sm:mt-4 sm:text-lg">
            Learn proven strategies to craft a resume that defeats Applicant
            Tracking Systems, impresses human recruiters, and wins you job
            interviews.
          </p>
        </header>

        <div className="prose-custom mt-8 space-y-8 text-foreground sm:mt-12 sm:space-y-10">
          <section>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">
              Why Your Resume Is Your Career Breakthrough Tool
            </h2>
            <p>
              Your resume is the gateway to your next opportunity. In a
              competitive job market where recruiters often receive hundreds of
              applications per opening, your resume must accomplish two critical
              tasks: first, it must pass through an Applicant Tracking System
              (ATS) designed to filter applications; second, it must compel a
              human recruiter to pick up the phone and call you.
            </p>
            <p>
              Research shows that recruiters spend an average of just 6-7
              seconds on an initial resume scan. This isn&apos;t enough time to
              read your entire document—it&apos;s barely enough to get a first
              impression. This is why resume strategy matters more than ever.
              Every element, from your formatting choices to your word
              selection, must work in harmony to communicate value quickly and
              effectively.
            </p>
            <p>
              Beyond the human reviewer, your resume must be machine-readable.
              Applicant Tracking Systems use algorithms to parse resume content,
              extract information, and rank candidates based on keyword matches.
              An ATS-unfriendly resume, no matter how impressive, often ends up
              discarded before any human sees it. Studies estimate that ATS
              systems automatically reject up to 75% of applications before a
              human ever reviews them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">
              Understanding Resume Formats: Which One Is Right for You?
            </h2>
            <p>
              Choosing the right resume format sets the foundation for your
              success. Each format serves different career situations and tells
              a different story about your professional journey.
            </p>
            <h3 className="mt-4 text-xl font-semibold text-primary">
              Reverse-Chronological Format: The Recruiter's Favorite
            </h3>
            <p>
              This is the most widely used and most highly recommended format
              for good reason. It lists your most recent position first and
              works backward through your career history. This format clearly
              demonstrates career progression and gives recruiters an immediate
              sense of your current skill level and recent experience.
            </p>
            <p>
              The reverse-chronological format is ideal if you have consistent
              employment with a clear career trajectory. It&apos;s also the
              format most familiar to both ATS systems and human recruiters. If
              you&apos;re uncertain about which format to use, this is almost
              always the safe choice.
            </p>
            <h3 className="mt-4 text-xl font-semibold text-primary">
              Functional Format: Highlighting Skills Over Timeline
            </h3>
            <p>
              The functional format organizes your experience by skill
              categories rather than chronologically. It emphasizes what you can
              do rather than when you did it. This format can be valuable for
              career changers, those with significant employment gaps, or people
              with diverse experiences that don&apos;t fit neatly into a
              traditional timeline.
            </p>
            <h3 className="mt-4 text-xl font-semibold text-primary">
              Combination Format: Blending the Best of Both
            </h3>
            <p>
              The combination format leads with a skills summary, then follows
              with reverse-chronological work history. This approach allows you
              to showcase your strongest qualifications upfront while still
              maintaining the ATS-friendly structure recruiters expect.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">
              Building Your Resume: Section by Section
            </h2>

            <h3 className="mt-4 text-xl font-semibold text-primary">
              Contact Information: Make It Findable
            </h3>
            <p>
              Your contact section sits at the top of your resume and should
              include your full name, professional email address, phone number,
              city/state, and LinkedIn URL (if current and professional). Modern
              best practice does not include your full street address—city and
              state are sufficient.
            </p>

            <h3 className="mt-4 text-xl font-semibold text-primary">
              Professional Summary: Your Value Proposition
            </h3>
            <p>
              A professional summary replaces the outdated &quot;Objective&quot;
              statement. This 2-3 sentence section sits immediately below your
              contact info and articulates your unique value. It answers the
              question: &quot;Why should this company hire me?&quot; Focus on
              what you bring to the employer, not what you want from them.
            </p>

            <h3 className="mt-4 text-xl font-semibold text-primary">
              Work Experience: Quantify, Quantify, Quantify
            </h3>
            <p>
              Your work experience section is the heart of your resume. For each
              position, include your job title, company name, employment dates
              (month and year), and 3-5 bullet points describing your key
              achievements. Begin each bullet with a strong action verb. Most
              importantly, quantify your accomplishments with percentages,
              dollar amounts, or raw numbers.
            </p>

            <h3 className="mt-4 text-xl font-semibold text-primary">
              Education: Degree, School, Dates
            </h3>
            <p>
              List your degrees in reverse chronological order. Include the
              degree type (B.A., B.S., M.B.A.), institution name, and graduation
              date. For recent graduates (within 3 years), include your GPA if
              it&apos;s above 3.5.
            </p>

            <h3 className="mt-4 text-xl font-semibold text-primary">
              Skills: Tailor to the Job
            </h3>
            <p>
              Include 10-15 relevant skills divided into technical skills and
              soft skills. This section is where you incorporate keywords from
              the job description. If the job posting mentions &quot;project
              management,&quot; use that exact phrase—don&apos;t just write
              &quot;PM.&quot;
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">
              Defeating ATS Systems: The Technical Checklist
            </h2>
            <p>
              Applicant Tracking Systems have become gatekeepers in modern
              recruiting. Here&apos;s how to ensure your resume makes it
              through:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Use standard section headings:</strong> Stick with
                recognizable labels like &quot;Work Experience,&quot;
                &quot;Education,&quot; and &quot;Skills.&quot;
              </li>
              <li>
                <strong>Avoid tables, columns, and text boxes:</strong> ATS
                software struggles with complex layouts. Use a simple
                single-column or two-column design.
              </li>
              <li>
                <strong>Mirror job posting language:</strong> If the posting
                says &quot;project management,&quot; use those exact words.
              </li>
              <li>
                <strong>Save as PDF:</strong> PDF is the universally accepted
                format that preserves your formatting.
              </li>
              <li>
                <strong>Use standard fonts:</strong> Arial, Calibri, Helvetica,
                Times New Roman, and Garamond are all ATS-safe.
              </li>
              <li>
                <strong>Place critical info in body text:</strong> Many ATS
                tools skip headers and footers.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">
              Power Words That Command Attention
            </h2>
            <p>
              The language you choose shapes how recruiters perceive your
              accomplishments. Replace weak passive verbs with powerful action
              verbs that demonstrate impact and ownership.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                "Achieved",
                "Spearheaded",
                "Optimized",
                "Launched",
                "Negotiated",
                "Streamlined",
                "Mentored",
                "Transformed",
                "Orchestrated",
                "Delivered",
                "Pioneered",
                "Exceeded",
                "Accelerated",
                "Revolutionized",
                "Elevated",
                "Architected",
              ].map((word) => (
                <span
                  key={word}
                  className="rounded bg-accent/10 px-3 py-1.5 text-center text-sm font-medium text-accent"
                >
                  {word}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">
              Mistakes That Cost You Opportunities
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Spelling and grammar errors:</strong> Even one typo
                signals carelessness. Proofread multiple times.
              </li>
              <li>
                <strong>Unprofessional email address:</strong> If your email
                raises eyebrows, create a new professional one immediately.
              </li>
              <li>
                <strong>Including irrelevant experience:</strong> For senior
                roles, cut the high school summer job. Every line should add
                value.
              </li>
              <li>
                <strong>Excessive length:</strong> One page for entry-level, two
                pages maximum for anyone else.
              </li>
              <li>
                <strong>Vague descriptions:</strong> &quot;Hard worker&quot; and
                &quot;team player&quot; are clichés without evidence.
              </li>
              <li>
                <strong>Inconsistent formatting:</strong> If one job title is
                bold, they all should be.
              </li>
              <li>
                <strong>Using personal pronouns:</strong> Avoid &quot;I,&quot;
                &quot;me,&quot; and &quot;we.&quot; Write &quot;Led a team of
                8&quot; not &quot;I led a team of 8.&quot;
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">
              The Optimal Resume Length
            </h2>
            <p>
              How long should your resume be? Entry-level candidates and recent
              graduates should aim for one page. Mid-career professionals (5-15
              years) typically use two pages. Senior professionals may need
              additional space, but brevity is always preferable. Every line
              must earn its place—ruthlessly cut anything that doesn&apos;t
              demonstrate clear value.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary sm:text-2xl">
              Your Pre-Submit Resume Checklist
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Have I included relevant keywords from the job posting?</li>
              <li>Are all dates, titles, and company names 100% accurate?</li>
              <li>Have I quantified at least two achievements per position?</li>
              <li>
                Is the formatting consistent throughout the entire document?
              </li>
              <li>
                Have I proofread thoroughly for spelling, grammar, and
                punctuation?
              </li>
              <li>Is the file saved as PDF with a professional filename?</li>
              <li>
                Can a recruiter identify my core value in the first 6 seconds?
              </li>
              <li>Have I removed all personal pronouns (I, me, we)?</li>
              <li>Does every bullet point show measurable impact?</li>
            </ul>
          </section>

          <section className="rounded-xl border border-border bg-surface p-5 text-center sm:p-6">
            <h2 className="text-xl font-bold text-primary sm:text-2xl">
              Ready to Build Your Professional Resume?
            </h2>
            <p className="mt-2">
              Apply these proven strategies using our free resume builder.
              Choose from three ATS-friendly templates and download your resume
              instantly.
            </p>
            <a
              href="/builder"
              className="mt-4 inline-flex h-10 items-center rounded-lg bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
            >
              Start Building Your Resume
            </a>
          </section>
        </div>
      </article>
    </>
  );
}
