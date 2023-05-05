import { type App, inject } from "vue";

import { type VuePlaygroundOptions } from "../typings/index.js";

const DEFAULT_VUE_PLAYGROUND_OPTIONS: VuePlaygroundOptions = {
  showCompileOutput: false,
  clearConsole: false,
  ssr: false,
};

declare const __VUEPRESS_DEV__: boolean;

let vuePlaygroundOptions: VuePlaygroundOptions = DEFAULT_VUE_PLAYGROUND_OPTIONS;

const vuePlaygroundSymbol = Symbol(__VUEPRESS_DEV__ ? "vuePlayground" : "");

export const defineVuePlaygroundConfig = (
  options: VuePlaygroundOptions
): void => {
  vuePlaygroundOptions = options;
};

export const useVuePlaygroundConfig = (): VuePlaygroundOptions =>
  inject(vuePlaygroundSymbol)!;

export const injectVuePlaygroundConfig = (app: App): void => {
  app.provide(vuePlaygroundSymbol, vuePlaygroundOptions);
};
