import { type ComputedRef, type Ref, computed, toRef } from "vue";
import {
  type AuthorInfo,
  type DateInfo,
  getAuthor,
  getCategory,
  getDate,
  getTag,
} from "vuepress-shared/client";

import { useThemeLocaleData } from "@theme-hope/composables/index";
import { type PageInfoProps } from "@theme-hope/modules/info/components/PageInfo";
import {
  type PageCategory,
  type PageTag,
} from "@theme-hope/modules/info/utils/index";

import { useCategoryMap } from "./categoryMap.js";
import { useBlogOptions } from "./options.js";
import { useTagMap } from "./tagMap.js";
import {
  type ArticleInfo,
  ArticleInfoType,
  type PageInfo,
} from "../../../../shared/index.js";

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
  info: ComputedRef<PageInfoProps>;
  items: ComputedRef<PageInfo[] | false | undefined>;
} => {
  const articleInfo = toRef(props, "info");
  const blogOptions = useBlogOptions();
  const author = useArticleAuthor(articleInfo);
  const category = useArticleCategory(articleInfo);
  const tag = useArticleTag(articleInfo);
  const date = useArticleDate(articleInfo);

  const info = computed(() => ({
    author: author.value,
    category: category.value,
    date: date.value,
    localizedDate: articleInfo.value[ArticleInfoType.localizedDate] || "",
    tag: tag.value,
    isOriginal: articleInfo.value[ArticleInfoType.isOriginal] || false,
    readingTime: articleInfo.value[ArticleInfoType.readingTime] || null,
    pageview: props.path,
  }));

  const items = computed(() => blogOptions.value.articleInfo);

  return { info, items };
};
