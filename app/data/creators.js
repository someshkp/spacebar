export const CATEGORIES = [
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

export const CATEGORIES_WITH_ALL = [
  { id: "all", label: "All Creators", icon: "✨" },
  ...CATEGORIES,
];

export const getAvatarUrl = (url) => {
  if (!url) return "";
  if (url.includes("imagekit.io")) {
    if (url.includes("/tr:")) return url;
    return url.replace("imagekit.io/xmlyox01a/", "imagekit.io/xmlyox01a/tr:w-200,h-200,fo-face/");
  }
  return url;
};

export const CREATORS_WITH_VIDEO = [
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
