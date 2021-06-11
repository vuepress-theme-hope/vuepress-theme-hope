import type { CommentOptions } from "vuepress-plugin-comment2";
import type { MarkdownEnhanceOptions } from "vuepress-plugin-md-enhance";

export interface HopeThemePluginsOptions {
  /**
   * Enable @vuepress/plugin-active-header-links or not
   */
  activeHeaderLinks?: boolean;

  /**
   * Enable @vuepress/plugin-back-to-top or not
   */
  backToTop?: boolean;

  /**
   * 评论插件配置
   * @see http://vuepress-theme-hope.github.io/comment/zh/config/
   *
   * Comment plugin options
   * @see http://vuepress-theme-hope.github.io/comment/config/
   */
  comment?: CommentOptions;

  /**
   * Markdown 增强插件配置
   * @see http://vuepress-theme-hope.github.io/md-enhance/zh/config/
   *
   * Markdown enhance plugin options
   * @see http://vuepress-theme-hope.github.io/md-enhance/config/
   */
  mdEnhance?: MarkdownEnhanceOptions | false;

  /**
   * Enable @vuepress/plugin-container or not
   */
  container?: {
    tip?: boolean;
    warning?: boolean;
    danger?: boolean;
    details?: boolean;
    codeGroup?: boolean;
    codeGroupItem?: boolean;
  };

  /**
   * Enable @vuepress/plugin-git or not
   */
  git?: boolean;

  /**
   * Enable @vuepress/plugin-medium-zoom or not
   */
  mediumZoom?: boolean;

  /**
   * Enable @vuepress/plugin-nprogress or not
   */
  nprogress?: boolean;

  /**
   * Enable @vuepress/plugin-prismjs or not
   */
  prismjs?: boolean;
}
