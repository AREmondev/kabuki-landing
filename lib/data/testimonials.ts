export const successCopy = {
  eyebrow: "আমাদের সাফল্য",
  title: "আমাদের শিক্ষার্থী। তাদের জাপান যাত্রা।",
  description: "বাস্তব মানুষ। বাস্তব গল্প। বাস্তব স্বপ্ন।",
} as const;

export type Testimonial = {
  id: string;
  name: string;
  pathway: string;
  destination: string;
  quote: string;
  image: {
    src: string;
    alt: string;
    aspect: "4/5";
  };
  todo: true;
};

export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    name: "শিক্ষার্থীর সাফল্যের গল্প",
    pathway: "স্টুডেন্ট ভিসা পথ",
    destination: "জাপান",
    quote: "শিক্ষার্থীর ছবি ও মন্তব্য এখানে দেখা যাবে।",
    image: {
      src: "/images/success/student-1.jpg",
      alt: "শিক্ষার্থীর প্রতিকৃতি না আসা পর্যন্ত জাপানের রাস্তার স্থিরচিত্র",
      aspect: "4/5",
    },
    todo: true,
  },
  {
    id: "placeholder-2",
    name: "শিক্ষার্থীর সাফল্যের গল্প",
    pathway: "স্টুডেন্ট ভিসা পথ",
    destination: "জাপান",
    quote: "শিক্ষার্থীর ছবি ও মন্তব্য এখানে দেখা যাবে।",
    image: {
      src: "/images/success/student-2.jpg",
      alt: "শিক্ষার্থীর প্রতিকৃতি না আসা পর্যন্ত জাপানের মন্দির তোরণ",
      aspect: "4/5",
    },
    todo: true,
  },
  {
    id: "placeholder-3",
    name: "শিক্ষার্থীর সাফল্যের গল্প",
    pathway: "স্টুডেন্ট ভিসা পথ",
    destination: "জাপান",
    quote: "শিক্ষার্থীর ছবি ও মন্তব্য এখানে দেখা যাবে।",
    image: {
      src: "/images/success/student-3.jpg",
      alt: "শিক্ষার্থীর প্রতিকৃতি না আসা পর্যন্ত চেরি ফুলের স্থিরচিত্র",
      aspect: "4/5",
    },
    todo: true,
  },
];
