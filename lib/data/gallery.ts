export const galleryCopy = {
  eyebrow: "কাবুকির জীবন",
  title: "মুহূর্ত, স্মৃতি ও মাইলফলক",
  open: "বড় করে দেখুন",
  close: "বন্ধ করুন",
  prev: "আগের ছবি",
  next: "পরের ছবি",
  of: "এর",
} as const;

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  span: "wide" | "tall" | "half";
};

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    src: "/images/life/classroom.jpg",
    alt: "কাবুকির শ্রেণিকক্ষে N5 বই হাতে শিক্ষার্থীরা",
    caption: "শ্রেণিকক্ষ, কাবুকি",
    span: "wide",
  },
  {
    id: "g2",
    src: "/images/gallery/g2.jpg",
    alt: "ফ্যাকাশে আকাশে চেরি ফুলের ডাল",
    caption: "সাকুরা ঋতু",
    span: "tall",
  },
  {
    id: "g3",
    src: "/images/gallery/g3.jpg",
    alt: "কিয়োটোর কাঠের মন্দির তোরণ",
    caption: "মন্দির তোরণ, কিয়োটো",
    span: "tall",
  },
  {
    id: "g4",
    src: "/images/gallery/g4.jpg",
    alt: "লণ্ঠন সাজানো শান্ত মন্দিরপথ",
    caption: "লণ্ঠনের পথ",
    span: "half",
  },
  {
    id: "g5",
    src: "/images/brand/cover.jpg",
    alt: "কাবুকি জাপানিজ ল্যাঙ্গুয়েজ অ্যাকাডেমির কভার",
    caption: "কাবুকি পরিবার",
    span: "half",
  },
];
