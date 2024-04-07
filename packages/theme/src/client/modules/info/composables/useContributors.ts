import type { GitContributor } from "@vuepress/plugin-git";
import type { ComputedRef } from "vue";
import { computed } from "vue";
import { usePageData, usePageFrontmatter } from "vuepress/client";

import { useThemeLocaleData } from "@theme-hope/composables/index";

import type {
  ThemeNormalPageFrontmatter,
  ThemePageData,
} from "../../../../shared/index.js";

export const useContributors = (): ComputedRef<null | GitContributor[]> => {
  const themeLocale = useThemeLocaleData();
  const page = usePageData<ThemePageData>();
  const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();

  return computed(() => {
    const showContributors =
      frontmatter.value.contributors ?? themeLocale.value.contributors ?? true;

    if (!showContributors) return null;

    return page.value.git?.contributors ?? null;
  });
};
