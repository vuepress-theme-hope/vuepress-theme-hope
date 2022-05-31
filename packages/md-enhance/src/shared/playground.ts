import type { SFCOptions } from "@vue/repl";

export type PlaygroundMode = "internal" | "external";

/** Playground options */
export interface PlaygroundOptions {
  /** mode: [internal, external] */
  mode?: PlaygroundMode;
  /**
   * external options
   */
  external?: PlaygroundExternalOptions;
  /**
   * internal options
   */
  internal?: PlaygroundInternalOptions;
}

/**
 * Playground external options
 */
export interface PlaygroundExternalOptions {
  /**
   * playground base url
   */
  base?: string;
  /**
   * default import map, default value: "imports-map.json".
   * you can use your own, for example: "user-imports.json".
   */
  defaultImportsMap?: string;
  /**
   * other options, which will be passed as query strings.
   */
  options?: Record<string, string>;
}

/**
 * Playground internal options.
 * Please see `@vue/repl` for more details.
 */
export interface PlaygroundInternalOptions {
  /**
   * specify the default URL to import Vue runtime from in the sandbox
   * default is the CDN link from unpkg.com.
   */
  defaultVueRuntimeURL?: string;
  /**
   * specify the version of vue
   */
  vueVersion?: string;
  /**
   * default import map, default value: "imports-map.json".
   * you can use your own, for example: "user-imports.json".
   */
  defaultImportsMap?: string;
  /**
   * Whether to enable repl's editor resizable.
   */
  autoResize?: boolean;
  /**
   * Whether to show code.
   */
  showCode?: boolean;
  /**
   * Whether to show js, css, ssr panel.
   */
  showCompileOutput?: boolean;
  /**
   * Whether to show import map.
   */
  showImportMap?: boolean;
  /**
   * Whether to clear console.
   */
  clearConsole?: boolean;
  /**
   * When layout is 'vertical', displays as top-down.
   * Otherwise, displays as left-right.
   * Default is 'vertical'.
   */
  layout?: string;
  /**
   * Options to configure the `vue/compiler-sfc`.
   */
  sfcOptions?: SFCOptions;
  /**
   * Whether to enable SSR.
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
 */
export const PLAYGROUND_DEFAULT_SETTING: PlaygroundOptions = {
  mode: "external",
};

export const importKey = "import-map.json";
export const userImportKey = "user-imports.json";
export const IMPORT_MAP_KEY = "%IMPORT_MAP_KEY%";
