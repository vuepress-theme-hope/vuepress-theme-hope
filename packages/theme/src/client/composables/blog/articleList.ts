import { computed, inject, provide } from "vue";
import { useArticles } from "./articles";
import { sortArticles } from "../../utils";

import type { ComputedRef, InjectionKey } from "vue";
import type { ArticleDetail } from "../../../shared";

export type ArticleListRef = ComputedRef<ArticleDetail[]>;

export const articleListSymbol: InjectionKey<ArticleListRef> =
  Symbol.for("articleList");

/**
 * Inject articleList
 */
export const useArticleList = (): ArticleListRef => {
  const timeline = inject(articleListSymbol);

  if (!timeline) {
    throw new Error("useArticleList() is called without provider.");
  }

  return timeline;
};

/**
 * Provide articleList
 */
export const setupArticleList = (): void => {
  const articles = useArticles();
  const articleList = computed(() => sortArticles(articles.value, "sticky"));

  provide(articleListSymbol, articleList);
};
