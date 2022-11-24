import { useLocalStorage } from "@vueuse/core";

import type { Ref } from "vue";
import type { MatchedItem } from "../utils/result.js";

const SEARCH_PRO_STORAGE = "search-pro-history-results";

export interface SearchHistory {
  history: Ref<MatchedItem[]>;
  addHistory: (item: MatchedItem) => void;
}

const searchProStorage = useLocalStorage<MatchedItem[]>(SEARCH_PRO_STORAGE, []);

export const useSearchHistory = (limit = 5): SearchHistory => {
  const addHistory = (item: MatchedItem): void => {
    if (searchProStorage.value.length < limit)
      searchProStorage.value = [item, ...searchProStorage.value];
    else
      searchProStorage.value = [
        item,
        ...searchProStorage.value.slice(0, limit - 1),
      ];
  };

  return {
    history: searchProStorage,
    addHistory,
  };
};
