import { getDate } from "@vuepress/helper/client";
import type { GitData } from "@vuepress/plugin-git";
import {
  useReadingTimeData,
  useReadingTimeLocale,
} from "@vuepress/plugin-reading-time/client";
import type { ComputedRef } from "vue";
import { computed, inject } from "vue";
import { usePageData, usePageFrontmatter } from "vuepress/client";

import type {
  CategoryMapRef,
  TagMapRef,
} from "@theme-hope/modules/blog/composables/index";
import type { PageInfoProps } from "@theme-hope/modules/info/components/PageInfo";
import type {
  PageCategory,
  PageTag,
} from "@theme-hope/modules/info/utils/index";

import { useAuthorInfo } from "./useAuthorInfo.js";
import { useThemeLocaleData } from "./useThemeData.js";
import type {
  AuthorInfo,
  PageInfoType,
  ThemeBasePageFrontmatter,
  ThemeNormalPageFrontmatter,
} from "../../shared/index.js";
import { getAuthor, getCategory, getTag } from "../../shared/index.js";

declare const __VP_BLOG__: boolean;

export const usePageAuthor = (): ComputedRef<AuthorInfo[]> => {
  const frontmatter = usePageFrontmatter<ThemeBasePageFrontmatter>();
  const authorInfo = useAuthorInfo();

  return computed(() => {
    const { author } = frontmatter.value;

    if (author) return getAuthor(author);
    if (author === false) return [];

    return getAuthor(authorInfo.value, false);
  });
};

export const usePageCategory = (): ComputedRef<PageCategory[]> => {
  const frontmatter = usePageFrontmatter<ThemeBasePageFrontmatter>();
  const categoryMap = __VP_BLOG__
    ? inject<CategoryMapRef>(Symbol.for("categoryMap"))
    : null;

  return computed(() =>
    getCategory(frontmatter.value.category ?? frontmatter.value.categories).map(
      (name) => ({
        name,
        path: categoryMap?.value.map[name]?.path ?? "",
      }),
    ),
  );
};

export const usePageTag = (): ComputedRef<PageTag[]> => {
  const frontmatter = usePageFrontmatter<ThemeBasePageFrontmatter>();
  const tagMap = __VP_BLOG__ ? inject<TagMapRef>(Symbol.for("tagMap")) : null;

  return computed(() =>
    getTag(frontmatter.value.tag ?? frontmatter.value.tags).map((name) => ({
      name,
      path: tagMap?.value.map[name]?.path ?? "",
    })),
  );
};

export const usePageDate = (): ComputedRef<Date | null> => {
  const frontmatter = usePageFrontmatter<ThemeBasePageFrontmatter>();
  const page = usePageData<{ git?: GitData }>();

  return computed(() => {
    const date = getDate(frontmatter.value.date);

    if (date) return date;

    const { createdTime } = page.value.git ?? {};

    if (createdTime) return new Date(createdTime);

    return null;
  });
};

export const usePageInfo = (): {
  info: ComputedRef<PageInfoProps>;
  items: ComputedRef<PageInfoType[] | false | null>;
} => {
  const themeLocale = useThemeLocaleData();
  const frontmatter = usePageFrontmatter<ThemeNormalPageFrontmatter>();
  const author = usePageAuthor();
  const category = usePageCategory();
  const tag = usePageTag();
  const date = usePageDate();
  const readingTimeData = useReadingTimeData();
  const readingTimeLocale = useReadingTimeLocale();

  const info = computed(
    () =>
      ({
        author: author.value,
        category: category.value,
        date: date.value,
        tag: tag.value,
        isOriginal: frontmatter.value.isOriginal ?? false,
        readingTime: readingTimeData.value,
        readingTimeLocale: readingTimeLocale.value,
        pageview: frontmatter.value.pageview ?? true,
      }) as PageInfoProps,
  );

  const items = computed(
    () => frontmatter.value.pageInfo ?? themeLocale.value.pageInfo ?? null,
  );

  return { info, items };
};
