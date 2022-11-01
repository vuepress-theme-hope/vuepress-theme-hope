declare module "twikoo" {
  export interface TwikooInitOptions {
    /**
     * Environment ID for tencloud
     *
     * Link for Vercel
     */
    envId: string;

    /**
     * Tencloud region
     *
     * @default 'ap-shanghai'
     */
    region?: string;

    /**
     * Container Element selector
     */
    el: string;

    /**
     * Article path
     *
     * @default window.location.pathname
     */
    path?: string;

    /**
     * Display language
     */
    lang?: string;

    /**
     * Callback when comment loaded
     */
    onCommentLoaded?: () => void;
  }
  export interface TwikooCommentCountOptions {
    /**
     * Environment ID for tencloud
     *
     * Link for Vercel
     */
    envId: string;

    /**
     * Tencloud region
     *
     * @default 'ap-shanghai'
     */
    region?: string;

    /**
     * @description protocol, domain and url should not be included
     */
    urls: string[];
    /**
     * Whether include reply
     *
     * @default false
     */
    includeReply?: boolean;
  }

  export interface TwikooCommentCountResult {
    url: string;
    count: number;
  }

  export interface TwikooRecentCommentsOptions {
    /**
     * Environment ID for tencloud
     *
     * Link for Vercel
     */
    envId: string;

    /**
     * Tencloud region
     *
     * @default 'ap-shanghai'
     */
    region?: string;

    /**
     * @description max to 100
     *
     * @default 10
     */
    pageSize?: number;
    /**
     * Whether include reply
     *
     * @default false
     */
    includeReply?: boolean;
  }

  export interface TwikooRecentCommentsResult {
    /** 评论 ID */
    id: string;
    /** 评论地址 */
    url: string;
    /** 昵称 */
    nick: string;
    /** 邮箱的 MD5 值，可用于展示头像 */
    mailMd5: string;
    /** 网址 */
    link: string;
    /** HTML 格式的评论内容 */
    comment: string;
    /** 纯文本格式的评论内容 */
    commentText: string;
    /** 评论时间，格式为毫秒级时间戳 */
    created: number;
    /**
     * 头像地址
     *
     * @version >= 0.2.9
     */
    avatar: string;
    /**
     * 相对评论时间，如 “1 小时前”
     *
     * @version >= 0.2.9
     */
    relativeTime: string;
  }

  export const version: string;
  export const init: (options: TwikooInitOptions) => Promise<void>;
  export const getCommentsCount: (
    options: TwikooCommentCountOptions
  ) => Promise<TwikooCommentCountResult[]>;
  export const getRecentComments: (
    options: TwikooRecentCommentsOptions
  ) => Promise<TwikooRecentCommentsResult[]>;

  export default init;
}
