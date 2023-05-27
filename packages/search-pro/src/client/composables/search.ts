import { useRouteLocale } from "@vuepress/client";
import { useDebounceFn } from "@vueuse/core";
import { type Ref, ref, shallowRef, watch } from "vue";

import { searchProOptions } from "../define.js";
import { useSearchOptions } from "../helpers/index.js";
import { type SearchResult } from "../typings/index.js";
import { createSearchWorker } from "../utils/index.js";

export interface SearchRef {
  searching: Ref<boolean>;
  results: Ref<SearchResult[]>;
  terminate: () => void;
}

export const useSearchResult = (query: Ref<string>): SearchRef => {
  const searchOptions = useSearchOptions();
  const routeLocale = useRouteLocale();
  const { search, terminate } = createSearchWorker();

  const searching = ref(false);
  const results = shallowRef<SearchResult[]>([]);

  const endSearch = (): void => {
    results.value = [];
    searching.value = false;
  };

  const performSearch = useDebounceFn((queryString: string): void => {
    searching.value = true;

    if (queryString)
      void search(queryString, routeLocale.value, searchOptions)
        .then((searchResults) => {
          results.value = searchResults;
          searching.value = false;
        })
        .catch((err) => {
          console.error(err);
          endSearch();
        });
    else endSearch();
  }, searchProOptions.delay);

  watch([query, routeLocale], () => performSearch(query.value), {
    immediate: true,
  });

  return {
    searching,
    results,
    terminate,
  };
};
