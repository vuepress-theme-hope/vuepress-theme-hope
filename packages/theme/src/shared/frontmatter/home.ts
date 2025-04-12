import type { ThemeBasePageFrontmatter } from "./base.js";

export interface ThemeHomePageFrontmatter extends ThemeBasePageFrontmatter {
  home: true;

  /**
   * @default false
   */
  heroFullScreen?: boolean;
  heroHeight?: string;

  heroImage?: string;
  heroImageDark?: string;
  heroImageStyle?: Record<string, string> | string;

  heroAlt?: string;

  heroText?: string;

  tagline?: string;

  bgImage?: string | false;
  bgImageDark?: string | false;
  bgImageStyle?: Record<string, string> | string;
}
