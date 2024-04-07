import { getDate } from "@vuepress/helper/client";
import type { Article } from "@vuepress/plugin-blog/client";
import { useBlogType } from "@vuepress/plugin-blog/client";
import type { ComputedRef, InjectionKey } from "vue";
import { computed, inject, provide } from "vue";

import type { ArticleInfoData } from "../../../../shared/index.js";
import { ArticleInfo } from "../../../../shared/index.js";

declare const __VUEPRESS_DEV__: boolean;

export interface TimelineItem {
  year: number;
  items: { date: string; path: string; info: ArticleInfoData }[];
}

export type TimelineRef = ComputedRef<{
  path: string;
  config: TimelineItem[];
  items: Article<ArticleInfoData>[];
}>;

export const timelineSymbol: InjectionKey<TimelineRef> = Symbol(
  __VUEPRESS_DEV__ ? "timeline" : "",
);

/**
 * Inject timeline
 */
export const useTimeline = (): TimelineRef => {
  const timeline = inject(timelineSymbol);

  if (!timeline) throw new Error("useTimeline() is called without provider.");

  return timeline;
};

/**
 * Provide timelines
 */
export const setupTimeline = (): void => {
  const timeline = useBlogType<ArticleInfoData>("timeline");

  const timelineItems = computed(() => {
    const timelineItems: TimelineItem[] = [];

    // Filter before sort
    timeline.value.items.forEach(({ info, path }) => {
      const result = getDate(info[ArticleInfo.date]);

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
      ...timeline.value,
      config: timelineItems.reverse(),
    };
  });

  provide(timelineSymbol, timelineItems);
};
