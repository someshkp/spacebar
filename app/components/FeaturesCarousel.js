"use client";

import { useRef, useState, useEffect } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

export default function FeaturesCarousel({ features }) {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      checkScroll();
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    const scrollAmount = direction === "left" ? -clientWidth * 0.9 : clientWidth * 0.9;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Mouse Drag Logic
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <div className="relative group/carousel px-4">
      {/* Navigation Buttons - Side Positioned */}
      <button
        onClick={() => scroll("left")}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 ${
          showLeftArrow
            ? "bg-white/80 backdrop-blur-md border-accent-blue/20 text-accent-blue hover:bg-accent-blue hover:text-white cursor-pointer shadow-xl -translate-x-1/2 md:-translate-x-0"
            : "bg-white/20 border-gray-100 text-gray-300 cursor-not-allowed opacity-0 scale-90"
        }`}
        disabled={!showLeftArrow}
        aria-label="Scroll left"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => scroll("right")}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 ${
          showRightArrow
            ? "bg-white/80 backdrop-blur-md border-accent-blue/20 text-accent-blue hover:bg-accent-blue hover:text-white cursor-pointer shadow-xl translate-x-1/2 md:translate-x-0"
            : "bg-white/20 border-gray-100 text-gray-300 cursor-not-allowed opacity-0 scale-90"
        }`}
        disabled={!showRightArrow}
        aria-label="Scroll right"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex overflow-x-auto gap-8 pb-12 no-scrollbar scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing touch-pan-y"
        style={{ 
          scrollbarWidth: "none", 
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch"
        }}
      >
        {features.map((f, i) => (
          <div 
            key={f.title} 
            className="flex-shrink-0 w-[90vw] md:w-[500px] lg:w-[600px] snap-center py-4"
          >
            <AnimateOnScroll delay={`delay-${(i + 1) * 100}`}>
              <div className="group relative p-10 md:p-14 rounded-[3rem] bg-light-gray border border-transparent hover:border-accent-blue/20 hover:shadow-2xl hover:shadow-accent-blue/10 transition-all duration-500 cursor-default h-full flex flex-col justify-center min-h-[400px]">
                {/* Hover gradient */}
                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Larger Icon Container */}
                  <div className="w-20 h-20 rounded-3xl bg-accent-blue/10 text-accent-blue flex items-center justify-center mb-10 group-hover:bg-accent-blue group-hover:text-white transition-all duration-500 group-hover:shadow-xl group-hover:shadow-accent-blue/30 group-hover:rotate-3">
                    <div className="transform scale-150">
                      {f.icon}
                    </div>
                  </div>

                  {/* Larger Typography */}
                  <h3 className="text-3xl md:text-4xl font-extrabold text-primary-black mb-6 tracking-tight leading-tight">
                    {f.title}
                  </h3>
                  <p className="text-xl md:text-2xl text-text-gray leading-relaxed font-medium opacity-80">
                    {f.desc}
                  </p>
                </div>

                {/* Decorative element */}
                <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                   <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-accent-blue/20">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                   </svg>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        ))}
      </div>
      
      {/* Progress Dots */}
      <div className="flex justify-center gap-3 mt-4">
        {features.map((_, i) => (
          <div 
            key={i} 
            className="w-2.5 h-2.5 rounded-full bg-accent-blue/10 transition-all duration-300 hover:bg-accent-blue/30"
          />
        ))}
      </div>
    </div>
  );
}
