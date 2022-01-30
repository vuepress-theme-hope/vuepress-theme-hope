import type { ArticleInfo } from "@mr-hope/vuepress-plugin-components";
import type { BasePageFrontMatter } from "@mr-hope/vuepress-shared";
import type { GitPluginPageData } from "@vuepress/plugin-git";
import type { ReadingTimePluginPageData } from "vuepress-plugin-reading-time2";
import type { MediaLinksConfig } from "./options";
import type { AutoLink } from "./navbar";
import type { SidebarConfig } from "./sidebar";

export interface HopeThemePageData
  extends GitPluginPageData,
    ReadingTimePluginPageData {
  filePathRelative: string | null;
}

export interface HopeThemePageFrontmatter extends BasePageFrontMatter {
  navbar?: boolean;
  pageClass?: string;
  medialinks?: MediaLinksConfig | false;
}

export interface ProjectHomeActionOptions {
  text: string;
  link: string;
  type?: "primary" | "secondary";
}

export interface ProjectHopeFeatureOptions {
  icon?: string;
  title: string;
  details: string;
  link?: string;
}

export interface HopeThemeProjectHomePageFrontmatter
  extends HopeThemePageFrontmatter {
  home: true;
  heroImage?: string;
  darkHeroImage?: string;
  heroAlt?: string;
  heroText?: string | null;
  tagline?: string | null;

  actions?: ProjectHomeActionOptions[];
  features?: ProjectHopeFeatureOptions[];
}

export interface HopeThemeBlogProjectOptions {
  name: string;
  type: "article" | "book" | "link" | "project" | "friend";
  desc?: string;
  cover?: string;
  link: string;
}

export interface HopeThemeBlogHomePageFrontmatter
  extends HopeThemePageFrontmatter {
  home: true;
  layout: "BlogHome";
  /**
   * @default true
   */
  hero?: boolean;
  /**
   * @default false
   */
  heroFullScreen?: boolean;
  heroImage?: string;
  heroImageStyle?: Record<string, string>;
  heroAlt?: string;
  heroText?: string | null;
  /**
   * @default true
   */
  showTitle?: boolean;
  bgImage?: string;
  bgImageStyle?: Record<string, string>;
  tagline?: string | null;
  projects: HopeThemeBlogProjectOptions[];
}

export interface HopeThemeNormalPageFrontmatter
  extends HopeThemePageFrontmatter {
  home?: false;
  sidebar?: "auto" | false | SidebarConfig;
  headingDepth?: number;
  /**
   * Whether display lastUpdated time
   *
   * 是否显示最后更新事件
   */

  lastUpdated?: boolean;
  /**
   * Whether display contributors
   *
   * 是否显示贡献者
   */
  contributors?: boolean;
  editLink?: boolean;
  prev?: string | AutoLink;
  next?: string | AutoLink;

  /**
   * PageInfo items
   *
   * 页面信息项
   *
   * @default ["Author", "Visitor", "Time", "Category", "Tag", "ReadTime"]
   */
  pageInfo?: ArticleInfo[] | false;

  /**
   * @description Only available when using valine
   *
   * 是否启用访问量
   *
   * Whether enable pageviews
   *
   * @default true
   */
  visitor?: boolean;

  /**
   * Whether the article be sticky in list
   *
   * If a number fill in, greater number will appear in front
   *
   * 是否置顶，如果填入数字，更大值会出现在前面
   */
  sticky?: boolean | number;

  /**
   * Whether the article be stared
   *
   * If a number fill in, greater number will appear in front
   *
   * 是否收藏，如果填入数字，更大值会出现在前面
   */
  star?: boolean | number;
}
