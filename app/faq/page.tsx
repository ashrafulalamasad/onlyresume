import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ — Common Questions About Free Resume Building & ATS Templates',
  description:
    'Answers to frequently asked questions: Is OnlyResume free? Do I need an account? How does the PDF download work? Privacy, templates, ATS compatibility, and more explained.',
  openGraph: {
    title: 'FAQ — Your Questions About OnlyResume Answered',
    description: 'Get answers about pricing, privacy, account requirements, ATS compatibility, and how to use our resume builder.',
    url: 'https://onlyresume.vercel.app/faq',
  },
}

const faqs = [
  {
    question: 'Is OnlyResume truly 100% free with no hidden costs?',
    answer:
      'Yes, OnlyResume is completely free from start to finish. There are no hidden fees, no premium tiers, no subscription plans, and no watermarks on your downloaded resume. You can build unlimited resumes, download as many PDFs as you need, and make unlimited edits—all at zero cost. We believe professional resume-building tools should be accessible to everyone without financial barriers.',
  },
  {
    question: 'Why is there no signup or login required?',
    answer:
      'We built OnlyResume to prioritize your privacy and reduce friction. No account means no password management, no data collection on external servers, and no tracking. Your resume data is stored exclusively in your browser\'s localStorage on your device. This approach keeps your personal information completely private while letting you start building immediately.',
  },
  {
    question: 'How does OnlyResume generate and download PDFs?',
    answer:
      'OnlyResume leverages your browser\'s built-in print functionality to generate pixel-perfect A4 PDFs. When you click "Download PDF," the resume preview opens in print mode. Select "Save as PDF" from your browser\'s print dialog, and you\'re done. This approach requires zero external services, works offline, and preserves all formatting perfectly.',
  },
  {
    question: 'Are all three OnlyResume templates truly ATS-friendly?',
    answer:
      'Absolutely. All three templates (Classic/Minimal, Corporate Sidebar, and Modern Header) are engineered with Applicant Tracking Systems in mind. They use clean, single-column or simple two-column layouts, standard section headings, plain fonts, and proper document structure. This ensures your resume passes through ATS parsing without issues and reaches human recruiters intact.',
  },
  {
    question: 'How secure is my personal resume data?',
    answer:
      'Your data security is paramount. All resume information is stored exclusively in your browser\'s localStorage—nothing is transmitted to any server, ever. Your email, phone number, employment history, and all personal details remain on your device. We don\'t use analytics tracking, cookies for data collection, or any third-party data sharing. Your resume is yours alone.',
  },
  {
    question: 'Can I update and re-download my resume after the first time?',
    answer:
      'Yes, absolutely. Your resume data persists in your browser\'s localStorage between sessions. You can return to the builder page, update any information, switch templates, and download a new PDF as many times as needed. There\'s no limit to edits or downloads. Simply update and download whenever your experience changes or you want to tailor your resume for a specific job.',
  },
  {
    question: 'Which resume format should I choose for my industry?',
    answer:
      'For most job seekers, the reverse-chronological format is ideal. It lists your most recent experience first, clearly showing career progression, and is the format most recognizable to recruiters and ATS systems. This is the format used by all OnlyResume templates. For career changers or those with employment gaps, you might consider combining reverse-chronological with a brief skills summary at the top.',
  },
  {
    question: 'Is OnlyResume mobile-friendly and works on phones?',
    answer:
      'Yes, OnlyResume is fully responsive and works across all devices—phones, tablets, and desktops. You can enter your resume details on your smartphone or tablet while on the go. However, for the best experience viewing your resume preview, editing multiple sections efficiently, and downloading PDFs, we recommend using a laptop or desktop computer.',
  },
  {
    question: 'How do I handle employment gaps on my OnlyResume?',
    answer:
      'Employment gaps are common and don\'t need to be hidden. Use the dates honestly in your work experience section. If the gap is significant, consider adding a brief note in your professional summary or in a specific role description explaining what you were doing (e.g., continued education, health reasons, career transition). Many employers understand and appreciate transparency.',
  },
  {
    question: 'Can I include a photo on my resume?',
    answer:
      'While OnlyResume templates don\'t include a dedicated photo section, including a professional headshot is generally not recommended for most industries in the US, as it can introduce unconscious bias. However, for creative fields, acting, modeling, or international applications, a photo may be appropriate. You can add one by uploading an image in your browser and inserting it into your resume file after download if needed.',
  },
]

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Build a Free Professional Resume with OnlyResume',
            description: 'Create an ATS-friendly resume in three simple steps using our free, no-login resume builder.',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Enter Your Information',
                text: 'Fill in your personal details, work experience, education, skills, and certifications using our intuitive guided form. No account needed.',
              },
              {
                '@type': 'HowToStep',
                name: 'Select a Professional Template',
                text: 'Choose from three premium, ATS-friendly templates: Classic, Corporate, or Modern. Preview each template instantly.',
              },
              {
                '@type': 'HowToStep',
                name: 'Download Your PDF Resume',
                text: 'Click Download PDF to generate a pixel-perfect A4 PDF ready to send to employers. No watermarks, completely free.',
              },
            ],
          }),
        }}
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Common Questions About Building Your Free Resume
          </h1>
          <p className="mt-3 text-base text-foreground sm:mt-4 sm:text-lg">
            Everything you need to know about OnlyResume: pricing, privacy, features, and how to get the most out of your resume.
          </p>
        </div>

        <div className="mt-8 space-y-4 sm:mt-12 sm:space-y-6">
          {faqs.map((faq, i) => (
            <section key={i} className="rounded-xl border border-border bg-surface p-4 sm:p-6">
              <h2 className="text-base font-semibold text-primary sm:text-lg">{faq.question}</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{faq.answer}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-xl border-2 border-accent/20 bg-accent/5 p-6 text-center sm:mt-16">
          <h2 className="text-lg font-bold text-primary">Didn&apos;t find your answer?</h2>
          <p className="mt-2 text-sm text-foreground">
            Check out our comprehensive resume writing guide for more tips on optimizing your resume for success.
          </p>
          <a
            href="/guide"
            className="mt-4 inline-flex h-10 items-center rounded-lg bg-accent px-6 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
          >
            Read the Guide
          </a>
        </div>
      </div>
    </>
  )
}
