import type { ArticleInfoProps } from "./articleInfo";

export interface PageTitleProps extends ArticleInfoProps {
  /**
   * Whether display icon besides title
   *
   * 是否在标题旁显示图标
   *
   * @default false
   */

  titleIcon?: boolean;

  /**
   * Title icon prefix
   *
   * 标题图标 class 前缀
   */
  titleIconPrefix?: string;
}
