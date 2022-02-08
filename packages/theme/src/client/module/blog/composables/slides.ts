import { inject, provide } from "vue";
import { useBlogType } from "vuepress-plugin-blog2/lib/client";

import type { ComputedRef, InjectionKey } from "vue";
import type { BlogTypeData } from "vuepress-plugin-blog2";
import type { ArticleInfo } from "../../../../shared";

export type SlidesRef = ComputedRef<BlogTypeData<ArticleInfo>>;

export const slidesSymbol: InjectionKey<SlidesRef> = Symbol.for("slides");

/**
 * Inject slides
 */
export const useSlides = (): SlidesRef => {
  const slides = inject(slidesSymbol);

  if (!slides) {
    throw new Error("useSlides() is called without provider.");
  }

  return slides;
};

/**
 * Provide slides
 */
export const setupSlides = (): void => {
  const slides = useBlogType<ArticleInfo>("slide");

  provide(slidesSymbol, slides);
};
