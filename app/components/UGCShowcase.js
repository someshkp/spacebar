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
  // {
  //   name: "Max",
  //   stars: 5,
  //   country: "Canada",
  //   video: "https://ik.imagekit.io/xmlyox01a/ugc1.mp4",
  //   category: "tech",
  // },
  {
    name: "Sarah",
    stars: 5,
    country: "USA",
    video: "https://ik.imagekit.io/xmlyox01a/ugc2.mp4",
    category: "cosmetics",
  },
  {
    name: "Elena",
    stars: 5,
    country: "UK",
    video: "https://ik.imagekit.io/xmlyox01a/ugc3.mp4",
    category: "apparel",
  },
  {
    name: "Arjun",
    stars: 5,
    country: "India",
    video: "https://ik.imagekit.io/xmlyox01a/ugc4.mp4",
    category: "health",
  },
  {
    name: "Sofia",
    stars: 5,
    country: "Spain",
    video: "https://ik.imagekit.io/xmlyox01a/ugc5.mp4",
    category: "food",
  },
];

const CYLINDER_ITEMS = [...REEL_METADATA, ...REEL_METADATA];
const TOTAL_ITEMS = CYLINDER_ITEMS.length;

export default function UGCShowcase() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const sectionRef = useRef(null);

  const radius = 600; // Increased radius for a "bigger" feel
  const angleStep = 360 / TOTAL_ITEMS;

  const currentPos = ((rotation % 360) + 360) % 360;
  const activeIndex = Math.round(currentPos / angleStep) % TOTAL_ITEMS;

  const handleScroll = (direction) => {
    const targetRotation =
      direction === "right" ? rotation + angleStep : rotation - angleStep;
    rotateTo(targetRotation);
  };

  const rotateTo = (target) => {
    setRotation(target);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      // Prioritize horizontal scrolling (deltaX)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        setRotation((prev) => prev + e.deltaX * 0.5);
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // Mouse/Touch Drag Handlers
  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches?.[0].clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches?.[0].clientX;
    const diff = currentX - startX;
    setRotation((prev) => prev - diff * 0.5);
    setStartX(currentX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Snap to nearest item
    const snapped = Math.round(rotation / angleStep) * angleStep;
    setRotation(snapped);
  };

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-white overflow-hidden perspective-[2000px] select-none"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-primary-black mb-12 tracking-tight">
          Creator marketing starts <br className="hidden md:block" /> with
          proven talent
        </h2>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-24 px-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border shadow-sm bg-white text-text-gray border-border-gray cursor-default hover:bg-light-gray transition-colors duration-300"
            >
              <span className="text-base">{cat.icon}</span>
              {cat.label}
            </div>
          ))}
        </div>

        {/* 3D Cylinder Container */}
        <div className="relative h-[800px] flex items-center justify-center mt-12 group/showcase">
          {/* Navigation Buttons (Both Ends) */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-10 top-1/2 -translate-y-1/2 z-50 w-16 h-16 rounded-full bg-white/90 backdrop-blur-md border border-accent-blue/20 text-accent-blue flex items-center justify-center shadow-2xl hover:bg-accent-blue hover:text-white transition-all duration-300 opacity-0 group-hover/showcase:opacity-100 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Previous video"
          >
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => handleScroll("right")}
            className="absolute right-10 top-1/2 -translate-y-1/2 z-50 w-16 h-16 rounded-full bg-white/90 backdrop-blur-md border border-accent-blue/20 text-accent-blue flex items-center justify-center shadow-2xl hover:bg-accent-blue hover:text-white transition-all duration-300 opacity-0 group-hover/showcase:opacity-100 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Next video"
          >
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Perspective Wrapper */}
          <div
            className={`relative w-[340px] h-[520px] cursor-grab active:cursor-grabbing preserve-3d transition-transform duration-700 ease-out`}
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(-${radius}px) rotateY(${-rotation}deg)`,
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {CYLINDER_ITEMS.map((reel, i) => {
              const theta = (360 / TOTAL_ITEMS) * i;
              const isActive = activeIndex === i;

              return (
                <div
                  key={`${reel.name}-${i}`}
                  className={`absolute inset-0 w-[340px] h-[520px] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 backface-hidden flex flex-col ${
                    isActive
                      ? "ring-12 ring-accent-blue/30 scale-110 z-20"
                      : "opacity-20 scale-90 z-10 grayscale blur-[3px]"
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
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  >
                    <source src={reel.video} type="video/mp4" />
                  </video>

                  {/* Rating/Name Overlay */}
                  <div
                    className={`absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black via-black/40 to-transparent text-left transition-all duration-700 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  >
                    <div className="flex gap-1 mb-2">
                      {[...Array(reel.stars)].map((_, j) => (
                        <svg
                          key={j}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#FBBF24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-white font-extrabold text-3xl mb-1 tracking-tight">
                      {reel.name}
                    </p>
                    <p className="text-white/60 text-sm font-medium uppercase tracking-widest">
                      {reel.category}
                    </p>
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
