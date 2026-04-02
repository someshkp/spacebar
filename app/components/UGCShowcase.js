"use client";

import { useState, useRef, useEffect } from "react";

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
  {
    name: "Max",
    stars: 5,
    country: "Canada",
    video: "/ugc1.mp4",
    category: "tech",
  },
  {
    name: "Sarah",
    stars: 5,
    country: "USA",
    video: "/ugc2.mp4",
    category: "cosmetics",
  },
  {
    name: "Elena",
    stars: 5,
    country: "UK",
    video: "/ugc3.mp4",
    category: "apparel",
  },
  {
    name: "Arjun",
    stars: 5,
    country: "India",
    video: "/ugc4.mp4",
    category: "health",
  },
  {
    name: "Sofia",
    stars: 5,
    country: "Spain",
    video: "/ugc5.mp4",
    category: "food",
  },
];

export default function UGCShowcase() {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);

  // Set items for the cylinder (2 sets of 5 is plenty for a good cylinder)
  const cylinderItems = [...REEL_METADATA, ...REEL_METADATA];
  const totalItems = cylinderItems.length;
  const radius = 500; // Radius of the cylinder

  useEffect(() => {
    // Update active index based on rotation
    const angleStep = 360 / totalItems;
    const currentPos = ((rotation % 360) + 360) % 360;
    const frontIndex = Math.round(currentPos / angleStep) % totalItems;
    setActiveIndex(frontIndex);
  }, [rotation, totalItems]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      // Check if the user is scrolling vertically
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        // Prevent the page from scrolling
        e.preventDefault();

        // Update our rotation state
        setRotation((prev) => prev + e.deltaY * 0.15);
      }
    };

    // Attach to the entire section to make it non-scrollable for the page
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [totalItems]);

  return (
    <section ref={sectionRef} className="py-32 bg-white overflow-hidden perspective-[2000px]">
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-primary-black mb-12 tracking-tight">
          Creator marketing starts <br className="hidden md:block" /> with
          proven talent
        </h2>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-24 px-4">
          {CATEGORIES.map((cat) => {
            return (
              <div
                key={cat.id}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border shadow-sm bg-white text-text-gray border-border-gray cursor-default"
              >
                <span className="text-base">{cat.icon}</span>
                {cat.label}
              </div>
            );
          })}
        </div>

        {/* 3D Cylinder Container */}
        <div className="relative h-[700px] flex items-center justify-center mt-12">
          <div
            ref={scrollRef}
            className="relative w-[320px] h-[480px] cursor-grab active:cursor-grabbing preserve-3d"
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(-${radius}px) rotateY(${-rotation}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            {cylinderItems.map((reel, i) => {
              const theta = (360 / totalItems) * i;
              const isActive = activeIndex === i;

              return (
                <div
                  key={`${reel.name}-${i}`}
                  className={`absolute inset-0 w-[320px] h-[480px] rounded-[48px] overflow-hidden shadow-2xl transition-all duration-500 backface-hidden group ${
                    isActive
                      ? "ring-8 ring-accent-blue/40 scale-110 z-20"
                      : "opacity-30 scale-95 z-10 grayscale blur-[2px]"
                  }`}
                  style={{
                    transform: `rotateY(${theta}deg) translateZ(${radius}px)`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src={reel.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Subtle overlay for name/stars - only visible when active */}
                  <div
                    className={`absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-left transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}
                  >
                    <p className="text-white font-black text-2xl mb-1">
                      {reel.name}
                    </p>
                    <div className="flex gap-1">
                      {[...Array(reel.stars)].map((_, j) => (
                        <span key={j} className="text-yellow-400 text-sm">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
