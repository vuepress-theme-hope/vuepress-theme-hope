import type { ArticleMeta } from "../../shared";

export const compareDate = (
  dateA: Date | undefined,
  dateB: Date | undefined
): number => {
  if (!dateA) return 1;
  if (!dateB) return -1;

  return dateB.getTime() - dateA.getTime();
};

export const sortArticles = (
  articles: ArticleMeta[],
  compareKey?: "sticky" | "star"
): ArticleMeta[] =>
  articles.slice(0).sort((prev, next) => {
    if (compareKey) {
      const prevKey = prev[compareKey];
      const nextKey = next[compareKey];

      if (prevKey && nextKey && prevKey !== nextKey)
        return Number(nextKey) - Number(prevKey);
      if (prevKey && !nextKey) return -1;
      if (!prevKey && nextKey) return 1;
    }

    return compareDate(prev.date, next.date);
  });
