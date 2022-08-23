import { inject, provide } from "vue";
import { useBlogType } from "vuepress-plugin-blog2/lib/client";

import type { ComputedRef, InjectionKey } from "vue";
import type { BlogTypeData } from "vuepress-plugin-blog2";
import type { ArticleInfo } from "../../../../shared";

export type EncryptedArticlesRef = ComputedRef<BlogTypeData<ArticleInfo>>;

export const encryptedArticlesSymbol: InjectionKey<EncryptedArticlesRef> =
  Symbol.for("encryptedArticles");

/**
 * Inject encryptedArticles
 */
export const useEncryptedArticles = (): EncryptedArticlesRef => {
  const encryptedArticles = inject(encryptedArticlesSymbol);

  if (!encryptedArticles) {
    throw new Error("useEncryptedArticles() is called without provider.");
  }

  return encryptedArticles;
};

/**
 * Provide encryptedArticles
 */
export const setupEncryptedArticles = (): void => {
  const encryptedArticles = useBlogType<ArticleInfo>("encrypted");

  provide(encryptedArticlesSymbol, encryptedArticles);
};
