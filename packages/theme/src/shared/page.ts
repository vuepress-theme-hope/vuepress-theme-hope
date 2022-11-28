import type { GitPluginPageData } from "@vuepress/plugin-git";
import type { ReadingTimePluginPageData } from "vuepress-plugin-reading-time2";
import type { SeoPluginPageData } from "vuepress-plugin-seo2";

export interface ThemePageData
  extends Partial<GitPluginPageData>,
    Partial<ReadingTimePluginPageData>,
    Partial<SeoPluginPageData> {
  filePathRelative: string | null;
}
