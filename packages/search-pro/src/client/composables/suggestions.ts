import { startsWith } from "@vuepress/helper/client";
import type { Ref } from "vue";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { usePageData, useRouteLocale } from "vuepress/client";

import { createSearchWorker } from "../createSearchWorker.js";
import { enableAutoSuggestions } from "../define.js";
import { useSearchOptions } from "../helpers/index.js";

export interface SuggestionsRef {
  suggestions: Ref<string[]>;
}

export const useSearchSuggestions = (
  queries: Ref<string[]>,
): SuggestionsRef => {
  const suggestions = ref<string[]>([]);

  if (enableAutoSuggestions) {
    const searchOptions = useSearchOptions();
    const pageData = usePageData();
    const routeLocale = useRouteLocale();

    onMounted(() => {
      const { suggest, terminate } = createSearchWorker();

      const performSuggestion = (queries: string[]): void => {
        const query = queries.join(" ");
        const {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          searchFilter,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          splitWord,
          suggestionsFilter = (suggestions): string[] => suggestions,
          ...options
        } = searchOptions.value;

        if (query)
          suggest(query, routeLocale.value, options)
            .then((suggestions) =>
              suggestionsFilter(
                suggestions,
                query,
                routeLocale.value,
                pageData.value,
              ),
            )
            .then((_suggestions) => {
              suggestions.value = _suggestions.length
                ? startsWith(_suggestions[0], query) &&
                  !_suggestions[0].slice(query.length).includes(" ")
                  ? _suggestions
                  : [query, ..._suggestions]
                : [];
            })
            .catch((err) => {
              console.warn(err);
            });
        else suggestions.value = [];
      };

      watch([queries, routeLocale], ([queries]) => performSuggestion(queries), {
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
