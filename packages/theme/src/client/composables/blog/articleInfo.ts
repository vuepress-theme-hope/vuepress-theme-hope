import {
  getAuthor,
  getCategory,
  getDate,
  getTag,
} from "@mr-hope/vuepress-shared/lib/client";
import { usePageData, usePageFrontmatter } from "@vuepress/client";
import { computed, reactive, Ref } from "vue";
import { useBlogOptions } from "./options";
import { usePure, useThemeData } from "../themeData";

import type {
  ArticleCategory,
  ArticleInfoProps,
  ArticleTag,
} from "@mr-hope/vuepress-plugin-components";
import type { AuthorInfo, DateInfo } from "@mr-hope/vuepress-shared";
import type { ComputedRef, UnwrapNestedRefs } from "vue";
import type { ReadingTime } from "vuepress-plugin-reading-time2";
import type {
  ArticleDetail,
  HopeThemeNormalPageFrontmatter,
} from "../../../shared";

export type AuthorRef = ComputedRef<AuthorInfo[]>;

export const useArticleAuthor = (article: Ref<ArticleDetail>): AuthorRef =>
  computed(() => {
    const { author } = article.value;

    if (author) return getAuthor(author);
    if (author === false) return [];

    const { author: themeAuthor } = useThemeData().value;

    return getAuthor(themeAuthor, false);
  });

export type CategoryRef = ComputedRef<ArticleCategory[]>;

export const useArticleCategory = (
  article: Ref<ArticleDetail>
): CategoryRef => {
  const blogOptions = useBlogOptions();

  return computed(() =>
    getCategory(article.value.category).map((name) => ({
      name,
      path: blogOptions.value.categoryPath.replace(
        /\$category/g,
        decodeURI(name)
      ),
    }))
  );
};

export type TagRef = ComputedRef<ArticleTag[]>;

export const useArticleTag = (article: Ref<ArticleDetail>): TagRef => {
  const blogOptions = useBlogOptions();

  return computed(() =>
    getTag(article.value.tag).map((name) => ({
      name,
      path: blogOptions.value.tagPath.replace(/\$tag/g, decodeURI(name)),
    }))
  );
};

export type DateRef = ComputedRef<DateInfo | null>;

export const useArticleDate = (article: Ref<ArticleDetail>): DateRef =>
  computed(() => {
    const { date } = article.value;

    return date ? getDate(date, { type: "date" }) : null;
  });

export const useArticleInfo = (
  article: Ref<ArticleDetail>
): UnwrapNestedRefs<ArticleInfoProps> => {
  const blogOptions = useBlogOptions();
  const page = usePageData<{ readingTime: ReadingTime }>();
  const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
  const author = useArticleAuthor(article);
  const category = useArticleCategory(article);
  const tag = useArticleTag(article);
  const date = useArticleDate(article);
  const pure = usePure();

  return reactive<ArticleInfoProps>({
    config: blogOptions.value.articleInfo,
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
