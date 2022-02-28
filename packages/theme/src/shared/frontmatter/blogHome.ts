import type { HopeThemePageFrontmatter } from "./base";

export interface HopeThemeBlogHomeProjectOptions {
  name: string;
  icon?: string;
  desc?: string;
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
  projects: HopeThemeBlogHomeProjectOptions[];
}
