import type { Author, BasePageFrontMatter } from "@mr-hope/vuepress-shared";
import type { App, HeadConfig, Page, PageFrontmatter } from "@vuepress/core";
import type { GitData } from "@vuepress/plugin-git";
import type { SeoContent } from "./ogp";

export type ExtendPage<ExtendObject = Record<string, unknown>> = Page & {
  frontmatter: PageFrontmatter<BasePageFrontMatter>;
  git?: GitData;
} & ExtendObject;

export interface PageSeoInfo<ExtendObject = Record<string, unknown>> {
  page: ExtendPage<ExtendObject>;
  app: App;
  /**
   * Current page link, permalink is prefered.
   */
  permalink: string | null;
}

export interface SeoOptions {
  /**
   * 部署域名
   *
   * Delopy hostname
   */
  hostname: string;

  /**
   * 默认作者
   *
   * default author
   */
  author?: Author;

  /**
   * 你的 Twitter 用户名
   *
   * your twitter username
   */
  twitterID?: string;

  /**
   * 内容分级情况
   *
   * Content restrictions
   *
   * The age rating of the content, the format is `[int]+`, such as `'13+'`
   */
  restrictions?: string;

  /** Function to generate OGP */
  ogp?: <ExtendObject = Record<string, unknown>>(
    info: PageSeoInfo<ExtendObject>
  ) => Partial<SeoContent>;

  /** Function to custom head */
  customHead?: <ExtendObject = Record<string, unknown>>(
    head: HeadConfig[],
    info: PageSeoInfo<ExtendObject>
  ) => void;
}
