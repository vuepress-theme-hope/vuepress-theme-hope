import { useLocalStorage } from "@vueuse/core";
import { readonly } from "vue";
import type { DeepReadonly, Ref } from "vue";

const SEARCH_PRO_STORAGE = "search-pro-history";

export interface SearchHistory {
  history: DeepReadonly<Ref<string[]>>;
  addHistory: (query: string) => void;
}

const searchProStorage = useLocalStorage<string[]>(SEARCH_PRO_STORAGE, []);

export const useSearchHistory = (limit = 5): SearchHistory => {
  const addHistory = (query: string): void => {
    if (searchProStorage.value.length < limit)
      searchProStorage.value = [query, ...searchProStorage.value];
    else
      searchProStorage.value = [
        ...searchProStorage.value.slice(0, limit - 1),
        query,
      ];
  };

  return {
    history: readonly(searchProStorage),
    addHistory,
  };
};
