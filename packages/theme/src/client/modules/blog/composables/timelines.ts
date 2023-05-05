import {
  type ComputedRef,
  type InjectionKey,
  computed,
  inject,
  provide,
} from "vue";
import { type Article, useBlogType } from "vuepress-plugin-blog2/client";
import { getDate } from "vuepress-shared/client";

import { type ArticleInfo, ArticleInfoType } from "../../../../shared/index.js";

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
  __VUEPRESS_DEV__ ? "timelines" : ""
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

    // filter before sort
    timelines.value.items.forEach(({ info, path }) => {
      const date = getDate(info[ArticleInfoType.date]);
      const year = date?.getFullYear();
      const month = date ? date.getMonth() + 1 : null;
      const day = date?.getDate();

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
