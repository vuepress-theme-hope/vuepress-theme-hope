import type { Vssue } from "vssue";
import type { ValineOption } from "valine";
import type { WalineOptions as _WalineOptions } from "@waline/client";

import "./declare";

export interface PageInfoI18nConfig {
  /** 作者 */
  author: string;
  /** 写作日期 */
  time: string;
  /** 原创文字 */
  origin: string;
  /** 访问量 */
  views: string;
  /** 标签文字 */
  tag: string;
  /** 分类文字 */
  category: string;
  /** 阅读时间 */
  readingTime: string;
  /** 文章字数 */
  words: string;
}

/**
 * 页面信息类型
 *
 * Type of page information
 */
export type PageInfotype =
  | "author"
  | "time"
  | "category"
  | "tag"
  | "reading-time"
  | "word"
  | "visitor";

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
   * @see https://vuepress-theme-hope.github.io/comment/zh/config/#pageinfo (zh)
   * @see https://vuepress-theme-hope.github.io/comment/config/#pageinfo (en)
   *
   * @default ['Author', 'Visitor', 'Time', 'Category', 'Tag', 'ReadTime']
   */
  pageInfo?: PageInfotype[] | false;
  /**
   * 是否默认启用评论
   *
   * Whether enable comment by default
   *
   * @default true
   */
  comment?: boolean;
  /**
   * 每分钟阅读字数
   *
   * Reading speed of words per minute
   *
   * @default 300
   */
  wordPerminute?: number;
}

export interface ValineOptions
  extends BaseCommentOptions,
    Omit<ValineOption, "el"> {
  type: "valine";
}

export interface WalineOptions
  extends BaseCommentOptions,
    Omit<_WalineOptions, "el"> {
  type: "waline";
}

/** Vssue 配置 */
export interface VssueOptions extends BaseCommentOptions {
  type: "vssue";
  /**
   * 平台 API 包
   *
   * Platform API package
   */
  platform: string;
  /**
   * 用来存储 Issue 和评论的仓库的拥有者的名称
   *
   * The owner’s name of repository to store the issues and comments.
   */
  owner: string;
  /**
   * 用来存储 Issue 和评论的仓库的名称
   *
   * The name of repository to store the issues and comments.
   */
  repo: string;
  /**
   * 它是由平台分配的 client 标识符。你在创建 [OAuth App](https://tools.ietf.org/html/rfc6749#section-2.3.1) 之后就可以得到它
   *
   * The client_id introduced in [OAuth2 spec](https://tools.ietf.org/html/rfc6749#section-2.3.1)
   */
  clientId: string;
  /**
   * 它是由平台生成的 client 密钥。你在创建 [OAuth App](https://tools.ietf.org/html/rfc6749#section-2.3.1) 之后就可以得到它
   *
   * The client_secret introduced in [OAuth2 spec](https://tools.ietf.org/html/rfc6749#section-2.3.1).
   */
  clientSecret?: string;
  /**
   * 平台的 base URL，已知平台不用填写
   *
   * This is the base URL of your platform.
   *
   * Default values for supported platforms are:
   *
   * - 'https://github.com' for Github
   * - 'https://gitlab.com' for Gitlab
   * - 'https://bitbucket.org' for Bitbucket
   * - 'https://gitee.com' for Gitee
   * - 'https://gitea.com' for Gitea
   */
  baseURL?: string;
  /**
   * 用来设置 Vssue 使用的 Issue 的 labels (标签)
   *
   * To set the labels of issues that Vssue uses.
   *
   * @default ['Vssue']
   */
  labels?: string;
  /**
   * Issue 标题的前缀。用于生成存储评论的对应 Issue 的实际标题
   *
   * The title prefix for issues. Used for generating the actual title of the corresponding issue.
   *
   * @default ['Vssue']
   */
  prefix?: string;
  /**
   * 拥有 admin 权限的用户数组
   *
   * Array of username that has admin access to Vssue.
   *
   * @description The owner always has admin access.
   */
  admins?: string[];
  /**
   * 默认每页显示的评论数
   *
   * The default value of comments to show per page
   *
   * @default 10
   */
  perPage?: number;
  /**
   * 使用的语言
   *
   * The locale language.
   *
   * @description If not set, Vssue will use one of `window.navigator.languages`, or fallback to `'en'`.
   */
  locale?: string;
  /**
   * 希望使用自己的代理，就需要设置这个选项
   *
   * If you want to use your own proxy, you need to set this option.
   */
  proxy?: string | ((url: string) => string);
  /**
   * Vssue 自动创建 Issue 时使用的内容
   *
   * The content of issue that auto created by Vssue.
   */
  issueContent?: (param: {
    options: Vssue.Options;
    url: string;
  }) => string | Promise<string>;
  /**
   * 在对应的 Issue 不存在时，Vssue 会自动尝试为你创建 Issue
   *
   * Vssue will try to create an issue automatically when the corresponding issue does not exist.
   *
   * @default false
   */
  autoCreateIssue?: false;
}

export interface DisableCommentOptions extends BaseCommentOptions {
  type: "disable";
}

/**
 * 评论选项
 *
 * Comment options
 */
export type CommentOptions =
  | ValineOptions
  | WalineOptions
  | VssueOptions
  | DisableCommentOptions;

declare global {
  const COMMENT_OPTIONS: CommentOptions;
  const PAGE_INFO_I18N: Record<string, PageInfoI18nConfig>;
  const VALINE_I18N: Record<string, string>;
}
