import type { SearchIndex } from "slimsearch";
import { autoSuggest } from "slimsearch";

import type { IndexItem } from "../../shared/index.js";
import type { WorkerSearchOptions } from "../typings/index.js";

export const getSuggestions = (
  query: string,
  localeIndex: SearchIndex<string, IndexItem, IndexItem>,
  searchOptions: WorkerSearchOptions = {},
): string[] => {
  const suggestions = autoSuggest(localeIndex, query, {
    fuzzy: 0.2,
    maxFuzzy: 3,
    ...searchOptions,
  }).map(({ suggestion }) => suggestion);

  // filter multi-word suggestions if query is not multi-word
  return query.includes(" ")
    ? suggestions
    : suggestions.filter((suggestion) => !suggestion.includes(" "));
};
