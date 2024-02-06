import type { App } from "vue";
import { inject } from "vue";

import type { SandpackConfig } from "../typings/index.js";

const DEFAULT_SANDPACK_CONFIG: SandpackConfig = {
  template: "vue",
};

declare const __VUEPRESS_DEV__: boolean;

let sandpackConfig: SandpackConfig = DEFAULT_SANDPACK_CONFIG;

const sandpackSymbol = Symbol(__VUEPRESS_DEV__ ? "sandpack" : "");

export const defineSandpackConfig = (config: SandpackConfig): void => {
  sandpackConfig = config;
};

export const useSandpackConfig = (): SandpackConfig => inject(sandpackSymbol)!;

export const injectSandpackConfig = (app: App): void => {
  app.provide(sandpackSymbol, sandpackConfig);
};
