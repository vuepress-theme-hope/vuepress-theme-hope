import type { BaseCommentOptions } from "./base";

export interface GiscusOptions extends BaseCommentOptions {
  provider: "Giscus";

  /**
   * The name of repository to store discussions.
   *
   * 存放评论的仓库
   */
  repo: string;

  /**
   * The ID of repository to store discussions.
   *
   * 仓库 ID
   */
  repoId: string;

  /**
   * The name of the discussion category.
   *
   * 讨论分类
   */
  category: string;

  /**
   * The ID of the discussion category.
   *
   * 分类 ID
   */
  categoryId: string;

  /**
   * Page - discussion mapping.
   *
   * 页面 ↔️ discussion 映射关系
   *
   * @default "pathname"
   */
  mapping?: string;

  /**
   * Whether enable reactions or not
   *
   * 是否启用主帖子上的反应
   *
   * @default true
   */
  reactionsEnabled?: boolean;

  /**
   * Input position
   *
   * 输入框的位置
   *
   * @default 'top'
   */
  inputPosition?: "top" | "bottom";
}
