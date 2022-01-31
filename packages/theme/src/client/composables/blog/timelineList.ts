import { useRouteLocale } from "@vuepress/client";
import { computed, inject, provide } from "vue";
import { useArticles } from "./articles";

import type { ComputedRef, InjectionKey } from "vue";
import type { ArticleDetail } from "../../../shared";

export type TimelineListRef = ComputedRef<ArticleDetail[]>;
export const timelineListSymbol: InjectionKey<TimelineListRef> =
  Symbol.for("timelineList");

/**
 * Inject timelineList
 */
export const useTimelineList = (): TimelineListRef => {
  const timeline = inject(timelineListSymbol);

  if (!timeline) {
    throw new Error("useTimelineList() is called without provider.");
  }

  return timeline;
};

/**
 * Provide timelineList
 */
export const setupTimelineList = (): void => {
  const articles = useArticles();
  const routeLocale = useRouteLocale();

  const timelineList = computed(() =>
    articles[routeLocale.value].filter((article) => article.date)
  );

  provide(timelineListSymbol, timelineList);
};
