import { deepAssign } from "vuepress-shared/lib/client";

import { IMPORT_MAP_KEY } from "../../shared";

import type { PlaygroundOptions, PlaygroundFiles } from "../../shared";

declare const PLAYGROUND_OPTIONS: PlaygroundOptions;

const playgroundOptions = PLAYGROUND_OPTIONS;

const DEFAULT_PLAYGROUND_SETTINGS: PlaygroundOptions = {
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

  if (tmpConfig.includes(IMPORT_MAP_KEY))
    tmpConfig = config.replace(
      IMPORT_MAP_KEY,
      defaultImportsMap || "import-map.json"
    );

  const files = <PlaygroundFiles>JSON.parse(decodeURIComponent(tmpConfig));

  return files;
}

export const parsePlaygroundSettings = (settings: string): PlaygroundOptions =>
  deepAssign(
    {},
    APP_PLAYGROUND_SETTINGS,
    <PlaygroundOptions>JSON.parse(decodeURIComponent(settings))
  );
