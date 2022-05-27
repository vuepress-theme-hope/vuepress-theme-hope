import type { SFCOptions } from "@vue/repl";

export type PlaygroundMode = "internal" | "external";

export interface PlaygroundOptions {
  mode?: PlaygroundMode;
  external?: PlaygroundExternalOptions;
  internal?: PlaygroundInternalOptions;
}

export interface PlaygroundExternalOptions {
  base?: string;
  defaultImportsMap?: string;
  options?: Record<string, string>;
}

export interface PlaygroundInternalOptions {
  defaultVueRuntimeURL?: string;
  vueVersion?: string;
  defaultImportsMap?: string;
  autoResize?: boolean;
  showCode?: boolean;
  showCompileOutput?: boolean;
  showImportMap?: boolean;
  clearConsole?: boolean;
  layout?: string;
  sfcOptions?: SFCOptions;
  ssr?: boolean;
}

export interface PlaygroundCodeConfig {
  lang?: string;
  content?: string;
}

export type PlaygroundFiles = Record<string, PlaygroundCodeConfig>;

export const PLAYGROUND_DEFAULT_SETTING: PlaygroundOptions = {
  mode: "external",
};

export const importKey = "import-map.json";
export const userImportKey = "user-imports.json";
export const IMPORT_MAP_KEY = "%IMPORT_MAP_KEY%";
