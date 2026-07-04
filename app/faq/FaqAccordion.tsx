"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";

export type FaqGroup = {
  category: string;
  items: { question: string; answer: string }[];
};

type Props = {
  groups: FaqGroup[];
};

export function FaqAccordion({ groups }: Props) {
  const [openKey, setOpenKey] = useState<string | null>(
    groups[0]?.items[0] ? `${groups[0].category}-0` : null
  );
  const [search, setSearch] = useState("");

  const toggle = (key: string) => {
    setOpenKey((cur) => (cur === key ? null : key));
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return groups;
    const term = search.toLowerCase();
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (i) =>
            i.question.toLowerCase().includes(term) ||
            i.answer.toLowerCase().includes(term)
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [groups, search]);

  const totalQuestions = groups.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <div className="space-y-10 sm:space-y-14">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/50" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions…"
          className="h-12 w-full rounded-xl border border-border bg-surface pl-12 pr-4 text-sm text-primary shadow-sm outline-none transition-all placeholder:text-foreground/50 focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {/* Results count */}
      {search.trim() && (
        <p className="text-sm text-foreground">
          Found{" "}
          <span className="font-semibold text-primary">
            {filtered.reduce((acc, g) => acc + g.items.length, 0)}
          </span>{" "}
          of {totalQuestions} questions
        </p>
      )}

      {filtered.map((group) => (
        <section key={group.category}>
          <div className="mb-4 flex items-center gap-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-accent">
              {group.category}
            </h2>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-3">
            {group.items.map((item, idx) => {
              const key = `${group.category}-${idx}`;
              const isOpen = openKey === key;
              return (
                <div
                  key={key}
                  className={`overflow-hidden rounded-xl border bg-surface transition-all duration-300 ${
                    isOpen
                      ? "border-accent/40 shadow-lg shadow-accent/5 ring-1 ring-accent/20"
                      : "border-border hover:border-accent/30"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    aria-expanded={isOpen}
                    aria-controls={`${key}-panel`}
                    id={`${key}-trigger`}
                    className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors sm:px-6 sm:py-5"
                  >
                    <span className="text-base font-semibold text-primary sm:text-lg">
                      {item.question}
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "border-accent bg-accent text-white"
                          : "border-border text-foreground group-hover:border-accent/50 group-hover:text-accent"
                      }`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>
                  <div
                    id={`${key}-panel`}
                    role="region"
                    aria-labelledby={`${key}-trigger`}
                    className={`grid overflow-hidden transition-all duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-foreground sm:px-6 sm:pb-6 sm:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-border bg-surface py-16 text-center">
          <Search className="mx-auto h-10 w-10 text-foreground/30" />
          <p className="mt-4 text-lg font-semibold text-primary">
            No results for &ldquo;{search}&rdquo;
          </p>
          <p className="mt-1 text-sm text-foreground">
            Try searching with different keywords.
          </p>
        </div>
      )}
    </div>
  );
}

export default FaqAccordion;
