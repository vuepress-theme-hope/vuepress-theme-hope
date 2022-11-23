import type { GitPluginPageData } from "@vuepress/plugin-git";
import type { ReadingTimePluginPageData } from "vuepress-plugin-reading-time2";

export interface HopeThemePageData
  extends Partial<GitPluginPageData>,
    Partial<ReadingTimePluginPageData> {
  filePathRelative: string | null;
}
