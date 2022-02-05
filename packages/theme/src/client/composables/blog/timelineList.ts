import { useBlogArticles } from "vuepress-plugin-blog2/lib/client";
import { computed, inject, provide } from "vue";
import { compareDate } from "../../utils";

import type { ComputedRef, InjectionKey } from "vue";
import type { ArticleDetail } from "../../../shared";

export type TimelineListRef = ComputedRef<ArticleDetail[]>;

export const timelineListSymbol: InjectionKey<TimelineListRef> =
  Symbol.for("timelineList");

/**
 * Inject timelineList
 */
export const useTimelineList = (): TimelineListRef => {
  const timelineList = inject(timelineListSymbol);

  if (!timelineList) {
    throw new Error("useTimelineList() is called without provider.");
  }

  return timelineList;
};

/**
 * Provide timelineList
 */
export const setupTimelineList = (): void => {
  const currentArticles = useBlogArticles<ArticleDetail>();

  const timelineList = computed(() =>
    currentArticles.value
      .map(({ meta, path }) => ({ ...meta, path }))
      .sort((articleA, articleB) => compareDate(articleA.date, articleB.date))
  );

  provide(timelineListSymbol, timelineList);
};
