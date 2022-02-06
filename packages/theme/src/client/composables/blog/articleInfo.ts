import {
  getAuthor,
  getCategory,
  getDate,
  getTag,
} from "@mr-hope/vuepress-shared/lib/client";
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
import type { ArticleMeta } from "../../../shared";

export type AuthorRef = ComputedRef<AuthorInfo[]>;

export const useArticleAuthor = (article: Ref<ArticleMeta>): AuthorRef =>
  computed(() => {
    const { author } = article.value;

    if (author) return getAuthor(author);
    if (author === false) return [];

    const { author: themeAuthor } = useThemeData().value;

    return getAuthor(themeAuthor, false);
  });

export type CategoryRef = ComputedRef<ArticleCategory[]>;

export const useArticleCategory = (article: Ref<ArticleMeta>): CategoryRef => {
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

export const useArticleTag = (article: Ref<ArticleMeta>): TagRef => {
  const blogOptions = useBlogOptions();

  return computed(() =>
    getTag(article.value.tag).map((name) => ({
      name,
      path: blogOptions.value.tagPath.replace(/\$tag/g, decodeURI(name)),
    }))
  );
};

export type DateRef = ComputedRef<DateInfo | null>;

export const useArticleDate = (article: Ref<ArticleMeta>): DateRef =>
  computed(() => {
    const { date } = article.value;

    return date ? getDate(date, { type: "date" }) : null;
  });

export const useArticleInfo = (
  meta: Ref<ArticleMeta>
): UnwrapNestedRefs<ArticleInfoProps> => {
  const blogOptions = useBlogOptions();
  const author = useArticleAuthor(meta);
  const category = useArticleCategory(meta);
  const tag = useArticleTag(meta);
  const date = useArticleDate(meta);
  const pure = usePure();

  return reactive<ArticleInfoProps>({
    config: blogOptions.value.articleInfo,
    author: author.value,
    category: category.value,
    date: date.value,
    tag: tag.value,
    original: meta.value.isOriginal,
    readingTime: meta.value.readingTime,
    hint: !pure.value,
  });
};
