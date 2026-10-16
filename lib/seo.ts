export const siteConfig = {
  name: "কাবুকি জাপানিজ ল্যাঙ্গুয়েজ অ্যাকাডেমি",
  shortName: "কাবুকি",
  title: "কাবুকি জাপানিজ ল্যাঙ্গুয়েজ অ্যাকাডেমি — বাংলাদেশে জাপানি ভাষা শিখুন",
  description:
    "চাঁপাইনবাবগঞ্জ, নাচোল ও ঢাকা থেকে জাপানি ভাষা প্রশিক্ষণ, JLPT প্রস্তুতি এবং জাপানে শিক্ষা ও ক্যারিয়ার নির্দেশনা।",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kabukibd.com",
  locale: "bn_BD",
  phone: ["01882-080318", "01744-662212"],
  email: "kabuki303@gmail.com",
  facebook: "https://www.facebook.com/kabukijapaneselanguageSchool",
  ogImage: "/images/og.jpg",
} as const;

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  if (path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteConfig.name,
  alternateName: "KABUKI Japanese Language Academy",
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  description: siteConfig.description,
  logo: absoluteUrl("/images/brand/logo.png"),
  image: absoluteUrl(siteConfig.ogImage),
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "সার্কিট হাউস মোড়",
      addressLocality: "চাঁপাইনবাবগঞ্জ",
      addressCountry: "BD",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "কলেজ মোড়, নাচোল",
      addressLocality: "চাঁপাইনবাবগঞ্জ",
      addressCountry: "BD",
    },
  ],
  areaServed: "Bangladesh",
  sameAs: [siteConfig.facebook],
};
