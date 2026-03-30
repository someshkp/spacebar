"use client";

import { useEffect, useRef } from "react";

export default function AnimateOnScroll({ children, className = "", animation = "animate-fade-in-up", delay = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animation);
            if (delay) entry.target.classList.add(delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [animation, delay]);

  return (
    <div ref={ref} className={`stagger-item ${className}`}>
      {children}
    </div>
  );
}
