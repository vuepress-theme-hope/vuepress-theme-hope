// import { deepAssign } from "vuepress-shared";
import { deepAssign } from "./assign";

import { IMPORT_MAP_KEY, importKey } from "../../../shared/playground";

import type {
  PlaygroundOptions,
  PlaygroundFiles,
} from "../../../shared/playground";

declare const PLAYGROUND_OPTIONS: PlaygroundOptions;
// const PLAYGROUND_OPTIONS: PlaygroundOptions = {}; // for test

export const playgroundOptions = PLAYGROUND_OPTIONS;

export const DEFAULT_PLAYGROUND_SETTINGS: PlaygroundOptions = {
  mode: "external",
  external: {
    base: "https://sfc.vuejs.org/",
    defaultImportsMap: "import-map.json",
  },
  internal: {
    defaultImportsMap: "import-map.json",
    autoResize: true,
    showCode: false,
    showCompileOutput: false,
    showImportMap: true,
    clearConsole: false,
  },
};

export const APP_PLAYGROUND_SETTINGS: PlaygroundOptions = deepAssign(
  {},
  DEFAULT_PLAYGROUND_SETTINGS,
  playgroundOptions || {}
);

/**
 * copied from https://github.com/vuejs/repl/blob/main/src/utils.ts
 */
export function utoa(data: string): string {
  return btoa(unescape(encodeURIComponent(data)));
}

export function parsePlaygroundConfig(
  config: string,
  defaultImportsMap?: string
): PlaygroundFiles {
  let tmpConfig: string = config;

  if (tmpConfig.includes(IMPORT_MAP_KEY)) {
    tmpConfig = config.replace(IMPORT_MAP_KEY, defaultImportsMap || importKey);
  }
  const files = JSON.parse(decodeURIComponent(tmpConfig)) as PlaygroundFiles;

  return files;
}

export function parsePlaygroundSettings(settings: string): PlaygroundOptions {
  const settingsObj = JSON.parse(
    decodeURIComponent(settings)
  ) as PlaygroundOptions;

  return deepAssign({}, APP_PLAYGROUND_SETTINGS, settingsObj);
}
