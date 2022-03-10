import {
  getAuthor,
  getCategory,
  getDate,
  getTag,
} from "@mr-hope/vuepress-shared/lib/client";
import { usePageLang } from "@vuepress/client";
import { computed, reactive, Ref } from "vue";
import { useCategoryMap } from "./categoryMap";
import { useBlogOptions } from "./options";
import { useTagMap } from "./tagMap";

import { usePure, useThemeLocaleData } from "@theme-hope/composables";

import type {
  ArticleCategory,
  ArticleInfoProps,
  ArticleTag,
} from "@mr-hope/vuepress-plugin-components";
import type { AuthorInfo, DateInfo } from "@mr-hope/vuepress-shared";
import type { ComputedRef, UnwrapNestedRefs } from "vue";
import type { ArticleInfo } from "../../../../shared";

export type AuthorRef = ComputedRef<AuthorInfo[]>;

export const useArticleAuthor = (info: Ref<ArticleInfo>): AuthorRef => {
  const themeLocale = useThemeLocaleData();

  return computed(() => {
    const { author } = info.value;

    if (author) return getAuthor(author);
    if (author === false) return [];

    return getAuthor(themeLocale.value.author, false);
  });
};

export type CategoryRef = ComputedRef<ArticleCategory[]>;

export const useArticleCategory = (info: Ref<ArticleInfo>): CategoryRef => {
  const categoryMap = useCategoryMap();

  return computed(() =>
    getCategory(info.value.category).map((name) => ({
      name,
      path: categoryMap.value.map[name].path,
    }))
  );
};

export type TagRef = ComputedRef<ArticleTag[]>;

export const useArticleTag = (info: Ref<ArticleInfo>): TagRef => {
  const tagMap = useTagMap();

  return computed(() =>
    getTag(info.value.tag).map((name) => ({
      name,
      path: tagMap.value.map[name].path,
    }))
  );
};

export type DateRef = ComputedRef<DateInfo | null>;

export const useArticleDate = (info: Ref<ArticleInfo>): DateRef => {
  const pageLang = usePageLang();

  return computed(() => {
    const { date } = info.value;

    return date ? getDate(date, { lang: pageLang.value, type: "date" }) : null;
  });
};

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
    color: !pure.value,
    hint: !pure.value,
  });
};
