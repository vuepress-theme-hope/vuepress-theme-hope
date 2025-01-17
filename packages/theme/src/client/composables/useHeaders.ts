import type { HeaderItem } from "@vuepress/helper/client";
import { getHeaders } from "@vuepress/helper/client";
import { watchImmediate } from "@vueuse/core";
import type { Ref } from "vue";
import { computed, onMounted, ref } from "vue";
import { usePageFrontmatter, useRoutePath } from "vuepress/client";

import { useThemeLocaleData } from "@theme-hope/composables/index";

import type { ThemeNormalPageFrontmatter } from "../../shared/index.js";

export type HeadersRef = Ref<HeaderItem[]>;

export const headersRef: HeadersRef = ref([]);

/**
 * Inject headers
 */
export const useHeaders = (): HeadersRef => headersRef;

export const setupHeaders = (): void => {
  const routePath = useRoutePath();
  const themeLocale = useThemeLocaleData();
  const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
  const headerDepth = computed(
    () => frontmatter.value.headerDepth ?? themeLocale.value.headerDepth ?? 2,
  );

  const updateHeaders = (): void => {
    if (headerDepth.value <= 0) {
      headersRef.value = [];

      return;
    }

    headersRef.value = getHeaders({
      levels: [2, headerDepth.value + 1],
      ignore: [".vp-badge"],
    });
  };

  onMounted(() => {
    watchImmediate(routePath, updateHeaders, { flush: "post" });
  });
};
