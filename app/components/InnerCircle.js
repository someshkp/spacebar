import React from "react";

const CREATORS = [
  { id: 1, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/09_eshaisthename.png" },
  { id: 2, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/08_sanju.choudhary0683.png" },
  { id: 3, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/07_glowmiere.tales.png" },
  { id: 4, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/05____tevvy___cahya___.png" },
  { id: 5, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/04_raisingrooted.kids.png" },
  { id: 6, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/03_divyangxisrani.png" },
  { id: 7, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/02_with_mukta.png" },
  { id: 8, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/01_mansi___soni___.png" },
  { id: 9, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/08_itskarnavshah.png" },
  { id: 10, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/01_dristipaul___18.png" },
  { id: 11, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/05_vedikadixittt.png" },
  { id: 12, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/10_debashrita.xoxo.png" },
  { id: 13, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/01_mostlypretty-.png" },
  { id: 14, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/02_shravanansandhya7.png" },
  { id: 15, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/08_aishwarya-batchu.png" },
  { id: 16, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/03_poojareddyy24.png" },
  { id: 17, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/04_stylebyvaish.png" },
  { id: 18, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/05_-missroy-official.png" },
  { id: 19, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/09_ssstylestories.png" },
  { id: 20, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/06_insta-freude-edit.png" },
  { id: 21, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/07_hyd-and-me.png" },
  { id: 22, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/09_saraswathi_yenamalla.png" },
  { id: 23, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/10_theprettygrid_.png" },
  { id: 24, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/03_kalpanakpmn.png" },
  { id: 25, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/04_shubhisrivastava__.png" },
  { id: 26, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/07_akankshachoudhary_official.png" },
  { id: 27, image: "https://ik.imagekit.io/xmlyox01a/creator%20images/02_kalpanakpmn.png" },
];

const getAvatarUrl = (url) => {
  if (!url) return "";
  if (url.includes("imagekit.io")) {
    if (url.includes("/tr:")) return url;
    return url.replace("imagekit.io/xmlyox01a/", "imagekit.io/xmlyox01a/tr:w-200,h-200,fo-face/");
  }
  return url;
};

export default function InnerCircle() {
  // Duplicate creators for seamless scrolling
  const scrollItems = [...CREATORS, ...CREATORS];

  return (
    <div className="w-full max-w-4xl mx-auto my-12 bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 text-left animate-fade-in-up">
      {/* Header */}
      {/* <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 rounded-2xl border-2 border-[#CCF6EE] bg-white shadow-sm flex-shrink-0"></div>
        <h3 className="text-2xl md:text-3xl font-bold text-primary-black">
          Inner Circle members
        </h3>
      </div> */}
      {/* 
      <p className="text-text-gray text-lg mb-4 md:mb-6">
        Verified creators wearing the crown on Limurse
      </p> */}

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#CCF6EE] to-transparent mb-6 md:mb-8"></div>

      {/* Marquee Section */}
      <div className="relative flex overflow-hidden group">
        {/* Left/Right fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

        <div className="flex gap-4 md:gap-6 animate-ticker-slow w-max [animation-direction:reverse]">
          {scrollItems.map((creator, idx) => (
            <div
              key={`${creator.id}-${idx}`}
              className="relative flex-shrink-0"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-1 border-2 border-[#99F0DF] bg-white overflow-hidden">
                <img
                  src={getAvatarUrl(creator.image)}
                  alt={`Creator ${creator.id}`}
                  className="w-full h-full rounded-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Crown Badge */}
              {/* <div className="absolute bottom-0 right-0 w-7 h-7 md:w-8 md:h-8 bg-[#FFFAF0] rounded-full border border-yellow-100 shadow-sm flex items-center justify-center transform translate-x-1/4 translate-y-1/4">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="#D4AF37"
                  className="drop-shadow-sm"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V18H19V19Z" />
                </svg>
              </div> */}
            </div>
          ))}
        </div>
      </div>

      {/* Footer text */}
      <p className="text-text-gray text-center mt-6 md:mt-8 text-sm md:text-base font-medium">
        Trendsetters on the platform.
      </p>
    </div>
  );
}
