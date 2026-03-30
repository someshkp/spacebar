"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const CATEGORIES = [
  { id: "health", label: "Health & Wellness", icon: "🌱" },
  { id: "cosmetics", label: "Cosmetics & Beauty", icon: "💄" },
  { id: "apparel", label: "Apparel & Fashion", icon: "👕" },
  { id: "apps", label: "Apps & Digital Services", icon: "📱" },
  { id: "food", label: "Food & Beverage", icon: "🥘" },
  { id: "pets", label: "Pets", icon: "🐾" },
  { id: "children", label: "Children & Family", icon: "👨‍👩-👧" },
  { id: "tech", label: "Technology & Gadgets", icon: "⚙️" },
  { id: "home", label: "Home & Lifestyle", icon: "🏠" },
];

const REEL_METADATA = [
  { name: "Max", stars: 5, country: "Canada", img: "/ugc_reel_tech_1774679649639.png", category: "tech" },
  { name: "Sarah", stars: 5, country: "USA", img: "/ugc_reel_cosmetics_1774679672860.png", category: "cosmetics" },
  { name: "Elena", stars: 5, country: "UK", img: "/ugc_reel_apparel_1774679695754.png", category: "apparel" },
  { name: "Arjun", stars: 5, country: "India", img: "/ugc_reel_wellness_1774680192577.png", category: "health" },
];

export default function UGCShowcase() {
  const [activeCategory, setActiveCategory] = useState("tech");
  const [isPaused, setIsPaused] = useState(false);
  
  // Filter and duplicate reels for the infinite ticker loop
  const filteredReels = REEL_METADATA.filter(
    (reel) => activeCategory === "all" || reel.category === activeCategory || REEL_METADATA.length < 5
  );
  
  // To ensure the ticker looks full even with few items, we repeat the filtered list or use all
  const displayReels = filteredReels.length > 0 ? filteredReels : REEL_METADATA;
  const tickerItems = [...displayReels, ...displayReels, ...displayReels, ...displayReels];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-primary-black mb-12 tracking-tight">
          Creator marketing starts <br className="hidden md:block" /> with proven talent
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16 px-4">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border shadow-sm ${
                  isActive
                    ? "bg-accent-blue text-white border-accent-blue scale-105 shadow-accent-blue/20"
                    : "bg-white text-text-gray border-border-gray hover:border-accent-blue hover:text-accent-blue"
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Looping Reels Carousel */}
        <div 
          className="relative overflow-visible pb-12 group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className={`flex gap-4 md:gap-8 animate-ticker-slow pointer-events-auto transition-opacity duration-500`}
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            {tickerItems.map((reel, i) => (
              <div
                key={`${reel.name}-${i}`}
                className={`flex-shrink-0 w-[240px] md:w-[320px] aspect-[9/16] rounded-[48px] overflow-hidden relative group/reel transition-all duration-700 hover:scale-[1.02] shadow-2xl shadow-primary-black/10 ${
                  i % 4 === 2 ? "scale-[1.05] ring-4 ring-accent-blue/20" : "scale-95 opacity-90"
                }`}
              >
                <Image
                  src={reel.img}
                  alt={`UGC Reel by ${reel.name}`}
                  fill
                  className="object-cover group-hover/reel:scale-110 transition-transform duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

                {/* Top Category Tag */}
                <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                  {CATEGORIES.find(c => c.id === reel.category)?.label || "UGC Content"}
                </div>

                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/reel:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white scale-90 group-hover/reel:scale-100 transition-transform duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Creator Metadata Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-lg leading-tight">
                        {reel.name}
                      </p>
                      <p className="text-white/80 text-xs flex items-center gap-1 mt-1">
                        {reel.stars} ★ <span className="opacity-60">| {reel.country}</span>
                      </p>
                    </div>
                    <div className="w-11 h-11 rounded-full border-2 border-white/50 overflow-hidden shadow-lg backdrop-blur-md">
                      <Image
                        src={reel.img}
                        width={44}
                        height={44}
                        alt="Avatar"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Edge Fades */}
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white via-white/40 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white via-white/40 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}
