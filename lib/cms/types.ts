export type CmsCta = {
  href: string;
  label: string;
};

export type CmsSlide = {
  id: string;
  src: string;
  alt: string;
};

export type HeroTemplate = "split" | "full" | "center" | "top";

export type CmsHero = {
  kanjiLabel: string;
  h1Before: string;
  h1Accent: string;
  h1After: string;
  sub: string;
  bangla: string;
  caption: string;
  primaryCta: CmsCta;
  secondaryCta: CmsCta;
  trustItems: string[];
  slides: CmsSlide[];
  template: HeroTemplate;
};

export type CmsProgram = {
  id: string;
  label: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  image: {
    src: string;
    alt: string;
    aspect: "4/3";
  };
  bullets?: string[];
};

export type CmsGalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  span: "wide" | "tall" | "half";
};

export type CmsFaq = {
  id: string;
  question: string;
  answer: string;
};

export type CmsBranch = {
  id: string;
  name: string;
  address: string;
  mapsUrl?: string;
  todo?: true;
};

export type CmsContent = {
  hero: CmsHero;
  programs: {
    eyebrow: string;
    title: string;
    description: string;
    items: CmsProgram[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    items: CmsGalleryItem[];
  };
  faqs: {
    eyebrow: string;
    title: string;
    description: string;
    items: CmsFaq[];
  };
  branches: {
    eyebrow: string;
    title: string;
    items: CmsBranch[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    phones: string[];
    email: string;
    whatsapp: string;
  };
};
