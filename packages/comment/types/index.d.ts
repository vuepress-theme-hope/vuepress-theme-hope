/** 评论组件通用选项 */
interface BaseCommentOptions {
  /** 类型，有 `‘valine'` 和 `'vssue` 可选 */
  type: 'valine' | 'vssue';
  /** 默认作者 */
  author?: string;
  /** 是否启用文章信息 */
  pageInfo?: boolean;
}

/** Valine 配置 */
export type ValineOptions = BaseCommentOptions &
  Partial<{
    /** appID */
    appId: string;

    /** appKey */
    appKey: string;

    /** 是否启用评论 */
    comment: boolean;

    /** 是否启用访问量 */
    visitor: boolean;

    /** 评论占位符 */
    placeholder: string;

    /** 评论所需信息 */
    meta: string[];

    /** 是否发送邮件提醒有新通知 */
    notify: boolean;

    /** 是否需要验证码 */
    verify: boolean;

    /** 头像类型 */
    avatar: string;

    /** 是否记录 IP */
    recordIP: boolean;

    /** 每页的最大评论数 */
    pageSize: number;
  }>;

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
  issueContent?: (param: any) => string | Promise<string>;
  /** 在对应的 Issue 不存在时，Vssue 会自动尝试为你创建 Issue */
  autoCreateIssue?: false;
}

/** vuepress-plugin-comment 配置 */
export type CommentOptions = ValineOptions | VssueOptions;

/** 评论组件全局变量 */
declare global {
  const COMMENT_OPTIONS: CommentOptions;
}
