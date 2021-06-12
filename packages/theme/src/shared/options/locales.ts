import type { LocaleData } from "@vuepress/shared";
import type { ThemeData } from "@vuepress/plugin-theme-data";
import type { HopeBlogOptions } from "./features";
import type { HopeFooterConfig } from "./layout";
import type { NavbarConfig } from "./navbar";
import type { SidebarConfig } from "./sidebar";

export interface HopeThemeI18nConfigItem {
  /** 当前语言代码 */
  lang?: string;
  /** 多语言下拉菜单的标题 */
  selectText?: string;
  /** 该语言在下拉菜单中的标签 */
  label?: string;
  /** 辅助标签 */
  ariaLabel?: string;

  /** 页面信息 */
  meta: {
    /** 贡献者文字 */
    contributor: string;
    /** 编辑链接文字 */
    editLink: string;
    /** 该语言下的更新时间文字 */
    updateTime: string;
  };
  /** 主题色配置 */
  themeColor: {
    /** 颜色提示文字 */
    themeColor: string;
    /** 主题模式提示文字 */
    themeMode: string;
  };
  /** 加密 */
  encrypt: {
    title: string;
    errorHint: string;
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
    /** 搜藏文字 */
    star: string;
    /** 幻灯片 */
    slides: string;
    /** 加密 */
    encrypt: string;
  };
}

export interface HopeThemeLocaleData extends LocaleData {
  /**
   * Home path of current locale
   *
   * Used as the link of back-to-home and navbar logo
   */
  home?: string;

  /**
   * Default author
   */
  author?: string;

  /**
   * Navbar config
   *
   * Set to `false` to disable navbar in current locale
   */
  navbar?: false | NavbarConfig;

  /**
   * Navbar logo config
   *
   * Logo to display in navbar
   */
  logo?: null | string;

  /**
   * Navbar repository config
   *
   * Used for the repository link of navbar
   */
  repo?: null | string;

  /**
   * Navbar repository config
   *
   * Used for the repository text of navbar
   */
  repoLabel?: string;

  /**
   * Navbar language selection config
   *
   * Text of the language selection dropdown
   */
  selectLanguageText?: string;

  /**
   * Navbar language selection config
   *
   * Aria label of of the language selection dropdown
   */
  selectLanguageAriaLabel?: string;

  /**
   * Navbar language selection config
   *
   * Language name of current locale
   *
   * Displayed inside the language selection dropdown
   */
  selectLanguageName?: string;

  /**
   * Sidebar config
   *
   * Set to `false` to disable sidebar in current locale
   */
  sidebar?: "auto" | false | SidebarConfig;

  /**
   * Sidebar depth
   *
   * - Set to `0` to disable all levels
   * - Set to `1` to include `<h2>`
   * - Set to `2` to include `<h2>` and `<h3>`
   * - ...
   *
   * The max value depends on which headers you have extracted
   * via `markdown.extractHeaders.level`.
   *
   * The default value of `markdown.extractHeaders.level` is `[2, 3]`,
   * so the default max value of `sidebarDepth` is `2`
   */
  sidebarDepth?: number;

  /**
   * Page meta - edit link config
   *
   * Whether to show "Edit this page" or not
   */
  editLink?: boolean;

  /**
   * Page meta - edit link config
   *
   * The text to replace the default "Edit this page"
   */
  editLinkText?: string;

  /**
   * Page meta - edit link config
   *
   * Pattern of edit link
   *
   * @example ':repo/edit/:branch/:path'
   */
  editLinkPattern?: string;

  /**
   * Page meta - edit link config
   *
   * Use `repo` config by default
   *
   * Set this config if your docs is placed in a different repo
   */
  docsRepo?: string;

  /**
   * Page meta - edit link config
   *
   * Set this config if the branch of your docs is not 'master'
   */
  docsBranch?: string;

  /**
   * Page meta - edit link config
   *
   * Set this config if your docs is placed in sub dir of your `docsRepo`
   */
  docsDir?: string;

  /**
   * Page meta - last updated config
   *
   * Whether to show "Last Updated" or not
   */
  lastUpdated?: boolean;

  /**
   * Page meta - last updated config
   *
   * The text to replace the default "Last Updated"
   */
  lastUpdatedText?: string;

  /**
   * Page meta - contributors config
   *
   * Whether to show "Contributors" or not
   */
  contributors?: boolean;

  /**
   * Page meta - contributors config
   *
   * The text to replace the default "Contributors"
   */
  contributorsText?: string;

  footer?: HopeFooterConfig;

  blog?: HopeBlogOptions | false;

  /**
   * Custom block config
   *
   * Default title of TIP custom block
   */
  tip?: string;

  /**
   * Custom block config
   *
   * Default title of WARNING custom block
   */
  warning?: string;

  /**
   * Custom block config
   *
   * Default title of DANGER custom block
   */
  danger?: string;

  /**
   * 404 page config
   *
   * Not Found messages for 404 page
   */
  notFound?: string[];

  /**
   * 404 page config
   *
   * Text of back-to-home link in 404 page
   */
  backToHome?: string;

  /**
   * sr-only message in `<OutboundLink>`
   */
  openInNewWindow?: string;

  i18n?: HopeThemeI18nConfigItem;
}

export type HopeThemeData = ThemeData<HopeThemeLocaleData>;

export type HopeThemeLocaleOptions = HopeThemeData;
