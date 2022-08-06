import type { SFCOptions } from "@vue/repl";

export type PlaygroundMode = "internal" | "external";

/**
 * Playground options
 *
 * Playground 配置
 */
export interface PlaygroundOptions {
  /**
   * mode: [internal, external]
   *
   * 模式: [internal, external]
   */
  mode?: PlaygroundMode;

  /**
   * external options
   *
   * 外置模式配置
   */
  external?: ExternalPlaygroundOptions;

  /**
   * internal options
   *
   * 内置式配置
   */
  internal?: InternalPlaygroundOptions;
}

/**
 * Playground external options
 *
 * Playground 外置模式配置
 */
export interface ExternalPlaygroundOptions {
  /**
   * playground base url
   *
   * playground 基础地址
   */
  base?: string;

  /**
   * default import map, default value: "imports-map.json".
   * you can use your own, for example: "user-imports.json".
   *
   * 默认 import map, 默认值: "imports-map.json".
   * 你也可以使用自己的 import map，比如: "user-imports.json".
   */
  defaultImportsMap?: string;

  /**
   * other options, which will be passed as query strings.
   *
   * 其他配置，这些会被作为查询字符串传过去。
   */
  options?: Record<string, string>;
}

/**
 * Playground internal options.
 * Please see `@vue/repl` for more details.
 *
 * Playground 内置模式配置
 * 详情请查看 `@vue/repl` 。
 */
export interface InternalPlaygroundOptions {
  /**
   * specify the default URL to import Vue runtime from in the sandbox
   * default is the CDN link from unpkg.com.
   *
   * 指定默认的 Vue 运行时。
   * 默认使用 unpkg.com CDN 。
   */
  defaultVueRuntimeURL?: string;

  /**
   * specify the version of vue
   *
   * 指定 vue 版本
   */
  vueVersion?: string;

  /**
   * default import map, default value: "imports-map.json".
   * you can use your own, for example: "user-imports.json".
   *
   * 默认 import map, 默认值: "imports-map.json".
   * 你也可以使用自己的 import map，比如: "user-imports.json".
   */
  defaultImportsMap?: string;

  /**
   * Whether to enable repl's editor resizable.
   *
   * 是否启用自动调整大小。
   */
  autoResize?: boolean;

  /**
   * Whether to show code.
   *
   * 是否显示代码
   *
   * @default false
   */
  showCode?: boolean;

  /**
   * Whether to show JS, CSS, SSR panel.
   *
   * 是否显示 JS, CSS, SSR 面板
   *
   * @default false
   */
  showCompileOutput?: boolean;

  /**
   * Whether to show import map.
   *
   * 是否显示 import map
   */
  showImportMap?: boolean;

  /**
   * Whether to clear console.
   *
   * 是否清空控制台
   *
   * @default false
   */
  clearConsole?: boolean;

  /**
   * When layout is 'vertical', displays as top-down.
   * Otherwise, displays as left-right.
   * Default is 'vertical'.
   *
   * 当设为 'vertical' 时，显示上下模式。
   * 否则显示左右模式。
   * 默认为 'vertical'.
   *
   * @default 'vertical'
   */
  layout?: string;

  /**
   * Options to configure the `vue/compiler-sfc`.
   *
   * `vue/compiler-sfc` 配置项
   */
  sfcOptions?: SFCOptions;

  /**
   * Whether to enable SSR.
   *
   * 是否启用 SSR
   */
  ssr?: boolean;
}

export interface PlaygroundCodeConfig {
  lang?: string;
  content?: string;
}

export type PlaygroundFiles = Record<string, PlaygroundCodeConfig>;

/**
 * default playground settings.
 *
 * Playground 默认配置
 */
export const PLAYGROUND_DEFAULT_SETTING: PlaygroundOptions = {
  mode: "external",
};

export const importKey = "import-map.json";
export const userImportKey = "user-imports.json";
export const IMPORT_MAP_KEY = "%IMPORT_MAP_KEY%";
