import { Vssue } from "vssue";

/**
 * 页面信息类型
 *
 * Type of page infomation
 */
export type PageInfotype =
  | "Author"
  | "Time"
  | "Category"
  | "Tag"
  | "ReadTime"
  | "Word"
  | "Visitor";

interface BaseCommentOptions {
  /**
   * 评论服务
   *
   * Comment Service
   */
  type: "valine" | "vssue" | "disable";
  /**
   * 默认作者
   *
   * Default author
   */
  author?: string;
  /**
   * 文章信息配置
   *
   * Page Info display configuration
   *
   * @see https://vuepress-comment.mrhope.site/config/#pageinfo (zh)
   * @see https://vuepress-comment.mrhope.site/en/config/#pageinfo (en)
   */
  pageInfo?: PageInfotype[] | false;
  /**
   * 是否默认启用评论
   *
   * Whether enable comment by default
   */
  comment?: boolean;
  /**
   * 每分钟阅读字数
   *
   * Reading speed of words per minute
   */
  wordPerminute?: number;
}

export interface ValineOptions extends BaseCommentOptions {
  /**
   * 填入 LeanCloud 中应用的 APP ID
   *
   * Fill in the application appId in LeanCloud
   */
  appId: string;

  /**
   * 填入 LeanCloud 中应用的 APP Key
   *
   * Fill in the application appKey in LeanCloud
   */
  appKey: string;

  /**
   * 是否启用访问量
   *
   * Whether enable page views count by default
   */
  visitor?: boolean;

  /**
   * 评论占位符
   *
   * Placeholder for comment input
   */
  placeholder?: string;

  /**
   * 评论所需信息
   *
   * Commenter's info
   */
  meta?: string[];

  /**
   * 评论信息必填项配置
   *
   * Set required fields for Commenter's info
   */
  requiredFields?: string[];

  /**
   * 头像类型
   *
   * Avator type
   * @see https://valine.js.org/avatar.html
   */
  avatar?: string;

  /** 是否记录 IP */
  recordIP?: boolean;

  /** 每页的最大评论数 */
  pageSize?: number;

  /** 是否启用昵称框自动获取 QQ 昵称和 QQ 头像 */
  enableQQ?: boolean;

  /** 自定义表情 CDN */
  emojiCDN?: string;

  /** 自定义表情包映射 */
  emojiMaps?: Record<string, string>;
}

/** Vssue 配置 */
export interface VssueOptions extends BaseCommentOptions {
  /** 平台 API 包 */
  platform: string;
  /** 用来存储 Issue 和评论的仓库的拥有者的名称 */
  owner: string;
  /** 用来存储 Issue 和评论的仓库的名称 */
  repo: string;
  /** 它是由平台分配的 client 标识符。你在创建 OAuth App 之后就可以得到它 */
  clientId: string;
  /** 它是由平台生成的 client 密钥。你在创建 OAuth App 之后就可以得到它 */
  clientSecret?: string;
  /** 平台的 base URL，已知平台不用填写 */
  baseURL?: string;
  /** 用来设置 Vssue 使用的 Issue 的 labels （标签） */
  labels?: string;
  /** Issue 标题的前缀。用于生成存储评论的对应 Issue 的实际标题 */
  prefix?: string;
  /** 拥有 admin 权限的用户数组 */
  admins?: string[];
  /** 默认每页显示的评论数 */
  perPage?: number;
  /** 使用的语言 */
  locale?: string;
  /** 希望使用自己的代理，就需要设置这个选项 */
  proxy?: string | ((url: string) => string);
  /** Vssue 自动创建 Issue 时使用的内容 */
  issueContent?: (param: {
    options: Vssue.Options;
    url: string;
  }) => string | Promise<string>;
  /** 在对应的 Issue 不存在时，Vssue 会自动尝试为你创建 Issue */
  autoCreateIssue?: false;
}

export type CommentOptions = ValineOptions | VssueOptions;

declare global {
  const COMMENT_OPTIONS: CommentOptions;
}
