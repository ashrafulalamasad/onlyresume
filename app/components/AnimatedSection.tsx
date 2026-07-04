"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

type AnimationKind =
  | "fade-up"
  | "fade-in"
  | "scale-in"
  | "slide-left"
  | "slide-right";

interface AnimatedSectionProps {
  as?: ElementType;
  children: ReactNode;
  animation?: AnimationKind;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

export default function AnimatedSection({
  as: Tag = "div",
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
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
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const animationClass = `animate-${animation}`;

  return (
    <Tag
      ref={ref}
      className={`${animationClass} ${isVisible ? "is-visible" : ""} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </Tag>
  );
}
