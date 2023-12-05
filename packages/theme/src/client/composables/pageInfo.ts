import { usePageData, usePageFrontmatter } from "@vuepress/client";
import type { GitData } from "@vuepress/plugin-git";
import type { ComputedRef } from "vue";
import { computed, inject } from "vue";
import type { ReadingTime } from "vuepress-plugin-reading-time2/client";
import {
  useReadingTimeData,
  useReadingTimeLocale,
} from "vuepress-plugin-reading-time2/client";
import type { AuthorInfo, BasePageFrontMatter } from "vuepress-shared/client";
import {
  getAuthor,
  getCategory,
  getDate,
  getTag,
} from "vuepress-shared/client";

import type {
  CategoryMapRef,
  TagMapRef,
} from "@theme-hope/modules/blog/composables/index";
import type { PageInfoProps } from "@theme-hope/modules/info/components/PageInfo";
import type {
  PageCategory,
  PageTag,
} from "@theme-hope/modules/info/utils/index";

import { useThemeLocaleData } from "./themeData.js";
import type {
  PageInfo,
  ThemeNormalPageFrontmatter,
} from "../../shared/index.js";

declare const ENABLE_BLOG: boolean;

export const usePageAuthor = (): ComputedRef<AuthorInfo[]> => {
  const themeLocale = useThemeLocaleData();
  const frontmatter = usePageFrontmatter<BasePageFrontMatter>();

  return computed(() => {
    const { author } = frontmatter.value;

    if (author) return getAuthor(author);
    if (author === false) return [];

    return getAuthor(themeLocale.value.author, false);
  });
};

export const usePageCategory = (): ComputedRef<PageCategory[]> => {
  const frontmatter = usePageFrontmatter<BasePageFrontMatter>();

  return computed(() =>
    getCategory(frontmatter.value.category).map((name) => ({
      name,
      // this is a hack
      path: ENABLE_BLOG
        ? inject<CategoryMapRef>(Symbol.for("categoryMap"))?.value.map[name]
            ?.path || ""
        : "",
    })),
  );
};

export const usePageTag = (): ComputedRef<PageTag[]> => {
  const frontmatter = usePageFrontmatter<BasePageFrontMatter>();

  return computed(() =>
    getTag(frontmatter.value.tag).map((name) => ({
      name,
      // this is a hack
      path: ENABLE_BLOG
        ? inject<TagMapRef>(Symbol.for("tagMap"))?.value.map[name]?.path || ""
        : "",
    })),
  );
};

export const usePageDate = (): ComputedRef<Date | null> => {
  const frontmatter = usePageFrontmatter<BasePageFrontMatter>();
  const page = usePageData<{ git?: GitData }>();

  return computed(() => {
    const date = getDate(frontmatter.value.date);

    if (date) return date;

    const { createdTime } = page.value.git || {};

    if (createdTime) return new Date(createdTime);

    return null;
  });
};

export const usePageInfo = (): {
  info: ComputedRef<PageInfoProps>;
  items: ComputedRef<PageInfo[] | false | null>;
} => {
  const themeLocale = useThemeLocaleData();
  const page = usePageData<{
    git?: GitData;
    localizedDate: string;
    readingTime?: ReadingTime;
  }>();
  const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
  const author = usePageAuthor();
  const category = usePageCategory();
  const tag = usePageTag();
  const date = usePageDate();
  const readingTimeData = useReadingTimeData();
  const readingTimeLocale = useReadingTimeLocale();

  const info = computed(
    () =>
      <PageInfoProps>{
        author: author.value,
        category: category.value,
        date: date.value,
        localizedDate: page.value.localizedDate,
        tag: tag.value,
        isOriginal: frontmatter.value.isOriginal || false,
        readingTime: readingTimeData.value,
        readingTimeLocale: readingTimeLocale.value,
        pageview:
          "pageview" in frontmatter.value ? frontmatter.value.pageview : true,
      },
  );

  const items = computed(() =>
    "pageInfo" in frontmatter.value
      ? frontmatter.value.pageInfo
      : "pageInfo" in themeLocale.value
        ? themeLocale.value.pageInfo
        : null,
  );

  return { info, items };
};
