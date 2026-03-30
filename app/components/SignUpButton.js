"use client";

import { useState, useRef, useEffect } from "react";

export default function SignUpButton({ 
  children, 
  className, 
  dropdownFullWidth = false, 
  isFullHero = false,
  id
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const defaultClasses = "h-[52px] px-6 flex items-center gap-2 text-sm font-medium text-white bg-accent-blue rounded-xl hover:bg-accent-blue-hover shadow-lg shadow-accent-blue/20 hover:shadow-accent-blue/40 transition-all duration-200 hover:-translate-y-[1px]";

  return (
    <div className={`relative ${isFullHero ? "w-full sm:w-auto" : ""}`} ref={dropdownRef}>
      <button
        id={id}
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={className || `${defaultClasses} w-full sm:w-auto justify-center`}
      >
        {children || "Sign up for free"}
        <svg 
          className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {dropdownOpen && (
        <div className={`absolute top-full ${dropdownFullWidth ? "left-0 right-0 sm:right-auto sm:w-[320px]" : "right-0 w-[280px]"} mt-3 bg-white rounded-3xl shadow-2xl shadow-primary-black/10 border border-border-gray overflow-hidden animate-scale-in origin-top z-[1000]`}>
          <div className="p-2">
            <a 
              href="/onboarding/brand" 
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-light-gray transition-colors duration-200 group"
              onClick={() => setDropdownOpen(false)}
            >
              <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <div className="text-[15px] font-bold text-primary-black">I'm a brand</div>
                <div className="text-sm text-accent-blue font-medium leading-tight mt-0.5">Connect with creators</div>
              </div>
            </a>
            <a 
              href="/onboarding/creator" 
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-light-gray transition-colors duration-200 group"
              onClick={() => setDropdownOpen(false)}
            >
              <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <div className="text-[15px] font-bold text-primary-black">I'm a creator</div>
                <div className="text-sm text-accent-blue font-medium leading-tight mt-0.5">Monetize your content</div>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
