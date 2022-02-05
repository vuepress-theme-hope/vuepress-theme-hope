import { useBlogType } from "vuepress-plugin-blog2/lib/client";
import { computed, inject, provide } from "vue";
import { sortArticles } from "../../utils";

import type { ComputedRef, InjectionKey } from "vue";
import type { ArticleDetail } from "../../../shared";

export type SlideListRef = ComputedRef<ArticleDetail[]>;

export const slideListSymbol: InjectionKey<SlideListRef> =
  Symbol.for("slideList");

/**
 * Inject slideList
 */
export const useSlideList = (): SlideListRef => {
  const slideList = inject(slideListSymbol);

  if (!slideList) {
    throw new Error("useSlideList() is called without provider.");
  }

  return slideList;
};

/**
 * Provide slideList
 */
export const setupSlideList = (): void => {
  const currentSlides = useBlogType<ArticleDetail>("slide");

  const slideList = computed(() => {
    return sortArticles(
      currentSlides.value.map(({ meta, path }) => ({
        ...meta,
        path,
      })),
      "sticky"
    );
  });

  provide(slideListSymbol, slideList);
};
