import { useRouteLocale } from "@vuepress/client";
import { useDebounceFn } from "@vueuse/core";
import { type Ref, computed, ref, watch } from "vue";

import { searchIndex } from "./searchIndex.js";
import { searchProDelay } from "../define.js";
import { type Result, getResults } from "../utils/index.js";

export const useSearchResults = (query: Ref<string>): Ref<Result[]> => {
  const routeLocale = useRouteLocale();
  const results = ref<Result[]>([]);

  const localeIndex = computed(() => searchIndex.value[routeLocale.value]);
  const updateResults = useDebounceFn((queryString: string): void => {
    results.value = queryString
      ? getResults(queryString, localeIndex.value)
      : [];
  }, searchProDelay);

  watch([query, routeLocale], () => {
    void updateResults(query.value);
  });

  return results;
};
