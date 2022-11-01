import type { App, HeadConfig, Page, PageFrontmatter } from "@vuepress/core";
import type { GitData } from "@vuepress/plugin-git";
import type { Author, BasePageFrontMatter } from "vuepress-shared";
import type { ArticleJSONLD } from "./json-ld.js";
import type { SeoContent } from "./ogp.js";

export type ExtendPage<
  ExtraPageData extends Record<string | number | symbol, unknown> & {
    git?: GitData;
  } = { git?: GitData },
  ExtraPageFrontmatter extends PageFrontmatter<
    BasePageFrontMatter & { banner: string; cover: string }
  > = PageFrontmatter<BasePageFrontMatter & { banner: string; cover: string }>,
  ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
    never,
    never
  >
> = Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>;

export interface SeoOptions {
  /**
   * Deploy hostname
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
   * @description 应为完整或绝对链接，你可以设置为站点图标
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
  isArticle?: <
    ExtraPageData extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >,
    ExtraPageFrontmatter extends Record<
      string | number | symbol,
      unknown
    > = Record<string, unknown>,
    ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >
  >(
    page: ExtendPage<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
  ) => boolean;

  /**
   * Custom OGP Generator
   *
   * 自定义 OGP 生成器
   */
  ogp?: <
    ExtraPageData extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >,
    ExtraPageFrontmatter extends Record<
      string | number | symbol,
      unknown
    > = Record<string, unknown>,
    ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >
  >(
    /**
     * OGP Object inferred by plugin
     *
     * 由插件推断出的 OGP 对象
     */
    ogp: SeoContent,
    /**
     * Page Object
     *
     * 页面对象
     */
    page: ExtendPage<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
    /** VuePress App */
    app: App
  ) => SeoContent;

  /**
   * Custom JSON-LD Generator
   *
   * 自定义 JSON-LD 生成器
   */
  jsonLd?: <
    ExtraPageData extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >,
    ExtraPageFrontmatter extends Record<
      string | number | symbol,
      unknown
    > = Record<string, unknown>,
    ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >
  >(
    /**
     * JSON-LD Object inferred by plugin
     *
     * 由插件推断出的 JSON-LD 对象
     */
    jsonLD: ArticleJSONLD | null,
    /**
     * Page Object
     *
     * 页面对象
     */
    page: ExtendPage<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
    /** VuePress App */
    app: App
  ) => ArticleJSONLD | null;

  /**
   * Custom head tags
   *
   * 自定义 Head 标签
   */
  customHead?: <
    ExtraPageData extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >,
    ExtraPageFrontmatter extends Record<
      string | number | symbol,
      unknown
    > = Record<string, unknown>,
    ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >
  >(
    /**
     * Head tag config
     *
     * head 标签配置
     */
    head: HeadConfig[],
    /**
     * Page Object
     *
     * 页面对象
     */
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
    /** VuePress App */
    app: App
  ) => void;

  /**
   * Add canonical URL
   *
   * 添加首选地址
   */
  canonical?:
    | string
    | (<
        ExtraPageData extends Record<
          string | number | symbol,
          unknown
        > = Record<never, never>,
        ExtraPageFrontmatter extends Record<
          string | number | symbol,
          unknown
        > = Record<string, unknown>,
        ExtraPageFields extends Record<
          string | number | symbol,
          unknown
        > = Record<never, never>
      >(
        page: ExtendPage<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
      ) => string | null);
}
