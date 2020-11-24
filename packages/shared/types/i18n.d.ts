/** Types for supported lang codes */
export type Langs = "zh-CN" | "en-US" | "vi-VN";

/** Types for supported lang paths */
export type LangPaths = "/zh/" | "/en/" | "/vi/";

export interface HopeLangI18nConfigItem {
  /** 主题色配置 */
  themeColor: {
    /** 颜色提示文字 */
    themeColor: string;
    /** 主题模式提示文字 */
    themeMode: string;
  };
  /** 404错误页 */
  error404: {
    /** 错误提示语 */
    hint: string[];
    /** 返回主页文字 */
    home: string;
    /** 返回上一页文字 */
    back: string;
  };
  /** 博客设置 */
  blog: {
    /** 文章文字 */
    article: string;
    /** 文章列表文字 */
    articleList: string;
    /** 分类文字 */
    category: string;
    /** 标签文字 */
    tag: string;
    /** 时间轴文字 */
    timeline: string;
    /** 时间轴显示文字 */
    timelineText: string;
    /** 全部文字 */
    allText: string;
    /** 个人介绍 */
    intro: string;
    /** 幻灯片 */
    slides: string;
    /** 加密 */
    encrypt: string;
  };
}

export interface ComponentI18NConfig {
  /** 返回顶部文字 */
  backToTop: string;
  /** 分页多语言配置 */
  pagination: {
    /** 上一页文字 */
    prev: string;
    /** 下一页文字 */
    next: string;
    /** 跳转文字 */
    navigate: string;
    /** 按钮文字 */
    button: string;
    /** 错误文字 */
    errorText: string;
  };
}

export interface CopyCodeI18NConfig {
  /** 复制文字 */
  copy: string;
  /** 提示文字 */
  hint: string;
}

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

export interface PWAI18NConfig {
  /** 安装文字 */
  install: string;
  /** iOS 安装文字 */
  iOSInstall: string;
  /** 取消文字 */
  cancel: string;
  /** 安装解释 */
  explain: string;
  /** 描述 */
  desc: string;
  /** 特性文字 */
  feature: string;
  /** 更新内容文字 */
  update: string;
}

export interface ReadingTimeI18NConfig {
  /** 字数模板 */
  word: string;
  /** 小于一分钟文字 */
  minute: string;
  /** 时间模板 */
  time: string;
}

export type PluginI18nConvert<T> = Record<LangPaths, T> & { "/"?: T };

export interface PluginI18nConfig {
  /** Muti language config for components */
  component: PluginI18nConvert<ComponentI18NConfig>;
  /** Muti language config for markdown containers */
  container: Record<string, PluginI18nConvert<string>>;
  /** Muti language config for copy code */
  copyCode: PluginI18nConvert<CopyCodeI18NConfig>;
  /** Muti language config for Page Info */
  pageInfo: PluginI18nConvert<PageInfoI18nConfig>;
  /** Muti language config for pwa popup */
  pwa: PluginI18nConvert<PWAI18NConfig>;
  /** Muti language config for reading time plugin */
  readingTime: PluginI18nConvert<ReadingTimeI18NConfig>;
  /** Muti language config for valine */
  valine: PluginI18nConvert<string>;
}
