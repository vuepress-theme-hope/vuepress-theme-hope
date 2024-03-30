import { useLocalStorage } from "@vueuse/core";
import type { Ref } from "vue";

import { searchProOptions } from "../define.js";

const SEARCH_PRO_HISTORY_QUERY_STORAGE = "SEARCH_PRO_QUERY_HISTORY";

export interface SearchQueryHistory {
  enabled: boolean;
  queryHistory: Ref<string[]>;
  addQueryHistory: (item: string) => void;
  removeQueryHistory: (index: number) => void;
}

const searchProQueryStorage = useLocalStorage<string[]>(
  SEARCH_PRO_HISTORY_QUERY_STORAGE,
  [],
);

export const useSearchQueryHistory = (): SearchQueryHistory => {
  const { queryHistoryCount } = searchProOptions;
  const enabled = queryHistoryCount > 0;

  const addQueryHistory = (item: string): void => {
    if (enabled)
      searchProQueryStorage.value = Array.from(
        new Set([
          item,
          ...searchProQueryStorage.value.slice(0, queryHistoryCount - 1),
        ]),
      );
  };

  const removeQueryHistory = (index: number): void => {
    searchProQueryStorage.value = [
      ...searchProQueryStorage.value.slice(0, index),
      ...searchProQueryStorage.value.slice(index + 1),
    ];
  };

  return {
    enabled,
    queryHistory: searchProQueryStorage,
    addQueryHistory,
    removeQueryHistory,
  };
};
