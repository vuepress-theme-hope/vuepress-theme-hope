import { isArray } from "@vuepress/helper/client";
import type { ComputedRef } from "vue";
import { computed } from "vue";
import { usePageFrontmatter } from "vuepress/client";

import { useThemeLocaleData } from "@theme-hope/composables/index";

import type { ThemeNormalPageFrontmatter } from "../../shared/index.js";

export interface MetaInfo {
  /** Whether to show "changelog" or not */
  changelog: ComputedRef<boolean>;

  /** Whether to show "Contributors" or not */
  contributors: ComputedRef<"as-content" | "as-meta" | boolean>;
  /** Whether to show "Last updated" or not */
  lastUpdated: ComputedRef<boolean>;
}

export const useMetaInfo = (): MetaInfo => {
  const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
  const themeLocale = useThemeLocaleData();

  const changelog = computed(
    () =>
      frontmatter.value.changelog ??
      ((themeLocale.value.changelog ?? false) && !frontmatter.value.home),
  );

  const contributors = computed(() => {
    const { contributors, home } = frontmatter.value;

    return isArray(contributors)
      ? (home as boolean | undefined)
        ? false
        : (themeLocale.value.contributors ?? true)
      : (contributors ??
          ((home as boolean | undefined)
            ? false
            : (themeLocale.value.contributors ?? true)));
  });

  const lastUpdated = computed(
    () =>
      frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true,
  );

  return {
    changelog,
    contributors,
    lastUpdated,
  };
};
