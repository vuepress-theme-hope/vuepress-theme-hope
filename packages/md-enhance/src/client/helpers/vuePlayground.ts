import type { VuePlaygroundOptions } from "../typings/index.js";

const DEFAULT_VUE_PLAYGROUND_OPTIONS: VuePlaygroundOptions = {
  autoResize: true,
  showCompileOutput: false,
  clearConsole: false,
  layout: "horizontal",
  ssr: false,
};

let vuePlaygroundOptions: VuePlaygroundOptions = DEFAULT_VUE_PLAYGROUND_OPTIONS;

export const defineVuePlaygroundConfig = (
  options: VuePlaygroundOptions,
): void => {
  vuePlaygroundOptions = options;
};

export const useVuePlaygroundConfig = (): VuePlaygroundOptions =>
  vuePlaygroundOptions;
