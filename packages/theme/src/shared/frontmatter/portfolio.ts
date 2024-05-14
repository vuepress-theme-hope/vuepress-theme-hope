import type { ThemePageFrontmatter } from "./base.js";

export interface PortfolioMedia {
  name?: string;
  icon: string;
  url: string;
}

export interface ThemePortfolioFrontmatter extends ThemePageFrontmatter {
  portfolio: true;
  home?: boolean;
  name?: string;
  avatar?: string;
  avatarDark?: string;
  avatarStyle?: Record<string, string> | string;
  avatarAlt: string;
  titles?: string[];
  bgImage?: string;
  bgImageDark?: string;
  bgImageStyle?: Record<string, string> | string;
  welcome?: string;
  medias?: PortfolioMedia[];

  /**
   * @default 'portfolio'
   */
  content?: "portfolio" | "doc" | "none";
}
