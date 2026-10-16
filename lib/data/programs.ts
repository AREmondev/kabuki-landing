export type Program = {
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

export const programsCopy = {
  eyebrow: "আমাদের প্রোগ্রাম",
  title: "জাপানের পথ বেছে নিন",
  description:
    "জাপানি ভাষার দক্ষতা গড়ে তুলুন এবং আপনার লক্ষ্য অনুযায়ী পথের জন্য প্রস্তুতি নিন।",
} as const;

export const programs: Program[] = [
  {
    id: "jlpt-n5",
    label: "ভাষা",
    title: "জাপানি ভাষা কোর্স (JLPT N5)",
    description:
      "শূন্য থেকে শুরু করে গঠিত ও সহজ পাঠ্যক্রমে জাপানি ভাষা শিখুন।",
    href: "/#contact",
    cta: "জিজ্ঞাসা করুন",
    image: {
      src: "/images/life/classroom.jpg",
      alt: "কাবুকির শ্রেণিকক্ষে N5 পাঠ্যবই হাতে শিক্ষার্থীরা",
      aspect: "4/3",
    },
  },
  {
    id: "student-visa",
    label: "পড়াশোনা",
    title: "স্টুডেন্ট ভিসা",
    description:
      "জাপানে ল্যাঙ্গুয়েজ স্কুল ও উচ্চশিক্ষার পথে যাওয়া শিক্ষার্থীদের জন্য নির্দেশনা।",
    href: "/#contact",
    cta: "জিজ্ঞাসা করুন",
    image: {
      src: "/images/programs/student-visa.jpg",
      alt: "টেবিল ঘিরে একসাথে পড়াশোনা করছে শিক্ষার্থীরা",
      aspect: "4/3",
    },
    bullets: [
      "ল্যাঙ্গুয়েজ স্কুলের পথ",
      "বিশ্ববিদ্যালয়/মাস্টার্স নির্দেশনা",
      "আবেদন সংক্রান্ত নির্দেশনা",
      "ইন্টারভিউ প্রস্তুতি",
    ],
  },
  {
    id: "ssw",
    label: "কাজ",
    title: "SSW",
    description:
      "জাপানে কাজ করতে আগ্রহী যোগ্য প্রার্থীদের জন্য প্রস্তুতি ও নির্দেশনা।",
    href: "/#contact",
    cta: "জিজ্ঞাসা করুন",
    image: {
      src: "/images/programs/ssw.jpg",
      alt: "সন্ধ্যার শিবুয়া ক্রসিং, টোকিও",
      aspect: "4/3",
    },
  },
  {
    id: "titp",
    label: "প্রশিক্ষণ",
    title: "TITP",
    description:
      "যোগ্য প্রার্থীদের জন্য জাপানি ভাষা প্রস্তুতি ও ক্যারিয়ার নির্দেশনা।",
    href: "/#contact",
    cta: "জিজ্ঞাসা করুন",
    image: {
      src: "/images/programs/titp.jpg",
      alt: "সন্ধ্যায় জাপানের লণ্ঠনআলোকিত রাস্তা",
      aspect: "4/3",
    },
  },
  {
    id: "masters",
    label: "উচ্চশিক্ষা",
    title: "মাস্টার্স প্রোগ্রাম",
    description: "জাপানে উচ্চশিক্ষা নিতে ইচ্ছুক স্নাতকদের জন্য।",
    href: "/#contact",
    cta: "জিজ্ঞাসা করুন",
    image: {
      src: "/images/programs/masters.jpg",
      alt: "গ্রন্থাগারের টেবিলে খোলা বই",
      aspect: "4/3",
    },
  },
];
