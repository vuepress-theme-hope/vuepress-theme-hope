import type { CompilerOptions } from "typescript";

export interface PlaygroundCodeConfig {
  lang: string;
  content: string;
}

export interface PlaygroundData {
  /** Title of Playground */
  title?: string;
  /** Import map file name */
  importMap?: string;
  /** Files info */
  files: Record<string, PlaygroundCodeConfig>;
  /** Playground settings */
  settings?: unknown;
  /** hash key of playground */
  key: string;
}

export interface PlaygroundOptions {
  name: string;
  /**
   * @default 'Playground'
   */
  tag?: string;
  getter: (data: PlaygroundData) => Record<string, string>;
}

export interface TSPresetPlaygroundOptions extends CompilerOptions {
  /**
   * external playground service url
   *
   * playground 外部地址
   *
   * @default "https://www.typescriptlang.org/play"
   */
  service?: string;
}

export interface VuePresetPlaygroundOptions {
  /**
   * external playground service url
   *
   * playground 外部地址
   *
   * @default "https://sfc.vuejs.org/"
   */
  service?: string;

  /**
   * Whether to use dev version.
   *
   * 是否启用开发版本
   *
   * @default false
   */
  dev?: boolean;

  /**
   * Whether to enable SSR.
   *
   * 是否启用 SSR
   *
   * @default false
   */
  ssr?: boolean;
}
