import type { GitPluginPageData } from "@vuepress/plugin-git";
import type { SeoPluginPageData } from "@vuepress/plugin-seo";
import type { BlogPluginPageData } from "vuepress-plugin-blog2";
import type { ReadingTimePluginPageData } from "@vuepress/plugin-reading-time";

export interface ThemePageData
  extends BlogPluginPageData,
    Partial<GitPluginPageData>,
    Partial<ReadingTimePluginPageData>,
    Partial<SeoPluginPageData> {
  filePathRelative: string | null;
}
