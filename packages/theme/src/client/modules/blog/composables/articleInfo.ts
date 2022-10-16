import { computed, reactive, toRef } from "vue";
import {
  getAuthor,
  getCategory,
  getDate,
  getTag,
} from "vuepress-shared/lib/client";

import { useCategoryMap } from "./categoryMap.js";
import { useBlogOptions } from "./options.js";
import { useTagMap } from "./tagMap.js";
import {
  AUTHOR,
  CATEGORY,
  DATE,
  IS_ORIGINAL,
  LOCALIZED_DATE,
  READING_TIME,
  TAG,
} from "../../../../shared/index.js";

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
    const { [AUTHOR]: author } = info.value;

    if (author) return getAuthor(author);
    if (author === false) return [];

    return getAuthor(themeLocale.value.author, false);
  });
};

export type CategoryRef = ComputedRef<PageCategory[]>;

export const useArticleCategory = (info: Ref<ArticleInfo>): CategoryRef => {
  const categoryMap = useCategoryMap();

  return computed(() =>
    getCategory(info.value[CATEGORY]).map((name) => ({
      name,
      path: categoryMap.value.map[name].path,
    }))
  );
};

export type TagRef = ComputedRef<PageTag[]>;

export const useArticleTag = (info: Ref<ArticleInfo>): TagRef => {
  const tagMap = useTagMap();

  return computed(() =>
    getTag(info.value[TAG]).map((name) => ({
      name,
      path: tagMap.value.map[name].path,
    }))
  );
};

export type DateRef = ComputedRef<DateInfo | null>;

export const useArticleDate = (info: Ref<ArticleInfo>): DateRef =>
  computed(() => {
    const { [DATE]: date } = info.value;

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
    localizedDate: info.value[LOCALIZED_DATE] || "",
    tag: tag.value,
    isOriginal: info.value[IS_ORIGINAL] || false,
    readingTime: info.value[READING_TIME] || null,
    pageview: props.path,
  });

  const items = computed(() => blogOptions.value.articleInfo);

  return { config, items };
};
