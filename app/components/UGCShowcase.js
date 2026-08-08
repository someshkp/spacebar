"use client";

import { useRef, useState, useMemo } from "react";
import InnerCircle from "./InnerCircle";

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

const CATEGORIES_WITH_ALL = [
  { id: "all", label: "All Creators", icon: "✨" },
  ...CATEGORIES,
];

const getAvatarUrl = (url) => {
  if (!url) return "";
  if (url.includes("imagekit.io")) {
    if (url.includes("/tr:")) return url;
    return url.replace("imagekit.io/xmlyox01a/", "imagekit.io/xmlyox01a/tr:w-200,h-200,fo-face/");
  }
  return url;
};

const CREATORS_WITH_VIDEO = [
  {
    name: "Achita Goswami",
    firstName: "Achita",
    followers: "15.9K",
    niche: "Lifestyle • Home • Food",
    handle: "@insta_freude_edit",
    instagram: "https://www.instagram.com/insta_freude_edit/",
    category: "tech",
    categoryName: "Technology & Gadgets",
    avatar: "https://ik.imagekit.io/xmlyox01a/creator%20images/06_insta-freude-edit.png",
    videos: [
      "https://ik.imagekit.io/xmlyox01a/Achita%20Goswami%20(insta_freude_edit)/Achita%20Goswami%202%20Indian%20Coffee%20Festival%20.mp4",
      "https://ik.imagekit.io/xmlyox01a/Achita%20Goswami%20(insta_freude_edit)/Achita%20Goswami%201%20multi-designer%20store%20brief.mp4"
    ]
  },
  {
    name: "Aishwarya Batchu",
    firstName: "Aishwarya",
    followers: "3.0K",
    niche: "Fashion • Lifestyle • Food",
    handle: "@aishwarya_batchu",
    instagram: "https://www.instagram.com/aishwarya_batchu/",
    category: "food",
    categoryName: "Food & Beverage",
    avatar: "https://ik.imagekit.io/xmlyox01a/creator%20images/08_aishwarya-batchu.png",
    videos: [
      "https://ik.imagekit.io/xmlyox01a/Aishwarya%20Batchu/aishwarya2%20Shop,%20show%20my%20code%20AISLL%20&%20enjoy%201%20free%20product%20@newme.mp4",
      "https://ik.imagekit.io/xmlyox01a/Aishwarya%20Batchu/aishwarya3%20@gehen_saree.mp4",
      "https://ik.imagekit.io/xmlyox01a/Aishwarya%20Batchu/aishwarya%20Honored%20to%20be%20at%20the%20launch%20of%20the%20all-new%20BMW%20X3%20at%20KUN%20Exclusive.mp4"
    ]
  },
  {
    name: "Akanksha Choudhary",
    firstName: "Akanksha",
    followers: "2.8M",
    niche: "Artist • Home & Lifestyle",
    handle: "@akankshachoudhary_official",
    instagram: "https://www.instagram.com/akankshachoudhary_official/?g=5",
    category: "home",
    categoryName: "Home & Lifestyle",
    avatar: "https://ik.imagekit.io/xmlyox01a/creator%20images/07_akankshachoudhary_official.png",
    videos: [
      "https://ik.imagekit.io/xmlyox01a/Akanksha%20Choudhary_/Akanksha%20Choudhary%203%20Magic%20facewash%20for%20Bright%20&%20tan%20free%20skin%20.mp4",
      "https://ik.imagekit.io/xmlyox01a/Akanksha%20Choudhary_/Akanksha%20Choudhary%201%20Less%20hair%20fall%20More%20confidence.mp4",
      "https://ik.imagekit.io/xmlyox01a/Akanksha%20Choudhary_/Akanksha%20Choudhary%202%20very%20adventure%20starts%20with%20being%20prepared%20My%20plush%20pads.mp4"
    ]
  },
  {
    name: "Divyang",
    firstName: "Divyang",
    followers: "1.2K",
    niche: "Beauty • Fashion • Lifestyle",
    handle: "@divyangxisrani",
    instagram: "https://www.instagram.com/divyangxisrani/",
    category: "apparel",
    categoryName: "Apparel & Fashion",
    avatar: "https://ik.imagekit.io/xmlyox01a/creator%20images/03_divyangxisrani.png",
    videos: [
      "https://ik.imagekit.io/xmlyox01a/Divyang_/Divyang%201%20IPL%20Green%20Ball%20contest.mp4",
      "https://ik.imagekit.io/xmlyox01a/Divyang_/Divyang%202%20Spykar%20latest%20Collection.mp4"
    ]
  },
  {
    name: "Hasti",
    firstName: "Hasti",
    followers: "3.6K",
    niche: "Food • Lifestyle",
    handle: "@theprettygrid_",
    instagram: "https://www.instagram.com/theprettygrid_/",
    category: "food",
    categoryName: "Food & Beverage",
    avatar: "https://ik.imagekit.io/xmlyox01a/creator%20images/10_theprettygrid_.png",
    videos: [
      "https://ik.imagekit.io/xmlyox01a/Hasti%20(theprettygrid)/Hasti%201%20South%20Indian%20flavours,%20made%20the%20traditional%20way.mp4",
      "https://ik.imagekit.io/xmlyox01a/Hasti%20(theprettygrid)/Hasti%202%20from%20Indo-Western%20styles%20to%20kurta%20sets,%20Aarhham%20Boutique.mp4"
    ]
  },
  {
    name: "Karnav Shah",
    firstName: "Karnav",
    followers: "1.3K",
    niche: "Lifestyle and Travel",
    handle: "@itskarnavshah",
    instagram: "https://www.instagram.com/itskarnavshah/",
    category: "apps",
    categoryName: "Apps & Digital Services",
    avatar: "https://ik.imagekit.io/xmlyox01a/creator%20images/08_itskarnavshah.png",
    videos: [
      "https://ik.imagekit.io/xmlyox01a/Karnav%20Shah/Karnav%20Shah%201.mp4",
      "https://ik.imagekit.io/xmlyox01a/Karnav%20Shah/Karnav%20Shah%202.mp4"
    ]
  },
  {
    name: "Manaswini",
    firstName: "Manaswini",
    followers: "1.7K",
    niche: "Beauty • Skincare • Jewelry",
    handle: "@mostlypretty_",
    instagram: "https://www.instagram.com/mostlypretty_/",
    category: "cosmetics",
    categoryName: "Cosmetics & Beauty",
    avatar: "https://ik.imagekit.io/xmlyox01a/creator%20images/01_mostlypretty-.png",
    videos: [
      "https://ik.imagekit.io/xmlyox01a/Manaswini%20(mostlypretty)/Manaswini%203%20Thai%20Aqua%20_%20fresh,%20crisp,%20and%20perfect%20for%20everyday%20wear.mp4",
      "https://ik.imagekit.io/xmlyox01a/Manaswini%20(mostlypretty)/Manaswini%202%20Multi%20tempurature%20hair%20straightener%20.mp4",
      "https://ik.imagekit.io/xmlyox01a/Manaswini%20(mostlypretty)/Manaswini%201%20waterfull%20Tone-up%20Sunscreen.mp4"
    ]
  },
  {
    name: "Nikita Dhingra",
    firstName: "Nikita",
    followers: "30K",
    niche: "Food & Lifestyle Blogger",
    handle: "@hyd_and_me",
    instagram: "https://www.instagram.com/hyd_and_me/",
    category: "food",
    categoryName: "Food & Beverage",
    avatar: "https://ik.imagekit.io/xmlyox01a/creator%20images/07_hyd-and-me.png",
    videos: [
      "https://ik.imagekit.io/xmlyox01a/Nikita%20Dhingra%20(hyd_and_me)/Nikita%20Dhingra%202%20limelightdiamonds%20is%20one%20of%20the%20most%20trusted%20and%20largest%20lab%20grown%20diamond%20jewellery%20brand%20.mp4",
      "https://ik.imagekit.io/xmlyox01a/Nikita%20Dhingra%20(hyd_and_me)/Nikita%20Dhingra%203%20rangdecore.mp4",
      "https://ik.imagekit.io/xmlyox01a/Nikita%20Dhingra%20(hyd_and_me)/Nikita%20Dhingra%201%20Be%20it%20their%20sarees,%20lehengas,%20blouse,%20suits,%20Indo%20western,%20it%20caters%20to%20a%20wide%20variety%20of%20choices.mp4"
    ]
  },
  {
    name: "Pooja Reddy",
    firstName: "Pooja",
    followers: "48.9K",
    niche: "Fashion • Beauty • Lifestyle",
    handle: "@poojareddyy24",
    instagram: "https://www.instagram.com/poojareddyy24/",
    category: "cosmetics",
    categoryName: "Cosmetics & Beauty",
    avatar: "https://ik.imagekit.io/xmlyox01a/creator%20images/03_poojareddyy24.png",
    videos: [
      "https://ik.imagekit.io/xmlyox01a/Pooja%20Reddy/Pooja%20Reddy%203%20Adding%20Superyou%20Pro%20fermented%20yeast%20protein%20into%20everyday%20recipes.mp4",
      "https://ik.imagekit.io/xmlyox01a/Pooja%20Reddy/Pooja%20Reddy%202%20gocolors%20collection.mp4",
      "https://ik.imagekit.io/xmlyox01a/Pooja%20Reddy/Pooja%20Reddy%201%20Most%20acne%20routines%20go%20full%20attack_%20but%20your%20skin%20just%20needed%20balance.mp4"
    ]
  },
  {
    name: "Dristi Paul",
    firstName: "Dristi",
    followers: "55.7K",
    niche: "Beauty • Lifestyle • Fashion",
    handle: "@dristipaul___18",
    instagram: "https://www.instagram.com/dristipaul___18/",
    category: "cosmetics",
    categoryName: "Cosmetics & Beauty",
    avatar: "https://ik.imagekit.io/xmlyox01a/creator%20images/01_dristipaul___18.png",
    videos: [
      "https://ik.imagekit.io/xmlyox01a/Your%20Skincare%20Therapist%20(%20Dristi%20Paul)/Your%20Skincare%20Therapist%20(%20Dristi%20Paul)%203%20Red%20because%20I%20came%20to%20steal%20the%20spotlight..mp4",
      "https://ik.imagekit.io/xmlyox01a/Your%20Skincare%20Therapist%20(%20Dristi%20Paul)/Your%20Skincare%20Therapist%20(%20Dristi%20Paul)%201%20The%20L_Or%C3%A9al%20Professionnel%20Serioxyl%20Advanced%20Hair%20Growth%20Serum%20is%20one%20step%20I%20never%20skip.mp4"
    ]
  }
];

