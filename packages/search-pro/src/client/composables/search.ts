import { useRouteLocale } from "@vuepress/client";
import { useDebounceFn } from "@vueuse/core";
import type { Ref } from "vue";
import { onMounted, onUnmounted, ref, shallowRef, watch } from "vue";

import { searchProOptions } from "../define.js";
import { useSearchOptions } from "../helpers/index.js";
import type { SearchResult } from "../typings/index.js";
import { createSearchWorker } from "../utils/index.js";

export interface SearchRef {
  searching: Ref<boolean>;
  results: Ref<SearchResult[]>;
}

export const useSearchResult = (query: Ref<string>): SearchRef => {
  const searchOptions = useSearchOptions();
  const routeLocale = useRouteLocale();
  const { search, terminate } = createSearchWorker();

  const searching = ref(false);
  const results = shallowRef<SearchResult[]>([]);

  onMounted(() => {
    const endSearch = (): void => {
      results.value = [];
      searching.value = false;
    };

    const performSearch = useDebounceFn((queryString: string): void => {
      searching.value = true;

      if (queryString)
        void search({
          type: "search",
          query: queryString,
          locale: routeLocale.value,
          options: searchOptions,
        })
          .then((searchResults) => {
            results.value = searchResults;
            searching.value = false;
          })
          .catch((err) => {
            console.error(err);
            endSearch();
          });
      else endSearch();
    }, searchProOptions.searchDelay);

    watch([query, routeLocale], () => performSearch(query.value), {
      immediate: true,
    });

    onUnmounted(() => {
      terminate();
    });
  });

  return {
    searching,
    results,
  };
};
