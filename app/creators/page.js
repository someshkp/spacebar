"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  CATEGORIES_WITH_ALL,
  CREATORS_WITH_VIDEO,
  getAvatarUrl,
} from "../data/creators";

function InlineVideoPreview({ videoUrl, title, onClick }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoUrl]);

  return (
    <div
      onClick={onClick}
      className="group relative flex-shrink-0 w-[220px] sm:w-[260px] h-[340px] sm:h-[400px] rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 hover:border-accent-blue/50 shadow-md hover:shadow-xl hover:shadow-accent-blue/10 transition-all duration-300 cursor-pointer"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      >
        <source src={`${videoUrl}?tr=orig-true`} type="video/mp4" />
      </video>

      {/* Dark overlay gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-60 group-hover:opacity-80 transition-opacity" />

      {/* Top badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white/90 border border-white/10">
          {title}
        </span>
        <span className="w-6 h-6 rounded-full bg-accent-blue/80 backdrop-blur-sm flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          ▶
        </span>
      </div>

      {/* Bottom Play action */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <span className="px-4 py-1.5 rounded-full bg-accent-blue text-white text-xs font-semibold shadow-lg flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Watch Full HD
        </span>
      </div>
    </div>
  );
}

function CreatorVideoModal({ creator, activeVideoIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(activeVideoIndex || 0);
  const mainVideoRef = useRef(null);

  const activeVideo = creator.videos[currentIndex] || creator.videos[0];

  const handleVideoSelect = (idx) => {
    setCurrentIndex(idx);
    if (mainVideoRef.current) {
      mainVideoRef.current.load();
      mainVideoRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-6 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-white/15 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl h-[92vh] md:h-[82vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-50 w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 hover:rotate-90 cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Video Player Column */}
        <div className="w-full md:w-3/5 h-[48%] md:h-full bg-black relative flex items-center justify-center">
          <video
            ref={mainVideoRef}
            src={`${activeVideo}?tr=orig-true`}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
        </div>

        {/* Info & Video list column */}
        <div className="w-full md:w-2/5 h-[52%] md:h-full p-6 md:p-8 flex flex-col justify-between overflow-y-auto text-left text-white bg-zinc-900/60 backdrop-blur-md border-t md:border-t-0 md:border-l border-white/10">
          <div>
            {/* Creator Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full p-0.5 border-2 border-accent-blue bg-white overflow-hidden flex-shrink-0">
                <img
                  src={getAvatarUrl(creator.avatar)}
                  alt={creator.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-grow">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-xl text-white truncate">
                    {creator.name}
                  </h3>
                  <span
                    className="text-accent-blue text-sm"
                    title="Verified Creator"
                  >
                    ✓
                  </span>
                </div>
                <p className="text-sm text-white/50 font-medium truncate">
                  {creator.handle}
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <span className="bg-pink-500/15 border border-pink-500/30 text-pink-300 px-3 py-1 rounded-xl text-xs font-bold">
                🔥 {creator.followers} Followers
              </span>
              <span className="bg-accent-blue/15 border border-accent-blue/30 text-accent-blue px-3 py-1 rounded-xl text-xs font-bold">
                ✨ {creator.categoryName}
              </span>
            </div>

            {/* Niche */}
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              <span className="font-semibold text-white/95">Niche:</span>{" "}
              {creator.niche}
            </p>

            {/* Video List */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white/50 mb-3">
                All Portfolio Videos ({creator.videos.length})
              </h4>
              <div className="flex flex-col gap-2.5">
                {creator.videos.map((vidUrl, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleVideoSelect(idx)}
                      className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-all duration-300 text-left w-full cursor-pointer ${
                        isActive
                          ? "bg-accent-blue/20 border-accent-blue/60 text-white shadow-md shadow-accent-blue/10"
                          : "bg-white/5 border-white/5 hover:bg-white/10 text-white/70"
                      }`}
                    >
                      <div className="w-12 h-16 rounded-xl bg-black overflow-hidden flex-shrink-0 relative border border-white/10">
                        <video
                          src={`${vidUrl}?tr=orig-true`}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-white text-xs">▶</span>
                        </div>
                      </div>
                      <div className="min-w-0 flex-grow">
                        <p
                          className={`text-sm font-semibold truncate ${isActive ? "text-white" : "text-white/80"}`}
                        >
                          Video #{idx + 1}
                        </p>
                        <p className="text-[11px] text-white/40 truncate">
                          {isActive ? "Currently Playing" : "Click to switch"}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
            <a
              href={creator.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-pink-400 hover:text-pink-300 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Instagram
            </a>
            <a
              href="/onboarding/brand"
              className="px-4 py-2 rounded-xl bg-accent-blue hover:bg-accent-blue-hover text-white text-xs font-semibold transition-all shadow-md shadow-accent-blue/20"
            >
              Collaborate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreatorsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState(null);

  const filteredCreators = useMemo(() => {
    return CREATORS_WITH_VIDEO.filter((creator) => {
      const matchesCategory =
        selectedCategory === "all" || creator.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-primary-black text-white relative overflow-hidden">
      {/* Background Cinematic Glows */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-accent-blue/15 blur-[150px] pointer-events-none" />
      <div className="absolute top-[800px] right-[-200px] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-200px] w-[600px] h-[600px] bg-accent-blue/10 blur-[150px] pointer-events-none" />

      {/* Global Navigation */}
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
            Verified Creator Directory
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            Explore All <span className="gradient-text">Video Creators</span>
          </h1>

          <p className="text-base sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
            Connect directly with India’s top performance-oriented UGC creators.
            Browse their complete video portfolios and start high-converting
            campaigns.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by creator name, niche, or handle..."
              className="w-full h-14 pl-12 pr-4 bg-white/5 border border-white/15 focus:border-accent-blue/80 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-blue/30 backdrop-blur-md transition-all text-sm sm:text-base"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
            {CATEGORIES_WITH_ALL.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-accent-blue text-white border-accent-blue shadow-lg shadow-accent-blue/20 scale-105"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Creator List */}
        <div className="space-y-12 mt-12">
          {filteredCreators.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-xl text-white/60 font-medium">
                No creators found matching "{searchQuery}"
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-accent-blue text-white text-sm font-semibold hover:bg-accent-blue-hover transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredCreators.map((creator) => (
              <div
                key={creator.name}
                className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-md shadow-xl hover:border-white/20 transition-all duration-300"
              >
                {/* Creator Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 border-2 border-accent-blue bg-white overflow-hidden flex-shrink-0 shadow-lg shadow-accent-blue/10">
                      <img
                        src={getAvatarUrl(creator.avatar)}
                        alt={creator.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>

                    {/* Name & Handle */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {creator.name}
                        </h2>
                        <span
                          className="w-5 h-5 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center text-xs font-bold"
                          title="Verified Creator"
                        >
                          ✓
                        </span>
                      </div>
                      <a
                        href={creator.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/50 hover:text-pink-400 font-medium transition-colors inline-flex items-center gap-1 mt-0.5"
                      >
                        {creator.handle}
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                      <p className="text-xs sm:text-sm text-white/70 mt-1">
                        <span className="text-white/40">Niche:</span>{" "}
                        {creator.niche}
                      </p>
                    </div>
                  </div>

                  {/* Followers & Collaborate CTA */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 self-start sm:self-center">
                    <span className="bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full">
                      🔥 {creator.followers}
                    </span>
                    <span className="bg-white/10 border border-white/15 text-white/80 text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full">
                      {creator.categoryName}
                    </span>
                    <a
                      href="/onboarding/brand"
                      className="px-5 py-2 rounded-xl bg-accent-blue hover:bg-accent-blue-hover text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-accent-blue/25 hover:-translate-y-0.5"
                    >
                      Book Creator
                    </a>
                  </div>
                </div>

                {/* Below Header: Full Videos Portfolio */}
                <div className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 flex items-center gap-2">
                      <span>🎬</span>
                      <span>Portfolio Videos ({creator.videos.length})</span>
                    </h3>
                    <span className="text-xs text-white/40">
                      Hover to preview • Click to open in Full HD
                    </span>
                  </div>

                  {/* Videos Horizontal Gallery */}
                  <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 scrollbar-hide">
                    {creator.videos.map((vidUrl, vIdx) => (
                      <InlineVideoPreview
                        key={vIdx}
                        videoUrl={vidUrl}
                        title={`Video ${vIdx + 1}`}
                        onClick={() =>
                          setActiveModal({
                            creator,
                            videoIndex: vIdx,
                          })
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Video Player Modal */}
        {activeModal && (
          <CreatorVideoModal
            creator={activeModal.creator}
            activeVideoIndex={activeModal.videoIndex}
            onClose={() => setActiveModal(null)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-primary-black/80 py-10 px-6 text-center text-white/40 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-base">
              Space<span className="text-accent-blue">bar</span>
            </span>
            <span>— The Video Creator Marketplace</span>
          </div>
          <p>© 2026 Spacebar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
