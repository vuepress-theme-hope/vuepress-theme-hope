import type { BasePageFrontMatter } from "@mr-hope/vuepress-shared";

export interface HopeThemePageFrontmatter extends BasePageFrontMatter {
  navbar?: boolean;
  pageClass?: string;
  socialMedia?: false;
}
