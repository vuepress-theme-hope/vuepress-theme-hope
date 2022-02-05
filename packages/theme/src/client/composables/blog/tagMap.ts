import { computed, inject, provide } from "vue";
import { useBlogCategory } from "vuepress-plugin-blog2/lib/client";
import { sortArticles } from "../../utils";

import type { ComputedRef, InjectionKey } from "vue";
import type { ArticleDetail } from "../../../shared";

export type TagMapRef = ComputedRef<Record<string, ArticleDetail[]>>;

export const tagMapSymbol: InjectionKey<TagMapRef> = Symbol.for("tagMap");

/**
 * Inject tagMap
 */
export const useTagMap = (): TagMapRef => {
  const tagMap = inject(tagMapSymbol);

  if (!tagMap) {
    throw new Error("useTagMap() is called without provider.");
  }

  return tagMap;
};

/**
 * Provide tagMap
 */
export const setupTagMap = (): void => {
  const currentTagMap = useBlogCategory<ArticleDetail>("tag");

  const tagMap = computed(() => {
    const result: Record<string, ArticleDetail[]> = {};

    for (const name in currentTagMap.value) {
      result[name] = sortArticles(
        currentTagMap.value[name].map(({ meta, path }) => ({
          ...meta,
          path,
        })),
        "sticky"
      );
    }

    return result;
  });

  provide(tagMapSymbol, tagMap);
};
