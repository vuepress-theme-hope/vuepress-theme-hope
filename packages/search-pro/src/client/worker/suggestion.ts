import { type SearchIndex, autoSuggest } from "slimsearch";

import { getSearchOptions } from "./utils.js";
import { type IndexItem } from "../../shared/index.js";
import { type SearchOptions } from "../typings/index.js";

export const getSuggestions = (
  query: string,
  localeIndex: SearchIndex<IndexItem, string>,
  searchOptions: SearchOptions = {}
): string[] => {
  const suggestions = autoSuggest<IndexItem, string>(
    localeIndex,
    query,
    getSearchOptions(searchOptions)
  );

  return suggestions.map(({ suggestion }) => suggestion);
};
