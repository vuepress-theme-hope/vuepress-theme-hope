import type { Author } from "vuepress-shared";

export interface BaseCommentOptions {
  /**
   * Default author
   *
   * 默认作者
   */
  author?: Author;

  /**
   * Whether enable comment by default
   *
   * 是否默认启用评论
   *
   * @default true
   */
  comment?: boolean;

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
}
