import { useRouteLocale } from "@vuepress/client";
import { computed, inject, provide } from "vue";
import { useArticles } from "./articles";

import type { ComputedRef, InjectionKey } from "vue";
import type { ArticleDetail } from "../../../shared";
import { sortArticles } from "../..";

export type SlideListRef = ComputedRef<ArticleDetail[]>;
export const slideListSymbol: InjectionKey<SlideListRef> =
  Symbol.for("slideList");

/**
 * Inject slideList
 */
export const useSlideList = (): SlideListRef => {
  const timeline = inject(slideListSymbol);

  if (!timeline) {
    throw new Error("useSlideList() is called without provider.");
  }

  return timeline;
};

/**
 * Provide slideList
 */
export const setupSlideList = (): void => {
  const articles = useArticles();
  const routeLocale = useRouteLocale();

  const slideList = computed(() =>
    sortArticles(
      articles[routeLocale.value].filter(({ type }) => type === "slide"),
      "sticky"
    )
  );

  provide(slideListSymbol, slideList);
};
