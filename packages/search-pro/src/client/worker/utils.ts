import type { SearchOptions } from "../typings/index.js";

const CHINESE_CHARACTERS = /[\u4e00-\u9fa5]/g;

export const getSearchOptions = (
  searchOptions: SearchOptions = {},
): SearchOptions => ({
  fuzzy: 0.2,
  prefix: true,
  processTerm: (term): string[] => {
    const chineseCharacters = term.match(CHINESE_CHARACTERS) || [];
    const englishTerm = term.replace(CHINESE_CHARACTERS, "").toLowerCase();

    return englishTerm
      ? [englishTerm, ...chineseCharacters]
      : [...chineseCharacters];
  },
  ...searchOptions,
});
