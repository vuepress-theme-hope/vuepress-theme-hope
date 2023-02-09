import { type ComputedRef, type InjectionKey, inject, provide } from "vue";
import { type BlogTypeData, useBlogType } from "vuepress-plugin-blog2/client";

import { type ArticleInfo } from "../../../../shared/index.js";

export type StarsRef = ComputedRef<BlogTypeData<ArticleInfo>>;

export const starsSymbol: InjectionKey<StarsRef> = Symbol.for("stars");

/**
 * Inject stars
 */
export const useStars = (): StarsRef => {
  const stars = inject(starsSymbol);

  if (!stars) throw new Error("useStars() is called without provider.");

  return stars;
};

export const setupStars = (): void => {
  const stars = useBlogType<ArticleInfo>("star");

  provide(starsSymbol, stars);
};
