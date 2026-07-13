export const GetMonthIndex = (iso: string) => {
  return new Date(iso).getMonth();
};

export const SUM = (arr: number[]) => {
  return arr.reduce((a, b) => a + b, 0);
};

export const Capitalize = (slug: string): string => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const Initials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "U";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
};

export const Slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");
};

export const TrimText = (s?: string) => (s ?? "").trim();
