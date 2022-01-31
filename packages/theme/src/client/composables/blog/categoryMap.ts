import { inject, provide, reactive, watch } from "vue";
import { useArticles } from "./articles";
import { sortArticles } from "../../utils";

import type { InjectionKey } from "vue";
import type { ArticleDetail } from "../../../shared";

export type CategoryMapRef = Record<string, Record<string, ArticleDetail[]>>;
export const categoryMapSymbol: InjectionKey<CategoryMapRef> =
  Symbol.for("categoryMap");

/**
 * Inject categoryMap
 */
export const useCategoryMap = (): CategoryMapRef => {
  const timeline = inject(categoryMapSymbol);

  if (!timeline) {
    throw new Error("useCategoryMap() is called without provider.");
  }

  return timeline;
};

/**
 * Provide categoryMap
 */
export const setupCategoryMap = (): void => {
  const articles = useArticles();
  const categoryMap = reactive<CategoryMapRef>({});

  provide(categoryMapSymbol, categoryMap);

  watch(
    () => articles,
    (articles) => {
      // remove object
      for (const routeLocale in categoryMap) delete categoryMap[routeLocale];

      for (const key in articles) {
        categoryMap[key] = {};

        articles[key].forEach((article) => {
          const { tag } = article;

          if (tag)
            tag.forEach((item) => {
              if (!categoryMap[key][item]) categoryMap[key][item] = [];

              categoryMap[key][item].push(article);
            });
        });

        for (const tag in categoryMap[key])
          categoryMap[key][tag] = sortArticles(categoryMap[key][tag], "sticky");
      }
    },
    { immediate: true }
  );
};
