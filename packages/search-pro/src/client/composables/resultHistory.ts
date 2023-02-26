import { useLocalStorage } from "@vueuse/core";
import { type Ref } from "vue";

import { searchProOptions } from "../define.js";
import { type MatchedItem } from "../utils/index.js";

const SEARCH_PRO_RESULT_STORAGE = "search-pro-result-history";

export interface SearchResultHistory {
  enabled: boolean;
  resultHistory: Ref<MatchedItem[]>;
  addResultHistory: (item: MatchedItem) => void;
  removeResultHistory: (index: number) => void;
}

const searchProResultStorage = useLocalStorage<MatchedItem[]>(
  SEARCH_PRO_RESULT_STORAGE,
  []
);

export const useSearchResultHistory = (): SearchResultHistory => {
  const { resultHistoryCount } = searchProOptions;

  const enabled = resultHistoryCount > 0;

  const addResultHistory = (item: MatchedItem): void => {
    if (enabled)
      if (searchProResultStorage.value.length < resultHistoryCount)
        searchProResultStorage.value = [item, ...searchProResultStorage.value];
      else
        searchProResultStorage.value = [
          item,
          ...searchProResultStorage.value.slice(0, resultHistoryCount - 1),
        ];
  };

  const removeResultHistory = (index: number): void => {
    searchProResultStorage.value = [
      ...searchProResultStorage.value.slice(0, index),
      ...searchProResultStorage.value.slice(index + 1),
    ];
  };

  return {
    enabled,
    resultHistory: searchProResultStorage,
    addResultHistory,
    removeResultHistory,
  };
};