function VideoCard({ reel, onClick }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.log("Video play error:", err));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onClick={onClick}
      className="flex flex-col items-start gap-4 flex-shrink-0 group bg-white border border-border-gray p-4 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all duration-300 w-[260px] md:w-[300px] cursor-pointer"
    >
      {/* Video Container */}
      <div
        className="relative w-full h-[380px] md:h-[440px] rounded-[2rem] overflow-hidden bg-gray-50"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          className="absolute inset-0 w-full h-full object-cover"
          poster={`${reel.videos[0]}?tr=so-1,w-400`}
        >
          <source src={`${reel.videos[0]}?tr=orig-true`} type="video/mp4" />
        </video>

        {/* Hover preview text */}
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-semibold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          PREVIEW
        </div>
      </div>

      {/* Creator Info */}
      <div className="w-full px-1 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <div className="truncate flex-grow">
            <h3 className="font-bold text-primary-black text-base md:text-lg leading-tight truncate text-left">
              {reel.name}
            </h3>
          </div>
          <span className="flex-shrink-0 bg-pink-50 text-pink-600 text-[11.5px] font-bold px-2.5 py-0.5 rounded-full border border-pink-100 shadow-sm">
            {reel.followers}
          </span>
        </div>
      </div>
    </div>
  );
}

