import { computed, reactive, toRef } from "vue";
import {
  getAuthor,
  getCategory,
  getDate,
  getTag,
} from "vuepress-shared/client";

import { useCategoryMap } from "./categoryMap.js";
import { useBlogOptions } from "./options.js";
import { useTagMap } from "./tagMap.js";
import { ArticleInfoType } from "../../../../shared/index.js";

import { useThemeLocaleData } from "@theme-hope/composables/index.js";

import type { ComputedRef, Ref } from "vue";
import type { AuthorInfo, DateInfo } from "vuepress-shared";
import type { PageInfoProps } from "@theme-hope/modules/info/components/PageInfo.js";
import type {
  PageCategory,
  PageTag,
} from "@theme-hope/modules/info/utils/index.js";
import type { ArticleInfo, PageInfo } from "../../../../shared/index.js";

export type AuthorRef = ComputedRef<AuthorInfo[]>;

export const useArticleAuthor = (info: Ref<ArticleInfo>): AuthorRef => {
  const themeLocale = useThemeLocaleData();

  return computed(() => {
    const { [ArticleInfoType.author]: author } = info.value;

    if (author) return getAuthor(author);
    if (author === false) return [];

    return getAuthor(themeLocale.value.author, false);
  });
};

export type CategoryRef = ComputedRef<PageCategory[]>;

export const useArticleCategory = (info: Ref<ArticleInfo>): CategoryRef => {
  const categoryMap = useCategoryMap();

  return computed(() =>
    getCategory(info.value[ArticleInfoType.category]).map((name) => ({
      name,
      path: categoryMap.value.map[name].path,
    }))
  );
};

export type TagRef = ComputedRef<PageTag[]>;

export const useArticleTag = (info: Ref<ArticleInfo>): TagRef => {
  const tagMap = useTagMap();

  return computed(() =>
    getTag(info.value[ArticleInfoType.tag]).map((name) => ({
      name,
      path: tagMap.value.map[name].path,
    }))
  );
};

export type DateRef = ComputedRef<DateInfo | null>;

export const useArticleDate = (info: Ref<ArticleInfo>): DateRef =>
  computed(() => {
    const { [ArticleInfoType.date]: date } = info.value;

    return date ? getDate(date) : null;
  });

export const useArticleInfo = (props: {
  info: ArticleInfo;
  path: string;
}): {
  config: PageInfoProps;
  items: ComputedRef<PageInfo[] | false | undefined>;
} => {
  const info = toRef(props, "info");
  const blogOptions = useBlogOptions();
  const author = useArticleAuthor(info);
  const category = useArticleCategory(info);
  const tag = useArticleTag(info);
  const date = useArticleDate(info);

  const config = reactive<PageInfoProps>({
    author: author.value,
    category: category.value,
    date: date.value,
    localizedDate: info.value[ArticleInfoType.localizedDate] || "",
    tag: tag.value,
    isOriginal: info.value[ArticleInfoType.isOriginal] || false,
    readingTime: info.value[ArticleInfoType.readingTime] || null,
    pageview: props.path,
  });

  const items = computed(() => blogOptions.value.articleInfo);

  return { config, items };
};
