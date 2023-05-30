import { type ThemePageFrontmatter } from "./base.js";

export interface ThemeHopePageFrontmatter extends ThemePageFrontmatter {
  home: true;

  /**
   * @default false
   */
  heroFullScreen?: boolean;

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