function CreatorVideoModal({ creator, onClose }) {
  const [activeVideo, setActiveVideo] = useState(creator.videos[0]);
  const mainVideoRef = useRef(null);

  const handleVideoSelect = (videoUrl) => {
    setActiveVideo(videoUrl);
    if (mainVideoRef.current) {
      mainVideoRef.current.load();
      mainVideoRef.current.play().catch((err) => console.log(err));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-6 animate-fade-in">
      {/* Modal Card */}
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl h-[90vh] md:h-[80vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 hover:rotate-90 cursor-pointer"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Column: Big Video Player */}
        <div className="w-full md:w-3/5 h-[45%] md:h-full bg-black relative flex items-center justify-center">
          <video
            ref={mainVideoRef}
            src={`${activeVideo}?tr=orig-true`}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right Column: Info & Other Videos */}
        <div className="w-full md:w-2/5 h-[55%] md:h-full p-6 md:p-8 flex flex-col justify-between overflow-y-auto text-left text-white bg-zinc-900/50 backdrop-blur-sm">
          <div>
            {/* Creator Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full p-0.5 border-2 border-[#99F0DF] bg-white overflow-hidden flex-shrink-0">
                <img
                  src={getAvatarUrl(creator.avatar)}
                  alt={creator.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-grow">
                <h3 className="font-extrabold text-xl text-white truncate">{creator.name}</h3>
                <p className="text-sm text-white/50 font-medium truncate">{creator.handle}</p>
              </div>
            </div>

            {/* Stats / Followers */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-2xl text-xs font-bold tracking-wide">
                🔥 {creator.followers} Followers
              </span>
              <span className="bg-accent-blue/10 border border-accent-blue/20 text-accent-blue px-3.5 py-1.5 rounded-2xl text-xs font-bold tracking-wide">
                ✨ {creator.categoryName}
              </span>
            </div>

            {/* Niche description */}
            <p className="text-sm text-white/70 leading-relaxed mb-8">
              <span className="font-semibold text-white/95">Niche:</span> {creator.niche}
            </p>

            {/* Other Videos Section */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-white/40 mb-4">
                Videos ({creator.videos.length})
              </h4>
              <div className="flex flex-col gap-3">
                {creator.videos.map((vidUrl, idx) => {
                  const isActive = vidUrl === activeVideo;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleVideoSelect(vidUrl)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border transition-all duration-300 text-left w-full cursor-pointer ${
                        isActive
                          ? "bg-accent-blue/20 border-accent-blue/50 text-white shadow-lg shadow-accent-blue/10"
                          : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10 text-white/70"
                      }`}
                    >
                      <div className="w-12 h-16 rounded-xl bg-black overflow-hidden flex-shrink-0 relative border border-white/10">
                        <video src={`${vidUrl}?tr=orig-true`} className="w-full h-full object-cover" muted playsInline />
                        {/* Play Overlay */}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </div>
                      <div className="min-w-0 flex-grow">
                        <p className={`text-sm font-semibold truncate ${isActive ? "text-white" : "text-white/80"}`}>
                          Video {idx + 1}
                        </p>
                        <p className="text-[11px] text-white/40 mt-1 truncate">
                          Click to play
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action button at bottom */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <a
              href={creator.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-[#E1306C] hover:text-[#C13584] transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              View on Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UGCShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeCreator, setActiveCreator] = useState(null);

  const filteredCreators = useMemo(() => {
    if (selectedCategory === "all") return CREATORS_WITH_VIDEO;
    return CREATORS_WITH_VIDEO.filter((creator) => creator.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="py-24 bg-white overflow-hidden select-none">
      <div className="relative z-10 max-w-[100rem] mx-auto px-6 text-center">
        <h2 className="text-xl md:text-3xl lg:text-6xl font-bold text-primary-black mb-12 tracking-tight">
          Creator marketing starts <br className="hidden md:block" /> with
          proven talent
        </h2>

        <InnerCircle />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16 px-4 mt-12">
          {CATEGORIES_WITH_ALL.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border shadow-sm cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-primary-black text-white border-primary-black"
                    : "bg-white text-text-gray border-border-gray hover:bg-light-gray"
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Video Grid */}
        <div className="flex flex-wrap justify-center gap-6 pb-12 pt-4 px-4 min-h-[450px]">
          {filteredCreators.map((creator, idx) => (
            <div key={`${creator.name}-${idx}`} className="flex-shrink-0">
              <VideoCard reel={creator} onClick={() => setActiveCreator(creator)} />
            </div>
          ))}
        </div>

        {/* Creator Video Modal */}
        {activeCreator && (
          <CreatorVideoModal
            creator={activeCreator}
            onClose={() => setActiveCreator(null)}
          />
        )}
      </div>
    </section>
  );
}
