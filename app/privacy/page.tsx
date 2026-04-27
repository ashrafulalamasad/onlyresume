import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how OnlyResume handles your data. All resume data is stored locally in your browser — nothing is sent to any server.",
  alternates: {
    canonical: "/privacy",
  },
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

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-foreground">
        Last updated: April 25, 2026
      </p>

      <div className="mt-10 space-y-8 text-foreground">
        <section>
          <h2 className="text-xl font-bold text-primary">1. Overview</h2>
          <p className="mt-2 leading-relaxed">
            OnlyResume (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
            operates the website at onlyresume.vercel.app. We are committed to
            protecting your privacy. This Privacy Policy explains how we handle
            your information when you use our service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary">2. Data We Collect</h2>
          <p className="mt-2 leading-relaxed">
            OnlyResume is designed with privacy as a core principle. All resume
            data you enter — including personal information, work experience,
            education, and skills — is stored exclusively in your browser&apos;s
            localStorage. We do not collect, transmit, or store any of your
            resume data on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary">
            3. Cookies and Tracking
          </h2>
          <p className="mt-2 leading-relaxed">
            OnlyResume does not use cookies for tracking purposes. We may use
            essential cookies required for the website to function properly.
            Third-party advertising partners may use cookies and similar
            technologies to serve relevant advertisements. Please refer to their
            respective privacy policies for more information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary">
            4. Third-Party Services
          </h2>
          <p className="mt-2 leading-relaxed">
            We may display advertisements through third-party advertising
            networks. These services may collect anonymous usage data in
            accordance with their own privacy policies. We encourage you to
            review the privacy policies of any third-party services you interact
            with.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary">5. Data Security</h2>
          <p className="mt-2 leading-relaxed">
            Since all resume data is stored locally on your device, you have
            full control over your information. You can clear your data at any
            time by clearing your browser&apos;s localStorage or using the clear
            function within the application.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary">
            6. Children&apos;s Privacy
          </h2>
          <p className="mt-2 leading-relaxed">
            OnlyResume is not directed at children under 13. We do not knowingly
            collect personal information from children under 13. If you believe
            we have inadvertently collected such information, please contact us
            immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary">
            7. Changes to This Policy
          </h2>
          <p className="mt-2 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated revision date. Your
            continued use of OnlyResume after any changes constitutes acceptance
            of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-primary">8. Contact Us</h2>
          <p className="mt-2 leading-relaxed">
            If you have questions or concerns about this Privacy Policy, please
            reach out to us through our website.
          </p>
        </section>
      </div>
    </div>
  );
}
