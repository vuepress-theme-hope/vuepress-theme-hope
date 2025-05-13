import { isArray } from "@vuepress/helper/client";
import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useData } from "@theme-hope/composables/useData";

export interface MetaInfo {
  /** Whether to show "changelog" or not */
  changelog: ComputedRef<boolean>;

  /** Whether to show "Contributors" or not */
  contributors: ComputedRef<"content" | "meta" | boolean>;
  /** Whether to show "Last updated" or not */
  lastUpdated: ComputedRef<boolean>;
}

export const useMetaInfo = (): MetaInfo => {
  const { frontmatter, themeLocale } = useData();

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
