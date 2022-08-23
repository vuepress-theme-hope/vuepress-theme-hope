import { inject, provide } from "vue";
import { useBlogCategory } from "vuepress-plugin-blog2/lib/client";

import type { ComputedRef, InjectionKey } from "vue";
import type { BlogCategoryData } from "vuepress-plugin-blog2";
import type { ArticleInfo } from "../../../../shared";

export type CategoryMapRef = ComputedRef<BlogCategoryData<ArticleInfo>>;

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
  const categoryMap = useBlogCategory<ArticleInfo>("category");

  provide(categoryMapSymbol, categoryMap);
};
