import type { BlogCategoryData } from "@vuepress/plugin-blog/client";
import { useBlogCategory } from "@vuepress/plugin-blog/client";
import type { ComputedRef, InjectionKey } from "vue";
import { inject, provide } from "vue";

import type { ArticleInfo } from "../../../../shared/index.js";

export type TagMapRef = ComputedRef<BlogCategoryData<ArticleInfo>>;

export const tagMapSymbol: InjectionKey<TagMapRef> = Symbol.for("tagMap");

/**
 * Inject tagMap
 */
export const useTagMap = (): TagMapRef => {
  const tagMap = inject(tagMapSymbol);

  if (!tagMap) throw new Error("useTagMap() is called without provider.");

  return tagMap;
};

/**
 * Provide tagMap
 */
export const setupTagMap = (): void => {
  const tagMap = useBlogCategory<ArticleInfo>("tag");

  provide(tagMapSymbol, tagMap);
};
