import { isLinkHttp } from "@vuepress/shared";
import { computed } from "vue";
import { useNavbarLocaleData } from "./navbar";
import { resolveRepoType } from "../utils";

import type { ComputedRef } from "vue";
import type { RepoType } from "../utils";

export interface RepoConfig {
  type: RepoType | "Source";
  label: string;
  link: string;
}

/**
 * Get navbar config of repository link
 */
export const useNavbarRepo = (): ComputedRef<RepoConfig | null> => {
  const navbarLocale = useNavbarLocaleData();

  const repo = computed(() => navbarLocale.value.repo);
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
    if (navbarLocale.value.repoLabel) return navbarLocale.value.repoLabel;
    if (repoType.value === null) return "Source";
    return repoType.value;
  });

  return computed(() => {
    if (!repoLink.value || !repoLabel.value) return null;

    return {
      type: repoType.value || "Source",
      label: repoLabel.value,
      link: repoLink.value,
    };
  });
};
