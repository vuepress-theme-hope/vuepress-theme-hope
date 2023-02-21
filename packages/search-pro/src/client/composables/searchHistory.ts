import { useLocalStorage } from "@vueuse/core";
import { type Ref } from "vue";

import { searchProOptions } from "../define.js";
import { type MatchedItem } from "../utils/index.js";

const SEARCH_PRO_STORAGE = "search-pro-history-results";

export interface SearchHistory {
  history: Ref<MatchedItem[]>;
  addHistory: (item: MatchedItem) => void;
  removeHistory: (index: number) => void;
}

const searchProStorage = useLocalStorage<MatchedItem[]>(SEARCH_PRO_STORAGE, []);

export const useSearchHistory = (): SearchHistory => {
  const { historyCount } = searchProOptions;

  const addHistory = (item: MatchedItem): void => {
    if (searchProStorage.value.length < historyCount)
      searchProStorage.value = [item, ...searchProStorage.value];
    else
      searchProStorage.value = [
        item,
        ...searchProStorage.value.slice(0, historyCount - 1),
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
