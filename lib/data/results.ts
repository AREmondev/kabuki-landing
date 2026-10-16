export const resultsCopy = {
  eyebrow: "প্রতিবেদিত ফলাফল",
  title: "সাম্প্রতিক ফলাফল",
  description: "সাম্প্রতিক ব্যাচের প্রতিবেদিত ফলাফল।",
} as const;

export type ResultStat = {
  id: string;
  value: string;
  label: string;
  verified: boolean;
  todo?: true;
};

export const results: ResultStat[] = [];
