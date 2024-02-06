import type { BlogTypeData } from "@vuepress/plugin-blog/client";
import { useBlogType } from "@vuepress/plugin-blog/client";
import type { ComputedRef, InjectionKey } from "vue";
import { inject, provide } from "vue";

import type { ArticleInfo } from "../../../../shared/index.js";

declare const __VUEPRESS_DEV__: boolean;

export type ArticlesRef = ComputedRef<BlogTypeData<ArticleInfo>>;

export const articlesSymbol: InjectionKey<ArticlesRef> = Symbol(
  __VUEPRESS_DEV__ ? "articles" : "",
);

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
