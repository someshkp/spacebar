"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SignUpButton from "./SignUpButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isFormPage = pathname.startsWith("/onboarding") || pathname === "/contact";

  const navLinks = isFormPage ? [] : [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1100] transition-all duration-300 ${
        scrolled ? "glass-card shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-accent-blue flex items-center justify-center shadow-lg shadow-accent-blue/20 group-hover:shadow-accent-blue/40 transition-shadow duration-300">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span
            className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-primary-black" : "text-white"
            }`}
          >
            Space<span className="text-accent-blue">bar</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent-blue after:transition-all after:duration-300 hover:after:w-full ${
                scrolled
                  ? "text-text-gray hover:text-primary-black"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/contact"
            className={`h-[44px] px-5 flex items-center text-sm font-medium border rounded-xl transition-all duration-200 shadow-sm ${
              scrolled
                ? "text-text-gray border-border-gray hover:border-accent-blue hover:text-accent-blue"
                : "text-white border-white/20 hover:bg-white/10"
            }`}
          >
            Book a Demo
          </a>
          <SignUpButton />
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border-gray"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[2px] bg-primary-black transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-primary-black transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-primary-black transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base font-medium text-text-gray hover:text-primary-black py-2 transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-4 pt-4 border-t border-border-gray">
            <a
              href="/contact"
              className="h-[48px] flex items-center justify-center text-sm font-semibold text-primary-black border border-border-gray rounded-xl hover:bg-light-gray transition-colors"
            >
              Book a Demo
            </a>
            <div className="space-y-3">
              <div className="text-xs font-semibold text-text-gray uppercase tracking-wider px-2">
                Sign up
              </div>
              <a
                href="/onboarding/brand"
                className="flex items-center gap-4 p-3 rounded-2xl bg-light-gray group"
                onClick={() => setMobileOpen(false)}
              >
                <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-primary-black">
                    I'm a brand
                  </div>
                  <div className="text-[12px] text-accent-blue font-medium leading-tight mt-0.5">
                    Connect with creators
                  </div>
                </div>
              </a>
              <a
                href="/onboarding/creator"
                className="flex items-center gap-4 p-3 rounded-2xl bg-light-gray group"
                onClick={() => setMobileOpen(false)}
              >
                <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-primary-black">
                    I'm a creator
                  </div>
                  <div className="text-[12px] text-accent-blue font-medium leading-tight mt-0.5">
                    Monetize your content
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
