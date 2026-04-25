import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Ultimate Resume Writing Guide — Tips, Keywords & Best Practices',
  description:
    'Learn how to write a professional resume that beats ATS systems and impresses recruiters. Expert tips on formatting, keywords, and common mistakes to avoid.',
  openGraph: {
    title: 'The Ultimate Resume Writing Guide',
    description: 'Expert tips on formatting, keywords, and common resume mistakes to avoid.',
    url: 'https://onlyresume.vercel.app/guide',
  },
}

export default function GuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <header className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          The Ultimate Guide to Writing a Professional Resume
        </h1>
        <p className="mt-3 text-base text-foreground sm:mt-4 sm:text-lg">
          Everything you need to know to craft a resume that gets interviews in 2025 and beyond.
        </p>
      </header>

      <div className="prose-custom mt-8 space-y-8 text-foreground sm:mt-12 sm:space-y-10">
        <section>
          <h2 className="text-xl font-bold text-primary sm:text-2xl">Why Your Resume Matters More Than Ever</h2>
          <p>
            In today&apos;s competitive job market, your resume is the single most important document in your career toolkit.
            Recruiters spend an average of six to seven seconds scanning a resume before deciding whether to continue reading.
            That means every word, every bullet point, and every formatting choice matters. A well-crafted resume doesn&apos;t
            just list your experience — it tells a compelling story about the value you bring to an organization.
          </p>
          <p>
            Beyond human eyes, your resume must also pass through Applicant Tracking Systems (ATS). These software tools parse
            and rank resumes based on keyword matches, formatting clarity, and structural consistency. An ATS-friendly resume
            uses clean formatting, standard section headings, and strategically placed keywords to ensure it reaches a real person.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary sm:text-2xl">Choosing the Right Resume Format</h2>
          <p>
            There are three primary resume formats, each suited to different career situations:
          </p>
          <h3 className="mt-4 text-xl font-semibold text-primary">Reverse-Chronological</h3>
          <p>
            The most widely used and preferred format. It lists your most recent experience first and works backward. This format
            is ideal if you have a consistent work history and want to showcase career progression. Recruiters and ATS systems are
            most familiar with this layout, making it the safest choice for most job seekers.
          </p>
          <h3 className="mt-4 text-xl font-semibold text-primary">Functional</h3>
          <p>
            This format emphasizes skills over chronological work history. It groups your experience by skill categories rather than
            by job title. While it can be useful for career changers or those with employment gaps, many recruiters view it with
            skepticism because it can obscure your actual work timeline.
          </p>
          <h3 className="mt-4 text-xl font-semibold text-primary">Combination</h3>
          <p>
            As the name suggests, this format blends elements of both chronological and functional resumes. It leads with a skills
            summary, followed by a detailed work history. This works well for experienced professionals with diverse skill sets.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary sm:text-2xl">Essential Sections Every Resume Needs</h2>

          <h3 className="mt-4 text-xl font-semibold text-primary">Contact Information</h3>
          <p>
            Place your full name, professional email address, phone number, and location (city and state) at the top of your resume.
            Include a LinkedIn profile URL if it&apos;s up to date. Avoid including your full street address — city and state are sufficient
            for modern applications.
          </p>

          <h3 className="mt-4 text-xl font-semibold text-primary">Professional Summary</h3>
          <p>
            A two-to-three sentence overview that highlights your most relevant qualifications. This replaces the outdated &quot;Objective&quot;
            statement. Focus on what you bring to the employer, not what you want from them. Use specific numbers and achievements when
            possible: &quot;Senior marketing manager with 8+ years of experience driving 40% year-over-year growth in digital revenue.&quot;
          </p>

          <h3 className="mt-4 text-xl font-semibold text-primary">Work Experience</h3>
          <p>
            For each position, include your job title, company name, dates of employment, and three to five bullet points describing
            your key accomplishments. Start each bullet with a strong action verb — managed, developed, increased, designed, implemented.
            Quantify your achievements wherever possible. Instead of &quot;Responsible for sales,&quot; write &quot;Grew quarterly sales revenue by
            25% through targeted outreach campaigns.&quot;
          </p>

          <h3 className="mt-4 text-xl font-semibold text-primary">Education</h3>
          <p>
            List your degrees in reverse chronological order. Include the institution name, degree type, and graduation date. If you
            graduated within the last three years, you may include your GPA if it&apos;s above 3.5. For experienced professionals, education
            typically goes near the bottom of the resume.
          </p>

          <h3 className="mt-4 text-xl font-semibold text-primary">Skills</h3>
          <p>
            Include a concise list of relevant hard and soft skills. Tailor this section to each job application by incorporating keywords
            from the job description. Separate technical skills (programming languages, tools, certifications) from soft skills (leadership,
            communication, problem-solving).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary sm:text-2xl">How to Beat ATS Systems</h2>
          <p>
            Applicant Tracking Systems reject up to 75% of resumes before a human ever sees them. Here&apos;s how to ensure yours makes it through:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li><strong>Use standard section headings.</strong> Stick with &quot;Work Experience,&quot; &quot;Education,&quot; and &quot;Skills&quot; — not creative alternatives like &quot;My Journey&quot; or &quot;Expertise.&quot;</li>
            <li><strong>Avoid tables, columns, and text boxes.</strong> ATS software often cannot parse complex layouts. Use a single-column or simple two-column design.</li>
            <li><strong>Include keywords from the job posting.</strong> Mirror the exact language the employer uses. If they say &quot;project management,&quot; use that phrase — not just &quot;PM.&quot;</li>
            <li><strong>Save as PDF.</strong> PDF preserves your formatting across all devices and is universally accepted by ATS systems.</li>
            <li><strong>Use standard fonts.</strong> Arial, Calibri, Helvetica, and Times New Roman are all ATS-safe choices.</li>
            <li><strong>Don&apos;t put critical information in headers or footers.</strong> Many ATS tools skip these areas entirely.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary sm:text-2xl">Power Words That Make Your Resume Stand Out</h2>
          <p>
            The verbs you choose set the tone of your resume. Replace weak, passive language with strong action verbs that demonstrate impact:
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {['Achieved', 'Spearheaded', 'Optimized', 'Launched', 'Negotiated', 'Streamlined', 'Mentored', 'Transformed',
              'Orchestrated', 'Delivered', 'Pioneered', 'Exceeded'].map((word) => (
              <span key={word} className="rounded bg-accent/10 px-3 py-1.5 text-center text-sm font-medium text-accent">
                {word}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary sm:text-2xl">Common Resume Mistakes to Avoid</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li><strong>Typos and grammatical errors.</strong> Proofread multiple times. Even one error can disqualify you.</li>
            <li><strong>Using an unprofessional email.</strong> Create a dedicated professional email if needed (firstname.lastname@email.com).</li>
            <li><strong>Including irrelevant experience.</strong> Tailor your resume for each application. A hiring manager doesn&apos;t need to know about your high school summer job if you&apos;re a senior professional.</li>
            <li><strong>Making it too long.</strong> One page for early-career professionals, two pages maximum for experienced candidates. More than two pages is rarely justified.</li>
            <li><strong>Using generic descriptions.</strong> &quot;Hard worker&quot; and &quot;team player&quot; are meaningless without context. Show, don&apos;t tell.</li>
            <li><strong>Inconsistent formatting.</strong> If one job title is bold, they all should be. Consistency signals attention to detail.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary sm:text-2xl">Resume Length: How Long Should It Be?</h2>
          <p>
            The ideal resume length depends on your experience level. Entry-level candidates and recent graduates should aim for a single
            page. Mid-career professionals with five to fifteen years of relevant experience can extend to two pages. Senior executives,
            academics, and highly technical professionals may need additional space, but even then, conciseness is a virtue. Every line
            should earn its place on the page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary sm:text-2xl">Final Checklist Before You Submit</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Does your resume include keywords from the job description?</li>
            <li>Are all dates, titles, and company names accurate?</li>
            <li>Have you quantified at least two achievements per role?</li>
            <li>Is the formatting consistent throughout?</li>
            <li>Have you proofread for spelling and grammar errors?</li>
            <li>Is the file saved as a PDF with a professional filename (e.g., John_Smith_Resume.pdf)?</li>
            <li>Does it pass the six-second scan test — can a recruiter identify your value at a glance?</li>
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-surface p-5 text-center sm:p-6">
          <h2 className="text-xl font-bold text-primary sm:text-2xl">Ready to Build Your Resume?</h2>
          <p className="mt-2">
            Put these tips into action with our free resume builder. No signup required.
          </p>
          <a
            href="/builder"
            className="mt-4 inline-flex h-10 items-center rounded-lg bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
          >
            Start Building Now
          </a>
        </section>
      </div>
    </article>
  )
}
