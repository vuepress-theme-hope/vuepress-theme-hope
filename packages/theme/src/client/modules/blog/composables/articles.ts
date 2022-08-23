import { inject, provide } from "vue";
import { useBlogType } from "vuepress-plugin-blog2/lib/client";

import type { ComputedRef, InjectionKey } from "vue";
import type { BlogTypeData } from "vuepress-plugin-blog2";
import type { ArticleInfo } from "../../../../shared";

export type ArticlesRef = ComputedRef<BlogTypeData<ArticleInfo>>;

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
  const articles = useBlogType<ArticleInfo>("article");

  provide(articlesSymbol, articles);
};
