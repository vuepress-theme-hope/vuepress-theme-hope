import { RevealOptions } from "./reveal";

export type RevealPlugin = "highlight" | "math" | "search" | "notes" | "zoom";

export interface PresentationOptions {
  /**
   * Reveal plugins enabled
   *
   * 启用的 Reveal.js 插件
   */
  plugins?: RevealPlugin[];

  /**
   * Config options passed directly to reval.js
   *
   * 直接传入 reval.js 的配置项
   */
  revealConfig?: Partial<RevealOptions>;
}
