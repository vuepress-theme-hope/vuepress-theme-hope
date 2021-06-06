import type { GitPluginPageData } from "@vuepress/plugin-git";
import type { NavLink, SidebarConfig } from "./options/nav";

export interface HopeThemePageData extends GitPluginPageData {
  filePathRelative: string;
}

export interface HopeThemePageFrontmatter {
  home?: boolean;
  navbar?: boolean;
  pageClass?: string;
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
  footer?: string;
  footerHtml?: boolean;
}

export interface HopeThemeNormalPageFrontmatter
  extends HopeThemePageFrontmatter {
  home?: false;
  editLink?: boolean;
  lastUpdated?: boolean;
  contributors?: boolean;
  sidebar?: "auto" | false | SidebarConfig;
  sidebarDepth?: number;
  prev?: string | NavLink;
  next?: string | NavLink;
}
