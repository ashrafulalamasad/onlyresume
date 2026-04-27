import type { Metadata } from "next";
import BuilderClient from "./BuilderClient";

export const metadata: Metadata = {
  title: "Resume Builder — Create Your Professional Resume",
  description:
    "Build your professional, ATS-friendly resume with our free online builder. Fill in your details, choose a template, customize your design, and download a pixel-perfect PDF instantly. No signup required, completely private.",
  alternates: {
    canonical: "/builder",
  },
  openGraph: {
    title: "Resume Builder — Create Your Professional Resume",
    description:
      "Build your professional resume for free. No signup required, no credit card needed.",
    url: "https://onlyresume.vercel.app/builder",
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

export default function BuilderPage() {
  return <BuilderClient />;
}
