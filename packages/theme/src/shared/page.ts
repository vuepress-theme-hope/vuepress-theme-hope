import type { BasePageFrontMatter } from "@mr-hope/vuepress-shared";
import type { GitPluginPageData } from "@vuepress/plugin-git";
import type { MediaLinksConfig, AutoLink, SidebarConfig } from "./options";

export interface HopeThemePageData extends GitPluginPageData {
  filePathRelative: string;
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
  editLink?: boolean;
  lastUpdated?: boolean;
  contributors?: boolean;
  sidebar?: "auto" | false | SidebarConfig;
  sidebarDepth?: number;
  prev?: string | AutoLink;
  next?: string | AutoLink;
}

export interface ActionConfig {
  text: string;
  link: string;
  type?: "primary" | "secondary";
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
  features?: {
    title: string;
    details: string;
    link?: string;
  }[];
}
