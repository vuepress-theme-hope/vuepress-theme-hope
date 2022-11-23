import { database } from "@temp/search-pro/index";
import { atou } from "vuepress-shared/client";
import { computed, ref } from "vue";

import type { SearchIndex } from "../../shared/index.js";

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __VUEPRESS_DEV__: boolean;
declare const __VUE_HMR_RUNTIME__: Record<string, unknown>;

const compressedSearchIndex = ref(database);

export const searchIndex = computed(
  () => <SearchIndex>JSON.parse(atou(compressedSearchIndex.value))
);

// @ts-ignore
if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot))
  __VUE_HMR_RUNTIME__["updateSearchProDatabase"] = (database: string): void => {
    compressedSearchIndex.value = database;
  };
