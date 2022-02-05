import { useBlogType } from "vuepress-plugin-blog2/lib/client";
import { inject, provide } from "vue";

import type { BlogTypeData } from "vuepress-plugin-blog2/lib/client";
import type { ComputedRef, InjectionKey } from "vue";
import type { ArticleMeta } from "../../../shared";

export type TimelinesRef = ComputedRef<BlogTypeData<ArticleMeta>>;

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
  const timelines = useBlogType("timeline");

  provide(timelinesSymbol, timelines);
};
