import { getDate } from "@vuepress/helper/client";
import type { Article } from "@vuepress/plugin-blog/client";
import { useBlogType } from "@vuepress/plugin-blog/client";
import type { ComputedRef, InjectionKey } from "vue";
import { computed, inject, provide } from "vue";

import type { ArticleInfo } from "../../../../shared/index.js";
import { ArticleInfoType } from "../../../../shared/index.js";

declare const __VUEPRESS_DEV__: boolean;

export interface TimelineItem {
  year: number;
  items: { date: string; path: string; info: ArticleInfo }[];
}

export type TimelinesRef = ComputedRef<{
  path: string;
  config: TimelineItem[];
  items: Article<ArticleInfo>[];
}>;

export const timelinesSymbol: InjectionKey<TimelinesRef> = Symbol(
  __VUEPRESS_DEV__ ? "timelines" : "",
);

/**
 * Inject timelines
 */
export const useTimelines = (): TimelinesRef => {
  const timelines = inject(timelinesSymbol);

  if (!timelines) throw new Error("useTimelines() is called without provider.");

  return timelines;
};

/**
 * Provide timelines
 */
export const setupTimelines = (): void => {
  const timelines = useBlogType<ArticleInfo>("timeline");

  const timelineItems = computed(() => {
    const timelineItems: TimelineItem[] = [];

    // Filter before sort
    timelines.value.items.forEach(({ info, path }) => {
      const result = getDate(info[ArticleInfoType.date]);

      if (result) {
        const year = result.getFullYear();
        const month = result.getMonth() + 1;
        const day = result.getDate();

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
