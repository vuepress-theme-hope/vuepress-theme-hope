import type { BlogCategoryData } from "@vuepress/plugin-blog/client";
import { useBlogCategory } from "@vuepress/plugin-blog/client";
import type { ComputedRef, InjectionKey } from "vue";
import { inject, provide } from "vue";

import type { ArticleInfoData } from "../../../../shared/index.js";

export type CategoryMapRef = ComputedRef<BlogCategoryData<ArticleInfoData>>;

export const categoryMapSymbol: InjectionKey<CategoryMapRef> =
  Symbol.for("categoryMap");

/**
 * Inject categoryMap
 */
export const useCategoryMap = (): CategoryMapRef => {
  const categoryMap = inject(categoryMapSymbol);

  if (!categoryMap)
    throw new Error("useCategoryMap() is called without provider.");

  return categoryMap;
};

/**
 * Provide categoryMap
 */
export const setupCategoryMap = (): void => {
  const categoryMap = useBlogCategory<ArticleInfoData>("category");

  provide(categoryMapSymbol, categoryMap);
};
