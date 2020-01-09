import {
  HopeLangLocalesConfig,
  HopeNavBarConfig,
  HopeSideBarConfig,
  LangLocalesConfig,
  NavBarConfig,
  SideBarConfig
} from '@mr-hope/vuepress-shared-utils';
import { CommentOptions } from '@mr-hope/vuepress-plugin-comment';
import { MarkdownEnhanceOption } from 'vuepress-plugin-md-enhance';
import { ThemeColorOptions } from '@mr-hope/vuepress-plugin-theme-color';

export interface VuepressMarkdownOption {
  /** 是否在每个代码块的左侧显示行号 */
  lineNumbers?: boolean;
  /** 一个将标题文本转换为 slug 的函数 */
  slugify?: Function;
  /** markdown-it-anchor 的选项 */
  anchor?: Record<string, any>;
  /** 外部链接处理 */
  externalLinks?: boolean;
  /** markdown-it-table-of-contents 的选项 */
  toc?: Record<string, any>;
  /** markdown-it 插件 */
  plugins?: any;
  /** 一个用于修改当前的 markdown-it 实例的默认配置，或者应用额外的插件的函数 */
  extendMarkdown?: (md: any) => void;
  /** 提取出的标题级别 */
  extractHeaders?: string[];
}

export interface AlgoliaConfig {
  apiKey: string;
  indexName: string;
}

export interface VuepressThemeConfig {
  /** 导航栏 Logo，应为绝对路径 */
  logo?: string;
  /** 导航栏链接 */
  nav?: NavBarConfig;
  /** 侧边栏配置 */
  sidebar: SideBarConfig;
  /** 侧边栏深度 */
  sidebarDepth?: number;
  /** 显示所有页面的标题链接 */
  displayAllHeaders?: boolean;
  /** 是否自动更新嵌套的标题链接和 URL 中的 Hash 值 */
  activeHeaderLinks?: boolean;
  /** 是否启用默认的搜索框 */
  search?: boolean;
  /** 默认搜索框显示的搜索结果数量 */
  searchMaxSuggestions?: number;
  /** Algolia 搜索配置 */
  algolia?: AlgoliaConfig;
  /** 最后更新时间前缀 */
  lastUpdated?: string;
  /** 所有页面的 下一篇 链接 */
  nextLinks?: boolean;
  /** 所有页面的 上一篇 链接 */
  prevLinks?: boolean;
  /** 是否启用平滑滚动功能 */
  smoothScroll?: boolean;
  /**
   * 多语言配置选项
   *
   * 键名是该语言所属的子路径
   * 作为特例，默认语言可以使用 '/' 作为其路径。
   */
  locales?: Record<string, LangLocalesConfig>;
  /** 项目仓库地址 */
  repo?: string;
  /** 仓库标签文字 */
  repoLabel?: string;
  /** 文档所属仓库 */
  docsRepo?: string;
  /** 文档所属文件夹 */

  docsDir?: string;
  /** 文档所属分支 */
  docsBranch?: string;
  /** 显示编辑本页链接 */
  editLinks?: boolean;
  /** 编辑本页文字 */
  editLinkText?: string;
}

export interface HopeFooterConfig {
  /** 页脚的默认文字 */
  text?: string;
  /** 是否显示默认页脚 */
  displayDefault?: boolean;
}

/** vuepress-theme-hope 主题配置 */
export interface HopeThemeConfig extends VuepressThemeConfig {
  /** 根目录对应的语言 */
  baseLang?: string;
  /** 导航栏链接 */
  nav?: HopeNavBarConfig;
  /** 侧边栏配置 */
  sidebar: HopeSideBarConfig;
  /** 默认作者 */
  author?: string;
  /** 图标前缀 */
  iconPrefix?: string;
  /** 是否全局启用路径导航 */
  breadcrumb?: boolean;
  /** 是否在路径导航显示图标 */
  breadcrumbIcon?: boolean;
  /** 是否在侧边栏显示图标 */
  sidebarIcon?: boolean;
  /** 多语言配置 */
  locales?: Record<string, HopeLangLocalesConfig>;
  /** 页脚配置 */
  footer?: HopeFooterConfig;
  /** 是否显示返回顶部按钮 */
  backToTop?: boolean;
  /** 是否在导航栏显示仓库链接 */
  repoDisplay?: boolean;
  /** 主题色配置 */
  themeColor?: ThemeColorOptions;
  /** 是否显示 ”全屏“ 按钮 */
  fullscreen?: boolean;
  /** Markdown 增强设置 */
  markdown?: MarkdownEnhanceOption;
  /** 评论设置 */
  comment?: CommentOptions;
}

