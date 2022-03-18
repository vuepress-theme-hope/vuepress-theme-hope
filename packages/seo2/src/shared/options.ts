import type { Author, BasePageFrontMatter } from "@mr-hope/vuepress-shared";
import type { App, HeadConfig, Page, PageFrontmatter } from "@vuepress/core";
import type { GitData } from "@vuepress/plugin-git";
import type { ArticleJSONLD } from "./json-ld";
import type { SeoContent } from "./ogp";

export type ExtendPage<ExtendObject = Record<string, unknown>> = Page & {
  frontmatter: PageFrontmatter<BasePageFrontMatter>;
  git?: GitData;
} & ExtendObject;

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
   * The age rating of the content, the format is `[int]+`, such as `"13+"`
   *
   * 内容分级情况
   *
   * 内容的年龄分级，格式为`[int]+`，如`"13+"`
   */
  restrictions?: string;

  /**
   * Whether generate description automatically
   *
   * 是否自动生成描述
   *
   * @default true
   */
  autoDescription?: boolean;

  /**
   * Fallback Image link when no image are found
   *
   * @description should be full or absolute links, probably your site favicon
   *
   * 当找不到图片时的回退图片链接
   *
   * @description 应为完整或绝对链接，你可以设置为战点图标
   */
  fallBackImage?: string;

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
    page: ExtendPage<ExtendObject>,
    app: App
  ) => SeoContent;

  /**
   * Custom JSON-LD Generator
   *
   * 自定义 JSON-LD 生成器
   */
  jsonLd?: <ExtendObject = Record<string, unknown>>(
    jsonLD: ArticleJSONLD | null,
    page: ExtendPage<ExtendObject>,
    app: App
  ) => ArticleJSONLD | null;

  /**
   * Custom head tags
   *
   * 自定义 Head 标签
   */
  customHead?: <ExtendObject = Record<string, unknown>>(
    head: HeadConfig[],
    page: ExtendPage<ExtendObject>,
    app: App
  ) => void;
}
