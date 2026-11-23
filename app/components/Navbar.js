"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignUpButton from "./SignUpButton";
import { api, clearSession, sessionDashboardPath, subscribeToSession } from "../lib/api";

const serverSession = () => null;
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const profilePath = useSyncExternalStore(subscribeToSession, sessionDashboardPath, serverSession);
  const signedIn = profilePath === null ? null : Boolean(profilePath);
  const pathname = usePathname();

  async function signOut() {
    setSigningOut(true);
    try {
      await api("/auth/logout", { method: "POST" });
    } catch {
      // Clear the local session even if the server cannot revoke it.
    } finally {
      clearSession();
      window.location.replace("/account");
    }
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isFormPage =
    pathname.startsWith("/onboarding") || pathname === "/contact";

  const navLinks = isFormPage ? [] : [{ label: "Creators", href: "/creators" }];
  if (profilePath) navLinks.push({ label: "Profile", href: profilePath });

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1100] transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/60 py-3.5"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-accent-blue flex items-center justify-center shadow-lg shadow-accent-blue/25 group-hover:shadow-accent-blue/50 transition-all duration-300 group-hover:scale-105">
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
          <span className="text-xl font-bold tracking-tight text-white transition-colors duration-300">
            Space<span className="text-accent-blue">bar</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="text-sm font-medium text-white/70 hover:text-white aria-[current=page]:text-white transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-accent-blue after:transition-all after:duration-300 hover:after:w-full aria-[current=page]:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {signedIn ? (
            <button type="button" onClick={signOut} disabled={signingOut} className="h-[44px] px-5 flex items-center text-sm font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 disabled:opacity-50">Sign out</button>
          ) : signedIn === false && <>
            <a href="/account" className="h-[44px] px-5 flex items-center text-sm font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-colors">Login</a>
            <a
              href="/contact"
              className="h-[44px] px-5 flex items-center text-sm font-medium text-white/90 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-accent-blue/50 hover:text-white rounded-xl transition-all duration-200 shadow-sm"
            >
              Book a Demo
            </a>
            <SignUpButton className="h-[44px] px-5 flex items-center justify-center gap-2 text-sm font-medium text-white bg-accent-blue rounded-xl hover:bg-accent-blue-hover shadow-lg shadow-accent-blue/20 transition-colors duration-200" />
          </>}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 text-white"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[2px] bg-white transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-white transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-white transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen
            ? "max-h-[500px] opacity-100 bg-zinc-950/95 backdrop-blur-2xl border-t border-white/10 mt-3.5"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-3 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="text-base font-medium text-white/80 hover:text-white aria-[current=page]:text-accent-blue py-2 transition-colors duration-200"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
            {signedIn ? (
              <button type="button" onClick={signOut} disabled={signingOut} className="h-[48px] flex items-center justify-center text-sm font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 disabled:opacity-50">Sign out</button>
            ) : signedIn === false && <>
              <a href="/account" onClick={() => setMobileOpen(false)} className="h-[48px] flex items-center justify-center text-sm font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10">Login</a>
              <a
                href="/contact"
                className="h-[48px] flex items-center justify-center text-sm font-semibold text-white bg-white/5 border border-white/15 rounded-xl hover:bg-white/10 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Book a Demo
              </a>
              <div className="space-y-3">
                <div className="text-xs font-semibold text-white/40 uppercase tracking-wider px-2">
                  Sign up
                </div>
                <a
                  href="/account?mode=signup&type=business&next=%2Fonboarding%2Fbrand"
                  className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-blue/15 flex items-center justify-center text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-all duration-300">
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
                    <div className="text-sm font-bold text-white">
                      I&apos;m a brand
                    </div>
                    <div className="text-[12px] text-accent-blue font-medium leading-tight mt-0.5">
                      Connect with creators
                    </div>
                  </div>
                </a>
                <a
                  href="/account?mode=signup&type=creator&next=%2Fonboarding%2Fcreator"
                  className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-blue/15 flex items-center justify-center text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-all duration-300">
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
                    <div className="text-sm font-bold text-white">
                      I&apos;m a creator
                    </div>
                    <div className="text-[12px] text-accent-blue font-medium leading-tight mt-0.5">
                      Monetize your content
                    </div>
                  </div>
                </a>
              </div>
            </>}
          </div>
        </div>
      </div>
    </nav>
  );
}



