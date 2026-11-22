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
  /** Where to display the share buttons, or `false` to hide them / 分享按钮的显示位置，`false` 表示隐藏 */
  share: ComputedRef<false | "left" | "right">;
}

export const useMetaInfo = (): MetaInfo => {
  const { frontmatter, themeLocale } = useData();

  const changelog = computed(
    () =>
      frontmatter.value.changelog ??
      ((themeLocale.value.changelog ?? false) && !frontmatter.value.home),
  );

  const contributors = computed(() => {
    // oxlint-disable-next-line no-shadow
    const { contributors, home } = frontmatter.value;

    return isArray(contributors)
      ? (home as boolean | undefined)
        ? false
        : (themeLocale.value.contributors ?? true)
      : (contributors ??
          ((home as boolean | undefined) ? false : (themeLocale.value.contributors ?? true)));
  });

  const lastUpdated = computed(
    () => frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true,
  );

  const share = computed<false | "left" | "right">(() => {
    const localeOption = themeLocale.value.share ?? "right";
    const option = frontmatter.value.share ?? localeOption;

    if (option === false) return false;
    // `true` only comes from frontmatter, which keeps the placement configured by the theme
    if (option === true) return localeOption === false ? "right" : localeOption;

    return option;
  });

  return {
    changelog,
    contributors,
    lastUpdated,
    share,
  };
};
