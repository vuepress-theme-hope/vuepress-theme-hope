import type { HopeThemePageFrontmatter } from "./base";

export interface HopeThemeProjectHomeActionOptions {
  text: string;
  link: string;
  type?: "primary" | "secondary";
}

export interface HopeThemeProjectHopeFeatureOptions {
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

  actions?: HopeThemeProjectHomeActionOptions[];
  features?: HopeThemeProjectHopeFeatureOptions[];
}
