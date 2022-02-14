import type { HopeThemePageFrontmatter } from "./base";

export interface HopeThemeHomeActionOptions {
  text: string;
  link: string;
  type?: "primary" | "secondary";
}

export interface HopeThemeHomeFeatureOptions {
  icon?: string;
  title: string;
  details: string;
  link?: string;
}

export interface HopeThemeProjectHomePageFrontmatter
  extends HopeThemePageFrontmatter {
  home: true;
  heroImage?: string;
  heroImageDark?: string;
  heroAlt?: string;
  heroText?: string | null;
  tagline?: string | null;

  actions?: HopeThemeHomeActionOptions[];
  features?: HopeThemeHomeFeatureOptions[];
}
