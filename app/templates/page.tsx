import type { Metadata } from "next";
import TemplatesPageClient from "./TemplatesPageClient";

export const metadata: Metadata = {
  title: "Resume Templates — Choose Your Professional Design",
  description:
    "Choose from 20 ATS-friendly resume templates. Each template is fully customizable and optimized for applicant tracking systems. Preview all designs and start building your resume.",
  alternates: {
    canonical: "/templates",
  },
  openGraph: {
    title: "Resume Templates — 20 Professional Designs",
    description:
      "Pick from 20 professionally designed, ATS-friendly resume templates and start building your perfect resume today.",
    url: "https://onlyresume.vercel.app/templates",
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

export default function TemplatesPage() {
  return <TemplatesPageClient />;
}
