import { CommentOptions } from "@mr-hope/vuepress-plugin-comment";
import { CopyCodeOptions } from "@mr-hope/vuepress-plugin-copy-code";
import { LastUpdateOptions } from "@mr-hope/vuepress-plugin-last-update";
import { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance/types";
import { PWAOptions } from "@mr-hope/vuepress-plugin-pwa";
import { PhotoSwipeOptions } from "vuepress-plugin-photo-swipe";
import { SeoOptions } from "@mr-hope/vuepress-plugin-seo";
import { SitemapOptions } from "@mr-hope/vuepress-plugin-sitemap";

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
   *
   * pubid for addthis
   */
  addThis?: string;

  /**
   * 评论设置
   * @see http://comment.mrhope.site/config/
   *
   * Comment Configuration
   * @see http://comment.mrhope.site/en/config/
   */
  comment?: CommentOptions | false;

  /**
   * 代码复制选项
   *
   * code copy options
   */
  copyCode?: CopyCodeOptions | false;

  /**
   * 版权设置
   *
   * Copyright Configuration
   */
  copyright?: HopeCopyrightConfig;

  /**
   * Markdown 增强设置
   *
   * Markdown enhance configuration
   */
  mdEnhance?: MarkdownEnhanceOptions | false;

  /**
   * PWA 设置
   *
   * PWA configuration
   */
  pwa?: PWAOptions | false;

  /**
   * 图片预览设置
   *
   * Photo Swipe Options
   */
  photoSwipe?: PhotoSwipeOptions | false;

  /** SEO */
  seo?: SeoOptions | false;

  /** Sitemap */
  sitemap?: SitemapOptions | false;

  /** 最后更新时间转换 */
  lastUpdate?: LastUpdateOptions | false;
  /**
   * ts-loader 选项
   *
   * Options which will passed to ts-loader
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typescript?: Record<string, any> | boolean;
}
