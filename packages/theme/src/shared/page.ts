import type { ArticleInfo } from "@mr-hope/vuepress-plugin-components";
import type { BasePageFrontMatter } from "@mr-hope/vuepress-shared";
import type { GitPluginPageData } from "@vuepress/plugin-git";
import type { MediaLinksConfig } from "./options";
import type { AutoLink } from "./navbar";
import type { SidebarConfig } from "./sidebar";

export interface HopeThemePageData extends GitPluginPageData {
  filePathRelative: string | null;
}

export interface HopeThemePageFrontmatter extends BasePageFrontMatter {
  navbar?: boolean;
  pageClass?: string;
  medialinks?: MediaLinksConfig | false;
}

export interface HopeThemeHomePageFrontmatter extends HopeThemePageFrontmatter {
  home: true;
  heroImage?: string;
  heroAlt?: string;
  heroText?: string | null;
  tagline?: string | null;
  actions?: {
    text: string;
    link: string;
    type?: "primary" | "secondary";
  }[];
  features?: {
    title: string;
    details: string;
  }[];
}

export interface HopeThemeNormalPageFrontmatter
  extends HopeThemePageFrontmatter {
  home?: false;
  sidebar?: "auto" | false | SidebarConfig;
  sidebarHeadingDepth?: number;
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
}

export interface ActionConfig {
  text: string;
  link: string;
  type?: "primary" | "secondary";
}

export interface ProjectFeatureOptions {
  icon?: string;
  title: string;
  details: string;
  link?: string;
}

export interface ProjectHomePageFrontmatter
  extends HopeThemeHomePageFrontmatter {
  home: true;
  heroImage?: string;
  darkHeroImage?: string;
  heroAlt?: string;
  heroText?: string;
  tagline?: string;
  actions?: ActionConfig[];
  features?: ProjectFeatureOptions[];
}
