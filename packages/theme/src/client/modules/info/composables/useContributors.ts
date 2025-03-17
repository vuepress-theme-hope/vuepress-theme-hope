import type { GitContributorInfo } from "@vuepress/plugin-git";
import { useContributors as _useContributors } from "@vuepress/plugin-git/client";
import type { ComputedRef } from "vue";
import { computed } from "vue";
import { usePageFrontmatter } from "vuepress/client";

import { useThemeLocaleData } from "@theme-hope/composables/index";

import type { ThemeNormalPageFrontmatter } from "../../../../shared/index.js";

export const useContributors = (): ComputedRef<null | GitContributorInfo[]> => {
  const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
  const contributors = _useContributors();
  const themeLocale = useThemeLocaleData();

  return computed(() => {
    const showContributors =
      frontmatter.value.contributors ?? themeLocale.value.contributors ?? true;

    if (!showContributors) return null;

    return contributors.value;
  });
};
