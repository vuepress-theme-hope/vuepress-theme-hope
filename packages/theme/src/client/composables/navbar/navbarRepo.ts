import { isLinkHttp } from "@vuepress/shared";
import { computed } from "vue";
import { useThemeLocaleData } from "../themeData";
import { resolveRepoType } from "../../utils";

import type { ComputedRef } from "vue";
import type { AutoLink } from "../../../shared";

/**
 * Get navbar config of repository link
 */
export const useNavbarRepo = (): ComputedRef<AutoLink | null> => {
  const themeLocale = useThemeLocaleData();

  const repo = computed(() => themeLocale.value.repo);
  const repoType = computed(() =>
    repo.value ? resolveRepoType(repo.value) : null
  );

  const repoLink = computed(() => {
    if (repo.value && !isLinkHttp(repo.value))
      return `https://github.com/${repo.value}`;

    return repo.value;
  });

  const repoLabel = computed(() => {
    if (!repoLink.value) return null;
    if (themeLocale.value.repoLabel) return themeLocale.value.repoLabel;
    if (repoType.value === null) return "Source";
    return repoType.value;
  });

  return computed(() => {
    if (!repoLink.value || !repoLabel.value) return null;

    return {
      text: repoLabel.value,
      link: repoLink.value,
    };
  });
};
