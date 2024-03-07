import { startsWith } from "@vuepress/helper/client";
import { useDebounceFn } from "@vueuse/core";
import type { Ref } from "vue";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { usePageData, useRouteLocale } from "vuepress/client";

import { enableAutoSuggestions, searchProOptions } from "../define.js";
import { useSearchOptions } from "../helpers/index.js";
import { createSearchWorker } from "../utils/index.js";

export interface SuggestionsRef {
  suggestions: Ref<string[]>;
}

export const useSearchSuggestions = (query: Ref<string>): SuggestionsRef => {
  const suggestions = ref<string[]>([]);

  if (enableAutoSuggestions) {
    const searchOptions = useSearchOptions();
    const pageData = usePageData();
    const routeLocale = useRouteLocale();

    onMounted(() => {
      const { suggest, terminate } = createSearchWorker();

      const performAutoSuggest = useDebounceFn((queryString: string): void => {
        if (queryString)
          void suggest(queryString, routeLocale.value, searchOptions.value)
            .then(
              (suggestions) =>
                searchOptions.value.suggestionsFilter?.(
                  suggestions,
                  queryString,
                  routeLocale.value,
                  pageData.value,
                ) ?? suggestions,
            )
            .then((_suggestions) => {
              suggestions.value = _suggestions.length
                ? startsWith(_suggestions[0], queryString) &&
                  !_suggestions[0].slice(queryString.length).includes(" ")
                  ? _suggestions
                  : [queryString, ..._suggestions]
                : [];
            })
            .catch((err) => {
              console.error(err);
            });
        else suggestions.value = [];
      }, searchProOptions.suggestDelay);

      watch([query, routeLocale], () => performAutoSuggest(query.value), {
        immediate: true,
      });

      onUnmounted(() => {
        terminate();
      });
    });
  }

  return {
    suggestions,
  };
};
