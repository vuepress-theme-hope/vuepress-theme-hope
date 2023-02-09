import { type ComputedRef, type InjectionKey, inject, provide } from "vue";
import { type BlogTypeData, useBlogType } from "vuepress-plugin-blog2/client";

import { type ArticleInfo } from "../../../../shared/index.js";

export type ArticlesRef = ComputedRef<BlogTypeData<ArticleInfo>>;

export const articlesSymbol: InjectionKey<ArticlesRef> = Symbol.for("articles");

/**
 * Inject articles
 */
export const useArticles = (): ArticlesRef => {
  const articles = inject(articlesSymbol);

  if (!articles) throw new Error("useArticles() is called without provider.");

  return articles;
};

export const setupArticles = (): void => {
  const articles = useBlogType<ArticleInfo>("article");

  provide(articlesSymbol, articles);
};
