import {
  getAuthor,
  getCategory,
  getDate,
  getTag,
} from "@mr-hope/vuepress-shared/lib/client";
import { computed, reactive, Ref } from "vue";
import { useBlogOptions } from "./options";

import { usePure, useThemeData } from "@theme-hope/composables";

import type {
  ArticleCategory,
  ArticleInfoProps,
  ArticleTag,
} from "@mr-hope/vuepress-plugin-components";
import type { AuthorInfo, DateInfo } from "@mr-hope/vuepress-shared";
import type { ComputedRef, UnwrapNestedRefs } from "vue";
import type { ArticleInfo } from "../../../../shared";

export type AuthorRef = ComputedRef<AuthorInfo[]>;

export const useArticleAuthor = (info: Ref<ArticleInfo>): AuthorRef =>
  computed(() => {
    const { author } = info.value;

    if (author) return getAuthor(author);
    if (author === false) return [];

    const { author: themeAuthor } = useThemeData().value;

    return getAuthor(themeAuthor, false);
  });

export type CategoryRef = ComputedRef<ArticleCategory[]>;

export const useArticleCategory = (info: Ref<ArticleInfo>): CategoryRef => {
  const blogOptions = useBlogOptions();

  return computed(() =>
    getCategory(info.value.category).map((name) => ({
      name,
      path: blogOptions.value.categoryPath.replace(
        /\$category/g,
        decodeURI(name)
      ),
    }))
  );
};

export type TagRef = ComputedRef<ArticleTag[]>;

export const useArticleTag = (info: Ref<ArticleInfo>): TagRef => {
  const blogOptions = useBlogOptions();

  return computed(() =>
    getTag(info.value.tag).map((name) => ({
      name,
      path: blogOptions.value.tagPath.replace(/\$tag/g, decodeURI(name)),
    }))
  );
};

export type DateRef = ComputedRef<DateInfo | null>;

export const useArticleDate = (info: Ref<ArticleInfo>): DateRef =>
  computed(() => {
    const { date } = info.value;

    return date ? getDate(date, { type: "date" }) : null;
  });

export const useArticleInfo = (
  info: Ref<ArticleInfo>
): UnwrapNestedRefs<ArticleInfoProps> => {
  const blogOptions = useBlogOptions();
  const author = useArticleAuthor(info);
  const category = useArticleCategory(info);
  const tag = useArticleTag(info);
  const date = useArticleDate(info);
  const pure = usePure();

  return reactive<ArticleInfoProps>({
    config: blogOptions.value.articleInfo,
    author: author.value,
    category: category.value,
    date: date.value,
    tag: tag.value,
    isOriginal: info.value.isOriginal,
    readingTime: info.value.readingTime,
    hint: !pure.value,
  });
};
