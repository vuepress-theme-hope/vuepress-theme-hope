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
  HopeThemePageData,
  HopeThemeNormalPageFrontmatter,
  NavLink as NavLinkType,
} from "../../shared";

export const useEditNavLink = (): ComputedRef<null | NavLinkType> => {
  const themeLocale = useThemeLocaleData();
  const page = usePageData<HopeThemePageData>();
  const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();

  return computed(() => {
    const showEditLink =
      frontmatter.value.editLink ?? themeLocale.value.editLink ?? true;
    if (!showEditLink) {
      return null;
    }

    const {
      repo,
      docsRepo = repo,
      docsBranch = "main",
      docsDir = "",
      editLinkText,
    } = themeLocale.value;

    if (!docsRepo) return null;

    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern: themeLocale.value.editLinkPattern,
    });

    if (!editLink) return null;

    return {
      text: editLinkText ?? "Edit this page",
      link: editLink,
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
      frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true;

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
      frontmatter.value.contributors ?? themeLocale.value.contributors ?? true;

    if (!showContributors) return null;

    return page.value.git?.contributors ?? null;
  });
};
