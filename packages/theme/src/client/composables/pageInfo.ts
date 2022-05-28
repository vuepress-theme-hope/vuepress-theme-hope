import { usePageData, usePageFrontmatter, usePageLang } from "@vuepress/client";
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
  DateOptions,
} from "vuepress-shared";
import type { GitData } from "@vuepress/plugin-git";
import type { ComputedRef } from "vue";
import type { ReadingTime } from "vuepress-plugin-reading-time2";
import type { CategoryMapRef } from "@theme-hope/module/blog/composables";
import type { PageInfoProps } from "@theme-hope/module/info/components/PageInfo";
import type {
  HopeThemeNormalPageFrontmatter,
  PageCategory,
  PageInfo,
  PageTag,
} from "../../shared";

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
  const pageLang = usePageLang();

  return computed(() => {
    const { date } = frontmatter.value;
    const options: DateOptions = { lang: pageLang.value, type: "date" };

    if (date) return getDate(date, options);

    const { createdTime } = page.value.git || {};

    if (createdTime) return getDate(new Date(createdTime), options);

    return null;
  });
};

export const usePageInfo = (): {
  config: PageInfoProps;
  items: ComputedRef<PageInfo[] | false | undefined>;
} => {
  const themeLocale = useThemeLocaleData();
  const page = usePageData<{ readingTime: ReadingTime }>();
  const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
  const author = usePageAuthor();
  const category = usePageCategory();
  const tag = usePageTag();
  const date = usePageDate();

  const config = reactive<PageInfoProps>({
    author: author.value,
    category: category.value,
    date: date.value,
    tag: tag.value,
    isOriginal: frontmatter.value.isOriginal,
    readingTime: page.value.readingTime,
    pageview: ENABLE_VISITOR
      ? "pageview" in frontmatter.value
        ? frontmatter.value.pageview
        : true
      : false,
  });

  const items = computed(() =>
    frontmatter.value.pageInfo === false
      ? false
      : frontmatter.value.pageInfo || themeLocale.value.pageInfo
  );

  return { config, items };
};
