/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Configuration } from "webpack";
import type { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import type { Markdown } from "./markdown";
import type { PluginOptionAPI } from "./plugin";
import MarkdownItAnchor = require("markdown-it-anchor");

export interface I18nConfig extends Record<string, any> {
  /** 当前语言代码 */
  lang?: string;
  /** 当前语言下的标题 */
  title?: string;
  /** 当前语言下的描述 */
  description?: string;
}

export interface LocaleConfig {
  [key: string]: I18nConfig;
}

export interface ThemeConfig extends Record<string, any> {
  locales?: LocaleConfig;
}

export interface MarkdownItToc {
  /** Headings levels to use */
  includeLevel?: number[];
  /** The class for the container DIV */
  containerClass?: string;
  /** A custom slugification function */
  slugify?: (slug: string) => string;
  /** Regex pattern of the marker to be replaced with TOC */
  markerPattern?: RegExp;
  /** Type of list (ul for unordered, ol for ordered) */
  listType?: "ul" | "ol";
  /** A function for formatting headings */
  format?: (heading: string) => string;
  /** If true, renders all the headers in TOC, even if the headers are in incorrect order */
  forceFullToc?: boolean;
  /** Optional HTML string for container header */
  containerHeaderHtml?: string;
  /** Optional HTML string for container footer */
  containerFooterHtml?: string;
  /** A function for transforming the TOC links */
  transformLink?: (link: string) => string;
}

/**
 * @see https://vuepress.vuejs.org/config/#markdown
 */
export interface MarkdownConfig {
  /**
   * 是否在每个代码块的左侧显示行号
   *
   * Whether to show line numbers to the left of each code blocks.
   */
  lineNumbers?: boolean;
  /**
   * 一个将标题文本转换为 slug 的函数
   *
   * Function for transforming header texts into slugs.
   */
  slugify?: (title: string) => string;
  /**
   * markdown-it-anchor 的选项
   *
   * Options for markdown-it-anchor
   */
  anchor?: MarkdownItAnchor.AnchorOptions;
  /**
   * 外部链接处理
   *
   * The key and value pair will be added to <a> tags that point to an external link.
   */
  externalLinks?: boolean;
  /**
   * markdown-it-table-of-contents 的选项
   *
   * Options for markdown-it-table-of-contents
   */
  toc?: MarkdownItToc;
  plugins?: Exclude<PluginConfig, PluginOptionAPI>;
  /**
   * 一个用于修改当前的 markdown-it 实例的默认配置，或者应用额外的插件的函数
   *
   * A function to edit default config or apply extra plugins to the markdown-it
   * instance used to render source files.
   */
  extendMarkdown: (md: Markdown) => void;
  /**
   * 提取出的标题级别
   *
   * Headers levels being extracted
   */
  extractHeaders: string[];
}
export type PluginConfig<PluginOption = any> =
  | string
  | [string]
  | [string, PluginOption]
  | Record<string, PluginOption>
  | PluginOptionAPI;

export type HeadItem = [string, Record<string, string>, string?];

interface BaseSiteConfig {
  /** 部署站点的基础路径 */
  base?: string;

  /** 网站的标题 */
  title?: string;
  /** 网站的描述，它将会以 `<meta>` 标签渲染到当前页面的 HTML 中 */
  description?: string;
  /** 额外的需要被注入到当前页面的 HTML <head> 中的标签 */
  head?: HeadItem[];
  /** 指定用于 dev server 的主机名 */
  host?: string;
  /** 指定 dev server 的端口 */
  port?: number;
  /** 指定客户端文件的临时目录 */
  temp?: string;
  /** 指定 vuepress build 的输出目录 */
  dest?: string;
  /** 提供多语言支持的语言配置 */

  locales?: LocaleConfig;
  /** 一个函数，用来控制对于哪些文件，是需要生成 `<link rel="prefetch">` 资源提示的 */
  shouldPrefetch?: (file: string, type: string) => boolean;
  /** 此选项可以用于指定 cache 的路径，同时也可以通过设置为 `false` 来在每次构建之前删除 cache */
  cache?: boolean | string;
  /** 指定额外的需要被监听的文件 */
  extraWatchFiles?: string[];
  /** 指定想要处理的文件 */
  patterns?: string[];
}

export type BuildSiteConfig = {
  /*
   * Build Pipeline
   * https://github.com/postcss/postcss-loader#options
   */
  postcss?: {
    exec?: boolean;
    parser?: string | Record<string, any>;
    syntax?: string | Record<string, any>;
    stringifier?: string | Record<string, any>;
    config?: {
      path?: string;
      context?: Record<string, any>;
      ctx?: Record<string, any>;
    };
    ident?: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    plugins?: any[] | Function;
    sourceMap?: "inline" | boolean;
  };

  // https://github.com/shama/stylus-loader#readme
  stylus?: {
    use?: any[];
    import?: string[];
    preferPathResolver?: "webpack" | string;
    [key: string]: any;
  };
  /** sass-loader 的选项 */
  scss?: Record<string, any>;
  /** sass-loader 的选项 */
  sass?: Record<string, any>;
  /** less-loader 的选项 */
  less?: Record<string, any>;
  /** 用于修改内部的 Webpack 配置  */
  configureWebpack?:
    | Configuration
    | ((config: Configuration, isServer: boolean) => void)
    | ((config: Configuration, isServer: boolean) => Configuration);
  /** 通过 webpack-chain 来修改内部的 Webpack 配置 */
  chainWebpack?: (config: any, isServer: boolean) => void;
};

/**
 * @see https://vuepress.vuejs.org/config
 */
export interface SiteConfig extends BaseSiteConfig, BuildSiteConfig {
  // Theme
  theme?: string;
  themeConfig?: ThemeConfig;

  // Plugin
  plugins?: PluginConfig[];

  // Markdown
  markdown?: MarkdownConfig;

  /** 设置成 `true` 将会禁止 ESNext 到 ES5 的转译以及对 IE 的 polyfills，同时会带来更快的构建速度和更小的文件体积 */
  evergreen?: boolean;

  // Undocumented
  name?: string;
  devServer?: WebpackDevServerConfiguration;
  devTemplate?: string;
  permalink?: string;

  [key: string]: any;
}
