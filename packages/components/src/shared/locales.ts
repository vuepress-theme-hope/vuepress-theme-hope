import type { ExactLocaleConfig } from "@vuepress/helper";

/** @deprecated Please use '@vuepress/plugin-back-to-top' */
export interface BackToTopLocaleData {
  /**
   * Back to top button label text
   *
   * 返回顶部文字
   */
  backToTop: string;
}

/** @deprecated Please use '@vuepress/plugin-back-to-top' */
export type BackToTopLocaleConfig = ExactLocaleConfig<BackToTopLocaleData>;

export interface PDFLocaleData {
  /**
   * PDF hint text
   *
   * @description Only used if the browser does not support embedding PDF and no PDFJS URL is provided.
   * [url] will be replaced by actual PDF link.
   *
   * PDF 提示文字
   *
   * @description 只有在浏览器不支持嵌入 PDF 且没有提供 PDFJS URL 时才会使用
   * [url] 会被实际 PDF 链接替换
   */
  hint: string;
}

export type PDFLocaleConfig = ExactLocaleConfig<PDFLocaleData>;

export interface SiteInfoLocaleData {
  /**
   * Source text
   *
   * 源代码文字
   */
  source: string;
}

export type SiteInfoLocaleConfig = ExactLocaleConfig<SiteInfoLocaleData>;
