import { inject, provide, reactive, watch } from "vue";
import { useArticles } from "./articles";
import { sortArticles } from "../../utils";

import type { InjectionKey } from "vue";
import type { ArticleDetail } from "../../../shared";

export type TagMapRef = Record<string, Record<string, ArticleDetail[]>>;
export const tagMapSymbol: InjectionKey<TagMapRef> = Symbol.for("tagMap");

/**
 * Inject tagMap
 */
export const useTagMap = (): TagMapRef => {
  const timeline = inject(tagMapSymbol);

  if (!timeline) {
    throw new Error("useTagMap() is called without provider.");
  }

  return timeline;
};

/**
 * Provide tagMap
 */
export const setupTagMap = (): void => {
  const articles = useArticles();
  const tagMap = reactive<TagMapRef>({});

  provide(tagMapSymbol, tagMap);

  watch(
    () => articles,
    (articles) => {
      // remove object
      for (const routeLocale in tagMap) delete tagMap[routeLocale];

      for (const key in articles) {
        tagMap[key] = {};

        articles[key].forEach((article) => {
          const { tag } = article;

          if (tag)
            tag.forEach((item) => {
              if (!tagMap[key][item]) tagMap[key][item] = [];

              tagMap[key][item].push(article);
            });
        });

        for (const tag in tagMap[key])
          tagMap[key][tag] = sortArticles(tagMap[key][tag], "sticky");
      }
    },
    { immediate: true }
  );
};
