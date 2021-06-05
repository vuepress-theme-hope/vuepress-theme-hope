import { usePageData } from "@vuepress/client";
import { ComputedRef, computed } from "vue";

export type PageTitleRef = ComputedRef<string>;

export const usePageTitle = (): PageTitleRef =>
  computed(() => usePageData().value.title);
