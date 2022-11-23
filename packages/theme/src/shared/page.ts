import type { GitPluginPageData } from "@vuepress/plugin-git";
import type { ReadingTimePluginPageData } from "vuepress-plugin-reading-time2";

export interface ThemePageData
  extends Partial<GitPluginPageData>,
    Partial<ReadingTimePluginPageData> {
  filePathRelative: string | null;
}
