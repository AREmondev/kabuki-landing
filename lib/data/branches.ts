export const branchesCopy = {
  eyebrow: "আমাদের শাখা",
  title: "আপনার কাবুকি শাখা খুঁজুন",
  directionsCta: "দিকনির্দেশনা নিন",
  fujiCaption: "日本",
} as const;

export type Branch = {
  id: string;
  name: string;
  address: string;
  mapsUrl?: string;
  todo?: true;
};

export const branches: Branch[] = [
  {
    id: "chapainawabganj",
    name: "চাঁপাইনবাবগঞ্জ",
    address: "সার্কিট হাউস মোড়, চাঁপাইনবাবগঞ্জ",
    mapsUrl: "https://maps.google.com/?q=Circuit+House+More+Chapainawabganj",
  },
  {
    id: "nachole",
    name: "নাচোল",
    address: "কলেজ মোড়, নাচোল, চাঁপাইনবাবগঞ্জ",
    mapsUrl: "https://maps.google.com/?q=College+More+Nachole+Chapainawabganj",
  },
  {
    id: "dhaka",
    name: "ঢাকা",
    address: "বিস্তারিত জানতে যোগাযোগ করুন",
    todo: true,
  },
];
