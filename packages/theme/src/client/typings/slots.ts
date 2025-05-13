import type { HeaderItem } from "@vuepress/helper/client";

import type { PageInfoProps } from "@theme-hope/components/info/PageInfo";
import type { SidebarItem } from "@theme-hope/typings/sidebar";

import type { PortfolioMedia } from "../../shared/index.js";

export type SidebarItemsSlotData = SidebarItem[];

export type TocSlotData = HeaderItem[];

export type Style = string | Record<string, string>;

export interface HeroInfoSlotData {
  text: string | null;
  tagline: string | null;
  isFullScreen: boolean;
  style: Style | null;
}

export interface HeroLogoSlotData {
  image: string | null;
  imageDark: string | null;
  alt: string;
  style: Style | null;
}

export interface HeroBackgroundSlotData {
  image: string | null;
  imageDark: string | null;
  style: Style | null;
}

export interface PortfolioAvatarSlotData {
  avatar: string | null;
  avatarDark: string | null;
  alt: string;
  style: Style | null;
}

export interface PortfolioInfoSlotData {
  name: string;
  welcome: string;
  title: string;
  titles: string[];
  medias: PortfolioMedia[] | null;
}

export interface PortfolioBackgroundSlotData {
  image: string | null;
  imageDark: string | null;
  style: Style | null;
}

export interface ArticleTitleSlotData {
  title: string;
  isEncrypted: boolean;
  type: string;
}

export interface ArticleCoverSlotData {
  cover: string | null;
}

export interface ArticleExcerptSlotData {
  excerpt: string | null;
}

export type ArticleInfoSlotData = PageInfoProps;

export interface BloggerInfoSlotData {
  name: string;
  avatar: string | null;
  description: string | null;
}
