import { useLocalStorage } from "@vueuse/core";
import { searchProHistoryCount } from "../define.js";

import type { Ref } from "vue";
import type { MatchedItem } from "../utils/result.js";

const SEARCH_PRO_STORAGE = "search-pro-history-results";

export interface SearchHistory {
  history: Ref<MatchedItem[]>;
  addHistory: (item: MatchedItem) => void;
  removeHistory: (index: number) => void;
}

const searchProStorage = useLocalStorage<MatchedItem[]>(SEARCH_PRO_STORAGE, []);

export const useSearchHistory = (): SearchHistory => {
  const addHistory = (item: MatchedItem): void => {
    if (searchProStorage.value.length < searchProHistoryCount)
      searchProStorage.value = [item, ...searchProStorage.value];
    else
      searchProStorage.value = [
        item,
        ...searchProStorage.value.slice(0, searchProHistoryCount - 1),
      ];
  };

  const removeHistory = (index: number): void => {
    searchProStorage.value = [
      ...searchProStorage.value.slice(0, index),
      ...searchProStorage.value.slice(index + 1),
    ];
  };

  return {
    history: searchProStorage,
    addHistory,
    removeHistory,
  };
};
