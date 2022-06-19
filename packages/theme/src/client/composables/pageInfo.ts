import { usePageData, usePageFrontmatter } from "@vuepress/client";
import { computed, inject, reactive } from "vue";
import {
  getAuthor,
  getCategory,
  getDate,
  getTag,
} from "vuepress-shared/lib/client";

import { useThemeLocaleData } from "./themeData";

import type {
  AuthorInfo,
  BasePageFrontMatter,
  DateInfo,
} from "vuepress-shared";
import type { GitData } from "@vuepress/plugin-git";
import type { ComputedRef } from "vue";
import type { ReadingTime } from "vuepress-plugin-reading-time2";
import type { CategoryMapRef } from "@theme-hope/module/blog/composables";
import type { PageInfoProps } from "@theme-hope/module/info/components/PageInfo";
import type { PageCategory, PageTag } from "@theme-hope/module/info/utils";
import type { HopeThemeNormalPageFrontmatter, PageInfo } from "../../shared";

declare const ENABLE_BLOG: boolean;
declare const ENABLE_VISITOR: boolean;

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
    }))
  );
};

export const usePageTag = (): ComputedRef<PageTag[]> => {
  const frontmatter = usePageFrontmatter<BasePageFrontMatter>();

  return computed(() =>
    getTag(frontmatter.value.tag).map((name) => ({
      name,
      // this is a hack
      path: ENABLE_BLOG
        ? inject<CategoryMapRef>(Symbol.for("tagMap"))?.value.map[name]?.path ||
          ""
        : "",
    }))
  );
};

export const usePageDate = (): ComputedRef<DateInfo | null> => {
  const frontmatter = usePageFrontmatter<BasePageFrontMatter>();
  const page = usePageData<{ git?: GitData }>();

  return computed(() => {
    const { date } = frontmatter.value;

    if (date) return getDate(date);

    const { createdTime } = page.value.git || {};

    if (createdTime) return getDate(new Date(createdTime));

    return null;
  });
};

export const usePageInfo = (): {
  config: PageInfoProps;
  items: ComputedRef<PageInfo[] | false | null>;
} => {
  const themeLocale = useThemeLocaleData();
  const page = usePageData<{
    git?: GitData;
    localizedDate: string;
    readingTime: ReadingTime;
  }>();
  const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
  const author = usePageAuthor();
  const category = usePageCategory();
  const tag = usePageTag();
  const date = usePageDate();

  const config = reactive<PageInfoProps>({
    author: author.value,
    category: category.value,
    date: date.value,
    localizedDate: page.value.localizedDate,
    tag: tag.value,
    isOriginal: frontmatter.value.isOriginal || false,
    readingTime: page.value.readingTime,
    pageview: ENABLE_VISITOR
      ? "pageview" in frontmatter.value
        ? frontmatter.value.pageview
        : true
      : false,
  });

  const items = computed(() =>
    "pageInfo" in frontmatter.value
      ? frontmatter.value.pageInfo
      : "pageInfo" in themeLocale.value
      ? themeLocale.value.pageInfo
      : null
  );

  return { config, items };
};
