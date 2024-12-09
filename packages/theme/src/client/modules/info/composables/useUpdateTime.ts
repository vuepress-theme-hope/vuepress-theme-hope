import type { ComputedRef } from "vue";
import { computed } from "vue";
import {
  usePageData,
  usePageFrontmatter,
  useSiteLocaleData,
} from "vuepress/client";

import { useThemeLocaleData } from "@theme-hope/composables/index";

import type {
  ThemeNormalPageFrontmatter,
  ThemePageData,
} from "../../../../shared/index.js";

export const useUpdateTime = (): ComputedRef<null | string> => {
  const siteLocale = useSiteLocaleData();
  const themeLocale = useThemeLocaleData();
  const page = usePageData<ThemePageData>();
  const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();

  return computed(() => {
    const showLastUpdated =
      frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true;

    if (!showLastUpdated) return null;

    if (!page.value.git?.updatedTime) return null;

    const updatedDate = new Date(page.value.git.updatedTime);

    return updatedDate.toLocaleString(siteLocale.value.lang);
  });
};
