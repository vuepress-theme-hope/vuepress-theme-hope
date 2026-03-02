import { getDate } from "@vuepress/helper/client";
import type { Article } from "@vuepress/plugin-blog/client";
import { useBlogType } from "@vuepress/plugin-blog/client";
import type { ComputedRef, InjectionKey } from "vue";
import { computed, inject, provide } from "vue";
import { useLang } from "vuepress/client";

import type { ArticleInfoData } from "../../../shared/index.js";

export interface TimelineItem {
  year: number;
  items: { date: string; path: string; info: ArticleInfoData }[];
}

export type TimelineRef = ComputedRef<{
  path: string;
  config: TimelineItem[];
  items: Article<ArticleInfoData>[];
}>;

export const timelineSymbol: InjectionKey<TimelineRef> = Symbol(__VUEPRESS_DEV__ ? "timeline" : "");

/**
 * Inject timeline
 *
 * @returns Timeline data
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
  const pageLang = useLang();

  const timelineItems = computed(() => {
    const results: TimelineItem[] = [];

    // Filter before sort
    timeline.value.items.forEach(({ info, path }) => {
      const result = getDate(info.date);

      if (result) {
        const year = result.getFullYear();

        if (results[0]?.year !== year) results.unshift({ year, items: [] });

        results[0].items.push({
          date: result.toLocaleDateString(pageLang.value, {
            month: "numeric",
            day: "numeric",
          }),
          info,
          path,
        });
      }
    });

    return {
      ...timeline.value,
      config: results.reverse(),
    };
  });

  provide(timelineSymbol, timelineItems);
};
