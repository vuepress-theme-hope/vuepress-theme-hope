import type { BaseCommentOptions } from "./base.js";

export type GiscusRepo = `${string}/${string}`;

export type GiscusMapping =
  | "url"
  | "title"
  | "og:title"
  | "specific"
  | "number"
  | "pathname";

export type GiscusInputPosition = "top" | "bottom";

export interface GiscusOptions extends BaseCommentOptions {
  provider: "Giscus";

  /**
   * The name of repository to store discussions.
   *
   * 存放评论的仓库
   */
  repo: GiscusRepo;

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
  mapping?: GiscusMapping;

  /**
   * Whether enable strict mapping
   *
   * 是否启用严格匹配
   *
   * @default true
   */
  strict?: boolean;

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
  inputPosition?: GiscusInputPosition;
}
