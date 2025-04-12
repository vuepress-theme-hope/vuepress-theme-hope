const EN_PREPOSITION = [
  "and",
  "or",
  "in",
  "on",
  "with",
  "by",
  "for",
  "at",
  "about",
  "under",
  "of",
  "to",
  "the",
  "into",
];

export const getTitleFromFilename = (filename: string): string => {
  const words = filename
    .replace(/[-_]/gu, " ")
    .replace(
      /(^|[^A-Z])([A-Z])/gu,
      (_all, match1: string, match2: string) =>
        `${match1} ${match2.toLowerCase()}`,
    )
    .replace(/ +/gu, " ")
    .trim()
    .split(" ");

  return words
    .map((word, index) =>
      EN_PREPOSITION.includes(word) && index !== 0
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
};
