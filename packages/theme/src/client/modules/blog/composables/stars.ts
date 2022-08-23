import { inject, provide } from "vue";
import { useBlogType } from "vuepress-plugin-blog2/lib/client";

import type { ComputedRef, InjectionKey } from "vue";
import type { BlogTypeData } from "vuepress-plugin-blog2";
import type { ArticleInfo } from "../../../../shared";

export type StarsRef = ComputedRef<BlogTypeData<ArticleInfo>>;

export const starsSymbol: InjectionKey<StarsRef> = Symbol.for("stars");

/**
 * Inject stars
 */
export const useStars = (): StarsRef => {
  const stars = inject(starsSymbol);

  if (!stars) {
    throw new Error("useStars() is called without provider.");
  }

  return stars;
};

export const setupStars = (): void => {
  const stars = useBlogType<ArticleInfo>("star");

  provide(starsSymbol, stars);
};
