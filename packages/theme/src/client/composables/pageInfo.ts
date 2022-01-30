import {
  getAuthor,
  getCategory,
  getDate,
  getTag,
} from "@mr-hope/vuepress-shared/lib/client";
import { usePageData, usePageFrontmatter } from "@vuepress/client";
import { computed, reactive } from "vue";
import { usePure, useThemeData, useThemeLocaleData } from "./themeData";

import type {
  ArticleCategory,
  ArticleTag,
  PageTitleProps,
} from "@mr-hope/vuepress-plugin-components";
import type {
  AuthorInfo,
  BasePageFrontMatter,
  DateInfo,
} from "@mr-hope/vuepress-shared";
import type { GitData } from "@vuepress/plugin-git";
import type { ComputedRef, UnwrapNestedRefs } from "vue";
import type { ReadingTime } from "vuepress-plugin-reading-time2";
import type { HopeThemeNormalPageFrontmatter } from "../../shared";

export type AuthorRef = ComputedRef<AuthorInfo[]>;

export const usePageAuthor = (): AuthorRef =>
  computed(() => {
    const { author } = usePageFrontmatter<BasePageFrontMatter>().value;

    if (author) return getAuthor(author);
    if (author === false) return [];

    const { author: themeAuthor } = useThemeData().value;

    return getAuthor(themeAuthor, false);
  });

export type CategoryRef = ComputedRef<ArticleCategory[]>;

export const usePageCategory = (): CategoryRef =>
  computed(() => {
    const { category } = usePageFrontmatter<BasePageFrontMatter>().value;

    // TODO: improve with Blog feature
    const { categoryPath = "" } = useThemeData().value.blog || {};

    return getCategory(category).map((name) => ({
      name,
      path: categoryPath.replace(/\$category/g, decodeURI(name)),
    }));
  });

export type TagRef = ComputedRef<ArticleTag[]>;

export const usePageTag = (): TagRef =>
  computed(() => {
    const { tag } = usePageFrontmatter<BasePageFrontMatter>().value;

    // TODO: improve with Blog feature
    const { tagPath = "" } = useThemeData().value.blog || {};

    return getTag(tag).map((name) => ({
      name,
      path: tagPath.replace(/\$tag/g, decodeURI(name)),
    }));
  });

export type DateRef = ComputedRef<DateInfo | null>;

export const usePageDate = (): DateRef =>
  computed(() => {
    const { date } = usePageFrontmatter<BasePageFrontMatter>().value;

    if (date) return getDate(date, { type: "date" });

    const { createdTime } = usePageData<{ git?: GitData }>().value.git || {};

    if (createdTime) return getDate(new Date(createdTime), { type: "date" });

    return null;
  });

export const usePageInfo = (): UnwrapNestedRefs<PageTitleProps> => {
  const themeLocale = useThemeLocaleData();
  const page = usePageData<{ readingTime: ReadingTime }>();
  const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
  const author = usePageAuthor();
  const category = usePageCategory();
  const tag = usePageTag();
  const date = usePageDate();
  const pure = usePure();

  return reactive<PageTitleProps>({
    config:
      frontmatter.value.pageInfo === false
        ? false
        : frontmatter.value.pageInfo || themeLocale.value.pageInfo,
    author: author.value,
    category: category.value,
    date: date.value,
    tag: tag.value,
    original: frontmatter.value.original,
    readingTime: page.value.readingTime,
    visitor: frontmatter.value.visitor !== false,
    hint: !pure.value,
  });
};
