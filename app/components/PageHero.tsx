import type { ReactNode } from "react";
import Link from "next/link";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  ctas?: { label: string; href: string; variant?: "primary" | "ghost" }[];
  decor?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  align = "center",
  ctas,
  decor = true,
}: PageHeroProps) {
  const wrapperAlign =
    align === "center"
      ? "items-center text-center"
      : "items-start text-left";
  const maxW = align === "center" ? "max-w-3xl" : "max-w-4xl";

  return (
    <section className="relative overflow-hidden">
      {decor && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--accent)/0.10,transparent_55%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[120%] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
          />
        </>
      )}

      <div className={`mx-auto flex max-w-6xl flex-col px-4 pt-16 pb-10 sm:px-6 sm:pt-20 sm:pb-12 lg:pt-24 lg:pb-16 ${wrapperAlign}`}>
        {eyebrow && (
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </span>
        )}
        <h1 className={`text-3xl font-extrabold tracking-tight text-primary sm:text-4xl lg:text-5xl ${maxW}`}>
          {title}
        </h1>
        {description && (
          <p className={`mt-4 text-base text-foreground sm:mt-5 sm:text-lg ${maxW}`}>
            {description}
          </p>
        )}
        {ctas && ctas.length > 0 && (
          <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:gap-4">
            {ctas.map((cta) =>
              cta.variant === "ghost" ? (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="inline-flex h-12 w-full items-center justify-center rounded-lg border border-border bg-surface px-6 text-sm font-semibold text-primary transition-colors hover:bg-background sm:w-auto sm:text-base"
                >
                  {cta.label}
                </Link>
              ) : (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-accent px-6 text-sm font-semibold text-white shadow-sm shadow-accent/20 transition-colors hover:bg-accent/90 sm:w-auto sm:text-base"
                >
                  {cta.label}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  return (
    <div className={`flex flex-col ${isCenter ? "items-center text-center" : "items-start text-left"}`}>
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-base text-foreground sm:mt-4 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
