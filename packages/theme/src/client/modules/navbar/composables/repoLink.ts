import { isLinkHttp } from "@vuepress/shared";
import { computed } from "vue";

import { useThemeLocaleData } from "@theme-hope/composables/index.js";
import { resolveRepoType } from "@theme-hope/utils/index.js";

import type { ComputedRef } from "vue";
import type { RepoType } from "@theme-hope/utils/index.js";

export interface RepoConfig {
  type: Exclude<RepoType, null> | "Source";
  label: string;
  link: string;
}

/**
 * Get navbar config of repository link
 */
export const useNavbarRepo = (): ComputedRef<RepoConfig | null> => {
  const themeLocale = useThemeLocaleData();

  const repo = computed(() => themeLocale.value.repo || null);
  const repoType = computed(() =>
    repo.value ? resolveRepoType(repo.value) : null
  );

  const repoLink = computed(() =>
    repo.value && !isLinkHttp(repo.value)
      ? `https://github.com/${repo.value}`
      : repo.value
  );

  const repoLabel = computed(() =>
    !repoLink.value
      ? null
      : themeLocale.value.repoLabel ??
        (repoType.value === null ? "Source" : repoType.value)
  );

  return computed(() => {
    if (
      !repoLink.value ||
      !repoLabel.value ||
      themeLocale.value.repoDisplay === false
    )
      return null;

    return {
      type: repoType.value || "Source",
      label: repoLabel.value,
      link: repoLink.value,
    };
  });
};
