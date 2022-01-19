import { computed } from "vue";
import type { ComputedRef } from "vue";
import {
  usePageData,
  usePageFrontmatter,
  useSiteLocaleData,
} from "@vuepress/client";
import { useThemeLocaleData } from "./themeData";
import { resolveEditLink } from "../utils";

import type {
  AutoLink,
  HopeThemePageData,
  HopeThemeNormalPageFrontmatter,
} from "../../shared";

export const useEditLink = (): ComputedRef<null | AutoLink> => {
  const themeLocale = useThemeLocaleData();
  const page = usePageData<HopeThemePageData>();
  const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();

  return computed(() => {
    const navbarRepo = themeLocale.value.navbar?.repo;
    const {
      docsRepo = navbarRepo,
      docsBranch = "main",
      docsDir = "",
      editLink,
      editLinkPattern,
    } = themeLocale.value.meta || {};

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
  const page = usePageData<HopeThemePageData>();
  const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();

  return computed(() => {
    const showLastUpdated =
      frontmatter.value.meta?.lastUpdated ??
      themeLocale.value.meta?.lastUpdated ??
      true;

    if (!showLastUpdated) return null;

    if (!page.value.git?.updatedTime) return null;

    const updatedDate = new Date(page.value.git?.updatedTime);

    return updatedDate.toLocaleString(siteLocale.value.lang);
  });
};

export const useContributors = (): ComputedRef<
  null | Required<HopeThemePageData["git"]>["contributors"]
> => {
  const themeLocale = useThemeLocaleData();
  const page = usePageData<HopeThemePageData>();
  const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();

  return computed(() => {
    const showContributors =
      frontmatter.value.meta?.contributors ??
      themeLocale.value.meta?.contributors ??
      true;

    if (!showContributors) return null;

    return page.value.git?.contributors ?? null;
  });
};