/** 处理后的 vuepress-theme-hope 主题配置 */
export interface ResolvedHopeThemeConfig extends HopeThemeConfig {
  /** 根目录对应的语言 */
  baseLang: string;
  /** 侧边栏深度 */
  sidebarDepth: number;
  /** 图标 FontClass 前缀 */
  iconPrefix: string;
  /** 多语言配置 */
  locales: Record<string, HopeLangLocalesConfig>;
  /** 页脚配置 */
  footer: HopeFooterConfig;
  /** 显示编辑本页链接 */
  editLinks: boolean;
}

export interface BaseVuepressConfig {
  /** 部署站点的基础路径 */
  base?: string;

  /** 网站的标题 */
  title?: string;
  /** 网站的描述，它将会以 `<meta>` 标签渲染到当前页面的 HTML 中 */
  description?: string;
  /** 额外的需要被注入到当前页面的 HTML <head> 中的标签 */
  head?: any[];
  /** 指定用于 dev server 的主机名 */
  host?: string;
  /** 指定 dev server 的端口 */
  port?: number;
  /** 指定客户端文件的临时目录 */
  temp?: string;
  /** 指定 vuepress build 的输出目录 */
  dest?: string;
  /** 提供多语言支持的语言配置 */

  locales?: Record<string, any>;
  /** 一个函数，用来控制对于哪些文件，是需要生成 `<link rel="prefetch">` 资源提示的 */
  shouldPrefetch?: Function;
  /** 此选项可以用于指定 cache 的路径，同时也可以通过设置为 `false` 来在每次构建之前删除 cache */
  cache?: boolean | string;
  /** 指定额外的需要被监听的文件 */
  extraWatchFiles?: string[];
  /** 指定想要处理的文件 */
  patterns?: string[];
}

export interface VuepressBuildConfig {
  /** postcss-loader 的选项 */
  postcss?: Record<string, any>;
  /** stylus-loader 的选项 */
  stylus?: Record<string, any>;
  /** sass-loader 的选项 */
  scss?: Record<string, any>;
  /** sass-loader 的选项 */
  sass?: Record<string, any>;
  /** less-loader 的选项 */
  less?: Record<string, any>;
  /** 用于修改内部的 Webpack 配置  */
  configureWebpack?:
    | Record<string, any>
    | ((config: any, isServer: boolean) => void);
  /** 通过 webpack-chain 来修改内部的 Webpack 配置 */
  chainWebpack?: (config: any, isServer: boolean) => void;
}

/** Vuepress 项目配置 */
export interface VuepressConfig
  extends BaseVuepressConfig,
    VuepressBuildConfig {
  /** markdown选项 */
  markdown?: VuepressMarkdownOption;
  /** 使用的自定义主题 */
  theme?: string;
  /** 自定义主题的配置 */
  themeConfig?: VuepressThemeConfig;
  /** 使用插件及其配置 */
  plugins: any;
  /** 设置成 `true` 将会禁止 ESNext 到 ES5 的转译以及对 IE 的 polyfills，同时会带来更快的构建速度和更小的文件体积 */
  evergreen?: boolean;
}

export interface HopeHeadOptionConfig {
  /** 网站的图标 */
  icon?: string;

  [props: string]: any;
}

/** vuepress-theme-hope 项目配置 */
export interface HopeVuepressConfig extends VuepressConfig {
  /** 自定义主题的配置 */
  themeConfig: HopeThemeConfig;
  /** 构建头部选项 */
  headOption?: HopeHeadOptionConfig;
}

/** 处理过的 vuepress-theme-hope 项目配置 */
export interface ResolvedHopeVuepressConfig extends HopeVuepressConfig {
  /** 使用的自定义主题 */
  theme: 'hope';
  /** 自定义主题的配置 */
  themeConfig: ResolvedHopeThemeConfig;
  /** 构建头部选项 */
  headOption?: HopeHeadOptionConfig;
}
