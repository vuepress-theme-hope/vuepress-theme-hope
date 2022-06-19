import { computed, inject, provide } from "vue";
import { useBlogType } from "vuepress-plugin-blog2/lib/client";
import { getDate } from "vuepress-shared/lib/client";

import type { ComputedRef, InjectionKey } from "vue";
import type { Article } from "vuepress-plugin-blog2";
import type { ArticleInfo } from "../../../../shared";

export interface TimelineItem {
  year: number;
  items: { date: string; path: string; info: ArticleInfo }[];
}

export type TimelinesRef = ComputedRef<{
  path: string;
  config: TimelineItem[];
  items: Article<ArticleInfo>[];
}>;

export const timelinesSymbol: InjectionKey<TimelinesRef> =
  Symbol.for("timelines");

/**
 * Inject timelines
 */
export const useTimelines = (): TimelinesRef => {
  const timelines = inject(timelinesSymbol);

  if (!timelines) {
    throw new Error("useTimelines() is called without provider.");
  }

  return timelines;
};

/**
 * Provide timelines
 */
export const setupTimelines = (): void => {
  const timelines = useBlogType<ArticleInfo>("timeline");

  const timelineItems = computed(() => {
    const timelineItems: TimelineItem[] = [];

    // filter before sort
    timelines.value.items.forEach(({ info, path }) => {
      const { year, month, day } = getDate(info.date)?.info || {};

      if (year && month && day) {
        if (!timelineItems[0] || timelineItems[0].year !== year)
          timelineItems.unshift({ year, items: [] });

        timelineItems[0].items.push({
          date: `${month}/${day}`,
          info,
          path,
        });
      }
    });

    return {
      ...timelines.value,
      config: timelineItems.reverse(),
    };
  });

  provide(timelinesSymbol, timelineItems);
};
