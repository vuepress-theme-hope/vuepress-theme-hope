import type { BasePageFrontMatter } from "@mr-hope/vuepress-shared";
import type { MediaLinksConfig } from "../options";

export interface HopeThemePageFrontmatter extends BasePageFrontMatter {
  navbar?: boolean;
  pageClass?: string;
  medialinks?: MediaLinksConfig | false;
}
