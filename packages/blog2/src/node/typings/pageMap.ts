import type { Page } from "@vuepress/core";

export interface PageMap {
  [localePath: string]: Page[];
}
