const EN_PREPOSITION = [
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

export const getTitle = (dirname: string): string => {
  const words = dirname
    .replace(/([A-Z])/g, "-$1")
    .replace(/[-_]/g, " ")
    .replace(/ +/g, " ")
    .trim()
    .toLowerCase()
    .split(" ");

  return words
    .map((word, index) =>
      EN_PREPOSITION.includes(word) && index !== 0
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
};
