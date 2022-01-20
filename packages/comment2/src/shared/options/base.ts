import type { Author } from "@mr-hope/vuepress-shared";
import type { LocaleConfig } from "@vuepress/core";
import type { PageInfoLocaleData, PageInfo } from "./pageInfo";

export interface BaseCommentOptions {
  /**
   * Default author
   *
   * 默认作者
   */
  author?: Author;

  /**
   * Page Info display configuration
   *
   * @see https://vuepress-theme-hope.github.io/comment/config/#pageinfo
   *
   * 文章信息配置
   *
   * @see https://vuepress-theme-hope.github.io/comment/zh/config/#pageinfo
   *
   * @default ['Author', 'Visitor', 'Time', 'Category', 'Tag', 'ReadTime']
   */
  pageInfo?: PageInfo[] | false;

  /**
   * Whether enable hint popup for pageinfo
   *
   * 是否启用文章信息的弹窗提示
   *
   * @default true
   */
  hint?: boolean;

  /**
   * Whether enable comment by default
   *
   * 是否默认启用评论
   *
   * @default true
   */
  comment?: boolean;

  /**
   * Reading speed of words per minute
   *
   * 每分钟阅读字数
   *
   * @default 300
   */
  wordPerminute?: number;

  /**
   * The delay of dom operation, in ms
   *
   * If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`
   *
   * 进行 DOM 操作的延时，单位 ms
   *
   * 如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`
   *
   * @default 500
   */
  delay?: number;

  /**
   * Locales config for pageInfo
   *
   * 页面信息的国际化配置
   */
  pageInfoLocales?: LocaleConfig<PageInfoLocaleData>;
}
