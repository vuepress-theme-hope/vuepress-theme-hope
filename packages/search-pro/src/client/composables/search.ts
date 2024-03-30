import { useDebounceFn } from "@vueuse/core";
import type { Ref } from "vue";
import { computed, onMounted, onUnmounted, ref, shallowRef, watch } from "vue";
import { usePageData, useRouteLocale } from "vuepress/client";

import { createSearchWorker } from "../createSearchWorker.js";
import { searchProOptions } from "../define.js";
import { useSearchOptions } from "../helpers/index.js";
import type { SearchResult } from "../typings/index.js";

export interface SearchRef {
  isSearching: Ref<boolean>;
  results: Ref<SearchResult[]>;
}

export const useSearchResult = (queries: Ref<string[]>): SearchRef => {
  const searchOptions = useSearchOptions();
  const routeLocale = useRouteLocale();
  const pageData = usePageData();

  const searchingProcessNumber = ref(0);
  const isSearching = computed(() => searchingProcessNumber.value > 0);
  const results = shallowRef<SearchResult[]>([]);

  onMounted(() => {
    const { search, terminate } = createSearchWorker();

    const performSearch = useDebounceFn((queries: string[]): void => {
      const query = queries.join(" ");
      const {
        searchFilter = (results): SearchResult[] => results,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        splitWord,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        suggestionsFilter,
        ...options
      } = searchOptions.value;

      if (query) {
        searchingProcessNumber.value += 1;

        search(queries.join(" "), routeLocale.value, options)
          .then((results) =>
            searchFilter(results, query, routeLocale.value, pageData.value),
          )
          .then((_results) => {
            searchingProcessNumber.value -= 1;
            results.value = _results;
          })
          .catch((err) => {
            console.warn(err);
            searchingProcessNumber.value -= 1;
            if (!searchingProcessNumber.value) results.value = [];
          });
      } else {
        results.value = [];
      }
    }, searchProOptions.searchDelay - searchProOptions.suggestDelay);

    watch([queries, routeLocale], ([queries]) => performSearch(queries), {
      immediate: true,
    });

    onUnmounted(() => {
      terminate();
    });
  });

  return {
    isSearching,
    results,
  };
};
