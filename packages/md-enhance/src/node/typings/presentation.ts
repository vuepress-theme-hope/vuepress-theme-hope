export type RevealPlugin = "highlight" | "math" | "search" | "notes" | "zoom";

export interface PresentationOptions {
  /**
   * Reveal plugins enabled
   *
   * 启用的 Reveal.js 插件
   */
  plugins?: RevealPlugin[];
}
