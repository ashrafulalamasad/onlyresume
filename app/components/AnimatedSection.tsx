"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface AnimatedSectionProps {
  as?: string;
  children: ReactNode;
  animation?: "fade-up" | "fade-in" | "scale-in" | "slide-left" | "slide-right";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

export default function AnimatedSection({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const animationClass = `animate-${animation}`;

  return (
    <div
      ref={ref}
      className={`${animationClass} ${isVisible ? "is-visible" : ""} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  );
}
