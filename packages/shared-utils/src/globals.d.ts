/** 主题色选项 */
interface CommentOptions {
  type: string;
  author?: string;

}


interface ValineOptions extends CommentOptions {
  /** appID */
  appId?: string;

  /** appKey */
  appKey?: string;

  /** 是否启用评论 */
  comment?: boolean;

  /** 是否启用访问量 */
  visitor?: boolean;

  /** 评论占位符 */
  placeholder?: string;

  /** 评论所需信息 */
  meta?: string[];

  /** 是否发送邮件提醒有新通知 */
  notify?: boolean;

  /** 是否需要验证码 */
  verify?: boolean;

  /** 头像类型 */
  avatar?: string;

  /** 是否记录 IP */
  recordIP?: boolean;

  /** 每页的最大评论数 */
  pageSize?: number;
}

interface Window {
  AV: any;
}

/** 主题颜色配置选项 */
declare const COMMENT_OPTIONS: CommentOptions;

/** 主题色选项 */
interface ThemeColorOptions {
  /** 是否开启主题色 */
  allowThemeColor?: boolean;
  /** 颜色选择器 */
  picker?: Record<string,string>;
  /** 是否允许开启夜间模式 */
  allowNightmode?: boolean;
}

/** 主题颜色配置选项 */
declare const THEME_COLOR_OPTIONS: ThemeColorOptions;
