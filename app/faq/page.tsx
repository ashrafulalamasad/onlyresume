import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions About OnlyResume',
  description:
    'Get answers to common questions about OnlyResume: how it works, privacy, templates, ATS compatibility, and more.',
  openGraph: {
    title: 'FAQ — Frequently Asked Questions',
    description: 'Get answers to common questions about OnlyResume.',
    url: 'https://onlyresume.vercel.app/faq',
  },
}

const faqs = [
  {
    question: 'Is OnlyResume really free?',
    answer:
      'Yes, OnlyResume is completely free to use. There are no hidden fees, no premium tiers, and no watermarks on your downloaded resume. We believe everyone deserves access to professional resume tools.',
  },
  {
    question: 'Do I need to create an account?',
    answer:
      'No signup or account is required. You can start building your resume immediately. Your data is stored locally in your browser, so it persists between sessions on the same device.',
  },
  {
    question: 'How does OnlyResume generate PDFs?',
    answer:
      'OnlyResume uses your browser\'s built-in print functionality to generate pixel-perfect A4 PDFs. Simply click "Download PDF" and select "Save as PDF" in the print dialog. This approach requires zero external dependencies and works offline.',
  },
  {
    question: 'Are the templates ATS-friendly?',
    answer:
      'Yes. All three templates (Minimal, Corporate, and Modern) are designed with Applicant Tracking Systems in mind. They use clean formatting, standard section headings, and proper document structure to ensure your resume is parsed correctly.',
  },
  {
    question: 'Is my data private and secure?',
    answer:
      'Absolutely. All your resume data is stored exclusively in your browser\'s localStorage. Nothing is sent to any server. Your personal information never leaves your device.',
  },
  {
    question: 'Can I edit my resume after downloading?',
    answer:
      'Yes. Your resume data persists in your browser. Simply return to the builder page, make your changes, and download a new PDF. You can update your resume as many times as you want.',
  },
  {
    question: 'What resume format should I use?',
    answer:
      'For most job seekers, the reverse-chronological format is recommended. It lists your most recent experience first and is the format most familiar to recruiters and ATS systems. All OnlyResume templates follow this proven format.',
  },
  {
    question: 'Can I use OnlyResume on my phone?',
    answer:
      'Yes, OnlyResume is fully responsive and works on mobile devices. You can fill in your resume details on your phone, though we recommend using a desktop or tablet for the best preview and download experience.',
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
            name: 'How to Build a Resume with OnlyResume',
            description: 'Create a professional, ATS-friendly resume in three simple steps using OnlyResume.',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Enter Your Details',
                text: 'Fill in your personal information, work experience, education, and skills using the guided multi-step form.',
              },
              {
                '@type': 'HowToStep',
                name: 'Choose a Template',
                text: 'Select from three premium professional templates: Minimal, Corporate, or Modern.',
              },
              {
                '@type': 'HowToStep',
                name: 'Download as PDF',
                text: 'Click Download PDF to generate a pixel-perfect A4 document ready to send to employers.',
              },
            ],
          }),
        }}
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">Frequently Asked Questions</h1>
          <p className="mt-3 text-base text-foreground sm:mt-4 sm:text-lg">
            Everything you need to know about building your resume with OnlyResume.
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
      </div>
    </>
  )
}
