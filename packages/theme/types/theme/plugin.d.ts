import { CommentOptions } from "@mr-hope/vuepress-plugin-comment";
import { CopyCodeOptions } from "@mr-hope/vuepress-plugin-copy-code";
import { FeedOptions } from "@mr-hope/vuepress-plugin-feed";
import { GitOptions } from "@mr-hope/vuepress-plugin-git";
import { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance";
import { PWAOptions } from "@mr-hope/vuepress-plugin-pwa";
import { PhotoSwipeOptions } from "vuepress-plugin-photo-swipe";
import { SeoOptions } from "@mr-hope/vuepress-plugin-seo";
import { SitemapOptions } from "@mr-hope/vuepress-plugin-sitemap";
import { NamedChunksPluginOptions } from "vuepress-plugin-named-chunks";
/**
 * 版权设置
 *
 * Copyright Settings
 */
export interface HopeCopyrightConfig {
  /**
   * 功能状态
   *
   * - `'global'` 意味着全局启用
   * - `'local'` 意味着全局禁用，可在页面内启用
   *
   * Feature Status
   *
   * - `'global'` means enabled globally
   * - `'local'` means disabled globally and can be enabled in pages
   *
   * @default 'global'
   */
  status?: "global" | "local";
  /**
   * 触发版权信息或禁止复制动作的最少字符数
   *
   * The minimum text length that triggers the clipboard component or the noCopy effect
   */
  minLength?: number;
  /**
   * 是否禁止复制
   *
   * Whether to prohibit copying.
   */
  noCopy?: boolean;
  /**
   * 是否禁止选中文字
   *
   * Whether to prohibit selecting.
   */
  noSelect?: boolean;
}

interface HopeThemePluginConfig {
  /**
   * AddThis 的公共 ID
   * @see http://vuepress-theme-hope.github.io/add-this/zh/config/
   *
   * pubid for addthis
   * @see http://vuepress-theme-hope.github.io/add-this/config/
   */
  addThis?: string;

  /**
   * 评论插件配置
   * @see http://vuepress-theme-hope.github.io/comment/zh/config/
   *
   * Comment plugin options
   * @see http://vuepress-theme-hope.github.io/comment/config/
   */
  comment?: CommentOptions;

  /**
   * 代码复制插件配置
   * @see http://vuepress-theme-hope.github.io/copy-code/zh/config/
   *
   * code copy plugin options
   * @see http://vuepress-theme-hope.github.io/copy-code/config/
   */
  copyCode?: CopyCodeOptions | false;

  /**
   * 版权设置
   *
   * Copyright plugin options
   */
  copyright?: HopeCopyrightConfig;

  /**
   * Feed 插件配置
   * @see http://vuepress-theme-hope.github.io/feed/zh/config/
   *
   * Feed plugin options
   * @see http://vuepress-theme-hope.github.io/feed/config/
   */
  feed?: FeedOptions | false;

  /**
   * Git 插件配置
   * @see http://vuepress-theme-hope.github.io/git/zh/
   *
   * Git plugin options
   * @see http://vuepress-theme-hope.github.io/git/
   */
  git?: GitOptions | false;

  /**
   * Markdown 增强插件配置
   * @see http://vuepress-theme-hope.github.io/md-enhance/zh/config/
   *
   * Markdown enhance plugin options
   * @see http://vuepress-theme-hope.github.io/md-enhance/config/
   */
  mdEnhance?: MarkdownEnhanceOptions | false;

  /**
   * named-chunk 启用
   *
   * @default true
   */

  namedChunks?: NamedChunksPluginOptions | false;

  /**
   * PWA 插件配置
   * @see http://vuepress-theme-hope.github.io/pwa/zh/config/
   *
   * PWA plugin options
   * @see http://vuepress-theme-hope.github.io/pwa/config/
   */
  pwa?: PWAOptions | false;

  /**
   * 图片预览插件配置
   * @see http://vuepress-theme-hope.github.io/photo-swipe/zh/config/
   *
   * Photo Swipe plugin options
   * @see http://vuepress-theme-hope.github.io/photo-swipe/config/
   */
  photoSwipe?: PhotoSwipeOptions | false;

  /**
   * SEO 插件配置
   * @see http://vuepress-theme-hope.github.io/seo/zh/config/
   *
   * SEO plugin options
   * @see http://vuepress-theme-hope.github.io/seo/config/
   */
  seo?: SeoOptions | false;

  /**
   * Sitemap 插件配置
   * @see http://vuepress-theme-hope.github.io/sitemap/zh/config/
   *
   * Sitemap plugin options
   * @see http://vuepress-theme-hope.github.io/sitemap/config/
   */
  sitemap?: SitemapOptions | false;

  /**
   * ts-loader 选项
   *
   * Options which will passed to ts-loader
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typescript?: Record<string, any> | boolean;
}
