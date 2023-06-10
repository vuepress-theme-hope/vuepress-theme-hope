import {
  usePageData,
  usePageFrontmatter,
  useSiteLocaleData,
} from "@vuepress/client";
import type { GitContributor } from "@vuepress/plugin-git";
import type { ComputedRef } from "vue";
import { computed } from "vue";

import { useThemeLocaleData } from "@theme-hope/composables/index";
import { resolveEditLink } from "@theme-hope/modules/info/utils/index";

import type {
  AutoLinkOptions,
  ThemeNormalPageFrontmatter,
  ThemePageData,
} from "../../../../shared/index.js";

export const useEditLink = (): ComputedRef<null | AutoLinkOptions> => {
  const themeLocale = useThemeLocaleData();
  const page = usePageData<ThemePageData>();
  const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();

  return computed(() => {
    const {
      repo,
      docsRepo = repo,
      docsBranch = "main",
      docsDir = "",
      editLink,
      editLinkPattern = "",
    } = themeLocale.value;

    const showEditLink = frontmatter.value.editLink ?? editLink ?? true;

    if (!showEditLink) return null;

    if (!docsRepo) return null;

    const link = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      editLinkPattern,
      filePathRelative: page.value.filePathRelative,
    });

    if (!link) return null;

    return {
      text: themeLocale.value.metaLocales.editLink,
      link,
    };
  });
};

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

    const updatedDate = new Date(page.value.git?.updatedTime);

    return updatedDate.toLocaleString(siteLocale.value.lang);
  });
};

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
