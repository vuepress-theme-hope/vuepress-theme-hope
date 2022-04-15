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

import { useThemeLocaleData } from "@theme-hope/composables";

import type { AuthorInfo, DateInfo } from "@mr-hope/vuepress-shared";
import type { ComputedRef } from "vue";
import type { PageInfoProps } from "@theme-hope/module/info/components/PageInfo";
import type {
  ArticleInfo,
  PageCategory,
  PageInfo,
  PageTag,
} from "../../../../shared";

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

export type CategoryRef = ComputedRef<PageCategory[]>;

export const useArticleCategory = (info: Ref<ArticleInfo>): CategoryRef => {
  const categoryMap = useCategoryMap();

  return computed(() =>
    getCategory(info.value.category).map((name) => ({
      name,
      path: categoryMap.value.map[name].path,
    }))
  );
};

export type TagRef = ComputedRef<PageTag[]>;

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
): {
  config: PageInfoProps;
  items: ComputedRef<PageInfo[] | false | undefined>;
} => {
  const blogOptions = useBlogOptions();
  const author = useArticleAuthor(info);
  const category = useArticleCategory(info);
  const tag = useArticleTag(info);
  const date = useArticleDate(info);

  const config = reactive<PageInfoProps>({
    author: author.value,
    category: category.value,
    date: date.value,
    tag: tag.value,
    isOriginal: info.value.isOriginal,
    readingTime: info.value.readingTime,
  });

  const items = computed(() => blogOptions.value.articleInfo);

  return { config, items };
};
