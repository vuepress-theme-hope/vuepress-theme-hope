import type { ClientComputedMixin } from "./computed";
import type { PluginConfig, SiteConfig, ThemeConfig } from "./config";
import type { Markdown } from "./markdown";
import type { Page, PageComputed, PageOptions } from "./page";
import type { PluginAPI } from "./plugin-api";
import type { ThemeAPI } from "./theme-api";

/**
 * @see https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/node/App.js
 * @see https://vuepress.vuejs.org/plugin/context-api.html
 */

export interface ContextConstructor {
  new (options: ContextOptions): Context;
}

export type App = Context;

export interface Context<T = ThemeConfig> {
  /**
   * Docs
   */
  isProd: boolean;
  pages: Page[];
  sourceDir: string;
  tempPath: string;
  outDir: string;
  base: string;
  writeTemp: (file: string, content: string) => void;

  /**
   * Other
   */
  options: ContextOptions;
  vuepressDir: string;
  libDir: string;
  cwd: string;
  siteConfig: SiteConfig;
  themeConfig: T;
  markdown: Markdown;
  pluginAPI: PluginAPI;
  themeAPI: ThemeAPI;
  ClientComputedMixinConstructor: new () => ClientComputedMixin;
  ssrTemplate: string;
  devTemplate: string;
  globalLayout: string;
  // cache related properties, added in resolveCacheLoaderOptions()
  cacheDirectory: string;
  cacheIdentifier: string;

  // private
  resolveConfigAndInitialize: () => void;
  process: () => Promise<void>;
  applyInternalPlugins: () => void;
  applyUserPlugins: () => void;
  normalizeHeadTagUrls: () => void;
  resolveCacheLoaderOptions: () => void;
  resolveTemplates: () => void;
  resolveGlobalLayout: () => void;
  resolveCommonAgreementFilePath: () => void | string;
  resolvePages: () => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getThemeConfigValue: (key: string) => any;
  resolveThemeAgreementFile: (filepath: string) => string | void;
  resolveSiteAgreementFile: (filepath: string) => string | void;

  // public
  addPage: (options: PageOptions) => Promise<void>;
  getSiteData: () => SiteData;
  getLibFilePath: (relative: string) => string;
  dev: () => Promise<Context>;
  build: () => Promise<Context>;
}

export interface ContextOptions {
  /*
   * ===========
   * cli options
   * ===========
   */

  // dirs
  sourceDir?: string;
  dest?: string;
  temp?: string;

  // listen
  host?: string;
  port?: number;

  // other
  clearScreen?: string;
  open?: boolean;
  cache?: boolean;

  /*
   * ===========
   * api options
   * ===========
   */

  theme?: string;
  plugins?: PluginConfig[];
  siteConfig?: SiteConfig;
}

/**
 * Context.getSiteData()
 */
export type SiteData =
  // `locales` directly comes from SiteConfig
  Pick<SiteConfig, "locales"> &
    // `title`, `description`, `base`, `themeConfig` are always defined
    Required<
      Pick<SiteConfig, "title" | "description" | "base" | "themeConfig">
    > & {
      // page.toJson()
      pages: PageComputed[];
    };
