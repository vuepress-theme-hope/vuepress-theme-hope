import type { KatexOptions as OriginalKatexOptions } from "katex";

export interface KatexOptions extends OriginalKatexOptions {
  /**
   * Whether enable mhchem extension
   *
   * 是否启用 mhchem 扩展
   *
   * @default false
   */
  mhchem?: boolean;
}
