import { useBlogArticles } from "vuepress-plugin-blog2/lib/client";
import { computed, inject, provide } from "vue";

import type { ComputedRef, InjectionKey } from "vue";
import type { ArticleDetail } from "../../../shared";

export type ArticlesRef = ComputedRef<ArticleDetail[]>;

export const articlesSymbol: InjectionKey<ArticlesRef> = Symbol.for("articles");

/**
 * Inject articles
 */
export const useArticles = (): ArticlesRef => {
  const articles = inject(articlesSymbol);

  if (!articles) {
    throw new Error("useArticles() is called without provider.");
  }

  return articles;
};

export const setupArticles = (): void => {
  const currentArticles = useBlogArticles<ArticleDetail>();

  const articles = computed(() =>
    currentArticles.value.map(({ meta, path }) => ({ ...meta, path }))
  );

  provide(articlesSymbol, articles);
};
