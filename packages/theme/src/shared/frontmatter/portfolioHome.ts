import type { ThemePageFrontmatter } from "./base.js";

export interface PortfolioHomeFrontmatter extends ThemePageFrontmatter {
  home: true;
  portfolio: true;
  name?: string;
  titles?: string[];
  avatar: string | null;
  avatarDark: string | null;
  avatarStyle: string | Record<string, string> | undefined;
  avatarAlt: string;
  bgImage?: string | false;
  bgImageDark?: string | false;
  bgImageStyle?: Record<string, string> | string;
  welcome?: string;
  medias?: {
    name?: string;
    icon: string;
    url: string;
  }[];

  /**
   * @default 'portfolio'
   */
  content?: "doc" | "portfolio" | "none";
}
