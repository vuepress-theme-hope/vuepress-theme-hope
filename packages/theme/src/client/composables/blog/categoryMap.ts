import { computed, inject, provide } from "vue";
import { useBlogCategory } from "vuepress-plugin-blog2/lib/client";
import { sortArticles } from "../../utils";

import type { ComputedRef, InjectionKey } from "vue";
import type { ArticleDetail } from "../../../shared";

export type CategoryMapRef = ComputedRef<Record<string, ArticleDetail[]>>;

export const categoryMapSymbol: InjectionKey<CategoryMapRef> =
  Symbol.for("categoryMap");

/**
 * Inject categoryMap
 */
export const useCategoryMap = (): CategoryMapRef => {
  const categoryMap = inject(categoryMapSymbol);

  if (!categoryMap) {
    throw new Error("useCategoryMap() is called without provider.");
  }

  return categoryMap;
};

/**
 * Provide categoryMap
 */
export const setupCategoryMap = (): void => {
  const currentCategoryMap = useBlogCategory<ArticleDetail>("category");

  const categoryMap = computed(() => {
    const result: Record<string, ArticleDetail[]> = {};

    for (const name in currentCategoryMap.value) {
      result[name] = sortArticles(
        currentCategoryMap.value[name].map(({ meta, path }) => ({
          ...meta,
          path,
        })),
        "sticky"
      );
    }

    return result;
  });

  provide(categoryMapSymbol, categoryMap);
};
