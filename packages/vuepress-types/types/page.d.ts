import { ClientComputedMixin } from "./computed";
import { Context } from "./context";
import { Markdown } from "./markdown";
import { OptionItem } from "./plugin-api";

/**
 * @see https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/node/Page.js
 */

/*
 * ==================
 * Page basic properties
 * ==================
 */

export interface BasePage {
  title: string;
  frontmatter: PageFrontmatter;
  key: string;
  path: string;
  regularPath: string;
  relativePath: string;
  headers?: PageHeader[];
  excerpt?: string;
}

export interface PageFrontmatter {
  permalink?: string;
  title?: string;
  description?: string;
  lang?: string;
  layout?: string;
  metaTitle?: string;
  meta?: Record<"charset" | "content" | "http-equiv" | "name", string>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/*
 * ==================
 * Page in context
 * ==================
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PageEnhancer<T = any> = OptionItem<T>[];

export interface PageProcessOptions {
  computed: ClientComputedMixin;
  markdown: Markdown;
  enhancers: PageEnhancer[];
  preRender: Record<string, unknown>;
}

export interface PageHeader {
  level: number;
  title: string;
  slug: string;
}

export interface Page extends BasePage {
  readonly dirname: string;
  readonly filename: string;
  readonly slug: string;
  readonly strippedFilename: string;
  readonly date: string;

  _context: Context;
  _content: string;
  _computed: ClientComputedMixin;
  _extractHeaders: string[];
  _filePath: string;
  _localePath: string;
  _meta: Record<string, string>[];
  _permalink: string;
  _permalinkPattern: string;
  _strippedContent: string;

  process: (options: PageProcessOptions) => Promise<void>;
  stripFilename: (fileName: string) => string;
  toJson: () => PageComputed;
  buildPermalink: () => void;
  enhance: (enhancers: PageEnhancer[]) => Promise<void>;
}

export interface PageOptions {
  path: string;
  meta: Record<string, string>[];
  title: string;
  content: string;
  filePath: string;
  relative: string;
  permalink: string;
  frontmatter: PageFrontmatter;
  permalinkPattern: string;
}

export interface PageConstructor {
  new (options: PageOptions, context: Context): Page;
}

/*
 * ==================
 * Page in computed
 * ==================
 */

export interface PageComputed extends BasePage {
  // default theme
  lastUpdated?: string;
}
