import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the terms and conditions for using OnlyResume, the free online resume builder.",
  alternates: {
    canonical: "/terms",
  },
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

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-foreground">
        Last updated: April 25, 2026
      </p>

      <div className="mt-10 space-y-8 text-foreground">
        <section>
          <h2 className="text-xl font-bold text-primary">
            1. Acceptance of Terms
          </h2>
          <p className="mt-2 leading-relaxed">
            By accessing and using OnlyResume (onlyresume.vercel.app), you agree
            to be bound by these Terms of Service. If you do not agree with any
            part of these terms, please do not use our service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary">
            2. Description of Service
          </h2>
          <p className="mt-2 leading-relaxed">
            OnlyResume provides a free, browser-based resume builder that allows
            users to create, customize, and download professional resumes. The
            service operates entirely client-side, with all data stored in your
            browser&apos;s localStorage.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary">
            3. User Responsibilities
          </h2>
          <p className="mt-2 leading-relaxed">
            You are solely responsible for the accuracy of the information you
            enter into your resume. OnlyResume does not verify, validate, or
            endorse any content you create using our service. You agree not to
            use the service for any unlawful purpose.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary">
            4. Intellectual Property
          </h2>
          <p className="mt-2 leading-relaxed">
            The OnlyResume website, including its design, code, and content
            (excluding user-generated resume content), is the intellectual
            property of OnlyResume. You retain full ownership of all content you
            create using our service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary">5. No Warranty</h2>
          <p className="mt-2 leading-relaxed">
            OnlyResume is provided &quot;as is&quot; and &quot;as
            available&quot; without any warranties of any kind, either express
            or implied. We do not guarantee that the service will be
            uninterrupted, error-free, or that it will meet your specific
            requirements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary">
            6. Limitation of Liability
          </h2>
          <p className="mt-2 leading-relaxed">
            In no event shall OnlyResume be liable for any direct, indirect,
            incidental, special, or consequential damages arising out of or in
            connection with your use of the service. This includes, without
            limitation, loss of data or any damages resulting from reliance on
            the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary">
            7. Third-Party Content
          </h2>
          <p className="mt-2 leading-relaxed">
            OnlyResume may display third-party advertisements. We are not
            responsible for the content, accuracy, or practices of any
            third-party websites or services linked through advertisements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary">8. Modifications</h2>
          <p className="mt-2 leading-relaxed">
            We reserve the right to modify or discontinue the service at any
            time, with or without notice. We may also update these Terms of
            Service from time to time. Continued use of the service constitutes
            acceptance of any changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary">9. Governing Law</h2>
          <p className="mt-2 leading-relaxed">
            These Terms of Service shall be governed by and construed in
            accordance with applicable laws. Any disputes arising from these
            terms or the use of OnlyResume shall be resolved through appropriate
            legal channels.
          </p>
        </section>
      </div>
    </div>
  );
}
