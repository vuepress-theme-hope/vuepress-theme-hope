import type { Author, BasePageFrontMatter } from "@mr-hope/vuepress-shared";
import type { App, HeadConfig, Page, PageFrontmatter } from "@vuepress/core";
import type { GitData } from "@vuepress/plugin-git";
import type { ArticleJSONLD } from "./json-ld";
import type { SeoContent } from "./ogp";

export type ExtendPage<ExtendObject = Record<string, unknown>> = Page & {
  frontmatter: PageFrontmatter<BasePageFrontMatter>;
  git?: GitData;
} & ExtendObject;

export interface PageSeoInfo<ExtendObject = Record<string, unknown>> {
  app: App;
  page: ExtendPage<ExtendObject>;
  /**
   * Current page link, permalink is prefered.
   */
  permalink: string | null;
}

export interface SeoOptions {
  /**
   * Delopy hostname
   *
   * 部署域名
   */
  hostname: string;

  /**
   * Default author
   *
   * 默认作者
   */
  author?: Author;

  /**
   * Content restrictions
   *
   * The age rating of the content, the format is `[int]+`, such as `'13+'`
   *
   * 内容分级情况
   *
   * 内容的年龄分级，格式为`[int]+`，如`'13+'`
   */
  restrictions?: string;

  /**
   * Twitter username
   *
   * Twitter 用户名
   */
  twitterID?: string;

  /**
   * Whether the page is an article
   *
   * 页面是否是文章
   */
  isArticle?: (page: Page) => boolean;

  /**
   * Custom OGP Generator
   *
   * 自定义 OGP 生成器
   */
  ogp?: <ExtendObject = Record<string, unknown>>(
    ogp: SeoContent,
    info: PageSeoInfo<ExtendObject>
  ) => SeoContent;

  /**
   * Custom JSON-LD Generator
   *
   * 自定义 JSON-LD 生成器
   */
  jsonLd?: <ExtendObject = Record<string, unknown>>(
    jsonLD: ArticleJSONLD | null,
    info: PageSeoInfo<ExtendObject>
  ) => ArticleJSONLD | null;

  /**
   * Custom head tags
   *
   * 自定义 Head 标签
   */
  customHead?: <ExtendObject = Record<string, unknown>>(
    head: HeadConfig[],
    info: PageSeoInfo<ExtendObject>
  ) => void;
}
